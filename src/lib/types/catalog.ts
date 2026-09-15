/**
 * Mirrors the real backend API response shapes (backend/src/products, backend/src/categories).
 * Money fields are decimal strings, since Prisma's Decimal type serializes to JSON as a string.
 */

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type CategoryStatus = "ACTIVE" | "INACTIVE";

export type ProductVariant = {
  id: string;
  cavityCount: number;
  price: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string | null;
  sku: string;
  images: string[];
  contents: string[];
  categoryId: string;
  status: ProductStatus;
  stockQuantity: number;
  isBestSeller: boolean;
  minOrderQuantity: number;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  order: number;
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
};

export type HeroSlideStatus = "ACTIVE" | "INACTIVE";

export type HeroSlide = {
  id: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: string;
  paletteFrom: string;
  paletteTo: string;
  order: number;
  status: HeroSlideStatus;
  createdAt: string;
  updatedAt: string;
};

export type PromoBannerStatus = "ACTIVE" | "INACTIVE";

export type PromoBanner = {
  id: string;
  eyebrow: string;
  heading: string;
  description: string;
  couponCode: string | null;
  ctaLabel: string;
  ctaHref: string;
  image: string | null;
  order: number;
  status: PromoBannerStatus;
  createdAt: string;
  updatedAt: string;
};

export type AnnouncementStatus = "ACTIVE" | "INACTIVE";

export type Announcement = {
  id: string;
  text: string;
  linkLabel: string | null;
  linkHref: string | null;
  order: number;
  status: AnnouncementStatus;
  createdAt: string;
  updatedAt: string;
};

export type ShippingSettings = {
  id: string;
  flatFee: string;
  freeThreshold: string;
  updatedAt: string;
};
