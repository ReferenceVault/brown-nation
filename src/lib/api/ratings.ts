import { apiFetch } from "./client";

export type MyRating = {
  myRating: number | null;
  canRate: boolean;
};

export function getMyRating(productId: string) {
  return apiFetch<MyRating>(`/products/${productId}/ratings/me`);
}

export function submitRating(productId: string, rating: number) {
  return apiFetch<{ rating: number }>(`/products/${productId}/ratings`, {
    method: "POST",
    body: { rating },
  });
}
