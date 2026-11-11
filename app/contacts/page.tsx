import type { Metadata } from "next";
import { MapCard, PageIntro } from "@/components/shared";
import { Icon } from "@/components/icons";
import { address, phone, phoneHref, routeUrl, mapsUrl } from "@/lib/business";
const faq = [
  [
    "Где находится кофейня?",
    "Москва, улица Полярная, дом 1. Откройте Яндекс Карты по ссылке на этой странице, чтобы посмотреть точное расположение и построить маршрут.",
  ],
  [
    "Можно ли с собакой?",
    "Да, в предоставленной карточке указано, что в кофейню можно с животными.",
  ],
  [
    "Можно ли посидеть с ноутбуком?",
    "Да, по данным карточки — можно. Кофейня компактная: около 1–3 столиков, поэтому свободное место лучше уточнить перед визитом.",
  ],
  [
    "Есть ли доставка?",
    "По предоставленной карточке доставка по умолчанию отсутствует. Подтверждённых условий доставки и интеграций с сервисами нет.",
  ],
  [
    "Можно ли заказать заранее?",
    "В карточке упоминается предзаказ онлайн, но действующая схема не подтверждена. Корзина на этом сайте — только демонстрация; она не передаёт заказы. Чтобы договориться о настоящем заказе, позвоните в кофейню.",
  ],
  [
    "Есть ли завтраки и выпечка?",
    "Завтраки упомянуты в карточке, выпечка видна на фото. Точный ассортимент, цены и наличие уточняйте по телефону.",
  ],
  [
    "Как можно оплатить?",
    "По предоставленным данным: наличными, банковской картой или QR-кодом на месте. Оплаты на демонстрационном сайте нет.",
  ],
  [
    "Есть ли скидочная карта и парковка?",
    "В карточке упомянуты скидочная карта и бесплатная парковка. Условия программы и парковки не предоставлены — уточните их в кофейне.",
  ],
];
export const metadata: Metadata = {
  title: "Контакты и маршрут",
  description:
    "Кофе-брейк: Москва, ул. Полярная, 1. Телефон +7 (906) 764-14-70. График, маршрут, ответы на вопросы. Демонстрационная концепция.",
};
export default function ContactsPage() {
  return (
    <>
      <PageIntro
        eyebrow="ДО ХОРОШЕЙ ПАУЗЫ — ОДИН МАРШРУТ"
        title="Встретимся на Полярной."
      >
        <p>
          Забегайте за кофе с собой.
          <br />
          Или останьтесь на пару глотков.
        </p>
      </PageIntro>
      <section className="container contacts-main">
        <div className="contact-information">
          <div className="contact-row">
            <Icon name="pin" />
            <div>
              <span className="eyebrow">АДРЕС</span>
              <h2>{address}</h2>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Посмотреть на Яндекс Картах ↗
              </a>
            </div>
          </div>
          <div className="contact-row">
            <Icon name="clock" />
            <div>
              <span className="eyebrow">ВРЕМЯ ДЛЯ КОФЕ</span>
              <h3>Ежедневно 08:00–21:00</h3>
              <p>
                Часы работы стоит уточнить перед посещением. На фото вывески
                указан другой график.
              </p>
            </div>
          </div>
          <div className="contact-row">
            <Icon name="phone" />
            <div>
              <span className="eyebrow">ПОЗВОНИТЬ</span>
              <a className="contact-phone" href={phoneHref}>
                {phone}
              </a>
              <p>Уточнить наличие, состав напитка или договориться о заказе.</p>
            </div>
          </div>
          <a
            className="button primary"
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Построить маршрут <Icon name="arrow" />
          </a>
        </div>
        <MapCard />
      </section>
      <section className="container contact-facts">
        <div>
          <span>01 / ФОРМАТ</span>
          <h3>
            Кофе с собой.
            <br />И немного места для паузы.
          </h3>
          <p>Около 1–3 столиков. Можно с питомцем и ноутбуком.</p>
        </div>
        <div>
          <span>02 / СРЕДНИЙ ЧЕК</span>
          <h3>200–400 ₽</h3>
          <p>
            По данным предоставленной карточки. Фактическая сумма зависит от
            выбора.
          </p>
        </div>
        <div>
          <span>03 / ОПЛАТА НА МЕСТЕ</span>
          <h3>
            Карта. Наличные.
            <br />
            QR-код.
          </h3>
          <p>Способы оплаты указаны в карточке заведения.</p>
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <span className="eyebrow">ПЕРЕД ТЕМ КАК ЗАГЛЯНУТЬ</span>
          <h2>
            Пара вопросов
            <br />
            за чашкой кофе.
          </h2>
          <div className="rating-note">
            <strong>
              4,9 <span>★</span>
            </strong>
            <p>
              122 оценки — из предоставленной карточки Яндекс Карт. Данные не
              обновляются автоматически.
            </p>
          </div>
        </div>
        <div className="faq-list">
          {faq.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Icon name="plus" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="container source-box">
        <Icon name="clock" />
        <p>
          Сведения на сайте предоставлены пользователем по карточке Яндекс Карт
          и фотографиям кофейни. Цены, часы, условия и ассортимент могут
          меняться. Эта демонстрационная концепция не является официальным
          сайтом.
        </p>
      </div>
    </>
  );
}
