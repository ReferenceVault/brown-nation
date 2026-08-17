import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export default function Textarea({ label, error, id, className = "", ...rest }: TextareaProps) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-medium text-espresso">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`rounded-lg border px-3.5 py-2.5 text-sm text-espresso outline-none transition-colors duration-200 placeholder:text-espresso/35 focus:border-brand-400 ${
          error ? "border-red-400" : "border-brand-200"
        } ${className}`}
        {...rest}
      />
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
}
