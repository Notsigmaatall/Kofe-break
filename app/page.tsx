import Link from "next/link";
import { featured, beans, menu, money } from "@/lib/menu";
import { Icon, CupDoodle } from "@/components/icons";
import { HeroPhoto, ProductPhoto } from "@/components/photo";
import { ProductCard } from "@/components/product-card";
import { VisitSection, Marquee } from "@/components/shared";
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="blue-dot" />
            ТВОЯ КОФЕЙНЯ НА ПОЛЯРНОЙ, 1
          </span>
          <h1>
            Сделай
            <br />
            <span className="pause-word">паузу.</span>
            <br />
            Возьми кофе.
          </h1>
          <p>
            Город подождёт пару глотков.
            <br />
            Классика, авторский кофе и маленькие
            <br className="desktop-break" /> поводы замедлиться.
          </p>
          <div className="hero-buttons">
            <Link className="button primary" href="/menu/">
              Смотреть меню <Icon name="arrow" />
            </Link>
            <Link className="button outline" href="/contacts/">
              <Icon name="pin" />
              Как нас найти
            </Link>
          </div>
          <div className="hero-foot">
            <div className="hero-rating">
              <strong>
                4,9 <span>★</span>
              </strong>
              <small>
                122 оценки
                <br />в карточке Яндекс Карт*
              </small>
            </div>
            <span className="hero-hours">
              Ежедневно
              <br />
              <strong>08:00–21:00**</strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="photo-topline">
            <span>КОФЕ С СОБОЙ. НАСТРОЕНИЕ — С ВАМИ.</span>
            <span>01 / CB</span>
          </div>
          <div className="hero-image-frame">
            <HeroPhoto />
            <div className="pause-stamp">
              <svg viewBox="0 0 140 140" aria-hidden="true">
                <defs>
                  <path id="stamp-circle" d="M70 18a52 52 0 1 1-.1 0" />
                </defs>
                <text>
                  <textPath href="#stamp-circle" startOffset="2%">
                    COFFEE BREAK · ВРЕМЯ ДЛЯ СЕБЯ ·{" "}
                  </textPath>
                </text>
                <path
                  d="M56 48v43m28-43v43"
                  stroke="currentColor"
                  strokeWidth="11"
                />
              </svg>
            </div>
            <div className="image-sticker">
              <Icon name="cup" width="28" height="28" />
              <span>
                ХОРОШИЙ КОФЕ.
                <br />
                ПРИВЫЧНЫЙ МАРШРУТ.
              </span>
            </div>
          </div>
          <div className="photo-caption">
            <span>Демонстрационная визуализация</span>
            <span>МОСКВА · ПОЛЯРНАЯ, 1 ↗</span>
          </div>
        </div>
      </section>
      <Marquee />
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">С ЧЕГО НАЧНЁМ?</span>
            <h2>На вкус — твоя пауза.</h2>
          </div>
          <Link href="/menu/" className="text-link">
            Всё меню{" "}
            <span className="round-arrow">
              <Icon name="arrow" />
            </span>
          </Link>
        </div>
        <div className="product-grid featured-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <p className="image-note">
          Изображения напитков — демонстрационные. Реальная подача может
          отличаться.
        </p>
      </section>
      <section className="signature-section">
        <div className="container signature-grid">
          <div className="signature-picture">
            <ProductPhoto photo="raf" name="Раф из авторской коллекции" />
            <span className="signature-sticker">
              ПОПРОБУЙ
              <br />
              ЧТО-ТО
              <br />
              <em>НОВОЕ.</em>
            </span>
            <span className="visual-label">Демонстрационная визуализация</span>
          </div>
          <div className="signature-copy">
            <span className="eyebrow">НЕ ТОЛЬКО ПРИВЫЧНОЕ</span>
            <h2>
              У кофе тоже
              <br />
              бывает характер.
            </h2>
            <p>
              Сегодня — классический раф. Завтра — с халвой или сырный. Найдите
              свою причину свернуть с привычного маршрута.
            </p>
            <div className="signature-list">
              {menu
                .filter((p) => p.category === "signature")
                .slice(0, 3)
                .map((p) => (
                  <Link key={p.id} href={`/menu/${p.id}/`}>
                    <span>
                      {p.name}
                      <small>{p.volume}</small>
                    </span>
                    <strong>{money(p.price)}</strong>
                    <Icon name="arrow" />
                  </Link>
                ))}
            </div>
            <Link href="/menu/?category=signature" className="button primary">
              Весь авторский кофе <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <section className="neighborhood-section">
        <div className="container">
          <div className="neighborhood-top">
            <div>
              <span className="eyebrow">МАЛЕНЬКАЯ КОФЕЙНЯ. СВОЙ РИТМ.</span>
              <h2>
                По пути.
                <br />
                По настроению.
                <br />
                <span>По-соседски.</span>
              </h2>
            </div>
            <div className="neighborhood-story">
              <CupDoodle className="neighborhood-doodle" />
              <p>
                «Кофе-брейк» — небольшая городская кофейня на Полярной. Взять
                кофе с собой или ненадолго присесть за одним из нескольких
                столиков. Для хорошей паузы много места не нужно.
              </p>
              <Link href="/about/" className="text-link light-link">
                Чуть ближе к нам <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <div className="perks">
            <div>
              <Icon name="cup" />
              <h3>В своём темпе</h3>
              <p>
                Кофе с собой
                <br />
                или короткая пауза на месте.
              </p>
            </div>
            <div>
              <Icon name="dog" />
              <h3>С четвероногим другом</h3>
              <p>
                В кофейню можно
                <br />
                заглянуть с питомцем.
              </p>
            </div>
            <div>
              <Icon name="laptop" />
              <h3>С ноутбуком — можно</h3>
              <p>
                В зале около 1–3 столиков.
                <br />
                Наличие мест уточняйте.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ПАУЗА ПРОДОЛЖАЕТСЯ ДОМА</span>
            <h2>Зерно. Для своих ритуалов.</h2>
          </div>
          <Link href="/coffee/" className="text-link">
            Выбрать зерно{" "}
            <span className="round-arrow">
              <Icon name="arrow" />
            </span>
          </Link>
        </div>
        <div className="product-grid beans-grid">
          {beans.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <p className="image-note">
          Упаковки показаны условно. Дату обжарки, профиль и наличие уточняйте у
          бариста.
        </p>
      </section>
      <VisitSection />
      <div className="source-notes container">
        <p>
          * Рейтинг 4,9 и 122 оценки — из предоставленной карточки Яндекс Карт.
          Данные не обновляются автоматически.
        </p>
        <p>
          ** По предоставленной карточке: ежедневно 08:00–21:00. На фотографиях
          указан другой график, поэтому перед визитом лучше позвонить.
        </p>
      </div>
    </>
  );
}
