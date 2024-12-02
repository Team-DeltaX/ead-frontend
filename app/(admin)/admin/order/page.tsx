"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/services/order.service";
import { orderService } from "@/services/order.service";
import { Sortby } from "@/components/Sortby";
import isAuth from "@/components/isAuth";

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await orderService.getAllOrders();
        console.log("Orders:", response.data);
        setOrders(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch orders. Please try again later. "+err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Badge variant="secondary" color="">Pending</Badge>;
      case "delivered":
        return <Badge variant="outline" color="">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive" color="">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-row justify-between items-center p-3 bg-gray-100">
        <div className="text-2xl ml-2">Orders</div>
        <Sortby />
      </div>
      <div className="p-4">
        <div className="overflow-y-auto h-[calc(100vh-200px)] border border-gray-300 rounded-xl shadow-lg">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="text-gray-500 font-semibold mb-4">Loading ...</div>
              <div className="flex items-center justify-center min-h-full">
                <div className="spinner border-t-4 border-b-4 border-gray-900 w-16 h-16 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">{error}</div>
          ) : (
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-gray-200 shadow-sm">
                <tr>
                  <th className="px-6 py-3 text-gray-600 font-semibold">Date</th>
                  <th className="px-6 py-3 text-gray-600 font-semibold">Recipient</th>
                  <th className="px-6 py-3 text-gray-600 font-semibold">Products</th>
                  <th className="px-6 py-3 text-gray-600 font-semibold">Total Amount</th>
                  <th className="px-6 py-3 text-gray-600 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-6 py-3">{order.orderDate}</td>
                      <td className="px-6 py-3">
                        {order.user ? (
                          <div>
                            <p className="font-semibold">
                              {order.user.firstName} {order.user.lastName || ""}
                            </p>
                            <p className="text-sm text-gray-500">{order.user.email}</p>
                          </div>
                        ) : (
                          "Unknown"
                        )}
                      </td>
                      <td className="px-6 py-3">
                        {order.orderItems.map((item, index) => (
                          <p key={index}>
                            {item.productName} (x{item.quantity})
                          </p>
                        ))}
                      </td>
                      <td className="px-6 py-3">Rs.{order.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-3">{renderBadge(order.status)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default isAuth(OrdersTable, { allowedRoles: ["ADMIN"] });
