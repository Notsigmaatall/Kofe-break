import Link from "next/link";
import type { Product } from "@/lib/menu";
import { money } from "@/lib/menu";
import { AddButton } from "./cart";
import { ProductPhoto } from "./photo";
export function ProductCard({
  product: p,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <article className="product-card" data-product-id={p.id}>
      <Link
        href={`/menu/${p.id}/`}
        className="product-image-link"
        aria-label={`Подробнее: ${p.name}`}
      >
        <ProductPhoto photo={p.photo} name={p.name} />
        {p.category === "signature" && (
          <span className="product-badge">Авторский</span>
        )}
        {p.category === "beans" && (
          <span className="product-badge bean-badge">
            {["01", "02", "03"][index % 3]} / ЗЕРНО
          </span>
        )}
      </Link>
      <div className="product-meta">
        <span>{p.volume}</span>
        {p.temperature === "cold" && <span>Холодный</span>}
      </div>
      <Link className="product-name" href={`/menu/${p.id}/`}>
        {p.name}
      </Link>
      <div className="product-bottom">
        <span className="product-price">{money(p.price)}</span>
        <AddButton id={p.id} compact />
      </div>
    </article>
  );
}
