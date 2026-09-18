"use server";

import { revalidatePath } from "next/cache";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

/**
 * Product data (including averageRating) is cached for up to a minute (see
 * publicFetch), so a rating submitted from the order page wouldn't show up
 * anywhere it's displayed until that window passed. Call this right after a
 * submission to force every page that can show the product's rating fresh —
 * its own page, the shop grid (all categories), and the home page.
 */
export async function revalidateProductRatingViews(slug: string): Promise<void> {
  if (!SLUG_PATTERN.test(slug)) return;

  revalidatePath(`/product/${slug}`);
  revalidatePath("/shop");
  revalidatePath("/shop/[category]", "page");
  revalidatePath("/");
}
