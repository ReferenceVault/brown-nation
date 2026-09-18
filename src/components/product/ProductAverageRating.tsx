"use client";

import StarRating from "@/components/ui/StarRating";
import { useProductRating } from "@/lib/context/productRatingContext";

export default function ProductAverageRating() {
  const { average } = useProductRating();
  return <StarRating rating={average} />;
}
