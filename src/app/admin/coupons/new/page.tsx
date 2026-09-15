"use client";

import { createCoupon } from "@/lib/api/admin/coupons";
import CouponForm from "@/components/admin/CouponForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function NewCouponPage() {
  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Coupons", href: "/admin/coupons" },
          { label: "New" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">New Coupon</h1>

      <div className="mt-6">
        <CouponForm onSubmit={createCoupon} submitLabel="Create Coupon" />
      </div>
    </div>
  );
}
