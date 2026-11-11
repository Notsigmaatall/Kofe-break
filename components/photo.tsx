"use client";
import { useState } from "react";
import type { PhotoId } from "@/lib/menu";
import { Icon } from "./icons";
const photos: Record<PhotoId, number> = {
  cappuccino: 0,
  latte: 1,
  raf: 2,
  "iced-latte": 3,
  bumble: 4,
  tonic: 5,
  espresso: 6,
  tea: 7,
  lemonade: 8,
  smoothie: 9,
  chocolate: 10,
  beans: 11,
};
export function ProductPhoto({
  photo,
  name,
  className = "",
}: {
  photo: PhotoId;
  name: string;
  className?: string;
}) {
  const index = photos[photo];
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`product-photo ${className}`}
      role="img"
      aria-label={`${name} — демонстрационная визуализация`}
    >
      {!failed ? (
        <div className="sprite-window">
          <img
            src="/images/products.webp"
            loading="lazy"
            alt=""
            onError={() => setFailed(true)}
            style={{
              width: "400%",
              height: "300%",
              maxWidth: "none",
              position: "absolute",
              left: `-${(index % 4) * 100}%`,
              top: `-${Math.floor(index / 4) * 100}%`,
            }}
          />
        </div>
      ) : (
        <span className="photo-fallback">
          <Icon
            name={photo === "beans" ? "bean" : "cup"}
            width="60"
            height="60"
          />
          <span>Демонстрационная визуализация</span>
        </span>
      )}
    </div>
  );
}
export function HeroPhoto({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`hero-photo photo-fallback ${className}`}>
      <Icon name="cup" width="160" height="160" />
      <span>Демонстрационная визуализация</span>
    </div>
  ) : (
    <img
      className={`hero-photo ${className}`}
      src="/images/hero.webp"
      alt="Стакан кофе с собой на тёмной стойке — демонстрационная визуализация"
      width="1536"
      height="1024"
      fetchPriority="high"
      onError={() => setFailed(true)}
    />
  );
}
