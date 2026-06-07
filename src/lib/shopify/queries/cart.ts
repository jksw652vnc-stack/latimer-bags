import { storefrontRequest } from "../client";
import { CART_FRAGMENT } from "../fragments/cart";
import type { Cart } from "@/types/shopify";

const GET_CART_QUERY = `
  ${CART_FRAGMENT}

  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
`;

export async function getCartById(cartId: string): Promise<Cart | null> {
  const data = await storefrontRequest<{ cart: Cart | null }>(GET_CART_QUERY, {
    cartId,
  });

  return data.cart;
}
