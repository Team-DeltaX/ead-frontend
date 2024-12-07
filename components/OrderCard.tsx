import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Order, orderService } from "@/services/order.service";
import toast from "react-hot-toast";

const OrderCard = ({ order,
  fetchData
}: {
  order: Order
  fetchData: () => void
  }) => {

  const handleConfirmDelivery = async (status: string) => {
    toast.promise(
      (async () => {
        await orderService.updateOrder(order.id, status);
        fetchData();
        return "Order status updated successfully";
      })(),
      {
        loading: "Updating order status...",
        success: (message) => message,
        error: "Failed to update order status",
      }
    );
  }


  return (
    <div className="font-SFPro text-semibold">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:no-underline focus:no-underline ">
            <div className="flex items-center justify-start  w-full px-2">
              <div className="flex items-center w-4/12 justify-start">
                <div className="border-2 border-gray-400 w-[12px] h-[12px] mr-2"></div>
                <h1 className="flex-1 ">{order.orderDate}</h1>
              </div>
              <div className="w-5/12">
                <h1 className="flex-1 ">
                  Total Amount: Rs. {order.totalAmount}
                </h1>
              </div>
              <div className="w-3/12 justify-end items-end justify-items-end">
                {order.status === "PENDING" ? (
                  <div className="bg-yellow-200  py-1 rounded  text-[10px] text-yellow-700 w-[70px] text-center">
                    {order.status}
                  </div>
                ) : order.status === "DELIVERED" ? (
                  <div className="bg-green-200  py-1 rounded  text-[10px] text-green-700 w-[70px] text-center">
                    {order.status}
                  </div>
                ) : (
                  <div className="bg-red-200  py-1 rounded  text-[10px] text-red-500 w-[70px] text-center">
                    {order.status}
                  </div>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {order.orderItems.map((item) => (
              <div className="bg-gray-100 px-6 mb-2" key={item.productId}>
                <div className="flex  justify-between w-full px-2 text-[12px] py-2">
                  <div className="w-5/12">
                    <h1 className="">{item.productName}</h1>
                    <h1 className="text-[8px] text-gray-600">
                      {item.productId}
                    </h1>
                  </div>
                  <div className="w-4/12">
                    <h1 className="justify-self-start">
                      Quantity: {item.quantity}
                    </h1>
                  </div>
                  <div className="w-3/12 justify-items-end">
                    <h1 className="">Price: Rs {item.price}</h1>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex flex-row gap-3 justify-end">
              <div className="flex justify-end mt-2">
                <button className="bg-green-500 text-white px-4 py-1 rounded"
                  onClick={() => handleConfirmDelivery("DELIVERED")}
                >
                  Confirm Delivery
                </button>
              </div>

              <div className="flex justify-end mt-2">
                <button className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={() => handleConfirmDelivery("CANCELLED")}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OrderCard;
