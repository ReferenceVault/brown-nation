"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type RatingSummary = { average: number; count: number };

type ProductRatingState = RatingSummary & {
  /**
   * Recomputes the average locally right after a submission, so the display
   * updates instantly instead of waiting on the next full page fetch.
   * `previousRating` is the user's prior rating for this product, if any —
   * pass null when they're rating it for the first time.
   */
  applyRating: (newRating: number, previousRating: number | null) => void;
};

const ProductRatingContext = createContext<ProductRatingState | null>(null);

export function ProductRatingProvider({
  initialAverage,
  initialCount,
  children,
}: {
  initialAverage: number;
  initialCount: number;
  children: ReactNode;
}) {
  const [summary, setSummary] = useState<RatingSummary>({
    average: initialAverage,
    count: initialCount,
  });

  const applyRating = (newRating: number, previousRating: number | null) => {
    setSummary(({ average, count }) => {
      if (previousRating === null) {
        const nextCount = count + 1;
        return { average: (average * count + newRating) / nextCount, count: nextCount };
      }
      if (count === 0) return { average: newRating, count: 1 };
      return { average: (average * count - previousRating + newRating) / count, count };
    });
  };

  const value = useMemo(() => ({ ...summary, applyRating }), [summary]);

  return <ProductRatingContext.Provider value={value}>{children}</ProductRatingContext.Provider>;
}

export function useProductRating() {
  const context = useContext(ProductRatingContext);
  if (!context) {
    throw new Error("useProductRating must be used within a ProductRatingProvider");
  }
  return context;
}
