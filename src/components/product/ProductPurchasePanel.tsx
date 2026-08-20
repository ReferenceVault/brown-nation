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
  const [quantity, setQuantity] = useState(product.minOrderQuantity);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const price = Number(product.price);
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : undefined;
  const outOfStock = product.stockQuantity <= 0;
  const priceOnRequest = price <= 0;

  const handleAddToCart = () => {
    addItem(product.id, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(product.id, quantity);
    router.push("/cart");
  };

  if (priceOnRequest) {
    return (
      <div className="flex flex-col gap-5">
        <span className="text-2xl font-bold text-brand-600">Price on request</span>
        <p className="text-sm text-espresso/70">
          This is a custom piece  reach out and we&apos;ll put together a quote for you.
        </p>
        <Button href="/contact" variant="filled" className="w-fit">
          Enquire Now
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <PriceTag price={price} compareAtPrice={compareAtPrice} size="lg" />

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-espresso/60">Quantity</p>
        <QuantityStepper
          quantity={quantity}
          onChange={setQuantity}
          min={product.minOrderQuantity}
          max={product.stockQuantity}
        />
        {product.minOrderQuantity > 1 && (
          <p className="mt-1.5 text-xs text-espresso/50">
            Minimum order quantity: {product.minOrderQuantity}
          </p>
        )}
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
