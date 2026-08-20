"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { AdminCategory, CategoryStatus } from "@/lib/types/admin";
import type { CategoryInput } from "@/lib/api/admin/categories";
import { ApiError } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";
import TextField from "@/components/ui/TextField";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ImageUploadTile from "./ImageUploadTile";

export default function CategoryForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: AdminCategory;
  onSubmit: (data: CategoryInput) => Promise<unknown>;
  submitLabel: string;
}) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.show);
  const isEdit = Boolean(initialValues);

  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [image, setImage] = useState(initialValues?.image ?? "");
  const [order, setOrder] = useState(String(initialValues?.order ?? 0));
  const [status, setStatus] = useState<CategoryStatus>(initialValues?.status ?? "ACTIVE");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        name,
        description: description || undefined,
        image: image || undefined,
        status,
        order: Number(order) || 0,
      });
      showToast(isEdit ? "Category updated successfully." : "Category created successfully.");
      router.push("/admin/categories");
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
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-espresso">Image</label>
        <ImageUploadTile value={image} onChange={setImage} onRemove={() => setImage("")} folder="categories" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Display order"
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as CategoryStatus)}>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </Select>
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <div className="mt-2 flex gap-3">
        <Button type="submit" variant="filled" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/categories")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
