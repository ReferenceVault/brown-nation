import { trustFeatures } from "@/data/trustFeatures";

export default function FeatureStrip() {
  return (
    <div className="relative z-20 mx-auto -mt-12 max-w-6xl px-4 sm:-mt-14 lg:px-8">
      <div className="grid grid-cols-2 gap-6 rounded-2xl bg-white px-6 py-8 shadow-soft sm:grid-cols-3 md:grid-cols-5 md:gap-4">
        {trustFeatures.map(({ icon: Icon, title, subtitle, bg, iconColor }) => (
          <div key={title} className="flex flex-col items-center text-center gap-2.5">
            <span className={`flex h-12 w-12 items-center justify-center rounded-full ${bg}`}>
              <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.75} />
            </span>
            <h3 className="text-xs sm:text-sm font-semibold text-espresso">{title}</h3>
            <p className="text-[11px] sm:text-xs text-espresso/60 leading-snug">{subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
