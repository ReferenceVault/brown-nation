"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { AdminAnnouncement, AnnouncementStatus } from "@/lib/types/admin";
import type { AnnouncementInput } from "@/lib/api/admin/announcements";
import { ApiError } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";
import TextField from "@/components/ui/TextField";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function AnnouncementForm({
  initialValues,
  onSubmit,
  submitLabel,
}: {
  initialValues?: AdminAnnouncement;
  onSubmit: (data: AnnouncementInput) => Promise<unknown>;
  submitLabel: string;
}) {
  const router = useRouter();
  const showToast = useToastStore((state) => state.show);
  const isEdit = Boolean(initialValues);

  const [text, setText] = useState(
    initialValues?.text ?? "🍫 Get 15% OFF on orders above ₹999 | Use code SWEET15"
  );
  const [linkLabel, setLinkLabel] = useState(initialValues?.linkLabel ?? "Shop Now →");
  const [linkHref, setLinkHref] = useState(initialValues?.linkHref ?? "/shop");
  const [order, setOrder] = useState(String(initialValues?.order ?? 0));
  const [status, setStatus] = useState<AnnouncementStatus>(initialValues?.status ?? "ACTIVE");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        text,
        linkLabel: linkLabel.trim() || undefined,
        linkHref: linkHref.trim() || undefined,
        order: Number(order) || 0,
        status,
      });
      showToast(isEdit ? "Announcement updated successfully." : "Announcement created successfully.");
      router.push("/admin/announcements");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <TextField
        label="Announcement text"
        required
        placeholder="🍫 Get 15% OFF on orders above ₹999 | Use code SWEET15"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField
          label="Link label (optional)"
          placeholder="Shop Now →"
          value={linkLabel}
          onChange={(e) => setLinkLabel(e.target.value)}
        />
        <TextField
          label="Link URL (optional)"
          placeholder="/shop"
          value={linkHref}
          onChange={(e) => setLinkHref(e.target.value)}
        />
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
          onChange={(e) => setStatus(e.target.value as AnnouncementStatus)}
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
        <Button type="button" variant="outline" onClick={() => router.push("/admin/announcements")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
