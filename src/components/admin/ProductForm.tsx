"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { AdminCategory, AdminProduct, ProductStatus } from "@/lib/types/admin";
import type { ProductInput } from "@/lib/api/admin/products";
import { ApiError } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";
import TextField from "@/components/ui/TextField";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ImageUploadListInput from "./ImageUploadListInput";

const STATUSES: ProductStatus[] = ["DRAFT", "ACTIVE", "ARCHIVED"];

export default function ProductForm({
  categories,
  initialValues,
  onSubmit,
  submitLabel,
}: {
  categories: AdminCategory[];
  initialValues?: AdminProduct;
  onSubmit: (data: ProductInput) => Promise<unknown>;
  submitLabel: string;
}) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.show);
  const isEdit = Boolean(initialValues);

  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [price, setPrice] = useState(initialValues?.price ?? "");
  const [sku, setSku] = useState(initialValues?.sku ?? "");
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId ?? categories[0]?.id ?? "");
  const [status, setStatus] = useState<ProductStatus>(initialValues?.status ?? "DRAFT");
  const [stockQuantity, setStockQuantity] = useState(String(initialValues?.stockQuantity ?? 0));
  const [images, setImages] = useState<string[]>(initialValues?.images ?? []);
  const [isBestSeller, setIsBestSeller] = useState(initialValues?.isBestSeller ?? false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!categoryId) {
      setError("Select a category.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        name,
        description,
        price: Number(price),
        sku,
        categoryId,
        status,
        stockQuantity: Number(stockQuantity),
        images: images.map((url) => url.trim()).filter(Boolean),
        isBestSeller,
      });
      showToast(isEdit ? "Product updated successfully." : "Product created successfully.");
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField label="Name" required value={name} onChange={(e) => setName(e.target.value)} />
      <Textarea
        label="Description"
        required
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Price (₹)"
          type="number"
          min="0"
          step="0.01"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Stock quantity"
          type="number"
          min="0"
          step="1"
          required
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextField label="SKU" required value={sku} onChange={(e) => setSku(e.target.value)} />
        <Select
          label="Category"
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as ProductStatus)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0) + s.slice(1).toLowerCase()}
            </option>
          ))}
        </Select>
      </div>

      <label className="flex w-fit items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={isBestSeller}
          onChange={(e) => setIsBestSeller(e.target.checked)}
          className="h-4 w-4 cursor-pointer rounded border-brand-300 text-brand-500 focus:ring-brand-400"
        />
        <span className="text-sm font-medium text-espresso">Show in Best Sellers</span>
      </label>

      <ImageUploadListInput label="Images" value={images} onChange={setImages} folder="products" />

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <div className="mt-2 flex gap-3">
        <Button type="submit" variant="filled" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
