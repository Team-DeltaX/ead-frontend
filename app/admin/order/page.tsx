import React from "react";

interface Order {
  date: string;
  paid: boolean;
  recipient: {
    name: string;
    email: string;
    address: string;
  };
  products: string[];
  status: "Processing" | "Shipped" | "Delivered"; // New property for order status
}

const orders: Order[] = [
  {
    date: "4/8/2023, 4:41:16 PM",
    paid: false,
    recipient: {
      name: "Dawid Paszko",
      email: "dawid.paszko@gmail.com",
      address: "Stockholm 12345 Sweden, Test 123",
    },
    products: ["Xiaomi Redmi Note 11 x1", "MSI Laptop LED x3", "ASUS Rog Gaming Laptop x2"],
    status: "Processing", // Sample status
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
    status: "Shipped", // Sample status
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
    status: "Delivered", // Sample status
  },
];

const OrdersTable: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl ml-2 mb-4">Orders</h1>
      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-gray-200 text-gray-400  text-1lg leading-normal">
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Paid</th>
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
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      order.paid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.paid ? "YES" : "NO"}
                  </span>
                </td>
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
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      order.status === "Processing"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>
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
