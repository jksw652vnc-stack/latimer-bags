"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/types/shopify";

export function CartDrawer() {
  const { cart, isOpen, isPending, closeCart, updateQuantity, removeLine } =
    useCart();

  if (!isOpen) return null;

  const lines = cart?.lines.nodes ?? [];

  return (
    <>
      <button
        type="button"
        aria-label="Close cart"
        className="fixed inset-0 z-[60] bg-black/40"
        onClick={closeCart}
      />

      <aside
        className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="font-serif text-xl tracking-[0.15em] uppercase">
            Cart
            {cart && cart.totalQuantity > 0 ? ` (${cart.totalQuantity})` : ""}
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeCart}
            className="text-2xl leading-none transition-opacity hover:opacity-60"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="text-sm text-neutral-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-6">
              {lines.map((line) => {
                const image = line.merchandise.product.featuredImage;

                return (
                  <li
                    key={line.id}
                    className="flex gap-4 border-b border-neutral-100 pb-6 last:border-b-0"
                  >
                    <Link
                      href={`/products/${line.merchandise.product.handle}`}
                      onClick={closeCart}
                      className="image-cover-container relative block h-28 w-24 shrink-0 bg-neutral-100"
                    >
                      {image && (
                        <Image
                          src={image.url}
                          alt={image.altText ?? line.merchandise.product.title}
                          fill
                          className="object-cover object-top"
                          sizes="96px"
                        />
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/products/${line.merchandise.product.handle}`}
                        onClick={closeCart}
                        className="text-[11px] tracking-[0.1em] uppercase hover:opacity-60"
                      >
                        {line.merchandise.product.title}
                      </Link>
                      {line.merchandise.title !== "Default Title" && (
                        <p className="mt-1 text-xs text-neutral-500">
                          {line.merchandise.title}
                        </p>
                      )}
                      <p className="mt-2 text-sm">
                        {formatPrice(line.merchandise.price)}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center border border-neutral-300">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            disabled={isPending}
                            onClick={() =>
                              void updateQuantity(line.id, line.quantity - 1)
                            }
                            className="px-3 py-1.5 text-sm transition-opacity hover:opacity-60 disabled:opacity-40"
                          >
                            −
                          </button>
                          <span className="min-w-8 text-center text-sm">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            disabled={isPending}
                            onClick={() =>
                              void updateQuantity(line.id, line.quantity + 1)
                            }
                            className="px-3 py-1.5 text-sm transition-opacity hover:opacity-60 disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          disabled={isPending}
                          onClick={() => void removeLine(line.id)}
                          className="text-xs text-neutral-500 underline-offset-2 hover:underline disabled:opacity-40"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-neutral-200 px-6 py-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="tracking-wide uppercase">Subtotal</span>
            <span>
              {cart
                ? formatPrice(cart.cost.subtotalAmount)
                : formatPrice({ amount: "0", currencyCode: "GBP" })}
            </span>
          </div>
          <p className="mb-4 text-xs text-neutral-500">
            Shipping and taxes calculated at checkout.
          </p>
          {cart?.checkoutUrl && lines.length > 0 ? (
            <a
              href={cart.checkoutUrl}
              className="block w-full bg-black py-4 text-center text-[11px] tracking-[0.2em] text-white uppercase transition-opacity hover:opacity-80"
            >
              Checkout
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="block w-full bg-neutral-300 py-4 text-center text-[11px] tracking-[0.2em] text-neutral-500 uppercase"
            >
              Checkout
            </button>
          )}
          <button
            type="button"
            onClick={closeCart}
            className="mt-4 w-full py-2 text-sm text-neutral-500 transition-opacity hover:opacity-60"
          >
            Continue shopping
          </button>
        </div>
      </aside>
    </>
  );
}
