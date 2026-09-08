"use client";

import { Plus, X } from "lucide-react";

export type CavityVariantDraft = {
  cavityCount: string;
  price: string;
};

export default function CavityVariantListInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: CavityVariantDraft[];
  onChange: (next: CavityVariantDraft[]) => void;
}) {
  const updateAt = (index: number, field: keyof CavityVariantDraft, text: string) => {
    const next = [...value];
    next[index] = { ...next[index], [field]: text };
    onChange(next);
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-espresso">{label}</label>
      <div className="flex flex-col gap-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="relative w-32 shrink-0">
              <input
                type="number"
                min="1"
                step="1"
                value={item.cavityCount}
                onChange={(e) => updateAt(index, "cavityCount", e.target.value)}
                placeholder="e.g. 6"
                className="w-full rounded-lg border border-brand-200 px-3.5 py-2.5 pr-16 text-sm text-espresso outline-none transition-colors duration-200 placeholder:text-espresso/35 focus:border-brand-400"
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-espresso/40">
                Cavity
              </span>
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.price}
              onChange={(e) => updateAt(index, "price", e.target.value)}
              placeholder="Price (₹)"
              className="w-full rounded-lg border border-brand-200 px-3.5 py-2.5 text-sm text-espresso outline-none transition-colors duration-200 placeholder:text-espresso/35 focus:border-brand-400"
            />
            <button
              type="button"
              onClick={() => removeAt(index)}
              aria-label="Remove cavity option"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, { cavityCount: "", price: "" }])}
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline cursor-pointer"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add cavity option
        </button>
      </div>
    </div>
  );
}
