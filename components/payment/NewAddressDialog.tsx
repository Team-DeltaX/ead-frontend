import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import {Address} from '../../services/payment.service';



interface NewAddressDialogProps {
  addressDetails: Address[];
  onAddNewAddress: (newAddress: {
    customerName: string;
    addressLine: string;
    phoneNumber: string;
    selected:boolean;
    
    
  }) => void;
}

const NewAddressDialog: React.FC<NewAddressDialogProps> = ({
  addressDetails,
  onAddNewAddress,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selected, setSelected] = useState(true);

  const [errors, setErrors] = useState({
    customerName: false,
    addressLine: false,
    phoneNumber: false,
  });

  const handleAddNewAddress = () => {
    const newErrors = {
      customerName: !customerName.trim(),
      addressLine: !addressLine.trim(),
      phoneNumber: !phoneNumber.trim(),
    };

    setErrors(newErrors);

    // Prevent submission if there are errors
    if (Object.values(newErrors).some((hasError) => hasError)) {
      return;
    }

    onAddNewAddress({ customerName, addressLine, phoneNumber, selected });

    // Clear fields after submission
    setCustomerName("");
    setAddressLine("");
    setPhoneNumber("");
    setSelected(true);
    setErrors({ customerName: false, addressLine: false, phoneNumber: false });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button disabled={addressDetails.length >= 2}>
          <CirclePlus className={addressDetails.length >= 2 ? "opacity-50" : ""} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[300px] sm:w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new Address</DialogTitle>
          <DialogDescription>
            Make sure to add a valid address. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={`col-span-3 ${errors.customerName ? "border-red-500" : ""}`}
            />
            {errors.customerName && (
              <p className="col-span-4 text-red-500 text-sm">Name is required</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className={`col-span-3 ${errors.addressLine ? "border-red-500" : ""}`}
            />
            {errors.addressLine && (
              <p className="col-span-4 text-red-500 text-sm">Address is required</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`col-span-3 ${errors.phoneNumber ? "border-red-500" : ""}`}
            />
            {errors.phoneNumber && (
              <p className="col-span-4 text-red-500 text-sm">Phone number is required</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleAddNewAddress}
            disabled={addressDetails.length >= 2}
          >
            Add New
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddressDialog;



