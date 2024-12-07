import React from "react";
import AddressBox from "./AddressBox";
import NewAddressDialog from "./NewAddressDialog";
import { Button } from "../ui/button";
import {Address} from '../../services/payment.service'




interface PaymentAddressProps {
  addressDetails: Address[]; // Receive address details as a prop
  setAddressDetails: React.Dispatch<React.SetStateAction<Address[]>>; // Receive state updater function as a prop
  activeComponent: number;
  setActiveComponent: (step: number) => void;
}



const PaymentAddress: React.FC<PaymentAddressProps> = ({
  addressDetails,
  setAddressDetails,
  activeComponent,
  setActiveComponent,
}) => {
  
  

  




 

  // Function to add a new address to the list
  const handleNewAddress = (newAddress: {
    customerName: string;
    addressLine: string;
    phoneNumber: string;
    selected:boolean;
  }) => {
    setAddressDetails((prevAddressDetails) => [
      ...prevAddressDetails.map((address, index) =>
        index === 0 ? { ...address, selected: false } : address
      ),
      { ...newAddress, selected: true }, // New address is selected by default
    ]);
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
              isSelected={address.selected}
            />
          ))}
        </div>
        {/* Add new address */}
        <div className="flex flex-col items-center justify-center mt-4 ">
          <NewAddressDialog addressDetails={addressDetails} onAddNewAddress={handleNewAddress} />
          <h2 className="text-sm font-semibold">Add new Address</h2>
        </div>
        {/* Back/Next Button */}
        <div className="flex gap-6 justify-end mt-3 sm:mt-0">
          <Button
            className="px-10 py-6 border border-black text-lg hover:bg-white hover:text-black bg-white text-black"
            onClick={() => setActiveComponent(1)}
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
