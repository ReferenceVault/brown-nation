import type { Product } from "@/lib/types/catalog";
import ProductGridCard from "./ProductGridCard";
import EmptyState from "@/components/ui/EmptyState";
import { PackageSearch } from "lucide-react";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="Try a different category or check back soon — we're always adding new flavors."
        actionLabel="View All Products"
        actionHref="/shop"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductGridCard key={product.id} product={product} />
      ))}
    </div>
  );
}
