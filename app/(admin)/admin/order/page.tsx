"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/services/order.service";
import { orderService } from "@/services/order.service";

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await orderService.getAllOrders();
        setOrders(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "delivered":
        return <Badge variant="outline">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl ml-2 mb-4">Orders</h1>
      <div className="overflow-x-auto rounded-xl">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
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
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="font-semibold py-3 px-6">{order.orderDate}</td>
                  <td className="py-3 px-6">
                    {order.user ? (
                      <div>
                        <p className="font-semibold">
                          {order.user?.firstName || "Unknown"} {order.user?.lastName && order.user.lastName}
                        </p>
                        <ul className="list-disc list-inside">
                          {order.user.email && <li>{order.user.email}</li>}
                          {order.user.address && <li>{order.user.address}</li>}
                        </ul>
                      </div>
                    ) : (
                      <p>Unknown</p>
                    )}
                  </td>
                      <td className="py-3 px-6">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="mb-2">
                          <div className="flex  items-center">
                            <p className="font-semibold">{item.productName}</p>
                            <p className="ml-4">Qty: <span className="font-semibold">{item.quantity}</span></p>
                          </div>
                          {/* <p>Price: <span className="font-semibold">Rs.{item.price}</span></p> */}
                        </div>
                      ))}
                    </td>
                   
                  <td className="font-semibold py-3 px-8">
                    Rs.{order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-8">{renderBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
