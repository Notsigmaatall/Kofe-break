"use client";
import { useState } from "react";
import { AddButton } from "./cart";
import { Icon } from "./icons";
export function DetailActions({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="detail-actions">
      <div className="quantity large">
        <button
          disabled={quantity <= 1}
          aria-label="Уменьшить количество"
          onClick={() => setQuantity((n) => n - 1)}
        >
          <Icon name="minus" />
        </button>
        <output aria-label="Количество для добавления">{quantity}</output>
        <button
          disabled={quantity >= 99}
          aria-label="Увеличить количество"
          onClick={() => setQuantity((n) => n + 1)}
        >
          <Icon name="plus" />
        </button>
      </div>
      <AddButton id={id} quantity={quantity} />
    </div>
  );
}
