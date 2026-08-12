"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User, ShoppingBag, ChevronDown, Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { categories } from "@/data/categories";
import { useCartStore } from "@/lib/stores/cartStore";
import { useAuthStore } from "@/lib/stores/authStore";
import { useMounted } from "@/lib/hooks/useMounted";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useMounted();

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
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
              - CHOCOLATES —
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
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className={`transition-colors duration-200 hover:text-brand-500 cursor-pointer ${
              searchOpen ? "text-brand-500" : "text-espresso/80"
            }`}
          >
            <Search className="h-5 w-5" strokeWidth={1.75} />
          </button>
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

      {/* Search panel */}
      {searchOpen && (
        <div className="border-t border-brand-100/60 bg-cream-50 px-4 py-3 lg:px-8">
          <form onSubmit={onSearchSubmit} className="mx-auto flex max-w-7xl items-center gap-2">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              placeholder="Search for chocolates, truffles, gifts…"
              className="flex-1 rounded-lg border border-brand-200 bg-white px-3.5 py-2 text-sm text-espresso outline-none focus:border-brand-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600 cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="text-espresso/50 transition-colors duration-200 hover:text-espresso cursor-pointer"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </form>
        </div>
      )}

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
