import { CheckCircle } from "lucide-react";
import React from "react";
import { MdCheckBox } from "react-icons/md";

function AddressBox() {
  return (
    <div className="flex justify-between p-4 bg-gray-200 w-[300] md:w-[1000] rounded-md h-28">
      {/*selector and address*/}
      <div className="flex">
        {/*selector*/}
        <div className="mr-4">
          {/*radio button*/}
          <input
            type="radio"
            name="address"
            style={{
              width: "1.25rem",
              height: "1.25rem",
              accentColor: "black", // Makes the selected color black
            }}
            
          />
        </div>
        {/*address*/}
        <div>
            <span className="font-extralight">2118 Tharindage</span><br></br>
            <span className="text-sm text-gray-500 font-light">2118 Tharindage Cir.Syracue,Connecticut 35624</span><br></br>
            <span className="text-sm text-gray-500 font-light">(209) 555-0104</span>
        </div>
      </div>
      {/*button*/}
      <div>
        <CheckCircle></CheckCircle>
      </div>
    </div>
  );
}

export default AddressBox;
