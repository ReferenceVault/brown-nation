"use client";

import { useParams } from "next/navigation";
import { Tag } from "lucide-react";
import { useAsync } from "@/lib/hooks/useAsync";
import { getCoupon, updateCoupon } from "@/lib/api/admin/coupons";
import CouponForm from "@/components/admin/CouponForm";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";

export default function EditCouponPage() {
  const params = useParams<{ id: string }>();
  const { data: coupon, error, loading } = useAsync(() => getCoupon(params.id), [params.id]);

  return (
    <div className="max-w-2xl">
      <Breadcrumbs
        items={[
          { label: "Admin", href: "/admin" },
          { label: "Coupons", href: "/admin/coupons" },
          { label: "Edit" },
        ]}
      />
      <h1 className="mt-3 font-serif text-2xl font-bold text-espresso">Edit Coupon</h1>

      {loading && <p className="mt-6 text-sm text-espresso/50">Loading…</p>}

      {!loading && (error || !coupon) && (
        <div className="mt-6">
          <EmptyState
            icon={Tag}
            title="Coupon not found"
            description={error ?? "This coupon no longer exists."}
          />
        </div>
      )}

      {!loading && coupon && (
        <div className="mt-6">
          <CouponForm
            initialValues={coupon}
            onSubmit={(data) => updateCoupon(coupon.id, data)}
            submitLabel="Save Changes"
          />
        </div>
      )}
    </div>
  );
}
