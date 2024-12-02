import { CheckCircle } from "lucide-react";
import React from "react";

interface AddressBoxProps {
  customerName: string;
  addressLine: string;
  phoneNumber: string;
  isSelected?: boolean;
}

const AddressBox: React.FC<AddressBoxProps> = ({
  customerName,
  addressLine,
  phoneNumber,
  isSelected = false,
}) => {
  return (
    <div className="flex justify-between p-4 bg-gray-200 w-[300px] md:w-[1000px] rounded-md h-28">
      {/* Selector and address */}
      <div className="flex">
        {/* Selector */}
        <div className="mr-4">
          {/* Radio button */}
          <input
            type="radio"
            name="address"
            defaultChecked={isSelected}
            style={{
              width: "1.25rem",
              height: "1.25rem",
              accentColor: "black", // Makes the selected color black
            }}
          />
        </div>
        {/* Address */}
        <div>
          <span className="font-extralight">{customerName}</span>
          <br />
          <span className="text-sm text-gray-500 font-light">
            {addressLine}
          </span>
          <br />
          <span className="text-sm text-gray-500 font-light">
            {phoneNumber}
          </span>
        </div>
      </div>
      {/* Icon */}
      <div>
        <CheckCircle />
      </div>
    </div>
  );
};

export default AddressBox;
