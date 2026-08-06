import { Truck } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden sm:block bg-brand-500 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] md:text-xs tracking-wide lg:px-8">
        <p className="font-medium">Handcrafted with Love in India</p>
        <p className="hidden md:block font-medium">
          Premium Ingredients&nbsp;&nbsp;•&nbsp;&nbsp;No Preservatives
        </p>
        <p className="flex items-center gap-1.5 font-medium">
          <Truck className="h-3.5 w-3.5" strokeWidth={2} />
          Free Shipping on Orders Above ₹999
        </p>
      </div>
    </div>
  );
}
