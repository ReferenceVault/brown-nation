import { ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import ImagePlaceholder from "./ImagePlaceholder";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-shrink-0 w-[250px] sm:w-[270px] items-center gap-3 rounded-xl bg-white p-2.5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <ImagePlaceholder
        from={product.thumbFrom}
        to={product.thumbTo}
        label="Chocolate"
        className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-lg transition-transform duration-300 group-hover:scale-[1.03]"
      />

      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-sm font-semibold text-espresso leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-brand-600 font-bold">₹{product.price}</p>

        <button className="mt-1 inline-flex w-fit items-center justify-center gap-1.5 rounded-md border border-brand-300 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors duration-300 hover:bg-brand-500 hover:text-white cursor-pointer">
          Add to Cart
          <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
