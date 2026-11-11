"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import Link from "next/link";
import { menu, money } from "@/lib/menu";
import { phone, phoneHref } from "@/lib/business";
import { Icon } from "./icons";
import { ProductPhoto } from "./photo";
type CartItem = { id: string; quantity: number };
type CartContextType = {
  items: CartItem[];
  count: number;
  add: (id: string, quantity?: number) => void;
  open: () => void;
};
const CartContext = createContext<CartContextType | null>(null);
const KEY = "coffee-break-cart-v1";
export const useCart = () => {
  const c = useContext(CartContext);
  if (!c) throw new Error("CartProvider is required");
  return c;
};
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]),
    [loaded, setLoaded] = useState(false),
    [opened, setOpened] = useState(false),
    [stage, setStage] = useState<"cart" | "checkout" | "success">("cart"),
    [toast, setToast] = useState("");
  const [name, setName] = useState(""),
    [phoneValue, setPhone] = useState(""),
    [comment, setComment] = useState(""),
    [mode, setMode] = useState("takeaway"),
    [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const dialog = useRef<HTMLDialogElement>(null),
    title = useRef<HTMLHeadingElement>(null),
    returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || "null");
      if (parsed?.version === 1 && Array.isArray(parsed.items)) {
        const valid = new Map<string, number>();
        for (const item of parsed.items) {
          if (
            item &&
            typeof item.id === "string" &&
            menu.some((p) => p.id === item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0
          )
            valid.set(item.id, Math.min(99, item.quantity));
        }
        setItems(Array.from(valid, ([id, quantity]) => ({ id, quantity })));
      }
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) {
      try {
        localStorage.setItem(KEY, JSON.stringify({ version: 1, items }));
      } catch {}
    }
  }, [items, loaded]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);
  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (opened) {
      returnFocus.current = document.activeElement as HTMLElement;
      el.showModal();
      document.body.style.overflow = "hidden";
    } else {
      el.close();
      document.body.style.overflow = "";
      returnFocus.current?.focus({ preventScroll: true });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);
  useEffect(() => {
    if (opened) title.current?.focus({ preventScroll: true });
  }, [stage, opened]);
  const close = () => {
    setOpened(false);
    setName("");
    setPhone("");
    setComment("");
    setErrors({});
    setMode("takeaway");
    setStage("cart");
  };
  const count = items.reduce((s, i) => s + i.quantity, 0),
    total = items.reduce(
      (s, i) => s + menu.find((p) => p.id === i.id)!.price * i.quantity,
      0,
    );
  const add = (id: string, quantity = 1) => {
    const p = menu.find((p) => p.id === id);
    if (!p || !Number.isInteger(quantity) || quantity < 1) return;
    setItems((old) => {
      const existing = old.find((i) => i.id === id);
      return existing
        ? old.map((i) =>
            i.id === id
              ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
              : i,
          )
        : [...old, { id, quantity: Math.min(99, quantity) }];
    });
    setToast(`${p.name} — в корзине`);
  };
  const change = (id: string, n: number) =>
    setItems((old) =>
      old.flatMap((i) =>
        i.id !== id ? [i] : n > 0 ? [{ ...i, quantity: Math.min(99, n) }] : [],
      ),
    );
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const digits = phoneValue.replace(/\D/g, "");
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) next.name = "Введите имя — минимум 2 символа.";
    if (
      !/^[+\d\s()\-]+$/.test(phoneValue) ||
      !/^([78]\d{10}|9\d{9})$/.test(digits)
    )
      next.phone = "Введите российский номер: +7 и ещё 10 цифр.";
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() =>
        document
          .getElementById(next.name ? "order-name" : "order-phone")
          ?.focus(),
      );
      return;
    }
    setName("");
    setPhone("");
    setComment("");
    setItems([]);
    setStage("success");
  };
  return (
    <CartContext.Provider
      value={{
        items,
        count,
        add,
        open: () => {
          setStage("cart");
          setOpened(true);
        },
      }}
    >
      {children}
      <div
        className={`toast ${toast ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Icon name="check" />
            {toast}
          </>
        )}
      </div>
      <dialog
        ref={dialog}
        className="cart-dialog"
        aria-labelledby="cart-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (
            e.target === dialog.current &&
            e.clientX < dialog.current!.getBoundingClientRect().left
          )
            close();
        }}
      >
        <div className="drawer-inner">
          <div className="drawer-head">
            <div>
              <span className="eyebrow">COFFEE BREAK / ДЕМО</span>
              <h2 id="cart-title" ref={title} tabIndex={-1}>
                {stage === "cart"
                  ? "Ваша пауза"
                  : stage === "checkout"
                    ? "Демо-предзаказ"
                    : "Готово к знакомству"}
              </h2>
            </div>
            <button
              className="icon-button"
              onClick={close}
              aria-label="Закрыть корзину"
            >
              <Icon name="close" />
            </button>
          </div>
          {stage === "cart" &&
            (items.length ? (
              <>
                <div className="cart-toolbar">
                  <span>{count} шт.</span>
                  <button className="text-button" onClick={() => setItems([])}>
                    Очистить корзину
                  </button>
                </div>
                <div className="cart-items">
                  {items.map((item) => {
                    const p = menu.find((p) => p.id === item.id)!;
                    return (
                      <div className="cart-item" key={p.id}>
                        <ProductPhoto photo={p.photo} name={p.name} />
                        <div className="cart-item-info">
                          <Link href={`/menu/${p.id}/`} onClick={close}>
                            {p.name}
                          </Link>
                          <small>
                            {p.volume} · {money(p.price)} / шт.
                          </small>
                          <div className="cart-item-controls">
                            <div className="quantity">
                              <button
                                onClick={() => change(p.id, item.quantity - 1)}
                                aria-label={`Уменьшить количество: ${p.name}`}
                              >
                                <Icon name="minus" width="16" />
                              </button>
                              <output aria-label={`Количество: ${p.name}`}>
                                {item.quantity}
                              </output>
                              <button
                                disabled={item.quantity >= 99}
                                onClick={() => change(p.id, item.quantity + 1)}
                                aria-label={`Увеличить количество: ${p.name}`}
                              >
                                <Icon name="plus" width="16" />
                              </button>
                            </div>
                            <strong>{money(p.price * item.quantity)}</strong>
                          </div>
                        </div>
                        <button
                          className="remove-button"
                          onClick={() => change(p.id, 0)}
                          aria-label={`Удалить: ${p.name}`}
                        >
                          <Icon name="trash" width="18" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-bottom">
                  <div className="total">
                    <span>Итого</span>
                    <strong data-testid="cart-total">{money(total)}</strong>
                  </div>
                  <p className="fineprint">
                    Только демонстрация. Оплаты и передачи заказа в кофейню нет.
                  </p>
                  <button
                    className="button primary full"
                    onClick={() => setStage("checkout")}
                  >
                    Оформить демо-предзаказ <Icon name="arrow" />
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <Icon name="bag" width="76" height="76" />
                <h3>Начнём с кофе?</h3>
                <p>
                  Выберите напиток или пачку зерна — здесь появится ваша
                  кофейная пауза.
                </p>
                <Link href="/menu/" className="button primary" onClick={close}>
                  Посмотреть меню <Icon name="arrow" />
                </Link>
              </div>
            ))}
          {stage === "checkout" && (
            <form className="checkout" onSubmit={submit} noValidate>
              <button
                type="button"
                className="text-button back-button"
                onClick={() => {
                  setStage("cart");
                  setName("");
                  setPhone("");
                  setComment("");
                  setErrors({});
                }}
              >
                ← Вернуться к корзине
              </button>
              <div className="demo-note">
                <Icon name="cup" />
                <p>
                  Попробуйте, как мог бы выглядеть предзаказ. Данные никуда не
                  отправляются.
                </p>
              </div>
              <label htmlFor="order-name">
                Ваше имя <span aria-hidden="true">*</span>
              </label>
              <input
                id="order-name"
                autoComplete="off"
                maxLength={60}
                placeholder="Как к вам обращаться?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="field-error" id="name-error" role="alert">
                  {errors.name}
                </p>
              )}
              <label htmlFor="order-phone">
                Телефон <span aria-hidden="true">*</span>
              </label>
              <input
                id="order-phone"
                type="tel"
                inputMode="tel"
                autoComplete="off"
                maxLength={25}
                placeholder="+7 (___) ___-__-__"
                value={phoneValue}
                onChange={(e) => setPhone(e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone && (
                <p className="field-error" id="phone-error" role="alert">
                  {errors.phone}
                </p>
              )}
              <fieldset>
                <legend>
                  Как возьмёте? <small>Демо-варианты</small>
                </legend>
                <div className="mode-choice">
                  <label>
                    <input
                      type="radio"
                      name="mode"
                      value="takeaway"
                      checked={mode === "takeaway"}
                      onChange={() => setMode("takeaway")}
                    />
                    С собой
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="mode"
                      value="here"
                      checked={mode === "here"}
                      onChange={() => setMode("here")}
                    />
                    На месте
                  </label>
                </div>
              </fieldset>
              <label htmlFor="order-comment">
                Комментарий <small>Необязательно</small>
              </label>
              <textarea
                id="order-comment"
                rows={3}
                maxLength={400}
                placeholder="Здесь могло бы быть ваше пожелание"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <p className="fineprint">
                Время получения — по договорённости с кофейней. Этот сценарий не
                проверяет наличие и готовность.
              </p>
              <div className="total">
                <span>Демо-сумма</span>
                <strong>{money(total)}</strong>
              </div>
              <button type="submit" className="button primary full">
                Завершить демонстрацию <Icon name="arrow" />
              </button>
              <p className="fineprint">
                Без оплаты. Имя и телефон очищаются при закрытии формы.
              </p>
            </form>
          )}
          {stage === "success" && (
            <div className="success-panel">
              <div className="success-mark">
                <Icon name="check" width="44" height="44" />
              </div>
              <h3>
                Вы попробовали
                <br />
                демо-предзаказ.
              </h3>
              <p>
                Это демонстрация. Заказ не отправлен в кофейню, оплата не
                списана.
              </p>
              <p>
                Для настоящего заказа позвоните по телефону{" "}
                <a href={phoneHref}>{phone}</a>.
              </p>
              <a className="button primary full" href={phoneHref}>
                <Icon name="phone" />
                Позвонить в кофейню
              </a>
              <button className="text-button" onClick={close}>
                Вернуться на сайт
              </button>
            </div>
          )}
        </div>
      </dialog>
    </CartContext.Provider>
  );
}
export function AddButton({
  id,
  quantity = 1,
  compact = false,
}: {
  id: string;
  quantity?: number;
  compact?: boolean;
}) {
  const { add } = useCart();
  const p = menu.find((i) => i.id === id)!;
  return (
    <button
      className={compact ? "add-button" : "button primary"}
      onClick={() => add(id, quantity)}
      aria-label={`В корзину: ${p.name}`}
    >
      {!compact && "В демо-корзину"}
      <Icon name="plus" width="21" />
    </button>
  );
}
export function CartButton() {
  const cart = useCart();
  return (
    <button
      className="cart-button"
      onClick={cart.open}
      aria-label={`Открыть корзину, товаров: ${cart.count}`}
    >
      <Icon name="bag" />
      <span className="cart-label">Корзина</span>
      <span className="cart-count" data-testid="cart-count">
        {cart.count}
      </span>
    </button>
  );
}
