import { storefrontRequest } from "../client";
import { CART_FRAGMENT } from "../fragments/cart";
import type { Cart } from "@/types/shopify";

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

type CartUserError = {
  field: string[] | null;
  message: string;
};

function throwOnUserErrors(
  userErrors: CartUserError[],
  fallback: string,
): void {
  if (userErrors.length > 0) {
    throw new Error(userErrors[0]?.message ?? fallback);
  }
}

const CART_CREATE_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const data = await storefrontRequest<{
    cartCreate: { cart: Cart | null; userErrors: CartUserError[] };
  }>(CART_CREATE_MUTATION, {
    input: { lines },
  });

  throwOnUserErrors(data.cartCreate.userErrors, "Failed to create cart");

  if (!data.cartCreate.cart) {
    throw new Error("Failed to create cart");
  }

  return data.cartCreate.cart;
}

const CART_LINES_ADD_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function addCartLines(
  cartId: string,
  lines: CartLineInput[],
): Promise<Cart> {
  const data = await storefrontRequest<{
    cartLinesAdd: { cart: Cart | null; userErrors: CartUserError[] };
  }>(CART_LINES_ADD_MUTATION, { cartId, lines });

  throwOnUserErrors(data.cartLinesAdd.userErrors, "Failed to add item to cart");

  if (!data.cartLinesAdd.cart) {
    throw new Error("Failed to add item to cart");
  }

  return data.cartLinesAdd.cart;
}

const CART_LINES_UPDATE_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>,
): Promise<Cart> {
  const data = await storefrontRequest<{
    cartLinesUpdate: { cart: Cart | null; userErrors: CartUserError[] };
  }>(CART_LINES_UPDATE_MUTATION, { cartId, lines });

  throwOnUserErrors(
    data.cartLinesUpdate.userErrors,
    "Failed to update cart item",
  );

  if (!data.cartLinesUpdate.cart) {
    throw new Error("Failed to update cart item");
  }

  return data.cartLinesUpdate.cart;
}

const CART_LINES_REMOVE_MUTATION = `
  ${CART_FRAGMENT}

  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function removeCartLines(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const data = await storefrontRequest<{
    cartLinesRemove: { cart: Cart | null; userErrors: CartUserError[] };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds });

  throwOnUserErrors(
    data.cartLinesRemove.userErrors,
    "Failed to remove cart item",
  );

  if (!data.cartLinesRemove.cart) {
    throw new Error("Failed to remove cart item");
  }

  return data.cartLinesRemove.cart;
}
