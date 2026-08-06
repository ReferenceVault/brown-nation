import { stats } from "@/data/stats";

export default function StatsBar() {
  return (
    <section className="bg-teal-600">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-4 lg:px-8">
        {stats.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10">
              <Icon className="h-5 w-5 text-cream-100" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="text-xs text-white/70">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
