"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { AdminCoupon, CouponDiscountType, CouponStatus } from "@/lib/types/admin";
import type { CouponInput } from "@/lib/api/admin/coupons";
import { listCategories } from "@/lib/api/admin/categories";
import { ApiError } from "@/lib/api/errors";
import { useAsync } from "@/lib/hooks/useAsync";
import { useToastStore } from "@/lib/stores/toastStore";
import TextField from "@/components/ui/TextField";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

function toDateInputValue(iso: string | null | undefined): string {
  return iso ? iso.slice(0, 10) : "";
}

export default function CouponForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: AdminCoupon;
  onSubmit: (data: CouponInput) => Promise<unknown>;
  submitLabel: string;
}) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.show);
  const isEdit = Boolean(initialValues);

  const { data: categoriesPage } = useAsync(() => listCategories({ limit: 100 }), []);

  const [code, setCode] = useState(initialValues?.code ?? "");
  const [discountType, setDiscountType] = useState<CouponDiscountType>(
    initialValues?.discountType ?? "PERCENTAGE"
  );
  const [discountValue, setDiscountValue] = useState(initialValues?.discountValue ?? "");
  const [minOrderAmount, setMinOrderAmount] = useState(initialValues?.minOrderAmount ?? "");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(initialValues?.maxDiscountAmount ?? "");
  const [startsAt, setStartsAt] = useState(toDateInputValue(initialValues?.startsAt));
  const [expiresAt, setExpiresAt] = useState(toDateInputValue(initialValues?.expiresAt));
  const [status, setStatus] = useState<CouponStatus>(initialValues?.status ?? "ACTIVE");
  const [categoryIds, setCategoryIds] = useState<string[]>(initialValues?.applicableCategoryIds ?? []);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const toggle = (list: string[], setList: (v: string[]) => void, id: string) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!code.trim()) {
      setError("Enter a coupon code.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        code: code.trim().toUpperCase(),
        discountType,
        discountValue: Number(discountValue),
        minOrderAmount: minOrderAmount ? Number(minOrderAmount) : undefined,
        maxDiscountAmount:
          discountType === "PERCENTAGE" && maxDiscountAmount ? Number(maxDiscountAmount) : undefined,
        startsAt: startsAt ? new Date(startsAt).toISOString() : undefined,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined,
        status,
        applicableCategoryIds: categoryIds,
      });
      showToast(isEdit ? "Coupon updated successfully." : "Coupon created successfully.");
      router.push("/admin/coupons");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Coupon code"
        required
        placeholder="SWEET15"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Discount type"
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value as CouponDiscountType)}
        >
          <option value="PERCENTAGE">Percentage</option>
          <option value="FIXED_AMOUNT">Fixed amount (₹)</option>
        </Select>
        <TextField
          label={discountType === "PERCENTAGE" ? "Discount (%)" : "Discount (₹)"}
          type="number"
          min="0"
          step="0.01"
          required
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Minimum order amount (₹, optional)"
          type="number"
          min="0"
          step="0.01"
          value={minOrderAmount}
          onChange={(e) => setMinOrderAmount(e.target.value)}
        />
        {discountType === "PERCENTAGE" && (
          <TextField
            label="Maximum discount amount (₹, optional)"
            type="number"
            min="0"
            step="0.01"
            value={maxDiscountAmount}
            onChange={(e) => setMaxDiscountAmount(e.target.value)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Start date (optional)"
          type="date"
          value={startsAt}
          onChange={(e) => setStartsAt(e.target.value)}
        />
        <TextField
          label="Expiry date (optional)"
          type="date"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />
      </div>

      <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as CouponStatus)}>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </Select>

      <div className="rounded-lg border border-brand-200 p-4">
        <p className="text-sm font-medium text-espresso">
          Applicable categories (leave empty for store-wide)
        </p>

        <div className="mt-3 flex max-h-32 flex-col gap-1.5 overflow-y-auto">
          {(categoriesPage?.items ?? []).map((category) => (
            <label key={category.id} className="flex items-center gap-2 text-sm text-espresso/80">
              <input
                type="checkbox"
                checked={categoryIds.includes(category.id)}
                onChange={() => toggle(categoryIds, setCategoryIds, category.id)}
                className="h-4 w-4 rounded border-brand-300 text-brand-500 focus:ring-brand-400"
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      <div className="mt-2 flex gap-3">
        <Button type="submit" variant="filled" disabled={submitting}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/coupons")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
