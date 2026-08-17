"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag, ShieldCheck, ChevronDown, Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { useCartStore } from "@/lib/stores/cartStore";
import { useAuthStore } from "@/lib/stores/authStore";
import { useMounted } from "@/lib/hooks/useMounted";
import CartDrawer from "@/components/cart/CartDrawer";
import type { Category } from "@/lib/types/catalog";

export default function Header({ categories }: { categories: Category[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [searchOpen]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/shop?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const currentUser = useAuthStore((state) => state.currentUser);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur border-b border-brand-100/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image src="/logo.svg" alt="" width={44} height={44} className="h-9 w-9 sm:h-11 sm:w-11" priority />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl sm:text-2xl font-bold text-espresso">
              Brown Nation
            </span>
            <span className="mt-0.5 text-[10px] sm:text-[11px] tracking-[0.35em] text-brand-500 font-medium">
              — CHOCOLATES —
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button
                  onClick={() => setCategoriesOpen((v) => !v)}
                  className={`relative flex items-center gap-1 py-1 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive(link.href) ? "text-brand-500" : "text-espresso/80 hover:text-brand-500"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" strokeWidth={2} />
                </button>

                {categoriesOpen && (
                  <div className="absolute left-0 top-full w-56 divide-y divide-brand-100 rounded-xl border border-brand-100 bg-white py-1 shadow-soft">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/shop/${category.slug}`}
                        onClick={() => setCategoriesOpen(false)}
                        className="block px-4 py-2.5 text-sm text-espresso/80 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={`relative flex items-center gap-1 py-1 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.href) ? "text-brand-500" : "text-espresso/80 hover:text-brand-500"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-brand-500" />
                )}
              </Link>
            )
          )}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div ref={searchRef} className="relative">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className={`transition-colors duration-200 hover:text-brand-500 cursor-pointer ${
                searchOpen ? "text-brand-500" : "text-espresso/80"
              }`}
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>

            {searchOpen && (
              <div className="absolute right-[-70px] top-full z-50 mt-3 w-72 sm:w-96 rounded-2xl border border-brand-100 bg-white p-4 shadow-soft">
                <p className="mb-2.5 font-serif text-sm font-semibold text-espresso">
                  What are you craving?
                </p>
                <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
                  <div className="relative min-w-0 flex-1">
                    <Search
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/40"
                      strokeWidth={2}
                    />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                      placeholder="Chocolates"
                      className="w-full rounded-full border border-brand-200 bg-cream-50 py-2.5 pl-10 pr-3 text-sm text-espresso outline-none transition-colors duration-200 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
                    />
                  </div>
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="flex shrink-0 h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white transition-all duration-300 hover:bg-brand-600 hover:scale-105 cursor-pointer"
                  >
                    <Search className="h-4 w-4" strokeWidth={2.25} />
                  </button>
                </form>

                <div className="mt-4 border-t border-brand-100 pt-3">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-espresso/40">
                    Popular Categories
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/shop/${category.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="rounded-full border border-brand-200 px-3 py-1 text-xs font-medium text-espresso/70 transition-colors duration-200 hover:border-brand-400 hover:bg-brand-50 hover:text-brand-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {mounted && currentUser?.role === "ADMIN" && (
            <Link
              href="/admin"
              aria-label="Admin dashboard"
              title="Admin dashboard"
              className="hidden sm:inline-flex text-espresso/80 transition-colors duration-200 hover:text-brand-500"
            >
              <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
            </Link>
          )}
          <Link
            href={mounted && currentUser ? "/account" : "/login"}
            aria-label="Account"
            className="hidden sm:inline-flex text-espresso/80 transition-colors duration-200 hover:text-brand-500"
          >
            <User className="h-5 w-5" strokeWidth={1.75} />
          </Link>
          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className="relative text-espresso/80 transition-colors duration-200 hover:text-brand-500 cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
            {mounted && cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-500 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => {
              setMobileOpen((v) => !v);
              setMobileCategoriesOpen(false);
            }}
            className="lg:hidden text-espresso/80 hover:text-brand-500 cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth={1.75} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-brand-100/60 bg-cream-50 px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.label}>
                <button
                  type="button"
                  onClick={() => setMobileCategoriesOpen((v) => !v)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium cursor-pointer ${
                    isActive(link.href) ? "bg-brand-50 text-brand-600" : "text-espresso/80 hover:bg-brand-50"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${mobileCategoriesOpen ? "rotate-180" : ""}`}
                    strokeWidth={2}
                  />
                </button>
                {mobileCategoriesOpen && (
                  <div className="ml-3 mt-1 flex flex-col divide-y divide-brand-100 border-l border-brand-100 pl-3">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/shop/${category.slug}`}
                        onClick={() => {
                          setMobileOpen(false);
                          setMobileCategoriesOpen(false);
                        }}
                        className="px-3 py-2.5 text-sm text-espresso/70 transition-colors duration-200 hover:bg-brand-50 hover:text-brand-600"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(link.href) ? "bg-brand-50 text-brand-600" : "text-espresso/80 hover:bg-brand-50"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href={mounted && currentUser ? "/account" : "/login"}
            onClick={() => setMobileOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-espresso/80 hover:bg-brand-50 sm:hidden"
          >
            <User className="h-4 w-4" strokeWidth={1.75} />
            {mounted && currentUser ? "My Account" : "Login / Sign Up"}
          </Link>
        </nav>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
