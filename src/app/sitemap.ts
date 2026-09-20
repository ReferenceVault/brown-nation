import type { MetadataRoute } from "next";
import type { Product } from "@/lib/types/catalog";
import { fetchAllCategories } from "@/lib/api/public/categories";
import { listProducts } from "@/lib/api/public/products";

const SITE_URL = "https://brownnation.in";

// Public marketing/info pages. Auth, account, admin, cart, checkout, and
// order-tracking routes are deliberately excluded — they're either
// user-specific, gated, or have nothing for search engines to index.
const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "daily", priority: 1 },
  { path: "/shop", changeFrequency: "daily", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
  { path: "/corporate-gifting", changeFrequency: "monthly", priority: 0.6 },
  { path: "/custom-orders", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.4 },
  { path: "/shipping", changeFrequency: "yearly", priority: 0.3 },
  { path: "/returns", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
  { path: "/track-order", changeFrequency: "monthly", priority: 0.3 },
];

// `listProducts` caps a single page at 100 items, so page through the full
// catalog rather than silently truncating the sitemap once it grows past that.
async function fetchAllProductPages(): Promise<Product[]> {
  const products: Product[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const { items, meta } = await listProducts({ page, limit: 100 });
    products.push(...items);
    totalPages = meta.totalPages;
    page += 1;
  } while (page <= totalPages);

  return products;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const [categories, products] = await Promise.all([
    fetchAllCategories().catch(() => []),
    fetchAllProductPages().catch(() => []),
  ]);

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/shop/${category.slug}`,
    lastModified: category.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
