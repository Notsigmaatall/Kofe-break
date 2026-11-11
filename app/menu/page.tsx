import type { Metadata } from "next";
import { PageIntro } from "@/components/shared";
import { MenuCatalog } from "@/components/menu-catalog";
export const metadata: Metadata = {
  title: "Меню",
  description:
    "28 позиций в 10 категориях: кофе, авторские рафы, чай, лимонады и зерно. Точные цены из предоставленного меню. Демонстрационная концепция.",
};
export default function MenuPage() {
  return (
    <>
      <PageIntro eyebrow="ВЫБЕРИТЕ ПАУЗУ ПО ВКУСУ" title="Сегодня — какой?">
        <p>
          Привычный капучино, раф с характером или что-то прохладное.
          <br />
          Все 28 поводов заглянуть — здесь.
        </p>
        <span className="intro-sticker">
          28 ПОЗИЦИЙ
          <br />
          10 КАТЕГОРИЙ
        </span>
      </PageIntro>
      <MenuCatalog />
    </>
  );
}
