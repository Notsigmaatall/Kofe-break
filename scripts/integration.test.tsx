import React from "react";
import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import {
  render,
  screen,
  within,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartProvider, CartButton, AddButton } from "../components/cart";
import { MenuCatalog } from "../components/menu-catalog";
import { ProductPhoto } from "../components/photo";
const user = () => userEvent.setup();
const amount = (node: HTMLElement) =>
  Number(node.textContent!.replace(/\D/g, ""));
const openCart = async () => {
  await user().click(screen.getByRole("button", { name: /Открыть корзину/ }));
  return within(screen.getByRole("dialog"));
};
function Basket() {
  return (
    <CartProvider>
      <CartButton />
      <AddButton id="cappuccino" />
      <AddButton id="iced-latte" />
      <AddButton id="honduras-san-marcos" />
    </CartProvider>
  );
}
afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.replaceState(null, "", "/");
});
test("basket adds distinct products, changes quantities, removes items and clears with correct sums", async () => {
  const u = user();
  render(<Basket />);
  await u.click(screen.getByRole("button", { name: "В корзину: Капучино" }));
  await u.click(screen.getByRole("button", { name: "В корзину: Капучино" }));
  await u.click(screen.getByRole("button", { name: "В корзину: Айс-латте" }));
  await u.click(
    screen.getByRole("button", { name: "В корзину: Гондурас Сан-Маркос" }),
  );
  assert.equal(screen.getByTestId("cart-count").textContent, "4");
  const cart = await openCart();
  assert.equal(amount(cart.getByTestId("cart-total")), 1460);
  await u.click(
    cart.getByRole("button", { name: "Уменьшить количество: Капучино" }),
  );
  assert.equal(amount(cart.getByTestId("cart-total")), 1260);
  await u.click(
    cart.getByRole("button", { name: "Увеличить количество: Айс-латте" }),
  );
  assert.equal(amount(cart.getByTestId("cart-total")), 1520);
  await u.click(
    cart.getByRole("button", { name: "Удалить: Гондурас Сан-Маркос" }),
  );
  assert.equal(amount(cart.getByTestId("cart-total")), 720);
  await u.click(cart.getByRole("button", { name: "Очистить корзину" }));
  assert.ok(cart.getByText("Начнём с кофе?"));
  assert.equal(screen.getByTestId("cart-count").textContent, "0");
});
test("saved basket ignores unknown IDs and invalid counts and caps large quantities", async () => {
  localStorage.setItem(
    "coffee-break-cart-v1",
    JSON.stringify({
      version: 1,
      items: [
        { id: "cappuccino", quantity: 2 },
        { id: "does-not-exist", quantity: 5 },
        { id: "latte", quantity: -1 },
        { id: "iced-latte", quantity: 999 },
        { id: "latte", quantity: "3" },
      ],
    }),
  );
  render(<Basket />);
  await waitFor(() =>
    assert.equal(screen.getByTestId("cart-count").textContent, "101"),
  );
  const cart = await openCart();
  assert.equal(amount(cart.getByTestId("cart-total")), 26140);
  assert.equal(
    (
      cart.getByRole("button", {
        name: "Увеличить количество: Айс-латте",
      }) as HTMLButtonElement
    ).disabled,
    true,
  );
});
test("corrupt saved JSON recovers to an empty usable basket", async () => {
  localStorage.setItem("coffee-break-cart-v1", "{broken-json");
  render(<Basket />);
  assert.equal(screen.getByTestId("cart-count").textContent, "0");
  await user().click(
    screen.getByRole("button", { name: "В корзину: Капучино" }),
  );
  const cart = await openCart();
  assert.equal(amount(cart.getByTestId("cart-total")), 200);
});
test("checkout validates required fields and phone; successful demo sends no requests and retains no personal fields", async () => {
  const u = user();
  render(<Basket />);
  await u.click(screen.getByRole("button", { name: "В корзину: Капучино" }));
  const cart = await openCart();
  await u.click(cart.getByRole("button", { name: /Оформить демо-предзаказ/ }));
  await u.click(cart.getByRole("button", { name: /Завершить демонстрацию/ }));
  assert.equal(cart.getAllByRole("alert").length, 2);
  await u.type(cart.getByLabelText(/Ваше имя/), "Тест");
  await u.type(cart.getByLabelText(/^Телефон/), "123");
  await u.click(cart.getByRole("button", { name: /Завершить демонстрацию/ }));
  assert.equal(cart.getAllByRole("alert").length, 1);
  assert.ok(cart.getByText(/Введите российский номер/));
  await u.clear(cart.getByLabelText(/^Телефон/));
  await u.type(cart.getByLabelText(/^Телефон/), "+7 (999) 123-45-67");
  await u.type(cart.getByLabelText(/^Комментарий/), "Только проверка");
  await u.click(cart.getByRole("radio", { name: "На месте" }));
  const original = globalThis.fetch;
  let requests = 0;
  globalThis.fetch = async () => {
    requests++;
    throw new Error("Unexpected network request in demo");
  };
  try {
    await u.click(cart.getByRole("button", { name: /Завершить демонстрацию/ }));
    assert.ok(
      cart.getByText(
        "Это демонстрация. Заказ не отправлен в кофейню, оплата не списана.",
      ),
    );
    assert.equal(requests, 0);
    assert.equal(screen.getByTestId("cart-count").textContent, "0");
    const stored = localStorage.getItem("coffee-break-cart-v1")!;
    assert.deepEqual(JSON.parse(stored), { version: 1, items: [] });
    assert.equal(stored.includes("Тест"), false);
    assert.equal(stored.includes("999"), false);
  } finally {
    globalThis.fetch = original;
  }
});
test("closing or returning from checkout clears entered personal information", async () => {
  const u = user();
  render(<Basket />);
  await u.click(screen.getByRole("button", { name: "В корзину: Капучино" }));
  let cart = await openCart();
  await u.click(cart.getByRole("button", { name: /Оформить демо-предзаказ/ }));
  await u.type(cart.getByLabelText(/Ваше имя/), "Тест");
  await u.type(cart.getByLabelText(/^Телефон/), "+7 (999) 123-45-67");
  await u.click(cart.getByRole("button", { name: "Закрыть корзину" }));
  cart = await openCart();
  await u.click(cart.getByRole("button", { name: /Оформить демо-предзаказ/ }));
  assert.equal((cart.getByLabelText(/Ваше имя/) as HTMLInputElement).value, "");
  assert.equal((cart.getByLabelText(/^Телефон/) as HTMLInputElement).value, "");
  await u.type(cart.getByLabelText(/Ваше имя/), "Тест");
  await u.click(cart.getByRole("button", { name: /Вернуться к корзине/ }));
  await u.click(cart.getByRole("button", { name: /Оформить демо-предзаказ/ }));
  assert.equal((cart.getByLabelText(/Ваше имя/) as HTMLInputElement).value, "");
});
test("menu has 28 items and search, category, temperature, reset and sorting work together", async () => {
  const u = user();
  render(
    <CartProvider>
      <MenuCatalog />
    </CartProvider>,
  );
  assert.equal(screen.getAllByRole("article").length, 28);
  await u.click(screen.getByRole("button", { name: /Авторский кофе/ }));
  assert.equal(screen.getAllByRole("article").length, 6);
  await u.type(screen.getByRole("searchbox", { name: "Найти в меню" }), "халв");
  assert.equal(screen.getAllByRole("article").length, 1);
  assert.ok(screen.getByRole("link", { name: "Раф с халвой" }));
  await u.clear(screen.getByRole("searchbox"));
  await u.type(screen.getByRole("searchbox"), "zzzzzz");
  assert.equal(screen.queryAllByRole("article").length, 0);
  assert.ok(screen.getByText("Пока ничего не нашлось"));
  await u.click(screen.getByRole("button", { name: /Показать всё меню/ }));
  assert.equal(screen.getAllByRole("article").length, 28);
  await u.click(screen.getByRole("button", { name: "Холодный" }));
  assert.equal(screen.getAllByRole("article").length, 9);
  await u.click(screen.getByRole("button", { name: "Любой" }));
  await u.click(screen.getByRole("button", { name: /Кофе зерновой/ }));
  assert.equal(screen.getAllByRole("article").length, 3);
  await u.selectOptions(
    screen.getByRole("combobox", { name: "Сортировка меню" }),
    "price-desc",
  );
  assert.ok(
    within(screen.getAllByRole("article")[0]).getByRole("link", {
      name: "Кения Рука Чуи",
    }),
  );
  await u.click(screen.getByRole("button", { name: /Сбросить фильтры/ }));
  await u.type(screen.getByRole("searchbox"), "черный");
  assert.equal(screen.getAllByRole("article").length, 2);
  assert.ok(screen.getByRole("link", { name: "Чёрный персиковый" }));
});
test("category deep link opens the intended category without changing the product set", async () => {
  window.history.replaceState(null, "", "/menu/?category=signature");
  render(
    <CartProvider>
      <MenuCatalog />
    </CartProvider>,
  );
  await waitFor(() => assert.equal(screen.getAllByRole("article").length, 6));
  assert.equal(
    screen
      .getByRole("button", { name: /Авторский кофе/ })
      .getAttribute("aria-pressed"),
    "true",
  );
});
test("failed product image presents a labeled fallback", () => {
  const { container } = render(
    <ProductPhoto photo="cappuccino" name="Капучино" />,
  );
  fireEvent.error(container.querySelector("img")!);
  assert.ok(screen.getByText("Демонстрационная визуализация"));
  assert.ok(
    screen.getByRole("img", {
      name: "Капучино — демонстрационная визуализация",
    }),
  );
});
