"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { AdminPromoBanner, PromoBannerStatus } from "@/lib/types/admin";
import type { PromoBannerInput } from "@/lib/api/admin/promoBanners";
import { ApiError } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";
import TextField from "@/components/ui/TextField";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ImageUploadTile from "./ImageUploadTile";

export default function PromoBannerForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: AdminPromoBanner;
  onSubmit: (data: PromoBannerInput) => Promise<unknown>;
  submitLabel: string;
}) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.show);
  const isEdit = Boolean(initialValues);

  const [eyebrow, setEyebrow] = useState(initialValues?.eyebrow ?? "BIG CHOCOLATE SAVINGS");
  const [heading, setHeading] = useState(initialValues?.heading ?? "Get 15% OFF on your order");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [couponCode, setCouponCode] = useState(initialValues?.couponCode ?? "");
  const [ctaLabel, setCtaLabel] = useState(initialValues?.ctaLabel ?? "Shop Now");
  const [ctaHref, setCtaHref] = useState(initialValues?.ctaHref ?? "/shop");
  const [image, setImage] = useState(initialValues?.image ?? "");
  const [order, setOrder] = useState(String(initialValues?.order ?? 0));
  const [status, setStatus] = useState<PromoBannerStatus>(initialValues?.status ?? "ACTIVE");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        eyebrow,
        heading,
        description,
        couponCode: couponCode.trim() || undefined,
        ctaLabel,
        ctaHref,
        image: image || undefined,
        order: Number(order) || 0,
        status,
      });
      showToast(isEdit ? "Promo banner updated successfully." : "Promo banner created successfully.");
      router.push("/admin/promo-banners");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-espresso">Image (optional)</label>
        <ImageUploadTile value={image} onChange={setImage} onRemove={() => setImage("")} folder="promo-banners" />
      </div>

      <TextField
        label="Eyebrow"
        required
        placeholder="BIG CHOCOLATE SAVINGS"
        value={eyebrow}
        onChange={(e) => setEyebrow(e.target.value)}
      />
      <TextField
        label="Heading"
        required
        placeholder="Get 15% OFF on your order"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />
      <Textarea
        label="Description"
        rows={3}
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Coupon code (optional)"
          placeholder="SWEET15"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
        />
        <TextField label="Button text" required value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} />
        <TextField label="Button link" required value={ctaHref} onChange={(e) => setCtaHref(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Display order"
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as PromoBannerStatus)}
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </Select>
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <div className="mt-2 flex gap-3">
        <Button type="submit" variant="filled" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/promo-banners")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
