/**
 * Types mirroring the real backend API response shapes (`backend/src/**\/*.service.ts`).
 * `lib/types/catalog.ts` mirrors the same shapes for the storefront; this file is kept
 * separate for the admin-only fields/flows (e.g. `ProductInput`, order status transitions).
 * Money fields are decimal strings, not numbers.
 */

export type UserRole = "CUSTOMER" | "ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type CategoryStatus = "ACTIVE" | "INACTIVE";
export type HeroSlideStatus = "ACTIVE" | "INACTIVE";
export type EnquiryStatus = "NEW" | "READ" | "RESOLVED";
export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type AdminOrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";
export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export type AdminUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  order: number;
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
};

export type AdminEnquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
};

export type AdminHeroSlide = {
  id: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  image: string;
  paletteFrom: string;
  paletteTo: string;
  order: number;
  status: HeroSlideStatus;
  createdAt: string;
  updatedAt: string;
};

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  compareAtPrice: string | null;
  sku: string;
  images: string[];
  categoryId: string;
  status: ProductStatus;
  stockQuantity: number;
  isBestSeller: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminShippingAddress = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
};

export type AdminOrderItem = {
  id: string;
  orderId: string;
  productId: string | null;
  productName: string;
  sku: string;
  unitPrice: string;
  quantity: number;
  totalPrice: string;
};

export type AdminOrderStatusHistoryEntry = {
  id: string;
  orderId: string;
  status: AdminOrderStatus;
  note: string | null;
  createdAt: string;
};

export type AdminOrderCustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AdminOrder = {
  id: string;
  orderNumber: string;
  userId: string;
  user?: AdminOrderCustomer;
  status: AdminOrderStatus;
  subtotal: string;
  discount: string;
  shippingAmount: string;
  taxAmount: string;
  totalAmount: string;
  currency: string;
  shippingAddress: AdminShippingAddress;
  billingAddress: AdminShippingAddress;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
  items?: AdminOrderItem[];
  statusHistory?: AdminOrderStatusHistoryEntry[];
};

/** Mirrors backend/src/orders/order-status-transitions.ts, for enabling/disabling UI actions. */
export const ALLOWED_ORDER_STATUS_TRANSITIONS: Record<AdminOrderStatus, AdminOrderStatus[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};
