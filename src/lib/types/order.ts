// Mirrors the real backend order shape — see lib/types/admin.ts, which the
// same GET /orders(/:id) endpoint backs for both customer and admin views.
export type {
  AdminShippingAddress as ShippingAddress,
  AdminOrderItem as OrderItem,
  AdminOrderStatus as OrderStatus,
  AdminOrder as Order,
} from "./admin";
