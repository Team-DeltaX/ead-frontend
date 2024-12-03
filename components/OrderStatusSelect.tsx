import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// type Order = {
//   id: number;
//   status: "pending" | "processing" | "shipped" | "delivered";
// };

// const initialOrders: Order[] = [
//   { id: 1, status: "pending" },
//   { id: 2, status: "processing" },
//   { id: 3, status: "shipped" },
//   { id: 4, status: "delivered" },
// ];

const OrderStatusSelect = () => {
  // const [orders, setOrders] = useState<Order[]>(initialOrders);

  // const handleStatusChange = (index: number, newStatus: Order["status"]) => {
  //   const updatedOrders = orders.map((order, i) =>
  //     i === index ? { ...order, status: newStatus } : order
  //   );
  //   setOrders(updatedOrders);
  // };

  return (
    <Select>
      <SelectTrigger className="w-[180px] appearance-none text-white min-w-[120px] py-2 pl-4 pr-8 rounded-full shadow-lg  transition-all duration-300 ease-in-out text-xs focus:outline-none capitalize">
        <SelectValue placeholder="processing" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export { OrderStatusSelect };
