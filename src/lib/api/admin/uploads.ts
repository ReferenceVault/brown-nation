import { apiFetch } from "../client";

export type UploadFolder = "products" | "categories" | "hero";

export function uploadImage(folder: UploadFolder, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return apiFetch<{ url: string }>(`/uploads/${folder}`, { method: "POST", body: formData });
}
