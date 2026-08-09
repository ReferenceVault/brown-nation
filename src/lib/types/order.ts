export type ShippingAddress = {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
};

export type OrderItem = {
  productId: string;
  productSlug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  price: number;
  quantity: number;
  image: string;
};

export type OrderStatus = "placed";

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  placedAt: string;
};
