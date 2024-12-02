import React, { useState } from "react";
import AddressBox from "./AddressBox";
import NewAddressDialog from "./NewAddressDialog";
import { Button } from "../ui/button";

interface PaymentAddressProps {
  activeComponent: number;
  setActiveComponent: (step: number) => void;
}

interface Address {
  customerName: string;
  addressLine: string;
  phoneNumber: string;
}

const PaymentAddress: React.FC<PaymentAddressProps> = ({
  activeComponent,
  setActiveComponent,
}) => {
  const [addressDetails, setAddressDetails] = useState<Address[]>([
    {
      customerName: "Chathura",
      addressLine: "Colombo",
      phoneNumber: "0786654234",
    },
  ]);

  // Function to add a new address to the list
  const handleNewAddress = (newAddress: Address) => {
    setAddressDetails([...addressDetails, newAddress]);
  };

  return (
    <div className="flex items-center justify-center w-[300px] md:w-[1200px] mx-auto mt-10 space-x-4">
      <div className="px-10">
        <h2 className="font-bold pb-4">Select Address</h2>
        {/* Mapping addresses */}
        <div className="flex flex-col gap-3">
          {addressDetails.map((address, index) => (
            <AddressBox
              key={index}
              customerName={address.customerName}
              addressLine={address.addressLine}
              phoneNumber={address.phoneNumber}
            />
          ))}
        </div>
        {/* Add new address */}
        <div className="flex flex-col items-center justify-center mt-4 ">
          <NewAddressDialog onAddNewAddress={handleNewAddress} />
          <h2 className="text-sm font-semibold">Add new Address</h2>
        </div>
        {/* Back/Next Button */}
        <div className="flex gap-6 justify-end mt-3 sm:mt-0">
          <Button
            className="px-10 py-6 border border-black text-lg hover:bg-white hover:text-black bg-white text-black"
            onClick={() => setActiveComponent(activeComponent - 1)}
          >
            Back
          </Button>
          <Button
            className="px-10 py-6 text-lg hover:bg-black hover:text-white bg-black text-white border-b-2"
            onClick={() => setActiveComponent(activeComponent + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentAddress;
