"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

type RatingSummary = { average: number; count: number };

const ProductRatingContext = createContext<RatingSummary | null>(null);

export function ProductRatingProvider({
  initialAverage,
  initialCount,
  children,
}: {
  initialAverage: number;
  initialCount: number;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ average: initialAverage, count: initialCount }),
    [initialAverage, initialCount]
  );

  return <ProductRatingContext.Provider value={value}>{children}</ProductRatingContext.Provider>;
}

export function useProductRating() {
  const context = useContext(ProductRatingContext);
  if (!context) {
    throw new Error("useProductRating must be used within a ProductRatingProvider");
  }
  return context;
}
