"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

type CartState = {
  items: CartLine[];
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, variantId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === productId && item.variantId === variantId
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId && item.variantId === variantId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { productId, variantId, quantity }] };
        }),
      updateQuantity: (productId, variantId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (item) => !(item.productId === productId && item.variantId === variantId)
                )
              : state.items.map((item) =>
                  item.productId === productId && item.variantId === variantId
                    ? { ...item, quantity }
                    : item
                ),
        })),
      removeItem: (productId, variantId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.variantId === variantId)
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "brown-nation-cart" }
  )
);
