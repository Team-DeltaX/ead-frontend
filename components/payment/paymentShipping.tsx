  import React from "react";
  import { Button } from "../ui/button";
import { Cart } from "@/services/cart.service";

  interface PaymentAddressProps {
    activeComponent: number;
    setActiveComponent: (step: number) => void;
    shippingCost:number;
    setShippingCost:(cost:number)=>void;
    cart:Cart;
  }

  const PaymentShipping: React.FC<PaymentAddressProps> = ({
    cart,
    shippingCost,
    setShippingCost,
    activeComponent,
    setActiveComponent,
  }) => {

    console.log('cretedat',cart.items[0].product.createdAt)

    const originalDate = new Date(cart.items[0].product.createdAt);
const newFreeDate = new Date(originalDate.getTime() + 14 * 24 * 60 * 60 * 1000);
const newFastDeliveryDate = new Date(originalDate.getTime() + 7 * 24 * 60 * 60 * 1000);

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};


    const handleShippingChange = (cost: number) => {
      setShippingCost(cost);
    };


    return (
      <div className="flex items-center justify-center w-[300px] sm:w-[1200px] mx-auto mt-10 space-x-4">
        <div className="px-10">
          <h2 className="font-bold pb-4">Shipment method</h2>
          {/* Mapping shipping methods */}
          <div className="flex flex-col gap-3">
            {/* Regular shipment */}
            <div className="flex justify-between p-4 bg-gray-100 w-[300px] sm:w-[1000px] rounded-md h-15">
              {/* Selector and address */}
              <div className="flex">
                {/* Selector */}
                <div className="mr-4">
                  {/* Radio button (default selected) */}
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingCost === 0}
                    onChange={() => handleShippingChange(0)}
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      accentColor: "black", // Makes the selected color black
                    }}
                  />
                </div>
                {/* Price */}
                <div>
                  <span className="font-extralight">Free</span>
                </div>
                {/* Shipment type text */}
                <div className="ml-10">
                  <span className="font-light">Regular shipment</span>
                </div>
              </div>
              {/* Date */}
              <div>
                <span className="font-light">{formatDate(newFreeDate)}</span>
              </div>
            </div>

            {/* Price shipment */}
            <div className="flex justify-between p-4 bg-gray-100 w-[300px] sm:w-[1000px] rounded-md h-15">
              {/* Selector and address */}
              <div className="flex">
                {/* Selector */}
                <div className="mr-4">
                  {/* Radio button */}
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingCost === 9}
                  onChange={() => handleShippingChange(9)}
                    style={{
                      width: "1.25rem",
                      height: "1.25rem",
                      accentColor: "black", // Makes the selected color black
                    }}
                  />
                </div>
                {/* Price */}
                <div>
                  <span className="font-extralight">$8.50</span>
                </div>
                {/* Shipment type text */}
                <div className="ml-10">
                  <span className="font-light">Get your delivery as soon as possible!</span>
                </div>
              </div>
              {/* Date */}
              <div>
                <span className="font-light">{formatDate(newFastDeliveryDate)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6 justify-end mt-4">
            <Button
              className="px-10 py-6 border border-black text-lg hover:bg-white hover:text-black bg-white text-black"
              onClick={() => {
                setActiveComponent(activeComponent - 1);
              }}
            >
              Back
            </Button>
            <Button
              className="px-10 py-6 text-lg hover:bg-black hover:text-white bg-black text-white border-b-2"
              onClick={() => {
                setActiveComponent(activeComponent + 1);
              }}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  };

  export default PaymentShipping;
