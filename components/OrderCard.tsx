import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const OrderCard = () => {
  return (
    <div className="font-SFPro text-semibold">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          {/* Add Tailwind `no-underline` utility */}
          <AccordionTrigger className="no-underline hover:no-underline focus:no-underline ">
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center">
                <div className="border-2 border-gray-400 w-[12px] h-[12px] mr-2"></div>
                <h1 className="flex-1 text-center">20/10/2024</h1>
              </div>
              <h1 className="flex-1 text-center">Total Amount: Rs 20,000</h1>
              <div className="bg-green-200  py-1 rounded  text-[10px] text-green-500 w-[70px] text-center">
                Processing
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="bg-gray-100 px-6 mb-2">
              <div className="flex  justify-between w-full px-2 text-[12px] py-2">
                <div>
                  <h1 className="">Apple iPhone 14 Pro Max</h1>
                  <h1 className="text-[8px] text-gray-600">#25139526913984</h1>
                </div>
                <h1 className="justify-self-start">Quantity: 2</h1>

                <h1 className="">Price: Rs 20,000</h1>
              </div>
            </div>
            <div className="bg-gray-100 px-6 mb-2">
              <div className="flex  justify-between w-full px-2 text-[12px] py-2">
                <div>
                  <h1 className="">Apple iPhone 14 Pro Max</h1>
                  <h1 className="text-[8px] text-gray-600">#25139526913984</h1>
                </div>
                <h1 className="justify-self-start">Quantity: 2</h1>

                <h1 className="">Price: Rs 20,000</h1>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="no-underline hover:no-underline focus:no-underline">
            <div className="flex items-center justify-between w-full px-2">
              <div className="flex items-center">
                <div className="border-2 border-gray-400 w-[12px] h-[12px] mr-2"></div>
                <h1 className="flex-1 text-center">20/10/2024</h1>
              </div>
              <h1 className="flex-1 text-center">Total Amount: Rs 2000</h1>
              <div className="bg-red-200  py-1 rounded text-red-600 text-[10px] w-[70px] text-center">
                Pending
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default OrderCard;
