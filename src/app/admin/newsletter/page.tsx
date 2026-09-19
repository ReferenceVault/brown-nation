"use client";

import { useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listSubscribers, deleteSubscriber } from "@/lib/api/admin/newsletter";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const COLUMN_COUNT = 3;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminNewsletterPage() {
  const [page, setPage] = useState(1);
  const { data, error, loading, reload } = useAsync(() => listSubscribers({ page, limit: 15 }), [page]);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; email: string } | null>(null);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteSubscriber(pendingDelete.id);
      reload();
    } catch {
      throw new Error("Could not remove this subscriber.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Newsletter Subscribers</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} subscriber${data.meta.totalItems === 1 ? "" : "s"}`
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
            title="No subscribers yet"
            description="Emails collected from the newsletter signup form will show up here."
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Email</Th>
                <Th>Subscribed On</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((subscriber) => (
                <TableRow key={subscriber.id}>
                  <Td className="font-medium text-espresso">{subscriber.email}</Td>
                  <Td className="whitespace-nowrap text-espresso/60">{formatDate(subscriber.createdAt)}</Td>
                  <Td>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setPendingDelete({ id: subscriber.id, email: subscriber.email })}
                        aria-label="Remove"
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

      {data && <Pagination meta={data.meta} onPageChange={setPage} />}

      <ConfirmDialog
        open={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        title="Remove subscriber"
        description={
          <>
            Remove <span className="font-semibold text-espresso">{pendingDelete?.email}</span> from the
            newsletter list? This cannot be undone.
          </>
        }
      />
    </div>
  );
}
