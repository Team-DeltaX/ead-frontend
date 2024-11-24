"use client";
import React, { useState } from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Iphone from "../../assets/sliderimages/Iphone.png";
import Image from "next/image";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const Cart = () => {
  
  const [cartItems, setCartItems] = useState([

    {
      id: 1,
      name: "Apple iPhone 14 Pro Max",
      price: 1499.99,
      sku: "#25139526913984",
      quantity: 1,
      image: Iphone,
    },
    {
      id: 2,
      name: "Samsung Galaxy S22 Ultra",
      price: 1399.99,
      sku: "#45139526913985",
      quantity: 2,
      image: Iphone,
    },
    {
      id: 3,
      name: "Google Pixel 7 Pro",
      price: 1299.99,
      sku: "#35139526913986",
      quantity: 1,
      image: Iphone,
    },
    {
      id: 4,
      name: "OnePlus 11",
      price: 1099.99,
      sku: "#25139526913987",
      quantity: 3,
      image: Iphone,
    },
    {
      id: 5,
      name: "Sony Xperia 5 IV",
      price: 999.99,
      sku: "#25139526913988",
      quantity: 1,
      image: Iphone,
    },
    {
      id: 6,
      name: "Huawei P60 Pro",
      price: 899.99,
      sku: "#25139526913989",
      quantity: 2,
      image: Iphone,
    },
    {
      id: 7,
      name: "Xiaomi 13 Pro",
      price: 799.99,
      sku: "#25139526913990",
      quantity: 1,
      image: Iphone,
    },
    {
      id: 8,
      name: "Oppo Find X6 Pro",
      price: 749.99,
      sku: "#25139526913991",
      quantity: 2,
      image: Iphone,
    },
    {
      id: 9,
      name: "Vivo X90 Pro+",
      price: 699.99,
      sku: "#25139526913992",
      quantity: 1,
      image: Iphone,
    },
    {
      id: 10,
      name: "Asus ROG Phone 7",
      price: 1199.99,
      sku: "#25139526913993",
      quantity: 1,
      image: Iphone,
    },
  ]);

  const handleQuantityChange = (id: number, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="xl:px-32 lg:px-32 md:px-18 px-5 xl:py-8 lg:py-8 md:py-5 sm:py-2 py-2">
      <div>
        <h1 className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] font-SFPro font-bold">
          Shopping Cart
        </h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 py-4">
        <div className="flex items-center justify-between">
          <ScrollArea className="h-[450px] rounded-md w-full pr-6">
            {cartItems.map((item) => (
              <div key={item.id}>
                <div  className="p-4 flex items-center">
                  <Image src={item.image} alt={item.name} width={50} height={100} />
                  <div className="ml-6 w-[150px] ">
                    <h1 className="lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro font-medium text-black">
                      {item.name}
                    </h1>
                    <h1 className="lg:text-[12px] md:text-[10px] sm:text-[10px] text-[8px] font-SFPro font-normal text-black opacity-40">
                      {item.sku}
                    </h1>
                  </div>
                  <div className="ml-6 inline-flex items-center lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro gap-2">
                    <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                    <h1 className="rounded-md border px-2">{item.quantity}</h1>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                  </div>
                  <div className="ml-6 w-[80px]   flex justify-self-end">
                    <h1 className="lg:text-[14px] md:text-[12px] sm:text-[12px] text-[10px] font-SFPro font-medium text-black">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </h1>
                  </div>
                  <div className="ml-6 inline-flex items-end ">
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
        <div className=" px-10">
          <h1 className="lg:text-[18px] md:text-[16px] sm:text-[14px] text-[14px] font-SFPro font-bold text-black">
            Order Summary
          </h1>
          <div className="mt-4">
            <div className="flex items-center justify-between py-4">
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-bold text-black">
                Subtotal
              </h1>
              <h1 className="lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-SFPro font-bold text-black">
                Rs. {subtotal.toFixed(2)}
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
            <button className="bg-black text-white rounded-md py-2 w-full mt-4 lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-bold">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
