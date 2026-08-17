"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { AdminHeroSlide, HeroSlideStatus } from "@/lib/types/admin";
import type { HeroSlideInput } from "@/lib/api/admin/heroSlides";
import { ApiError } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";
import TextField from "@/components/ui/TextField";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ImageUploadTile from "./ImageUploadTile";

export default function HeroSlideForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: AdminHeroSlide;
  onSubmit: (data: HeroSlideInput) => Promise<unknown>;
  submitLabel: string;
}) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.show);
  const isEdit = Boolean(initialValues);

  const [eyebrow, setEyebrow] = useState(initialValues?.eyebrow ?? "");
  const [headingLine1, setHeadingLine1] = useState(initialValues?.headingLine1 ?? "");
  const [headingLine2, setHeadingLine2] = useState(initialValues?.headingLine2 ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(initialValues?.primaryCtaLabel ?? "Shop Now");
  const [primaryCtaHref, setPrimaryCtaHref] = useState(initialValues?.primaryCtaHref ?? "/shop");
  const [secondaryCtaLabel, setSecondaryCtaLabel] = useState(
    initialValues?.secondaryCtaLabel ?? "Explore Flavors"
  );
  const [secondaryCtaHref, setSecondaryCtaHref] = useState(initialValues?.secondaryCtaHref ?? "/shop");
  const [image, setImage] = useState(initialValues?.image ?? "");
  const [paletteFrom, setPaletteFrom] = useState(initialValues?.paletteFrom ?? "#f8ece5");
  const [paletteTo, setPaletteTo] = useState(initialValues?.paletteTo ?? "#eddcd0");
  const [order, setOrder] = useState(String(initialValues?.order ?? 0));
  const [status, setStatus] = useState<HeroSlideStatus>(initialValues?.status ?? "ACTIVE");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!image) {
      setError("Please upload a hero image.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        eyebrow,
        headingLine1,
        headingLine2,
        description,
        primaryCtaLabel,
        primaryCtaHref,
        secondaryCtaLabel,
        secondaryCtaHref,
        image,
        paletteFrom,
        paletteTo,
        order: Number(order) || 0,
        status,
      });
      showToast(isEdit ? "Hero slide updated successfully." : "Hero slide created successfully.");
      router.push("/admin/hero-slides");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-espresso">Image</label>
        <ImageUploadTile value={image} onChange={setImage} onRemove={() => setImage("")} folder="hero" />
      </div>

      <TextField
        label="Eyebrow"
        required
        placeholder="Handcrafted. Heartfelt. Unforgettable."
        value={eyebrow}
        onChange={(e) => setEyebrow(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Heading — line 1"
          required
          placeholder="Every Bite,"
          value={headingLine1}
          onChange={(e) => setHeadingLine1(e.target.value)}
        />
        <TextField
          label="Heading — line 2 (script)"
          required
          placeholder="A Moment of Joy"
          value={headingLine2}
          onChange={(e) => setHeadingLine2(e.target.value)}
        />
      </div>
      <Textarea
        label="Description"
        rows={3}
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Primary button text"
          required
          value={primaryCtaLabel}
          onChange={(e) => setPrimaryCtaLabel(e.target.value)}
        />
        <TextField
          label="Primary button link"
          required
          value={primaryCtaHref}
          onChange={(e) => setPrimaryCtaHref(e.target.value)}
        />
        <TextField
          label="Secondary button text"
          required
          value={secondaryCtaLabel}
          onChange={(e) => setSecondaryCtaLabel(e.target.value)}
        />
        <TextField
          label="Secondary button link"
          required
          value={secondaryCtaHref}
          onChange={(e) => setSecondaryCtaHref(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-espresso">Background gradient</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={paletteFrom}
            onChange={(e) => setPaletteFrom(e.target.value)}
            className="h-10 w-14 cursor-pointer rounded-lg border border-brand-200"
            aria-label="Gradient start color"
          />
          <input
            type="color"
            value={paletteTo}
            onChange={(e) => setPaletteTo(e.target.value)}
            className="h-10 w-14 cursor-pointer rounded-lg border border-brand-200"
            aria-label="Gradient end color"
          />
          <div
            className="h-10 flex-1 rounded-lg border border-brand-200"
            style={{ background: `linear-gradient(120deg, ${paletteFrom}, ${paletteTo})` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Display order"
          type="number"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as HeroSlideStatus)}>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </Select>
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <div className="mt-2 flex gap-3">
        <Button type="submit" variant="filled" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/hero-slides")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
