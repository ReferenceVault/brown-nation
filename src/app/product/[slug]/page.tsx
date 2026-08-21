import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Leaf, HeartHandshake, ShieldCheck } from "lucide-react";
import { fetchAllProducts, fetchProductBySlug } from "@/lib/api/public/products";
import { fetchAllCategories } from "@/lib/api/public/categories";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ImageGallery from "@/components/product/ImageGallery";
import ProductDescription from "@/components/product/ProductDescription";
import ProductContents from "@/components/product/ProductContents";
import ProductPurchasePanel from "@/components/product/ProductPurchasePanel";
import ProductGrid from "@/components/shop/ProductGrid";
import SectionHeading from "@/components/ui/SectionHeading";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Brown Nation Chocolates`,
    description: product.description,
  };
}

const usps = [
  { icon: Leaf, label: "Premium Ingredients" },
  { icon: HeartHandshake, label: "Handcrafted" },
  { icon: ShieldCheck, label: "No Preservatives" },
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) notFound();

  const [categories, allProducts] = await Promise.all([fetchAllCategories(), fetchAllProducts()]);
  const category = categories.find((c) => c.id === product.categoryId);
  const related = allProducts
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

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
          </div>

          <ProductPurchasePanel product={product} />

          <div className="grid grid-cols-3 gap-3 border-t border-brand-100 pt-5">
            {usps.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon className="h-5 w-5 text-brand-500" strokeWidth={1.75} />
                <span className="text-[11px] font-medium text-espresso/60">{label}</span>
              </div>
            ))}
          </div>

          <ProductDescription description={product.description} />
          <ProductContents contents={product.contents} />
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
