"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";

type OptionProps = { value: string; disabled?: boolean; children?: ReactNode };

type SelectProps = {
  label: string;
  value: string | undefined;
  onChange: (e: { target: { value: string } }) => void;
  children: ReactNode;
  id?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
};

function optionText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(optionText).join("");
  return "";
}

export default function Select({
  label,
  value,
  onChange,
  children,
  id,
  className = "",
  error,
  disabled,
  required,
}: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const options = useMemo(
    () =>
      Children.toArray(children)
        .filter((child): child is ReactElement<OptionProps> => isValidElement(child))
        .map((child) => ({
          value: child.props.value,
          disabled: child.props.disabled,
          label: optionText(child.props.children),
        })),
    [children]
  );

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectOption = (optValue: string) => {
    onChange({ target: { value: optValue } });
    setOpen(false);
    triggerRef.current?.focus();
  };

  const moveFocus = (fromValue: string | undefined, direction: 1 | -1) => {
    const enabled = options.filter((opt) => !opt.disabled);
    if (enabled.length === 0) return;
    const currentIndex = enabled.findIndex((opt) => opt.value === fromValue);
    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + direction + enabled.length) % enabled.length;
    const el = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-option-value="${CSS.escape(enabled[nextIndex].value)}"]`
    );
    el?.focus();
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} ref={containerRef}>
      <label htmlFor={selectId} className="text-sm font-medium text-espresso">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          id={selectId}
          ref={triggerRef}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setOpen(true);
              requestAnimationFrame(() => moveFocus(value, 1));
            }
          }}
          className={`flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left text-sm text-espresso outline-none transition-colors duration-200 focus:border-brand-400 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${
            error ? "border-red-400" : "border-brand-200"
          }`}
        >
          <span className="truncate">{selected?.label ?? ""}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-espresso/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            strokeWidth={1.75}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            aria-labelledby={selectId}
            className="absolute z-20 mt-1.5 max-h-60 w-full min-w-max overflow-auto rounded-lg border border-brand-200 bg-white py-1 text-sm shadow-lg"
          >
            {options.map((opt) => (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  data-option-value={opt.value}
                  aria-selected={opt.value === value}
                  disabled={opt.disabled}
                  tabIndex={-1}
                  onClick={() => !opt.disabled && selectOption(opt.value)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      moveFocus(opt.value, 1);
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      moveFocus(opt.value, -1);
                    } else if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (!opt.disabled) selectOption(opt.value);
                    } else if (e.key === "Tab") {
                      setOpen(false);
                    }
                  }}
                  className={`block w-full whitespace-nowrap px-3.5 py-2 text-left transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed disabled:text-espresso/30 ${
                    opt.value === value
                      ? "bg-brand-50 font-medium text-brand-700"
                      : "text-espresso hover:bg-cream-100"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
}
