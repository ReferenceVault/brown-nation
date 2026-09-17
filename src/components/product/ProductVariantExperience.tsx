"use client";

import { useState, type ReactNode } from "react";
import type { Product } from "@/lib/types/catalog";
import ImageGallery from "./ImageGallery";
import ProductPurchasePanel from "./ProductPurchasePanel";

export default function ProductVariantExperience({
  product,
  header,
  afterPurchase,
}: {
  product: Product;
  header: ReactNode;
  afterPurchase: ReactNode;
}) {
  // undefined = the plain bar, at the product's base price.
  const [selectedVariantId, setSelectedVariantId] = useState<string | undefined>(undefined);
  const selectedVariant = product.variants?.find((v) => v.id === selectedVariantId);

  // A cavity option with no image set of its own shows blank (with alt text)
  // rather than falling back to the Bar images — the two aren't the same product shot.
  const images = selectedVariant ? (selectedVariant.image ? [selectedVariant.image] : []) : product.images;

  return (
    <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
      <ImageGallery key={selectedVariantId ?? "bar"} images={images} alt={product.name} />

      <div className="flex flex-col gap-5">
        {header}

        <ProductPurchasePanel
          product={product}
          selectedVariantId={selectedVariantId}
          onSelectVariant={setSelectedVariantId}
        />

        {afterPurchase}
      </div>
    </div>
  );
}
