"use client";
import React,{useState,useEffect} from "react";
import { Separator } from "@/components/ui/separator";
import PasswordChange from "@/components/forms/PasswordChange";
import OrderCard from "@/components/OrderCard";
import { userService, User } from "@/services/user.service";


const Profile = () => {
  const[userData,setUserData] = useState<User>();
  const[loading,setLoading] = useState<boolean>(false);
  const getUserDetails = async () => {
    try {
      const response = await userService.getUserById();
      console.log(response);
    } catch (error) {
      console.log(error);
    }finally{
      console.log("fetching user details");
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="xl:px-32 lg:px-32 md:px-18 px-5  grid grid grid-cols-2 gap-10 pt-10">
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
              First Name : <span className="text-gray-500"> Sasindu</span>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 px-20 pt-2">
            <label
              htmlFor="name"
              className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
            >
              Last Name : <span className="text-gray-500"> Sandaruwan</span>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 px-20 pt-2">
            <label
              htmlFor="name"
              className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
            >
              E-mail :
              <span className="text-gray-500">godagesasindu@gmail.com</span>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 px-20 pt-2">
            <label
              htmlFor="name"
              className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
            >
              Phone :<span className="text-gray-500">+9471234567</span>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 px-20 pt-2">
            <label
              htmlFor="name"
              className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
            >
              E-mail :{" "}
              <span className="text-gray-500">godagesasindu@gmail.com</span>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 px-20 pt-2">
            <label
              htmlFor="name"
              className="text-[11px] sm:text-[11px] md:text-[12px] lg:text-[14px] font-SFPro text-black"
            >
              Address : <span className="text-gray-500">Matara</span>
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
        <OrderCard />
      </div>
    </div>
  );
};

export default Profile;
