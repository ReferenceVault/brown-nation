"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductById } from "@/lib/repositories/products";

export type CartLine = {
  productId: string;
  variantId: string;
  quantity: number;
};

function isValidLine(item: CartLine): boolean {
  const product = getProductById(item.productId);
  return Boolean(product?.variants.some((variant) => variant.id === item.variantId));
}

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

// Drop cart lines left over from a previous catalog (e.g. a product that was renamed
// or removed) so the header badge and cart drawer never disagree about what's in the cart.
// Guarded to the browser since persist has no storage (and no `.persist` API) during SSR.
if (typeof window !== "undefined") {
  const pruneInvalidItems = (state: CartState) => {
    const validItems = state.items.filter(isValidLine);
    if (validItems.length !== state.items.length) {
      useCartStore.setState({ items: validItems });
    }
  };

  // localStorage reads are synchronous, so hydration may already be done by the
  // time this module finishes evaluating  in which case onFinishHydration would
  // never fire since the event already happened.
  if (useCartStore.persist.hasHydrated()) {
    pruneInvalidItems(useCartStore.getState());
  } else {
    useCartStore.persist.onFinishHydration(pruneInvalidItems);
  }
}
