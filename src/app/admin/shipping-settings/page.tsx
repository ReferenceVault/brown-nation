"use client";

import { useState, type FormEvent } from "react";
import { Truck } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getShippingSettings, updateShippingSettings } from "@/lib/api/admin/shippingSettings";
import type { ShippingSettings } from "@/lib/types/catalog";
import { ApiError } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

function ShippingSettingsForm({ initial }: { initial: ShippingSettings }) {
  const showToast = useToastStore((state) => state.show);

  const [flatFee, setFlatFee] = useState(initial.flatFee);
  const [freeThreshold, setFreeThreshold] = useState(initial.freeThreshold);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const flatFeeNumber = Number(flatFee);
    const freeThresholdNumber = Number(freeThreshold);
    if (!Number.isFinite(flatFeeNumber) || flatFeeNumber < 0) {
      setFormError("Enter a valid shipping fee.");
      return;
    }
    if (!Number.isFinite(freeThresholdNumber) || freeThresholdNumber < 0) {
      setFormError("Enter a valid free-shipping threshold.");
      return;
    }

    setSubmitting(true);
    try {
      await updateShippingSettings({ flatFee: flatFeeNumber, freeThreshold: freeThresholdNumber });
      showToast("Shipping settings updated successfully.");
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm font-medium text-espresso/70">
        <Truck className="h-4 w-4 text-brand-500" strokeWidth={1.75} />
        Current settings
      </div>

      <TextField
        label="Flat shipping fee (₹)"
        type="number"
        min={0}
        step="0.01"
        required
        value={flatFee}
        onChange={(e) => setFlatFee(e.target.value)}
      />
      <TextField
        label="Free shipping above (₹)"
        type="number"
        min={0}
        step="0.01"
        required
        value={freeThreshold}
        onChange={(e) => setFreeThreshold(e.target.value)}
      />

      {formError && <p className="text-sm font-medium text-red-500">{formError}</p>}

      <Button type="submit" disabled={submitting} className="self-start">
        {submitting ? "Saving…" : "Save Changes"}
      </Button>
    </form>
  );
}

export default function AdminShippingSettingsPage() {
  const { data, error, loading } = useAsync(getShippingSettings, []);

  return (
    <div className="max-w-lg">
      <Breadcrumbs items={[{ label: "Admin", href: "/admin" }, { label: "Shipping Settings" }]} />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">Shipping Settings</h1>
      <p className="mt-1 text-sm text-espresso/60">
        Control the flat shipping fee and the order amount above which shipping becomes free. Changes apply
        immediately to the storefront and to new orders.
      </p>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-card">
        {loading && !data ? (
          <div className="flex items-center gap-2 text-sm text-espresso/60">
            <Spinner size={14} /> Loading…
          </div>
        ) : error || !data ? (
          <p className="text-sm font-medium text-red-500">{error ?? "Could not load shipping settings."}</p>
        ) : (
          <ShippingSettingsForm initial={data} />
        )}
      </div>
    </div>
  );
}
