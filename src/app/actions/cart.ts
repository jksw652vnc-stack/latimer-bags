"use server";

import {
  clearCartIdCookie,
  getCartIdFromCookie,
  setCartIdCookie,
} from "@/lib/cart/cookies";
import {
  addCartLines,
  createCart,
  removeCartLines,
  updateCartLines,
} from "@/lib/shopify/mutations/cart";
import { getCartById } from "@/lib/shopify/queries/cart";
import type { Cart } from "@/types/shopify";

export async function fetchCart(): Promise<Cart | null> {
  const cartId = await getCartIdFromCookie();
  if (!cartId) return null;

  const cart = await getCartById(cartId);
  if (!cart) {
    await clearCartIdCookie();
    return null;
  }

  return cart;
}

export async function addToCart(
  variantId: string,
  quantity = 1,
): Promise<Cart> {
  const cartId = await getCartIdFromCookie();

  if (!cartId) {
    const cart = await createCart([{ merchandiseId: variantId, quantity }]);
    await setCartIdCookie(cart.id);
    return cart;
  }

  try {
    const cart = await addCartLines(cartId, [
      { merchandiseId: variantId, quantity },
    ]);
    await setCartIdCookie(cart.id);
    return cart;
  } catch {
    const cart = await createCart([{ merchandiseId: variantId, quantity }]);
    await setCartIdCookie(cart.id);
    return cart;
  }
}

export async function updateCartLineQuantity(
  lineId: string,
  quantity: number,
): Promise<Cart | null> {
  const cartId = await getCartIdFromCookie();
  if (!cartId) return null;

  if (quantity <= 0) {
    return removeFromCart(lineId);
  }

  const cart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
  await setCartIdCookie(cart.id);
  return cart;
}

export async function removeFromCart(lineId: string): Promise<Cart | null> {
  const cartId = await getCartIdFromCookie();
  if (!cartId) return null;

  const cart = await removeCartLines(cartId, [lineId]);
  await setCartIdCookie(cart.id);
  return cart;
}
