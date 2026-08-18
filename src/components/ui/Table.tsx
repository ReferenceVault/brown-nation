"use client";

import { useEffect, useRef, useState, type ReactNode, type ThHTMLAttributes, type TdHTMLAttributes } from "react";

export function Table({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => setCanScrollRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 4);
    update();

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    el.addEventListener("scroll", update);
    return () => {
      resizeObserver.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div className="relative rounded-2xl bg-white shadow-card">
      <div ref={scrollRef} className="overflow-x-auto rounded-2xl">
        <table className="w-full min-w-max border-collapse text-left text-sm">{children}</table>
      </div>
      {canScrollRight && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 rounded-r-2xl bg-gradient-to-l from-white to-transparent sm:hidden" />
      )}
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="border-b border-brand-100 bg-cream-50">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-brand-100/70">{children}</tbody>;
}

export function TableRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <tr className={`transition-colors duration-150 hover:bg-cream-50/80 ${className}`}>{children}</tr>;
}

export function Th({ children, className = "", ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-espresso/50 ${className}`}
      {...rest}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = "", ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`px-4 py-3 align-middle text-espresso/85 ${className}`} {...rest}>
      {children}
    </td>
  );
}
