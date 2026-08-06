type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
};

export default function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-center text-center mb-10 md:mb-14">
      {eyebrow && (
        <span className="mb-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-brand-500">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-espresso tracking-wide uppercase">
        {title}
      </h2>
      <div className="mt-3 flex items-center gap-2 text-brand-400">
        <span className="h-px w-10 bg-brand-300" />
        <span aria-hidden className="text-lg">
          ❤
        </span>
        <span className="h-px w-10 bg-brand-300" />
      </div>
    </div>
  );
}
