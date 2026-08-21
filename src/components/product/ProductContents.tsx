export default function ProductContents({ contents }: { contents: string[] | undefined }) {
  if (!contents || contents.length === 0) return null;

  return (
    <div className="border-t border-brand-100 pt-5">
      <h2 className="font-serif text-lg font-semibold text-espresso">What&apos;s Inside</h2>
      <ul className="mt-3 flex flex-col gap-1.5">
        {contents.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-espresso/70 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
