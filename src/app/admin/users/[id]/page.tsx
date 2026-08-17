"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { UserX } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getUser, updateUserAdmin } from "@/lib/api/admin/users";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToastStore } from "@/lib/stores/toastStore";
import type { UserRole, UserStatus } from "@/lib/types/admin";
import { ApiError } from "@/lib/api/errors";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function AdminUserDetailPage() {
  const params = useParams<{ id: string }>();
  const currentUser = useAuthStore((state) => state.currentUser);
  const { data: user, error, loading, reload } = useAsync(() => getUser(params.id), [params.id]);
  const showToast = useToastStore((state) => state.show);

  const [role, setRole] = useState<UserRole | null>(null);
  const [status, setStatus] = useState<UserStatus | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const isSelf = currentUser?.id === params.id;
  const effectiveRole = role ?? user?.role;
  const effectiveStatus = status ?? user?.status;
  const dirty = (role !== null && role !== user?.role) || (status !== null && status !== user?.status);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveError(null);
    try {
      await updateUserAdmin(user.id, {
        role: role ?? undefined,
        status: status ?? undefined,
      });
      showToast("User updated successfully.");
      setRole(null);
      setStatus(null);
      reload();
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Users", href: "/admin/users" },
          { label: "Detail" },
        ]}
      />

      {loading && <p className="mt-6 text-sm text-espresso/50">Loading…</p>}

      {!loading && (error || !user) && (
        <div className="mt-6">
          <EmptyState icon={UserX} title="User not found" description={error ?? "This user no longer exists."} />
        </div>
      )}

      {!loading && user && (
        <>
          <div className="mt-3 flex items-center justify-between">
            <h1 className="font-serif text-2xl font-bold text-espresso">
              {user.firstName} {user.lastName}
            </h1>
            <div className="flex gap-2">
              <StatusBadge status={user.role} />
              <StatusBadge status={user.status} />
            </div>
          </div>
          <p className="mt-1 text-sm text-espresso/60">{user.email}</p>
          {user.phone && <p className="text-sm text-espresso/60">{user.phone}</p>}
          <p className="mt-1 text-xs text-espresso/40">
            Joined{" "}
            {new Date(user.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          <div className="mt-6 rounded-2xl bg-white p-5 shadow-card">
            <h2 className="font-serif text-lg font-semibold text-espresso">Manage Account</h2>

            {isSelf ? (
              <p className="mt-3 text-sm text-espresso/60">
                You can&apos;t change your own role or status here — ask another admin.
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Role"
                    value={effectiveRole}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="ADMIN">Admin</option>
                  </Select>
                  <Select
                    label="Status"
                    value={effectiveStatus}
                    onChange={(e) => setStatus(e.target.value as UserStatus)}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="SUSPENDED">Suspended</option>
                  </Select>
                </div>

                {saveError && <p className="text-sm font-medium text-red-500">{saveError}</p>}

                <div>
                  <Button
                    type="button"
                    variant="filled"
                    disabled={!dirty || saving}
                    onClick={handleSave}
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
