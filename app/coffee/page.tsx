import type { Metadata } from "next";
import Link from "next/link";
import { beans, menu } from "@/lib/menu";
import { ProductCard } from "@/components/product-card";
import { ProductPhoto } from "@/components/photo";
import { Icon } from "@/components/icons";
import { CoffeeBanner, PageIntro } from "@/components/shared";
import { phoneHref } from "@/lib/business";
export const metadata: Metadata = {
  title: "Зерно и авторский кофе",
  description:
    "Гондурас Сан-Маркос, Эфиопия Лиму и Кения Рука Чуи — зерновой кофе по 250 г. Авторские рафы из меню «Кофе-брейк». Демонстрация.",
};
export default function CoffeePage() {
  return (
    <>
      <PageIntro
        eyebrow="ПРОДОЛЖИТЕ КОФЕЙНУЮ ПАУЗУ"
        title="Хорошие привычки. В зёрнах."
      >
        <p>
          За кофе можно зайти по пути.
          <br />А можно взять целую пачку пауз домой.
        </p>
      </PageIntro>
      <section className="container beans-page-section">
        <div className="product-grid beans-grid">
          {beans.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <p className="image-note">
          Демонстрационные изображения упаковок. Названия, вес и цены — из
          предоставленного меню; наличие уточняйте.
        </p>
        <div className="bean-guide">
          <div>
            <span className="eyebrow">НЕ НУЖНО РАЗБИРАТЬСЯ ВО ВСЁМ</span>
            <h2>
              Начните с того,
              <br />
              как вы любите кофе.
            </h2>
          </div>
          <div className="guide-steps">
            <div>
              <span>01</span>
              <div>
                <h3>Расскажите, как готовите</h3>
                <p>
                  Турка, воронка или домашняя кофемашина — обсудите свой способ
                  с бариста.
                </p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <h3>Уточните детали пачки</h3>
                <p>
                  Дату обжарки, обработку и вкусовой профиль конкретной партии
                  лучше узнать перед покупкой.
                </p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <h3>Спросите про помол</h3>
                <p>
                  Возможность помола и актуальное наличие нужно подтвердить в
                  кофейне.
                </p>
              </div>
            </div>
          </div>
        </div>
        <a href={phoneHref} className="button outline">
          <Icon name="phone" />
          Уточнить наличие зерна
        </a>
      </section>
      <section className="section signature-collection">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">А ЕСЛИ ХОЧЕТСЯ КОФЕ ПРЯМО СЕЙЧАС</span>
              <h2>Шесть авторских поводов.</h2>
            </div>
            <Link href="/menu/?category=signature" className="text-link">
              В меню <Icon name="arrow" />
            </Link>
          </div>
          <div className="signature-editorial">
            <ProductPhoto photo="raf" name="Авторский раф" />
            <div>
              <h3>
                С халвой?
                <br />
                Сырный?
                <br />
                <span>Почему бы и да.</span>
              </h3>
              <p>
                Выбирайте по названию и настроению. Точную рецептуру, сладость и
                аллергены уточняйте у бариста.
              </p>
            </div>
          </div>
          <div className="product-grid signature-products">
            {menu
              .filter((p) => p.category === "signature")
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
          <p className="image-note">
            Все изображения напитков — демонстрационные визуализации.
          </p>
        </div>
      </section>
      <CoffeeBanner />
    </>
  );
}
