"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { useCartDetails } from "@/lib/hooks/useCartDetails";
import { formatINR } from "@/lib/utils/currency";
import EmptyState from "@/components/ui/EmptyState";
import { useMounted } from "@/lib/hooks/useMounted";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, subtotal, itemCount } = useCartDetails();
  const mounted = useMounted();
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setIsVisible(true)));
      return () => cancelAnimationFrame(raf);
    }

    setIsVisible(false);
    const timeout = setTimeout(() => setShouldRender(false), 300);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!shouldRender) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldRender]);

  if (!shouldRender || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-espresso/40 transition-opacity duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream-50 shadow-2xl transition-transform duration-300 ease-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-brand-100 px-5 py-4">
          <h2 className="font-serif text-lg font-semibold text-espresso">
            Your Cart {itemCount > 0 && `(${itemCount})`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-espresso/50 transition-colors duration-200 hover:text-espresso cursor-pointer"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {lines.length === 0 ? (
            <div className="pt-8">
              <EmptyState
                icon={ShoppingBag}
                title="Your cart is empty"
                description="Add a few handcrafted bars to get started."
                actionLabel="Shop Now"
                actionHref="/shop"
                onAction={onClose}
              />
            </div>
          ) : (
            lines.map((line) => (
              <div key={`${line.productId}-${line.variantId}`} className="flex items-center gap-3 border-b border-brand-100 py-3.5 last:border-b-0">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <Image src={line.product.images[0]} alt={line.product.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-espresso line-clamp-1">{line.product.name}</p>
                  <p className="text-xs text-espresso/50">
                    {line.variant.label} · Qty {line.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-brand-600">{formatINR(line.lineTotal)}</p>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-brand-100 px-5 py-4">
            <div className="mb-3 flex items-center justify-between text-sm font-semibold text-espresso">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex gap-2.5">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex-1 rounded-lg border-2 border-espresso/80 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-espresso transition-colors duration-300 hover:bg-espresso hover:text-white"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-600"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
