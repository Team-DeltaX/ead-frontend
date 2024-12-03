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

interface NewAddressDialogProps {
  onAddNewAddress: (newAddress: {
    customerName: string;
    addressLine: string;
    phoneNumber: string;
  }) => void;
}

const NewAddressDialog: React.FC<NewAddressDialogProps> = ({
  onAddNewAddress,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleAddNewAddress = () => {
    onAddNewAddress({ customerName, addressLine, phoneNumber });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <CirclePlus />
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
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleAddNewAddress}>
            Add New
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAddressDialog;
