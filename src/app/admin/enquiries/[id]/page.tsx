"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Mail, MailX, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getEnquiry, updateEnquiryStatus, deleteEnquiry } from "@/lib/api/admin/enquiries";
import type { EnquiryStatus } from "@/lib/types/admin";
import { ApiError } from "@/lib/api/errors";
import { useToastStore } from "@/lib/stores/toastStore";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function EnquiryDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const showToast = useToastStore((state) => state.show);
  const { data: enquiry, error, loading, reload } = useAsync(() => getEnquiry(params.id), [params.id]);

  const [status, setStatus] = useState<EnquiryStatus | null>(null);
  const [savingStatus, setSavingStatus] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Opening a still-unread enquiry marks it read, same as any inbox.
  useEffect(() => {
    if (enquiry && enquiry.status === "NEW") {
      updateEnquiryStatus(enquiry.id, "READ")
        .then(() => reload())
        .catch(() => {});
    }
  }, [enquiry, reload]);

  const handleStatusSave = async () => {
    if (!enquiry || !status) return;
    setSavingStatus(true);
    try {
      await updateEnquiryStatus(enquiry.id, status);
      showToast("Status updated.");
      reload();
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Could not update status.", "error");
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!enquiry) return;
    await deleteEnquiry(enquiry.id);
    router.push("/admin/enquiries");
  };

  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Enquiries", href: "/admin/enquiries" },
          { label: "View" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">Enquiry</h1>

      {loading && <p className="mt-6 text-sm text-espresso/50">Loading…</p>}

      {!loading && (error || !enquiry) && (
        <div className="mt-6">
          <EmptyState icon={MailX} title="Enquiry not found" description={error ?? "This enquiry no longer exists."} />
        </div>
      )}

      {!loading && enquiry && (
        <div className="mt-6 flex flex-col gap-4">
          <div className="rounded-2xl bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-serif text-lg font-bold text-espresso">{enquiry.name}</p>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="mt-1 flex items-center gap-1.5 text-sm text-brand-600 hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {enquiry.email}
                </a>
              </div>
              <StatusBadge status={enquiry.status} />
            </div>
            <p className="mt-2 text-xs text-espresso/40">{formatDate(enquiry.createdAt)}</p>
            <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-espresso/85">
              {enquiry.message}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-end gap-3">
              <div className="min-w-[10rem]">
                <Select
                  label="Status"
                  value={status ?? enquiry.status}
                  onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
                >
                  <option value="NEW">New</option>
                  <option value="READ">Read</option>
                  <option value="RESOLVED">Resolved</option>
                </Select>
              </div>
              <Button
                type="button"
                variant="filled"
                disabled={savingStatus || (status ?? enquiry.status) === enquiry.status}
                onClick={handleStatusSave}
              >
                {savingStatus ? "Saving…" : "Update Status"}
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/enquiries")}>
              Back to list
            </Button>
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-red-500 transition-colors duration-200 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.75} />
              Delete
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmingDelete}
        onClose={() => setConfirmingDelete(false)}
        onConfirm={handleDelete}
        title="Delete enquiry"
        description={
          <>
            Delete the enquiry from <span className="font-semibold text-espresso">{enquiry?.name}</span>?
            This cannot be undone.
          </>
        }
      />
    </div>
  );
}
