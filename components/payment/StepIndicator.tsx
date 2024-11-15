import React from "react";

interface StepIndicatorProps {
  activeStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ activeStep }) => {
  return (
    <div className="flex items-center justify-center md:w-[1200px] mx-auto mt-8 space-x-4 h-20">
      {/* steps container */}
      <div className="flex flex-row w-full justify-center sm:justify-between">
        
        {/* Step 1 */}
        <div
          className={`flex p-4 gap-2 ${
            activeStep === 1 ? "opacity-100" : "opacity-40"
          } ${activeStep !== 1 ? "md:flex hidden" : "flex"}`}
        >
          <div className="flex items-center justify-center">
            <img src="/assets/image/Location.svg" alt="location" />
          </div>
          <div className="flex flex-col items-center">
            <p className="m-0 font-medium">Step1</p>
            <p className="m-0 font-bold">Address</p>
          </div>
        </div>

        {/* Step 2 */}
        <div
          className={`flex p-4 gap-2 ${
            activeStep === 2 ? "opacity-100" : "opacity-40"
          } ${activeStep !== 2 ? "md:flex hidden" : "flex"}`}
        >
          <div className="hidden sm:flex items-center px-4">
            <img src="/assets/image/Line.svg" alt="line" />
          </div>
          <div className="flex items-center justify-center">
            <img src="/assets/image/Shipping.svg" alt="shipping" />
          </div>
          <div className="flex flex-col items-center">
            <p className="m-0 font-medium">Step2</p>
            <p className="m-0 font-bold">Shipping</p>
          </div>
        </div>

        {/* Step 3 */}
        <div
          className={`flex p-4 gap-2 ${
            activeStep === 3 ? "opacity-100" : "opacity-40"
          } ${activeStep !== 3 ? "md:flex hidden" : "flex"}`}
        >
          <div className="hidden sm:flex items-center px-4">
            <img src="/assets/image/Line.svg" alt="line" />
          </div>
          <div className="flex items-center justify-center">
            <img src="/assets/image/Payment.svg" alt="payment" />
          </div>
          <div className="flex flex-col items-center">
            <p className="m-0 font-medium">Step3</p>
            <p className="m-0 font-bold">Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
