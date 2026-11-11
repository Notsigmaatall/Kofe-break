import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { menu, money, categoryName, menuSource } from "@/lib/menu";
import { ProductPhoto } from "@/components/photo";
import { DetailActions } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { Icon } from "@/components/icons";
export const dynamicParams = false;
export function generateStaticParams() {
  return menu.map((p) => ({ slug: p.id }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = menu.find((p) => p.id === slug);
  return {
    title: p
      ? `${p.name} — ${p.volume}, ${money(p.price)}`
      : "Позиция не найдена",
    description: p
      ? `${p.name}, ${p.volume}, ${money(p.price)}. ${p.description} Демонстрационное меню «Кофе-брейк».`
      : undefined,
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = menu.find((p) => p.id === slug);
  if (!p) notFound();
  const related = menu
    .filter((i) => i.id !== p.id && i.category === p.category)
    .slice(0, 3);
  return (
    <div className="container detail-page">
      <nav className="breadcrumbs" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link>
        <span>/</span>
        <Link href="/menu/">Меню</Link>
        <span>/</span>
        <span>{p.name}</span>
      </nav>
      <div className="detail-grid">
        <div>
          <ProductPhoto
            photo={p.photo}
            name={p.name}
            className="detail-photo"
          />
          <p className="image-note">
            Демонстрационная визуализация. Реальная подача и упаковка могут
            отличаться.
          </p>
        </div>
        <div className="detail-copy">
          <Link
            className="eyebrow detail-category"
            href={`/menu/?category=${p.category}`}
          >
            {categoryName(p.category)} ↗
          </Link>
          <h1>{p.name}</h1>
          <span className="volume-tag">{p.volume}</span>
          <p className="detail-description">{p.description}</p>
          <strong className="detail-price">{money(p.price)}</strong>
          <DetailActions id={p.id} />
          <div className="detail-demo">
            <Icon name="bag" />
            <p>
              Добавление в корзину — часть демонстрации. Для реального заказа
              свяжитесь с кофейней.
            </p>
          </div>
          <details className="detail-info">
            <summary>
              Состав, аллергены и наличие <Icon name="chevron" />
            </summary>
            <p>
              Точная рецептура и сведения об аллергенах не предоставлены.
              Уточните их у бариста перед покупкой. Цены и наличие могут
              меняться.
            </p>
          </details>
          <p className="fineprint">{menuSource}</p>
        </div>
      </div>
      {related.length > 0 && (
        <section className="section">
          <div className="section-heading">
            <h2>Ещё один повод для паузы.</h2>
            <Link href="/menu/" className="text-link">
              Всё меню <Icon name="arrow" />
            </Link>
          </div>
          <div className="product-grid beans-grid">
            {related.map((i) => (
              <ProductCard key={i.id} product={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
