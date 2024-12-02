"use client";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import PasswordChange from "@/components/forms/PasswordChange";
import OrderCard from "@/components/OrderCard";
import { userService, User } from "@/services/user.service";
import isAuth from "@/components/isAuth";

import Spinner from "@/components/Spinner";
import { orderService, Order } from "@/services/order.service";
import { CgUnavailable } from "react-icons/cg";

const Profile = () => {
  const [userData, setUserData] = useState<User>();
  const [orders, setOrders] = useState<Order[]>([]);

  const [isloading, setLoading] = useState<boolean>(false);
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await userService.getUserById();
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("fetching user details");
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserOrdersList = async () => {
    try {
      setLoading(true);
      const response = await orderService.getUserOrders();
      setOrders(response.data);
      console.log("order", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("fetching user orders");
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserOrdersList();
  }, []);

  return (
    <div>
      {isloading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : userData ? (
        <div className="xl:px-32 lg:px-32 md:px-18 px-5   grid md:grid-cols-2 grid-cols-1 gap-10 pt-10">
          <div>
            <div className="pb-10">
              <div className="pb-5">
                <h1 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] font-SFPro font-semibold">
                  User Details
                </h1>
                <Separator />
              </div>
              <div className="grid grid-cols-1 gap-4 px-20 pt-2">
                <label
                  htmlFor="name"
                  className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
                >
                  First Name :{" "}
                  <span className="text-gray-500"> {userData?.firstName}</span>
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 px-20 pt-2">
                <label
                  htmlFor="name"
                  className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
                >
                  Last Name :{" "}
                  <span className="text-gray-500"> {userData?.lastName}</span>
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 px-20 pt-2">
                <label
                  htmlFor="name"
                  className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
                >
                  E-mail :
                  <span className="text-gray-500">{userData?.email}</span>
                </label>
              </div>
              <div className="grid grid-cols-1 gap-4 px-20 pt-2">
                <label
                  htmlFor="name"
                  className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
                >
                  Phone :
                  <span className="text-gray-500">{userData?.phone}</span>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 px-20 pt-2">
                <label
                  htmlFor="name"
                  className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
                >
                  Address :{" "}
                  <span className="text-gray-500">{userData?.address}</span>
                </label>
              </div>
            </div>
            <div className="pb-10">
              <div className="pb-5">
                <h1 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] font-SFPro font-semibold">
                  Password Setting
                </h1>
                <Separator />
              </div>
              <div className="px-20 pt-2">
                <PasswordChange />
              </div>
            </div>
          </div>
          <div>
            <div className="pb-5">
              <h1 className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[16px] font-SFPro font-semibold">
                Order Details
              </h1>
              <Separator />
            </div>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
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

export default isAuth(Profile, { allowedRoles: ["USER","ADMIN"] });
