"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductById } from "@/lib/repositories/products";
import { useCatalogStore } from "@/lib/stores/catalogStore";

export type CartLine = {
  productId: string;
  quantity: number;
};

function isValidLine(item: CartLine): boolean {
  return Boolean(getProductById(item.productId));
}

type CartState = {
  items: CartLine[];
  addItem: (productId: string, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.productId === productId);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
              ),
            };
          }
          return { items: [...state.items, { productId, quantity }] };
        }),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.productId !== productId)
              : state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "brown-nation-cart" }
  )
);

// Drop cart lines left over from a previous catalog (e.g. a product that was renamed
// or removed) so the header badge and cart drawer never disagree about what's in the cart.
// Product data now comes from the API via catalogStore, so pruning has to wait until
// that fetch resolves — otherwise every line looks "invalid" before data arrives.
if (typeof window !== "undefined") {
  const tryPrune = () => {
    if (useCatalogStore.getState().status !== "loaded") return;
    if (!useCartStore.persist.hasHydrated()) return;
    const state = useCartStore.getState();
    const validItems = state.items.filter(isValidLine);
    if (validItems.length !== state.items.length) {
      useCartStore.setState({ items: validItems });
    }
  };

  useCartStore.persist.onFinishHydration(tryPrune);
  useCatalogStore.subscribe(tryPrune);
  tryPrune();
}
