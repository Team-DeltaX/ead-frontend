"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Iphone from "../../assets/sliderimages/Iphone.png";
import Image from "next/image";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { PaymentDialog } from "@/components/payment/paymentDialog";
import isAuth from "@/components/isAuth";
import { Cart, cartService } from "@/services/cart.service";

const ProductCart = () => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [cart, setCart] = useState<Cart>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await cartService.getCartItems();

      setCart(response.data);
      console.log(response);
      //console.log(cartItem);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("fetching cart items");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);


  const handleQuantityChange = (id: number, delta: number) => {
    if (!cart) return;

    // Update the items within the cart
    const updatedItems = cart.items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );

    // Set the updated cart
    setCart({
      ...cart,
      items: updatedItems,
    });
  };

  return (
    <div className="xl:px-32 lg:px-32 md:px-18 px-5 xl:py-8 lg:py-8 md:py-5 sm:py-2 py-2">
      <div>
        <h1 className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] font-SFPro font-bold">
          Shopping Cart {cart && cart.totalAmount}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 py-4 gap-4">
        <div className="flex  ">
          <ScrollArea className="h-[450px] rounded-md w-full pr-6">
            {cart &&
              cart.items.map((item) => (
                <div key={item.id}>
                  <div className="pl-4 py-4 flex items-start justify-start">
                    <div className="w-2/12 ">
                      <Image src={Iphone} alt="Iphone" width={50} height={50} />
                    </div>
                    <div className="w-4/12 ">
                      <h1 className="lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro font-medium text-black">
                        {item.product.productName}
                      </h1>
                      <h1 className=" lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] font-SFPro font-normal text-black opacity-40">
                        {item.product.id}
                      </h1>
                    </div>
                    <div className="w-2/12 inline-flex items-center lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro gap-2  ">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>
                        -
                      </button>
                      <h1 className="rounded-md border px-2">
                        {item.quantity}
                      </h1>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>
                        +
                      </button>
                    </div>
                    <div className="pl-4 w-3/12  justify-start ">
                      <h1 className="lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro font-medium text-black">
                        Rs. {(item.unitPrice * item.quantity).toFixed(2)}
                      </h1>
                    </div>
                    <div className="w-1/12 inline-flex justify-end ">
                      <button className="text-red-500 text-[20px]">
                        <IoIosRemoveCircleOutline />
                      </button>
                    </div>

                  </div>
                  <Separator orientation="horizontal" />
                </div>
              ))}
          </ScrollArea>
          <Separator orientation="vertical" />
        </div>
        <div className="w- px-10 ">
          <h1 className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] font-SFPro font-bold text-black">
            Order Summary
          </h1>
          <div className="mt-4">
            <div className="flex items-center justify-between py-4">
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-bold text-black">
                Subtotal
              </h1>
              {/* <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-bold text-black">
                Rs. {subtotal.toFixed(2)}
              </h1> */}
            </div>
            <div className="flex items-center justify-between py-4">
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-thin text-gray-600">
                Estimated Tax
              </h1>
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-thin text-gray-600">
                Rs. 99.99
              </h1>
            </div>
            <div className="flex items-center justify-between py-4">
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-medium text-gray-600">
                Estimated shipping & Handling
              </h1>
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-medium text-gray-600">
                Rs. 99.99
              </h1>
            </div>
            <Separator orientation="horizontal" />
            <div className="flex items-center justify-between py-4">
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-bold text-black">
                Total
              </h1>
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-bold text-black">
                Rs. 999.99
              </h1>
            </div>
            <button
              onClick={() => {
                setPaymentDialogOpen(true);
              }}
              className="bg-black text-white rounded-md py-2 w-full mt-4 lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-bold"
            >
              Check Out
            </button>
            <PaymentDialog
              isOpen={paymentDialogOpen}
              onOpenChange={setPaymentDialogOpen}
            ></PaymentDialog>
          </div>
        </div>
      </div>
    </div>
  );
};


export default isAuth(Cart, { allowedRoles: ["USER", "ADMIN"] });