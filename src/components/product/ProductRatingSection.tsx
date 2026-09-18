"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/stores/authStore";
import { useAsync } from "@/lib/hooks/useAsync";
import { useToastStore } from "@/lib/stores/toastStore";
import { useProductRating } from "@/lib/context/productRatingContext";
import { getMyRating, submitRating } from "@/lib/api/ratings";
import { ApiError } from "@/lib/api/errors";
import StarRatingInput from "./StarRatingInput";

export default function ProductRatingSection({ productId }: { productId: string }) {
  const currentUser = useAuthStore((state) => state.currentUser);
  const showToast = useToastStore((state) => state.show);
  const { applyRating } = useProductRating();
  const [submitting, setSubmitting] = useState(false);
  const [localRating, setLocalRating] = useState<number | null>(null);

  const { data, loading } = useAsync(
    () => (currentUser ? getMyRating(productId) : Promise.resolve(null)),
    [productId, currentUser?.id]
  );

  if (!currentUser) {
    return (
      <p className="text-sm text-espresso/60">
        <Link href="/login" className="font-semibold text-brand-600 hover:underline">
          Log in
        </Link>{" "}
        to rate this product.
      </p>
    );
  }

  if (loading || !data) return null;

  if (!data.canRate) {
    return (
      <p className="text-sm text-espresso/60">
        Only customers who&apos;ve purchased this product can rate it.
      </p>
    );
  }

  const displayRating = localRating ?? data.myRating ?? 0;

  const handleRate = async (rating: number) => {
    const previous = localRating ?? data.myRating ?? null;
    setLocalRating(rating);
    setSubmitting(true);
    try {
      await submitRating(productId, rating);
      applyRating(rating, previous);
      showToast("Thanks for rating this product!");
    } catch (err) {
      setLocalRating(previous);
      showToast(err instanceof ApiError ? err.message : "Couldn't submit your rating.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-semibold uppercase tracking-wide text-espresso/60">
        {data.myRating ? "Your rating" : "Rate this product"}
      </p>
      <StarRatingInput value={displayRating} onChange={handleRate} disabled={submitting} />
    </div>
  );
}
