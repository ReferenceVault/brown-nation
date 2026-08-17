"use client";

import Link from "next/link";
import { Package, FolderTree, ShoppingCart, Users, Printer } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { listProducts } from "@/lib/api/admin/products";
import { listCategories } from "@/lib/api/admin/categories";
import { listOrders } from "@/lib/api/admin/orders";
import { listUsers } from "@/lib/api/admin/users";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Spinner from "@/components/ui/Spinner";
import Skeleton from "@/components/ui/Skeleton";
import { formatINR } from "@/lib/utils/currency";

const RECENT_ORDERS_SKELETON_ROWS = 5;

async function loadDashboard() {
  const [products, categories, orders, users] = await Promise.all([
    listProducts({ limit: 1 }),
    listCategories({ limit: 1 }),
    listOrders({ limit: 5 }),
    listUsers({ limit: 1 }),
  ]);
  return {
    productCount: products.meta.totalItems,
    categoryCount: categories.meta.totalItems,
    orderCount: orders.meta.totalItems,
    userCount: users.meta.totalItems,
    recentOrders: orders.items,
  };
}

export default function AdminDashboardPage() {
  const { data, error, loading } = useAsync(loadDashboard, []);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-espresso">Dashboard</h1>
      <p className="mt-1 flex items-center gap-2 text-sm text-espresso/60">
        A quick overview of your store.
        {loading && <Spinner size={14} />}
      </p>

      {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Package}
          label="Products"
          value={String(data?.productCount ?? 0)}
          href="/admin/products"
          loading={!data && loading}
        />
        <StatCard
          icon={FolderTree}
          label="Categories"
          value={String(data?.categoryCount ?? 0)}
          href="/admin/categories"
          loading={!data && loading}
        />
        <StatCard
          icon={ShoppingCart}
          label="Orders"
          value={String(data?.orderCount ?? 0)}
          href="/admin/orders"
          loading={!data && loading}
        />
        <StatCard
          icon={Users}
          label="Users"
          value={String(data?.userCount ?? 0)}
          href="/admin/users"
          loading={!data && loading}
        />
      </div>

      <div className="mt-8 rounded-2xl bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-semibold text-espresso">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs font-semibold text-brand-600 hover:underline">
            View all
          </Link>
        </div>

        {!loading && data?.recentOrders.length === 0 && (
          <p className="mt-4 text-sm text-espresso/50">No orders yet.</p>
        )}

        <div className={`mt-3 divide-y divide-brand-100/70 transition-opacity duration-200 ${loading && data ? "opacity-60" : ""}`}>
          {!data &&
            loading &&
            Array.from({ length: RECENT_ORDERS_SKELETON_ROWS }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-2 h-3 w-16" />
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-4 w-14" />
                </div>
              </div>
            ))}
          {data?.recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex items-center justify-between gap-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium text-espresso">{order.orderNumber}</p>
                <p className="text-xs text-espresso/50">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} />
                <span className="font-semibold text-espresso">{formatINR(Number(order.totalAmount))}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/admin/products"
          className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-espresso/70 transition-colors duration-200 hover:bg-brand-50"
        >
          + Add a product
        </Link>
        <Link
          href="/admin/categories"
          className="rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-espresso/70 transition-colors duration-200 hover:bg-brand-50"
        >
          + Add a category
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg border border-brand-200 px-4 py-2 text-sm font-medium text-espresso/70 transition-colors duration-200 hover:bg-brand-50"
        >
          <Printer className="h-4 w-4" strokeWidth={1.75} />
          Print summary
        </button>
      </div>
    </div>
  );
}
