"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Store,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Homepage Hero", href: "/admin/hero-slides", icon: Sparkles },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Users", href: "/admin/users", icon: Users },
];

export default function AdminSidebar({
  onNavigate,
  collapsed = false,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-espresso-dark text-cream-50">
      <div className={`flex items-center gap-2.5 py-5 ${collapsed ? "justify-center px-0" : "px-5"}`}>
        <Image
          src="/logo.svg"
          alt="Brown Nation"
          width={44}
          height={44}
          className="h-9 w-9 shrink-0 rounded-full"
          priority
        />
        {!collapsed && (
          <div className="whitespace-nowrap leading-none">
            <p className="font-serif text-base font-bold text-white">Brown Nation</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-cream-100/50">Admin</p>
          </div>
        )}
      </div>

      <nav className={`mt-2 flex-1 space-y-1 ${collapsed ? "px-2" : "px-3"}`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium transition-colors duration-200 ${
                collapsed ? "justify-center px-0" : "px-3.5"
              } ${
                active ? "bg-brand-500 text-white" : "text-cream-100/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={`border-t border-white/10 py-4 ${collapsed ? "px-2" : "px-3"}`}>
        <Link
          href="/"
          onClick={onNavigate}
          title={collapsed ? "View Store" : undefined}
          className={`flex items-center gap-3 rounded-lg py-2.5 text-sm font-medium text-cream-100/70 transition-colors duration-200 hover:bg-white/5 hover:text-white ${
            collapsed ? "justify-center px-0" : "px-3.5"
          }`}
        >
          <Store className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          {!collapsed && <span className="whitespace-nowrap">View Store</span>}
        </Link>
      </div>
    </div>
  );
}
