"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Package, LogOut, User as UserIcon } from "lucide-react";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useAuthStore } from "@/lib/stores/authStore";
import { useOrdersStore } from "@/lib/stores/ordersStore";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser, ready } = useRequireAuth();
  const logout = useAuthStore((state) => state.logout);
  const allOrders = useOrdersStore((state) => state.orders);
  const orderCount = useMemo(
    () => (currentUser ? allOrders.filter((order) => order.userId === currentUser.id).length : 0),
    [allOrders, currentUser]
  );

  if (!ready || !currentUser) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Account" }]} />

      <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50">
          <UserIcon className="h-6 w-6 text-brand-500" strokeWidth={1.75} />
        </span>
        <div>
          <h1 className="font-serif text-xl font-bold text-espresso">{currentUser.name}</h1>
          <p className="text-sm text-espresso/60">{currentUser.email}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={() => router.push("/account/orders")}
          className="flex items-center gap-3 rounded-2xl bg-white p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft cursor-pointer"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pastel-teal-soft">
            <Package className="h-5 w-5 text-teal-700" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-espresso">My Orders</p>
            <p className="text-xs text-espresso/50">
              {orderCount} order{orderCount === 1 ? "" : "s"} placed
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            logout();
            // Hard navigation, not router.push: clearing currentUser while this
            // auth-guarded page is still mounted otherwise races useRequireAuth's
            // redirect effect, which wins and sends us to /login instead of "/".
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.href = "/";
          }}
          className="flex items-center gap-3 rounded-2xl bg-white p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft cursor-pointer"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pastel-pink-soft">
            <LogOut className="h-5 w-5 text-rose-600" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-sm font-semibold text-espresso">Log Out</p>
            <p className="text-xs text-espresso/50">End your session</p>
          </div>
        </button>
      </div>
    </div>
  );
}
