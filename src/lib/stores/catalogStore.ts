"use client";

import { create } from "zustand";
import type { Product, Category } from "@/lib/types/catalog";
import { fetchAllProducts } from "@/lib/api/public/products";
import { fetchAllCategories } from "@/lib/api/public/categories";

type CatalogStatus = "idle" | "loading" | "loaded" | "error";

type CatalogState = {
  products: Product[];
  categories: Category[];
  status: CatalogStatus;
  init: () => Promise<void>;
};

// Client-side cache of the full catalog, fetched once from the real API so
// components that need synchronous product/category lookups (cart, header
// nav, home sections) don't each re-fetch. Server components fetch directly
// via lib/api/public instead of going through this store.
let inFlight: Promise<void> | null = null;

export const useCatalogStore = create<CatalogState>((set, get) => ({
  products: [],
  categories: [],
  status: "idle",
  init: () => {
    const status = get().status;
    if (status === "loaded" || status === "loading") return inFlight ?? Promise.resolve();

    set({ status: "loading" });
    inFlight = (async () => {
      try {
        const [products, categories] = await Promise.all([fetchAllProducts(), fetchAllCategories()]);
        set({ products, categories, status: "loaded" });
      } catch (error) {
        console.error("Failed to load catalog from API:", error);
        set({ status: "error" });
      } finally {
        inFlight = null;
      }
    })();
    return inFlight;
  },
}));
