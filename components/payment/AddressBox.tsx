import { CheckCircle } from "lucide-react";
import React from "react";

function AddressBox() {
  return (
    <div className="flex justify-between p-4 bg-gray-200 w-[300] md:w-[1000] rounded-md h-28">
      <div className="flex">
        <div className="mr-4">
          <input
            type="radio"
            name="address"
            style={{
              width: "1.25rem",
              height: "1.25rem",
              accentColor: "black", 
            }}
            
          />
        </div>
        <div>
            <span className="font-extralight">2118 Tharindage</span><br></br>
            <span className="text-sm text-gray-500 font-light">2118 Tharindage Cir.Syracue,Connecticut 35624</span><br></br>
            <span className="text-sm text-gray-500 font-light">(209) 555-0104</span>
        </div>
      </div>
      <div>
        <CheckCircle />
      </div>
    </div>
  );
}

export default AddressBox;
