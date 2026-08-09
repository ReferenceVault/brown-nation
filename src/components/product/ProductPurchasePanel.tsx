"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/types/catalog";
import { useCartStore } from "@/lib/stores/cartStore";
import PriceTag from "@/components/ui/PriceTag";
import QuantityStepper from "@/components/ui/QuantityStepper";
import Button from "@/components/ui/Button";

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const outOfStock = variant.stock <= 0;

  const handleAddToCart = () => {
    addItem(product.id, variant.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(product.id, variant.id, quantity);
    router.push("/cart");
  };

  return (
    <div className="flex flex-col gap-5">
      <PriceTag price={variant.price} compareAtPrice={variant.compareAtPrice} size="lg" />

      {product.variants.length > 1 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-espresso/60">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariantId(v.id)}
                disabled={v.stock <= 0}
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer ${
                  variantId === v.id
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-brand-200 text-espresso/70 hover:border-brand-400"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-espresso/60">Quantity</p>
        <QuantityStepper quantity={quantity} onChange={setQuantity} max={variant.stock} />
      </div>

      {outOfStock ? (
        <p className="text-sm font-semibold text-red-500">Currently out of stock.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={handleAddToCart}
            icon={justAdded ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            className="flex-1"
          >
            {justAdded ? "Added" : "Add to Cart"}
          </Button>
          <Button variant="filled" onClick={handleBuyNow} className="flex-1">
            Buy Now
          </Button>
        </div>
      )}
    </div>
  );
}
