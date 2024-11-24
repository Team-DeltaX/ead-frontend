"use client";
import React, { useState } from "react";
import { OrderStatusSelect } from "@/components/OrderStatusSelect";

interface Order {
  date: string;
  paid: boolean;
  recipient: {
    name: string;
    email: string;
    address: string;
  };
  products: string[];
  status: "Processing" | "Shipped" | "Delivered";
}

const initialOrders: Order[] = [
  {
    date: "4/8/2023, 4:41:16 PM",
    paid: false,
    recipient: {
      name: "Dawid Paszko",
      email: "dawid.paszko@gmail.com",
      address: "Stockholm 12345 Sweden, Test 123",
    },
    products: ["Xiaomi Redmi Note 11 x1", "MSI Laptop LED x3", "ASUS Rog Gaming Laptop x2"],
    status: "Processing",
  },
  {
    date: "4/8/2023, 4:37:39 PM",
    paid: false,
    recipient: {
      name: "Dawid Paszko",
      email: "dawid.paszko@gmail.com",
      address: "Stockholm 12345 Sweden, Test 123",
    },
    products: ["MSI Laptop LED x4", "Xiaomi Redmi Note 11 x1", "ASUS Rog Gaming Laptop x2"],
    status: "Shipped",
  },
  {
    date: "4/7/2023, 2:49:42 PM",
    paid: true,
    recipient: {
      name: "Dawid Paszko",
      email: "dawid.paszko@gmail.com",
      address: "Stockholm 12345 Sweden, Test 123",
    },
    products: ["Xiaomi Redmi Note 11 x1", "ASUS Rog Gaming Laptop x2"],
    status: "Delivered",
  },
];

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (index: number, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl ml-2 mb-4">Orders</h1>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-gray-400 text-lg leading-normal">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Recipient</th>
              <th className="py-3 px-6 text-left">Products</th>
              <th className="py-3 px-6 text-left">Order Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{order.date}</td>
                
                <td className="py-3 px-6">
                  <div>
                    <p className="font-semibold">{order.recipient.name}</p>
                    <p>{order.recipient.email}</p>
                    <p>{order.recipient.address}</p>
                  </div>
                </td>
                <td className="py-3 px-6">
                  <ul className="list-disc list-inside">
                    {order.products.map((product, i) => (
                      <li key={i}>{product}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-6">
                  <OrderStatusSelect />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
