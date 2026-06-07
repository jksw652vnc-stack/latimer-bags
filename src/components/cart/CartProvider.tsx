"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  addToCart as addToCartAction,
  fetchCart,
  removeFromCart as removeFromCartAction,
  updateCartLineQuantity,
} from "@/app/actions/cart";
import type { Cart } from "@/types/shopify";
import { CartDrawer } from "./CartDrawer";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  isPending: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const refreshCart = useCallback(async () => {
    const nextCart = await fetchCart();
    setCart(nextCart);
  }, []);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setIsPending(true);
    try {
      const nextCart = await addToCartAction(variantId, quantity);
      setCart(nextCart);
      setIsOpen(true);
    } finally {
      setIsPending(false);
    }
  }, []);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    setIsPending(true);
    try {
      const nextCart = await updateCartLineQuantity(lineId, quantity);
      setCart(nextCart);
    } finally {
      setIsPending(false);
    }
  }, []);

  const removeLine = useCallback(async (lineId: string) => {
    setIsPending(true);
    try {
      const nextCart = await removeFromCartAction(lineId);
      setCart(nextCart);
    } finally {
      setIsPending(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      isPending,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addToCart,
      updateQuantity,
      removeLine,
      refreshCart,
    }),
    [cart, isOpen, isPending, addToCart, updateQuantity, removeLine, refreshCart],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
