import { Eye, EyeOff } from "lucide-react";
import { useState, type InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function TextField({
  label,
  error,
  id,
  className = "",
  type,
  ...rest
}: TextFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const isPassword = type === "password";
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-espresso">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={isPassword && revealed ? "text" : type}
          className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-espresso outline-none transition-colors duration-200 placeholder:text-espresso/35 focus:border-brand-400 ${
            isPassword ? "pr-10" : ""
          } ${error ? "border-red-400" : "border-brand-200"} ${className}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "Hide password" : "Show password"}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-espresso/40 transition-colors duration-200 hover:text-espresso/70 cursor-pointer"
          >
            {revealed ? <EyeOff className="h-4 w-4" strokeWidth={1.75} /> : <Eye className="h-4 w-4" strokeWidth={1.75} />}
          </button>
        )}
      </div>
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
}
