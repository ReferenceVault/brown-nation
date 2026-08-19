import type { ReactNode } from "react";
import Image from "next/image";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

type PageHeroProps = {
  image: string;
  eyebrow?: string;
  title: string;
  description: string;
  breadcrumbs: Crumb[];
  children?: ReactNode;
};

export default function PageHero({ image, eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso-dark via-espresso-dark/70 to-espresso-dark/30" />
      </div>

      <div className="mx-auto flex min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] max-w-6xl flex-col justify-end px-4 pb-10 pt-24 sm:pb-14 lg:px-8">
        <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_svg]:text-white/40 [&_span.font-medium]:text-white">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {eyebrow && (
          <p className="mt-5 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-300">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{title}</h1>
        <p className="mt-4 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed">{description}</p>

        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
