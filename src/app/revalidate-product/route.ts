import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// A product's page fetch is cached for up to a minute (see publicFetch), so a
// rating submitted from the order page wouldn't show up on the product page
// right away. This lets the client force that page fresh immediately after.
export async function POST(request: Request) {
  const { slug } = (await request.json().catch(() => ({}))) as { slug?: string };

  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ revalidated: false }, { status: 400 });
  }

  revalidatePath(`/product/${slug}`);
  return NextResponse.json({ revalidated: true });
}
