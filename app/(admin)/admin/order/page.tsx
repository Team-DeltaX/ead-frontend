"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/services/order.service";
import { orderService } from "@/services/order.service";
import { OrderItem } from "@/services/order.service";
import { Recipient } from "@/services/order.service";



const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [recipient, setRecipient] = useState<Recipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await orderService.getAllOrders();
        setOrders(response.data);
        setOrderItems(response.data);
        setRecipient(response.data);
        console.log(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
              <th className="py-3 px-6 text-left">Total Amount</th>
              <th className="py-3 px-6 text-left">Order Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{order.orderDate}</td>
                
                <td className="py-3 px-6">
                  <div>
                    <p className="font-semibold">samna</p>
                    <p>samana@.com</p>
                    <p>kegalle</p>
                  </div>
                </td>
                <td className="py-3 px-6">
                  <ul className="list-disc list-inside">
                    {order.orderItems.map((item, i) => (
                      <li key={i}>{item.productName}</li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-6">
                <Badge variant="destructive">{order.status}</Badge>
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
