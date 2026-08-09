import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Leaf, HeartHandshake, ShieldCheck } from "lucide-react";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/repositories/products";
import { categories } from "@/data/categories";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import RatingStars from "@/components/ui/RatingStars";
import ImageGallery from "@/components/product/ImageGallery";
import ProductPurchasePanel from "@/components/product/ProductPurchasePanel";
import ProductGrid from "@/components/shop/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Brown Nation Chocolates`,
    description: product.shortDescription,
  };
}

const usps = [
  { icon: Leaf, label: "Premium Ingredients" },
  { icon: HeartHandshake, label: "Handcrafted" },
  { icon: ShieldCheck, label: "No Preservatives" },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.categoryId);
  const related = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          ...(category ? [{ label: category.name, href: `/shop/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <ImageGallery images={product.images} alt={product.name} />

        <div className="flex flex-col gap-5">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-espresso">{product.name}</h1>
            <div className="mt-2">
              <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
            </div>
          </div>

          <p className="text-sm sm:text-base text-espresso/70 leading-relaxed">{product.shortDescription}</p>

          <ProductPurchasePanel product={product} />

          <div className="grid grid-cols-3 gap-3 border-t border-brand-100 pt-5">
            {usps.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
                <span className="text-[11px] font-medium text-espresso/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="font-serif text-lg font-semibold text-espresso">Description</h2>
          <p className="mt-3 text-sm text-espresso/70 leading-relaxed">{product.description}</p>
        </div>
        <div>
          <h2 className="font-serif text-lg font-semibold text-espresso">Ingredients</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {product.ingredients.map((ingredient) => (
              <li key={ingredient} className="flex items-center gap-2 text-sm text-espresso/70">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <SectionHeading title="You May Also Like" />
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
