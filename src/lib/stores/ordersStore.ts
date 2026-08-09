"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Order, OrderItem, ShippingAddress } from "@/lib/types/order";
import { SHIPPING_FLAT_RATE, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

type OrdersState = {
  orders: Order[];
  createOrder: (userId: string, items: OrderItem[], shippingAddress: ShippingAddress) => Order;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (id: string) => Order | undefined;
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      createOrder: (userId, items, shippingAddress) => {
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
        const order: Order = {
          id: `BN${Date.now().toString().slice(-8)}`,
          userId,
          items,
          subtotal,
          shipping,
          total: subtotal + shipping,
          shippingAddress,
          status: "placed",
          placedAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
      getOrdersByUser: (userId) => get().orders.filter((order) => order.userId === userId),
      getOrderById: (id) => get().orders.find((order) => order.id === id),
    }),
    { name: "brown-nation-orders" }
  )
);
