"use client";

import { useState } from "react";
import Link from "next/link";
import { Users as UsersIcon, Eye, Pencil, Trash2 } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listUsers, deleteUser } from "@/lib/api/admin/users";
import { useAuthStore } from "@/lib/stores/authStore";
import type { UserRole } from "@/lib/types/admin";
import { Table, TableHead, TableBody, TableRow, Th, Td } from "@/components/ui/Table";
import Pagination from "@/components/ui/Pagination";
import StatusBadge from "@/components/ui/StatusBadge";
import Select from "@/components/ui/Select";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

const COLUMN_COUNT = 6;

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [role, setRole] = useState<UserRole | "">("");
  const currentUser = useAuthStore((state) => state.currentUser);

  const { data, error, loading, reload } = useAsync(
    () => listUsers({ page, limit: 15, role: role || undefined }),
    [page, role],
  );

  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [keepOrders, setKeepOrders] = useState(true);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteUser(pendingDelete.id, !keepOrders);
      reload();
    } catch {
      throw new Error("Could not delete this user. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-espresso">Users</h1>
          <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
            {data ? (
              `${data.meta.totalItems} user${data.meta.totalItems === 1 ? "" : "s"}`
            ) : (
              <>
                <Spinner size={14} /> Loading…
              </>
            )}
            {loading && data && <Spinner size={14} />}
          </p>
        </div>

        <Select
          label="Role"
          value={role}
          onChange={(e) => {
            setPage(1);
            setRole(e.target.value as UserRole | "");
          }}
          className="w-44"
        >
          <option value="">All roles</option>
          <option value="CUSTOMER">Customer</option>
          <option value="ADMIN">Admin</option>
        </Select>
      </div>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className={`mt-5 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
        {!loading && data?.items.length === 0 ? (
          <EmptyState icon={UsersIcon} title="No users found" description="Try a different filter." />
        ) : (
          <Table>
            <TableHead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Joined</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </TableHead>
            <TableBody>
              {!data && loading && <TableSkeleton columns={COLUMN_COUNT} />}
              {(data?.items ?? []).map((user) => (
                <TableRow key={user.id}>
                  <Td className="font-medium text-espresso">
                    {user.firstName} {user.lastName}
                  </Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <StatusBadge status={user.role} />
                  </Td>
                  <Td>
                    <StatusBadge status={user.status} />
                  </Td>
                  <Td className="text-xs text-espresso/60">
                    {new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Td>
                  <Td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        aria-label="View"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <Eye className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                      <Link
                        href={`/admin/users/${user.id}`}
                        aria-label="Edit"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.75} />
                      </Link>
                      <button
                        onClick={() => {
                          setKeepOrders(true);
                          setPendingDelete({ id: user.id, name: `${user.firstName} ${user.lastName}` });
                        }}
                        disabled={user.id === currentUser?.id}
                        aria-label="Delete"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-espresso/50 cursor-pointer"
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
        title="Delete user"
        description={
          <>
            Delete <span className="font-semibold text-espresso">{pendingDelete?.name}</span>? This
            cannot be undone.
          </>
        }
      >
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-wide text-espresso/50">
            Their orders
          </legend>
          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-brand-200 p-3 text-sm has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50">
            <input
              type="radio"
              name="order-handling"
              checked={keepOrders}
              onChange={() => setKeepOrders(true)}
              className="mt-0.5"
            />
            <span>
              <span className="block font-medium text-espresso">Keep orders</span>
              <span className="block text-xs text-espresso/60">
                Order history stays, no longer linked to this account.
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-brand-200 p-3 text-sm has-[:checked]:border-brand-400 has-[:checked]:bg-brand-50">
            <input
              type="radio"
              name="order-handling"
              checked={!keepOrders}
              onChange={() => setKeepOrders(false)}
              className="mt-0.5"
            />
            <span>
              <span className="block font-medium text-espresso">Delete orders too</span>
              <span className="block text-xs text-espresso/60">
                Permanently removes all of this user&apos;s orders.
              </span>
            </span>
          </label>
        </fieldset>
      </ConfirmDialog>
    </div>
  );
}
