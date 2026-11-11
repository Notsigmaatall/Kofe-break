import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, CoffeeBanner } from "@/components/shared";
import { HeroPhoto } from "@/components/photo";
import { Icon } from "@/components/icons";
export const metadata: Metadata = {
  title: "О кофейне",
  description:
    "Небольшая городская кофейня на Полярной, 1: кофе с собой, несколько столиков, можно с питомцем и ноутбуком. Демонстрационная концепция.",
};
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="КОФЕ-БРЕЙК · МОСКВА"
        title="Место маленькое. Пауза — ваша."
      >
        <p>
          Не нужно особого повода.
          <br />
          Достаточно оказаться рядом и захотеть кофе.
        </p>
      </PageIntro>
      <section className="container about-story">
        <div className="storefront-visual">
          <img
            src="/images/storefront.svg"
            alt="Авторская иллюстрация компактного фасада с полосатым козырьком и надписью COFFEE BREAK по мотивам предоставленных фотографий"
            width="1000"
            height="760"
          />
          <span>Иллюстрация по мотивам реальной витрины</span>
        </div>
        <div className="about-copy">
          <span className="eyebrow">СВОЯ КОФЕЙНЯ НА РАЙОНЕ</span>
          <h2>
            Кофе.
            <br />
            Пара минут.
            <br />И снова в город.
          </h2>
          <p>
            «Кофе-брейк» — компактная кофейня на Полярной улице. На фотографиях
            — светлая вывеска, полосатый козырёк, рисунки на чёрной витрине и
            неоновая чашка в окне.
          </p>
          <p>
            Внутри немного места: около 1–3 столиков. Можно взять напиток с
            собой или сделать короткую остановку. В меню — классический и
            авторский кофе, чай, прохладные напитки и зерно для дома.
          </p>
          <Link href="/contacts/" className="text-link">
            Заглянуть к нам <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <section className="about-facts">
        <div className="container">
          <div className="section-heading">
            <h2>Пауза без лишних условий.</h2>
            <span className="eyebrow">ПО ДАННЫМ КАРТОЧКИ ЗАВЕДЕНИЯ</span>
          </div>
          <div className="perks">
            <div>
              <Icon name="dog" />
              <h3>С питомцем</h3>
              <p>Можно зайти с четвероногим другом.</p>
            </div>
            <div>
              <Icon name="laptop" />
              <h3>С ноутбуком</h3>
              <p>
                Можно, но свободных мест немного. Уточните наличие перед
                визитом.
              </p>
            </div>
            <div>
              <Icon name="cup" />
              <h3>С собой</h3>
              <p>Возьмите привычный напиток и продолжайте свой маршрут.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              ДЕТАЛИ, ИЗ КОТОРЫХ СКЛАДЫВАЕТСЯ НАСТРОЕНИЕ
            </span>
            <h2>Витрина. Неон. Кофе.</h2>
          </div>
        </div>
        <div className="atmosphere-gallery">
          <figure>
            <HeroPhoto />
            <figcaption>
              Кофе по пути<span>Демонстрационная визуализация</span>
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/neon.svg"
              width="660"
              height="760"
              loading="lazy"
              alt="Синяя неоновая чашка и оранжевая надпись — авторская демонстрационная иллюстрация по мотивам окна кофейни"
            />
            <figcaption>
              Свет, который узнаёшь<span>Демонстрационная иллюстрация</span>
            </figcaption>
          </figure>
          <figure>
            <img
              src="/images/chalkboard.svg"
              width="660"
              height="760"
              loading="lazy"
              alt="Белые рисунки чашки и кофейных зёрен на чёрной панели — демонстрационная иллюстрация"
            />
            <figcaption>
              Рисунки на чёрном<span>Демонстрационная иллюстрация</span>
            </figcaption>
          </figure>
        </div>
        <p className="image-note">
          Визуальные материалы этой концепции созданы для демо. Это не
          фотографии интерьера, блюд или гостей реальной кофейни. Оригинальные
          фото можно добавить после согласования.
        </p>
      </section>
      <section className="container breakfast-note">
        <div>
          <span className="eyebrow">А ЧТО К КОФЕ?</span>
          <h2>
            Про завтраки —<br />
            лучше у бариста.
          </h2>
        </div>
        <div>
          <p>
            В карточке кофейни упомянуты завтраки, а на фотографиях видна
            выпечка. Актуальный ассортимент еды, цены и наличие не предоставлены
            — уточните их по телефону.
          </p>
          <Link href="/contacts/" className="text-link">
            Контакты кофейни <Icon name="arrow" />
          </Link>
        </div>
      </section>
      <CoffeeBanner />
    </>
  );
}
