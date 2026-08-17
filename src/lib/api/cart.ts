import { apiFetch } from "./client";

export type ServerCartItem = {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string | null;
  price: string;
  quantity: number;
  stockQuantity: number;
  lineTotal: string;
};

export type ServerCart = {
  id: string;
  items: ServerCartItem[];
  subtotal: string;
  totalItems: number;
};

export function getServerCart() {
  return apiFetch<ServerCart>("/cart");
}

export function addServerCartItem(productId: string, quantity: number) {
  return apiFetch<ServerCart>("/cart/items", { method: "POST", body: { productId, quantity } });
}

export function clearServerCart() {
  return apiFetch<ServerCart>("/cart", { method: "DELETE" });
}

/**
 * Replaces the server cart with exactly the given lines. The frontend's cart
 * (useCartStore) is local-only for instant UI, so this is what reconciles it
 * with the backend right before checkout, where order creation reads from
 * the server cart.
 */
export async function syncServerCart(lines: { productId: string; quantity: number }[]): Promise<void> {
  await clearServerCart();
  for (const line of lines) {
    await addServerCartItem(line.productId, line.quantity);
  }
}
