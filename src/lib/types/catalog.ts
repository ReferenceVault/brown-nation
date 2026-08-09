export type ProductVariant = {
  id: string;
  label: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  categoryId: string;
  tags: string[];
  ingredients: string[];
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isFeatured?: boolean;
  variants: ProductVariant[];
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  heroImage: string;
};
