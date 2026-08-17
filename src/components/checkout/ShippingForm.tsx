"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { Loader2, Lock } from "lucide-react";
import type { ShippingAddress } from "@/lib/types/order";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";

export default function ShippingForm({
  onPlaceOrder,
  submitting,
}: {
  onPlaceOrder: (address: ShippingAddress) => void;
  submitting: boolean;
}) {
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const update = (field: keyof ShippingAddress) => (e: ChangeEvent<HTMLInputElement>) =>
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPlaceOrder(address);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-5 shadow-card">
      <h2 className="font-serif text-lg font-semibold text-espresso">Shipping Address</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Full Name" required value={address.fullName} onChange={update("fullName")} />
        <TextField label="Phone" type="tel" required value={address.phone} onChange={update("phone")} />
        <div className="sm:col-span-2">
          <TextField label="Address Line 1" required value={address.line1} onChange={update("line1")} />
        </div>
        <div className="sm:col-span-2">
          <TextField label="Address Line 2 (optional)" value={address.line2} onChange={update("line2")} />
        </div>
        <TextField label="City" required value={address.city} onChange={update("city")} />
        <TextField label="State" required value={address.state} onChange={update("state")} />
        <TextField label="Postal Code" required value={address.postalCode} onChange={update("postalCode")} />
      </div>

      <Button
        type="submit"
        variant="filled"
        disabled={submitting}
        icon={submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
        className="mt-6 w-full disabled:opacity-70"
      >
        {submitting ? "Processing Payment…" : "Place Order"}
      </Button>
      <p className="mt-3 text-center text-[11px] text-espresso/45">
        You&apos;ll be redirected to Razorpay to complete payment securely.
      </p>
    </form>
  );
}
