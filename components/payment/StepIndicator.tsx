// components/StepIndicator.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { Dot, Circle, MapPin } from "lucide-react";

interface StepIndicatorProps {
  activeStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ activeStep }) => {

  return (
    <div className="flex items-center justify-center w-[1200px] mx-auto mt-8 space-x-4  h-20">
      {/*steps*/}
      <div className="flex flex-row w-full justify-between">
        {/*step1*/}
        <div className={`flex p-4 gap-2 ${activeStep === 1  ? "opacity-100" : "opacity-40"}`}>
          {/*icon*/}
          <div className="flex items-center justify-center">
            <img src="/assets/image/Location.svg" alt="location"></img>
          </div>
          {/*text*/}
          <div className="flex flex-col items-center">
            <div className="flex">
              {" "}
              <p className="m-0 font-medium">Step1</p>
            </div>
            <div className="flex">
              {" "}
              <p className="m-0 font-bold">Address</p>
            </div>
          </div>
         
        </div>
        {/*step2*/}
        <div className={`flex p-4 gap-2 ${activeStep === 2  ? "opacity-100" : "opacity-40"}`}>
           {/*line*/}
           <div className="flex items-center px-4">
            <img src="/assets/image/Line.svg"></img>
          </div>
          {/*icon*/}
          <div className="flex items-center justify-center">
            <img src="/assets/image/Shipping.svg" alt="location"></img>
          </div>
          {/*text*/}
          <div className="flex flex-col items-center">
            <div className="flex">
              {" "}
              <p className="m-0 font-medium">Step2</p>
            </div>
            <div className="flex">
              {" "}
              <p className="m-0 font-bold">Shipping</p>
            </div>
          </div>
          
        </div>
        {/*step3*/}
        <div className={`flex p-4 gap-2 ${activeStep === 3 ? "opacity-100" : "opacity-40"}`}>
           {/*line*/}
           <div className="flex items-center px-4">
            <img src="/assets/image/Line.svg"></img>
          </div>
          {/*icon*/}
          <div className="flex items-center justify-center">
            <img src="/assets/image/Payment.svg" alt="location"></img>
          </div>
          {/*text*/}
          <div className="flex flex-col items-center">
            <div className="flex">
              {" "}
              <p className="m-0 font-medium">Step3</p>
            </div>
            <div className="flex">
              {" "}
              <p className="m-0 font-bold">Payment</p>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default StepIndicator;
