"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Eye, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listEnquiries, deleteEnquiry } from "@/lib/api/admin/enquiries";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const COLUMN_COUNT = 5;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminEnquiriesPage() {
  const { data, error, loading, reload } = useAsync(() => listEnquiries({ limit: 100 }), []);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; name: string } | null>(null);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteEnquiry(pendingDelete.id);
      reload();
    } catch {
      throw new Error("Could not delete this enquiry.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Enquiries</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} enquir${data.meta.totalItems === 1 ? "y" : "ies"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-5 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState
            icon={Mail}
            title="No enquiries yet"
            description="Messages submitted through the Contact page will show up here."
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Message</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <Td className="font-medium text-espresso">{enquiry.name}</Td>
                  <Td className="text-espresso/70">{enquiry.email}</Td>
                  <Td className="max-w-xs truncate text-espresso/70">{enquiry.message}</Td>
                  <Td>
                    <StatusBadge status={enquiry.status} />
                  </Td>
                  <Td className="whitespace-nowrap text-espresso/60">{formatDate(enquiry.createdAt)}</Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/enquiries/${enquiry.id}`}
                        aria-label="View"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <Eye className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                      <button
                        onClick={() => setPendingDelete({ id: enquiry.id, name: enquiry.name })}
                        aria-label="Delete"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </Td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <ConfirmDialog
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        title="Delete enquiry"
        description={
          <>
            Delete the enquiry from{" "}
            <span className="font-semibold text-espresso">{pendingDelete?.name}</span>? This cannot be
            undone.
          </>
        }
      />
    </div>
  );
}
