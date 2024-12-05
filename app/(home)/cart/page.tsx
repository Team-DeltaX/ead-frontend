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
import Spinner from "@/components/Spinner";
import { CgUnavailable } from "react-icons/cg";

const ProductCart = () => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [data, setData] = useState<Cart | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await cartService.getCartItems();
      const fetchedCart = response.data;
      setIsLoading(false);
      console.log("Fetched cart:", fetchedCart);
      
        const totalAmount = fetchedCart.items.reduce(
          (total: number, item: { unitPrice: number; quantity: number }) => {
            return (
              total + (item.unitPrice ? item.unitPrice * item.quantity : 0)
            );
          },
          0
        );

        setData({ ...fetchedCart, totalAmount });
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleQuantityChange = async (
    id: number,
    delta: number,
    productId: number
  ) => {
    if (!cart) return;

    const updatedItems = cart.items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );

    const updatedTotalAmount = updatedItems.reduce((total, item) => {
      return total + (item.unitPrice ? item.unitPrice * item.quantity : 0);
    }, 0);

    setCart({
      ...cart,
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    });

    try {
      await cartService.updateItemQuantity(
        cart.id,
        productId,
        updatedItems.find((item) => item.id === id)?.quantity || 1
      );
      // getCartItems();
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  const removeCartItem = async (cartId: number, productId: number) => {
    try {
      await cartService.removeCartItem(cartId, productId);
      getCartItems();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    console.log("dataaaaaaaa",data)
    setCart(data);
  }, [data]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : cart ? (
        <div className="xl:px-32 lg:px-32 md:px-18 px-5 xl:py-8 lg:py-8 md:py-5 sm:py-2 py-2">
          <div>
            <h1 className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] font-SFPro font-bold">
              Shopping Cart
            </h1>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 py-4 gap-4">
            <div className="flex">
              <ScrollArea className="h-[450px] rounded-md w-full pr-6">
                {cart &&
                  cart.items.map((item) => (
                    <div key={item.id}>
                      <div className="pl-4 py-4 flex items-start justify-start">
                        <div className="w-2/12">
                          <Image
                            src={Iphone}
                            alt="Iphone"
                            width={50}
                            height={50}
                          />
                        </div>
                        <div className="w-4/12">
                          <h1 className="lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro font-medium text-black">
                            {item.product.productName}
                          </h1>
                          <h1 className="lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] font-SFPro font-normal text-black opacity-40">
                            {item.product.id}
                          </h1>
                        </div>
                        <div className="w-2/12 inline-flex items-center lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro gap-2">
                          <button
                            onClick={() =>
                              item.product.id !== undefined &&
                              handleQuantityChange(item.id, -1, item.product.id)
                            }
                          >
                            -
                          </button>
                          <h1 className="rounded-md border px-2">
                            {item.quantity}
                          </h1>
                          <button
                            onClick={() =>
                              item.product.id !== undefined &&
                              handleQuantityChange(item.id, 1, item.product.id)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="pl-4 w-3/12">
                          <h1 className="lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro font-medium text-black">
                            Rs.{" "}
                            {item.unitPrice && item.quantity
                              ? (item.unitPrice * item.quantity).toFixed(2)
                              : "0.00"}
                          </h1>
                        </div>
                        <div className="w-1/12 inline-flex justify-end">
                          <button className="text-red-500 text-[20px]">
                            <IoIosRemoveCircleOutline
                              onClick={() => {
                                if (
                                  cart.id !== undefined &&
                                  item.product.id !== undefined
                                ) {
                                  removeCartItem(cart.id, item.product.id);
                                }
                              }}
                            />
                          </button>
                        </div>
                      </div>
                      <Separator orientation="horizontal" />
                    </div>
                  ))}
              </ScrollArea>
              <Separator orientation="vertical" />
            </div>
            <div className="w-full px-10">
              <h1 className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] font-SFPro font-bold text-black">
                Order Summary
              </h1>
              <div className="mt-4">
                <div className="flex items-center justify-between py-4">
                  <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-bold text-black">
                    Subtotal
                  </h1>
                  <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-bold text-black">
                    Rs.{" "}
                    {cart
                      ? cart.totalAmount !== undefined
                        ? cart.totalAmount.toFixed(2)
                        : "0.00"
                      : "0.00"}
                  </h1>
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
                    Estimated Shipping & Handling
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
                    Rs.{" "}
                    {cart
                      ? cart.totalAmount !== undefined
                        ? (cart.totalAmount + 99.99 + 99.99).toFixed(2)
                        : "0.00"
                      : "0.00"}
                  </h1>
                </div>
                <button
                  onClick={() => setPaymentDialogOpen(true)}
                  className="bg-black text-white py-3 rounded-lg w-full mt-4"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
          <PaymentDialog
            isOpen={paymentDialogOpen}
            onOpenChange={setPaymentDialogOpen}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center md:min-h-[500px]">
          <div className="flex justify-center items-center mb-1">
            <CgUnavailable className=" text-[15px] sm:text-[15px] md:text-[18px] lg:text-[20px] text-gray-500" />
          </div>
          <div>
            <h2 className="text-[12px] sm:text-[12px] md:text-[14px] lg:text-[15px] text-gray-500 font-SFPro">
              User Data not available
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default isAuth(ProductCart, { allowedRoles: ["USER", "ADMIN"] });
