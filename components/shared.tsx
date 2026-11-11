import Link from "next/link";
import { Icon, CupDoodle } from "./icons";
import { address, mapsUrl, routeUrl, phone, phoneHref } from "@/lib/business";
export function Marquee() {
  return (
    <div
      className="brand-strip"
      aria-label="Кофе с собой. Хороший повод остановиться."
    >
      <div>
        <span>КОФЕ С СОБОЙ</span>
        <Icon name="bean" />
        <span>ХОРОШИЙ ПОВОД ОСТАНОВИТЬСЯ</span>
        <Icon name="bean" />
        <span>COFFEE BREAK</span>
        <Icon name="bean" />
        <span>КОФЕ С СОБОЙ</span>
      </div>
    </div>
  );
}
export function MapCard() {
  return (
    <div className="map-card">
      <div
        className="map-illustration"
        aria-label="Схема расположения на Полярной улице — откройте точную карту по ссылке"
      >
        <div className="map-block block-a" />
        <div className="map-block block-b" />
        <div className="map-block block-c" />
        <div className="map-block block-d" />
        <span className="street street-horizontal">ПРОЕЗД ДЕЖНЁВА</span>
        <span className="street street-vertical">ПОЛЯРНАЯ УЛИЦА</span>
        <span className="map-park">ЗЕЛЁНЫЙ РАЙОН</span>
        <div className="map-marker">
          <Icon name="cup" width="32" height="32" />
          <span>
            COFFEE BREAK
            <br />
            <small>Полярная, 1</small>
          </span>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-open"
        >
          Открыть Яндекс Карты <span>↗</span>
        </a>
        <span className="map-caption">Схема расположения · не в масштабе</span>
      </div>
    </div>
  );
}
export function VisitSection() {
  return (
    <section className="section visit-section">
      <div className="container visit-grid">
        <div className="visit-copy">
          <span className="eyebrow">МЫ РЯДОМ</span>
          <h2>
            Увидимся
            <br />
            на Полярной.
          </h2>
          <p>
            Загляните по пути. За привычным кофе
            <br className="desktop-break" /> или за новым любимым вкусом.
          </p>
          <div className="visit-details">
            <p>
              <Icon name="pin" />
              {address}
            </p>
            <p>
              <Icon name="clock" />
              Каждый день, 08:00–21:00*
            </p>
            <a href={phoneHref}>
              <Icon name="phone" />
              {phone}
            </a>
          </div>
          <a
            href={routeUrl}
            className="button primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Построить маршрут <Icon name="arrow" />
          </a>
          <small className="fineprint">
            * Часы работы уточняйте перед посещением.
          </small>
        </div>
        <MapCard />
      </div>
    </section>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro container">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      {children && <div className="intro-description">{children}</div>}
    </div>
  );
}
export function CoffeeBanner() {
  return (
    <section className="coffee-banner">
      <div className="container coffee-banner-inner">
        <div>
          <span className="eyebrow">ВАША ПАУЗА УЖЕ БЛИЗКО</span>
          <h2>
            Есть минутка?
            <br />
            Есть кофе.
          </h2>
          <Link href="/menu/" className="button light">
            Выбрать свой напиток <Icon name="arrow" />
          </Link>
        </div>
        <CupDoodle className="banner-doodle" />
      </div>
    </section>
  );
}
