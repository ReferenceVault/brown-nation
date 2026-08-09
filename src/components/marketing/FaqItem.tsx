import { ChevronDown } from "lucide-react";

export default function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-2xl bg-white p-5 shadow-card open:shadow-soft">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-espresso">
        {question}
        <ChevronDown className="h-4 w-4 shrink-0 text-brand-500 transition-transform duration-300 group-open:rotate-180" strokeWidth={2} />
      </summary>
      <p className="mt-3 text-sm text-espresso/65 leading-relaxed">{answer}</p>
    </details>
  );
}
