"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CartButton } from "./cart";
import { Icon } from "./icons";
import { address, phone, phoneHref, mapsUrl } from "@/lib/business";
const links = [
  ["/menu/", "Меню"],
  ["/coffee/", "Зерно и кофе"],
  ["/about/", "О кофейне"],
  ["/contacts/", "Контакты"],
];
export function Logo() {
  return (
    <span className="wordmark">
      <span>COFFEE</span>
      <Icon name="bean" width="19" height="29" />
      <span>BREAK</span>
    </span>
  );
}
export function Header() {
  const path = usePathname(),
    [open, setOpen] = useState(false),
    dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  return (
    <>
      <div className="topline">
        <div className="container">
          <span>КОФЕ НА РАЙОНЕ. ПАУЗА ДЛЯ СЕБЯ.</span>
          <span>Демонстрационная концепция</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" aria-label="Кофе-брейк — главная">
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="Основная навигация">
            {links.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={path.startsWith(href) ? "active" : ""}
                aria-current={path.startsWith(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <CartButton />
            <button
              className="mobile-toggle icon-button"
              aria-label="Открыть меню"
              aria-haspopup="dialog"
              onClick={() => setOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      <dialog
        className="mobile-dialog"
        ref={dialog}
        aria-labelledby="mobile-menu-title"
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <div className="mobile-dialog-head">
          <h2 id="mobile-menu-title">Ваша кофейная пауза</h2>
          <button
            className="icon-button"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
          >
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Мобильная навигация">
          <Link href="/" onClick={() => setOpen(false)}>
            Главная <Icon name="arrow" />
          </Link>
          {links.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <Icon name="arrow" />
            </Link>
          ))}
        </nav>
        <a className="button primary" href={phoneHref}>
          <Icon name="phone" />
          {phone}
        </a>
        <p>
          {address}
          <br />
          Ежедневно 08:00–21:00*
        </p>
        <small>* Часы уточняйте перед посещением.</small>
      </dialog>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link href="/" aria-label="На главную">
              <Logo />
            </Link>
            <p>
              Сделай паузу.
              <br />
              Возьми кофе.
            </p>
          </div>
          <nav aria-label="Навигация в подвале">
            {links.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="footer-contacts">
            <a href={phoneHref}>{phone}</a>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
              {address} ↗
            </a>
            <span>Ежедневно 08:00–21:00*</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Демонстрационная концепция сайта. Не является официальным ресурсом
            кофейни. Цены, ассортимент и график уточняйте у заведения.
          </p>
          <span>COFFEE BREAK · МОСКВА</span>
        </div>
      </div>
    </footer>
  );
}
