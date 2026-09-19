"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, Pencil, UserX } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getUser, setUserPassword, updateUserAdmin } from "@/lib/api/admin/users";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToastStore } from "@/lib/stores/toastStore";
import type { UserRole, UserStatus } from "@/lib/types/admin";
import { ApiError } from "@/lib/api/errors";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import Select from "@/components/ui/Select";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-espresso">{label}</span>
      <p className="rounded-lg border border-brand-100 bg-brand-50/40 px-3.5 py-2.5 text-sm text-espresso">
        {value || "—"}
      </p>
    </div>
  );
}

export default function AdminUserDetailPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const currentUser = useAuthStore((state) => state.currentUser);
  const { data: user, error, loading, reload } = useAsync(() => getUser(params.id), [params.id]);
  const showToast = useToastStore((state) => state.show);

  // useSearchParams (not window.location) so toggling View/Edit — a
  // query-only change on the same route — actually re-renders this page;
  // reading window.location directly here doesn't, since nothing signals
  // React to re-render when only the URL changes underneath it.
  const isEditMode = searchParams.get("edit") === "true";

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [status, setStatus] = useState<UserStatus | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [settingPassword, setSettingPassword] = useState(false);

  const isSelf = currentUser?.id === params.id;
  const effectiveFirstName = firstName ?? user?.firstName ?? "";
  const effectiveLastName = lastName ?? user?.lastName ?? "";
  const effectiveEmail = email ?? user?.email ?? "";
  const effectivePhone = phone ?? user?.phone ?? "";
  const effectiveRole = role ?? user?.role;
  const effectiveStatus = status ?? user?.status;
  const dirty =
    (firstName !== null && firstName !== user?.firstName) ||
    (lastName !== null && lastName !== user?.lastName) ||
    (email !== null && email !== user?.email) ||
    (phone !== null && phone !== (user?.phone ?? "")) ||
    (role !== null && role !== user?.role) ||
    (status !== null && status !== user?.status);

  const resetEdits = () => {
    setFirstName(null);
    setLastName(null);
    setEmail(null);
    setPhone(null);
    setRole(null);
    setStatus(null);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaveError(null);
    try {
      await updateUserAdmin(user.id, {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        email: email ?? undefined,
        phone: phone ?? undefined,
        role: role ?? undefined,
        status: status ?? undefined,
      });
      showToast("User updated successfully.");
      resetEdits();
      reload();
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSetPassword = async () => {
    if (!user || !newPassword) return;
    setSettingPassword(true);
    setPasswordError(null);
    try {
      await setUserPassword(user.id, newPassword);
      showToast("Password updated successfully.");
      setNewPassword("");
    } catch (err) {
      setPasswordError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSettingPassword(false);
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
          <div className="mt-3 flex items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-2xl font-bold text-espresso">
                {user.firstName} {user.lastName}
              </h1>
              <p className="mt-1 text-xs text-espresso/40">
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {!isSelf &&
              (isEditMode ? (
                <Link
                  href={`/admin/users/${user.id}`}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-espresso/60 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Eye className="h-4 w-4" strokeWidth={1.75} />
                  View
                </Link>
              ) : (
                <Link
                  href={`/admin/users/${user.id}?edit=true`}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-espresso/60 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                >
                  <Pencil className="h-4 w-4" strokeWidth={1.75} />
                  Edit
                </Link>
              ))}
          </div>

          {!isEditMode && (
            <div className="mt-6 rounded-2xl bg-white p-5 shadow-card">
              <h2 className="font-serif text-lg font-semibold text-espresso">Account Details</h2>
              <div className="mt-4 flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <ReadOnlyField label="First Name" value={user.firstName} />
                  <ReadOnlyField label="Last Name" value={user.lastName} />
                </div>
                <ReadOnlyField label="Email" value={user.email} />
                <ReadOnlyField label="Phone" value={user.phone ?? ""} />
                <div className="grid grid-cols-2 gap-4">
                  <ReadOnlyField label="Role" value={user.role} />
                  <ReadOnlyField label="Status" value={user.status} />
                </div>
              </div>
            </div>
          )}

          {isEditMode && (
            <>
              <div className="mt-6 rounded-2xl bg-white p-5 shadow-card">
                <h2 className="font-serif text-lg font-semibold text-espresso">Manage Account</h2>

                {isSelf ? (
                  <p className="mt-3 text-sm text-espresso/60">
                    You can&apos;t edit your own account here — ask another admin.
                  </p>
                ) : (
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="First Name"
                        value={effectiveFirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <TextField
                        label="Last Name"
                        value={effectiveLastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <TextField
                      label="Email"
                      type="email"
                      value={effectiveEmail}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      label="Phone"
                      type="tel"
                      value={effectivePhone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
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

              {!isSelf && (
                <div className="mt-5 rounded-2xl bg-white p-5 shadow-card">
                  <h2 className="font-serif text-lg font-semibold text-espresso">Reset Password</h2>
                  <p className="mt-1 text-sm text-espresso/60">
                    An existing password can&apos;t be viewed — it&apos;s stored irreversibly hashed. Setting a new
                    one here signs the user out of their other sessions.
                  </p>
                  <div className="mt-4 flex flex-col gap-4">
                    <TextField
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                    />

                    {passwordError && <p className="text-sm font-medium text-red-500">{passwordError}</p>}

                    <div>
                      <Button
                        type="button"
                        variant="filled"
                        disabled={!newPassword || settingPassword}
                        onClick={handleSetPassword}
                      >
                        {settingPassword ? "Saving…" : "Set Password"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
