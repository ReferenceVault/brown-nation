"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Volume2, Pencil, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listAnnouncements, deleteAnnouncement } from "@/lib/api/admin/announcements";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const COLUMN_COUNT = 3;

export default function AdminAnnouncementsPage() {
  const { data, error, loading, reload } = useAsync(() => listAnnouncements({ limit: 100 }), []);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; title: string } | null>(null);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteAnnouncement(pendingDelete.id);
      reload();
    } catch {
      throw new Error("Could not delete this announcement.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Announcement Bar</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} entr${data.meta.totalItems === 1 ? "y" : "ies"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>
        <Link
          href="/admin/announcements/new"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          New Announcement
        </Link>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-5 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState
            icon={Volume2}
            title="No announcements yet"
            description="Add a message to show in the bar at the top of the site."
            actionLabel="New Announcement"
            actionHref="/admin/announcements/new"
          />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Text</Th>
                <Th>Status</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((announcement) => (
                <TableRow key={announcement.id}>
                  <Td>
                    <p className="max-w-md truncate font-medium text-espresso">{announcement.text}</p>
                  </Td>
                  <Td>
                    <StatusBadge status={announcement.status} />
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/announcements/${announcement.id}/edit`}
                        aria-label="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                      <button
                        onClick={() =>
                          setPendingDelete({ id: announcement.id, title: announcement.text })
                        }
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
        title="Delete announcement"
        description={
          <>
            Delete <span className="font-semibold text-espresso">{pendingDelete?.title}</span>? This
            cannot be undone.
          </>
        }
      />
    </div>
  );
}
