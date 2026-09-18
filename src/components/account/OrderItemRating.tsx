"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAsync } from "@/lib/hooks/useAsync";
import { useToastStore } from "@/lib/stores/toastStore";
import { getMyRating, submitRating } from "@/lib/api/ratings";
import { ApiError } from "@/lib/api/errors";
import { revalidateProductRatingViews } from "@/lib/actions/revalidateProduct";
import StarRatingInput from "@/components/product/StarRatingInput";

export default function OrderItemRating({
  productId,
  productName,
  productSlug,
  productImage,
}: {
  productId: string;
  productName: string;
  productSlug: string | null;
  productImage: string | null;
}) {
  const showToast = useToastStore((state) => state.show);
  const [submitting, setSubmitting] = useState(false);
  const [localRating, setLocalRating] = useState<number | null>(null);

  const { data, loading } = useAsync(() => getMyRating(productId), [productId]);

  if (loading || !data || !data.canRate) return null;

  const displayRating = localRating ?? data.myRating ?? 0;

  const handleRate = async (rating: number) => {
    const previous = localRating ?? data.myRating ?? null;
    setLocalRating(rating);
    setSubmitting(true);
    try {
      await submitRating(productId, rating);
      showToast("Thanks for rating this product!");
      if (productSlug) {
        await revalidateProductRatingViews(productSlug).catch((err) => {
          console.error("Failed to revalidate product rating views", err);
        });
      }
    } catch (err) {
      setLocalRating(previous);
      showToast(err instanceof ApiError ? err.message : "Couldn't submit your rating.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const thumbnail = (
    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-brand-50">
      {productImage && (
        <Image src={productImage} alt={productName} fill sizes="56px" className="object-cover" />
      )}
    </div>
  );

  return (
    <div className="flex items-center gap-3 py-3">
      {productSlug ? (
        <Link href={`/product/${productSlug}`} className="shrink-0">
          {thumbnail}
        </Link>
      ) : (
        thumbnail
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-espresso">{productName}</p>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-espresso/50">
          {data.myRating ? "Your rating" : "Rate this product"}
        </p>
      </div>
      <StarRatingInput value={displayRating} onChange={handleRate} disabled={submitting} />
    </div>
  );
}
