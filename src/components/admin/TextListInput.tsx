"use client";

import { Plus, X } from "lucide-react";

export default function TextListInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const updateAt = (index: number, text: string) => {
    const next = [...value];
    next[index] = text;
    onChange(next);
  };

  const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-espresso">{label}</label>
      <div className="flex flex-col gap-2">
        {value.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateAt(index, e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-lg border border-brand-200 px-3.5 py-2.5 text-sm text-espresso outline-none transition-colors duration-200 placeholder:text-espresso/35 focus:border-brand-400"
            />
            <button
              type="button"
              onClick={() => removeAt(index)}
              aria-label="Remove item"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-espresso/50 transition-colors duration-200 hover:bg-red-50 hover:text-red-500 cursor-pointer"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, ""])}
          className="flex w-fit items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline cursor-pointer"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Add item
        </button>
      </div>
    </div>
  );
}
