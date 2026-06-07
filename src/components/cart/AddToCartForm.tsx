"use client";

import { useMemo, useState } from "react";
import { useCart } from "./CartProvider";
import type { ProductVariant } from "@/types/shopify";
import { formatPrice } from "@/types/shopify";

type AddToCartFormProps = {
  variants: ProductVariant[];
};

export function AddToCartForm({ variants }: AddToCartFormProps) {
  const { addToCart, isPending } = useCart();
  const availableVariants = variants.filter((variant) => variant.availableForSale);
  const [selectedVariantId, setSelectedVariantId] = useState(
    availableVariants[0]?.id ?? variants[0]?.id ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const selectedVariant = useMemo(
    () => variants.find((variant) => variant.id === selectedVariantId),
    [variants, selectedVariantId],
  );

  const canPurchase = Boolean(selectedVariant?.availableForSale);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!selectedVariantId || !canPurchase) {
      setError("This item is currently unavailable.");
      return;
    }

    try {
      await addToCart(selectedVariantId, quantity);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to add item to cart.",
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      {variants.length > 1 && (
        <div className="mb-6">
          <label
            htmlFor="variant"
            className="mb-2 block text-[11px] tracking-[0.2em] uppercase"
          >
            Variant
          </label>
          <select
            id="variant"
            value={selectedVariantId}
            onChange={(event) => setSelectedVariantId(event.target.value)}
            className="w-full border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-black"
          >
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.title} — {formatPrice(variant.price)}
                {!variant.availableForSale ? " (Sold out)" : ""}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mb-6 flex items-center gap-4">
        <label
          htmlFor="quantity"
          className="text-[11px] tracking-[0.2em] uppercase"
        >
          Quantity
        </label>
        <div className="flex items-center border border-neutral-300">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="px-3 py-2 text-sm transition-opacity hover:opacity-60"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(event) =>
              setQuantity(Math.max(1, Number(event.target.value) || 1))
            }
            className="w-12 border-x border-neutral-300 py-2 text-center text-sm outline-none"
          />
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((current) => current + 1)}
            className="px-3 py-2 text-sm transition-opacity hover:opacity-60"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={!canPurchase || isPending}
        className="w-full bg-black py-4 text-[11px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPending ? "Adding..." : canPurchase ? "Add to Cart" : "Sold Out"}
      </button>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </form>
  );
}
