"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Menu, LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useRequireAdmin } from "@/lib/hooks/useRequireAdmin";
import { useAuthStore } from "@/lib/stores/authStore";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Spinner from "@/components/ui/Spinner";
import ToastViewport from "@/components/ui/ToastViewport";

const SIDEBAR_STORAGE_KEY = "brown-nation-admin-sidebar-open";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { currentUser, ready } = useRequireAdmin();
  const logout = useAuthStore((state) => state.logout);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "closed";
  });

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarOpen ? "open" : "closed");
  }, [sidebarOpen]);

  if (!ready || !currentUser) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-cream">
        <Spinner size={32} />
        <p className="text-sm font-medium text-espresso/60">Loading admin dashboard…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-cream">
      <ToastViewport />

      {/* Desktop sidebar — collapses to a slim icon rail rather than fully hiding */}
      <aside
        className={`hidden shrink-0 print:hidden lg:block transition-[width] duration-300 ease-in-out ${
          sidebarOpen ? "lg:w-64" : "lg:w-20"
        }`}
      >
        <div
          className={`fixed h-screen transition-[width] duration-300 ease-in-out ${
            sidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <AdminSidebar collapsed={!sidebarOpen} />
        </div>
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <AdminSidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-brand-100 bg-white/95 px-4 py-3 backdrop-blur print:hidden sm:px-6">
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(true)}
              className="text-espresso/70 transition-colors duration-200 hover:text-brand-500 lg:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <button
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              onClick={() => setSidebarOpen((v) => !v)}
              className="hidden text-espresso/70 transition-colors duration-200 hover:text-brand-500 lg:flex cursor-pointer"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" strokeWidth={1.75} />
              ) : (
                <PanelLeftOpen className="h-5 w-5" strokeWidth={1.75} />
              )}
            </button>
          </div>

          <p className="font-serif text-sm font-bold text-espresso lg:hidden">Brown Nation Admin</p>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-espresso">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-xs text-espresso/50">{currentUser.email}</p>
            </div>
            <button
              onClick={() => {
                void logout();
                window.location.href = "/";
              }}
              aria-label="Log out"
              title="Log out"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-pastel-pink-soft text-rose-600 transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 print:p-0">{children}</main>
      </div>
    </div>
  );
}
