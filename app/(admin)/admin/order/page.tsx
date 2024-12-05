"use client";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/services/order.service";
import { orderService } from "@/services/order.service";
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
        return <Badge variant="outline">Pending</Badge>;
      case "delivered":
        return <Badge variant="secondary">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive" color="">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl ml-2 mb-4">Orders</h1>
      <div className="overflow-x-auto rounded-xl">
        {isLoading ? (
          <div>
          <div className="text-center pt-4 text-gray-500 font-semibold mb-4">
            Loading ...
          </div>
          <div className="flex items-center justify-center min-h-full">
            <div className="spinner border-t-4 border-b-4 border-gray-900 w-16 h-16 rounded-full animate-spin"></div>
          </div>
        </div>
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
              {orders &&
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="font-semibold py-3 px-6">
                      {order.orderDate}
                    </td>
                    <td className="py-3 px-6">
                      {order.user ? (
                        <div>
                          <p className="font-semibold">
                            {order.user?.firstName || "Unknown"}{" "}
                            {order.user?.lastName && order.user.lastName}
                          </p>
                          <ul className="list-disc list-inside">
                            {order.user.email && <li>{order.user.email}</li>}
                            {order.user.address && (
                              <li>{order.user.address}</li>
                            )}
                          </ul>
                        </div>
                      ) : (
                        <p>Unknown</p>
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {order.orderItems && order.orderItems.map((item) => (
                        <div key={item.productId}>
                          <div className="flex  items-center">
                            <p className="font-semibold">{item.productName}</p>
                            <p className="ml-4">
                              Qty:{" "}
                              <span className="font-semibold">
                                {item.quantity}
                              </span>
                            </p>
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

export default isAuth(OrdersTable, { allowedRoles: ["ADMIN"] });
