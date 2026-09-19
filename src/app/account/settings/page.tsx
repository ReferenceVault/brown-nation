"use client";

import { useState } from "react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useAuthStore } from "@/lib/stores/authStore";
import { useToastStore } from "@/lib/stores/toastStore";
import { updateMyProfile } from "@/lib/api/users";
import { changeEmail, changePassword, resendVerificationEmail } from "@/lib/api/auth";
import { ApiError } from "@/lib/api/errors";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function AccountSettingsPage() {
  const { currentUser, ready } = useRequireAuth();
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const showToast = useToastStore((state) => state.show);

  const [firstName, setFirstName] = useState(currentUser?.firstName ?? "");
  const [lastName, setLastName] = useState(currentUser?.lastName ?? "");
  const [phone, setPhone] = useState(currentUser?.phone ?? "");
  const [profileError, setProfileError] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);

  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [savingEmail, setSavingEmail] = useState(false);
  const [resending, setResending] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [savingPassword, setSavingPassword] = useState(false);

  if (!ready || !currentUser) return null;

  const profileDirty =
    firstName !== currentUser.firstName ||
    lastName !== currentUser.lastName ||
    phone !== (currentUser.phone ?? "");
  const emailDirty = email !== currentUser.email;

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileError(null);
    try {
      const updated = await updateMyProfile({ firstName, lastName, phone });
      setCurrentUser(updated);
      showToast("Profile updated successfully.");
    } catch (err) {
      setProfileError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveEmail = async () => {
    setSavingEmail(true);
    setEmailError(null);
    try {
      const updated = await changeEmail(email);
      setCurrentUser(updated);
      showToast("Email updated — check your inbox to verify it.");
    } catch (err) {
      setEmailError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSavingEmail(false);
    }
  };

  const handleResendVerification = async () => {
    setResending(true);
    try {
      await resendVerificationEmail(currentUser.email);
      showToast("Verification email sent.");
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : "Couldn't resend the email.", "error");
    } finally {
      setResending(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) return;
    setSavingPassword(true);
    setPasswordError(null);
    try {
      await changePassword(currentPassword, newPassword);
      showToast("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPasswordError(err instanceof ApiError ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "My Account", href: "/account" },
          { label: "Settings" },
        ]}
      />
      <h1 className="mt-4 mb-8 font-serif text-3xl sm:text-4xl font-bold text-espresso">Account Settings</h1>

      <div className="rounded-2xl bg-white p-5 shadow-card">
        <h2 className="font-serif text-lg font-semibold text-espresso">Profile</h2>
        <div className="mt-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <TextField label="Phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />

          {profileError && <p className="text-sm font-medium text-red-500">{profileError}</p>}

          <div>
            <Button
              type="button"
              variant="filled"
              disabled={!profileDirty || savingProfile}
              onClick={handleSaveProfile}
            >
              {savingProfile ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white p-5 shadow-card">
        <h2 className="font-serif text-lg font-semibold text-espresso">Email</h2>
        {!currentUser.isEmailVerified && (
          <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-700">
            <span>Your email isn&apos;t verified yet.</span>
            <button
              type="button"
              onClick={handleResendVerification}
              disabled={resending}
              className="font-semibold underline underline-offset-2 hover:no-underline disabled:opacity-50 cursor-pointer"
            >
              {resending ? "Sending…" : "Resend verification email"}
            </button>
          </div>
        )}
        <div className="mt-4 flex flex-col gap-4">
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p className="text-xs text-espresso/50">
            Changing your email resets its verification — we&apos;ll send a new link to confirm it.
          </p>

          {emailError && <p className="text-sm font-medium text-red-500">{emailError}</p>}

          <div>
            <Button type="button" variant="filled" disabled={!emailDirty || savingEmail} onClick={handleSaveEmail}>
              {savingEmail ? "Saving…" : "Save Email"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl bg-white p-5 shadow-card">
        <h2 className="font-serif text-lg font-semibold text-espresso">Password</h2>
        <p className="mt-1 text-sm text-espresso/60">
          Changing your password signs you out of your other sessions.
        </p>
        <div className="mt-4 flex flex-col gap-4">
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
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
              disabled={!currentPassword || !newPassword || savingPassword}
              onClick={handleChangePassword}
            >
              {savingPassword ? "Saving…" : "Change Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
