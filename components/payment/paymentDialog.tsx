"use client";
import React, { useState } from 'react';
import StepIndicator from '@/components/payment/StepIndicator';
import PaymentAddress from './paymentAddress';
import PaymentShipping from './paymentShipping';
import PaymentCard from './paymentCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Cart } from '@/services/cart.service';
import { useAuthContext } from "@/hooks/useAuthContext";

interface PaymentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void; // Callback to update the open state
  cart:Cart
}

interface Address {
  customerName: string;
  addressLine: string;
  phoneNumber: string;
  selected: boolean;
}

export function PaymentDialog({ cart,isOpen, onOpenChange }: PaymentDialogProps) {
    const [activeComponent, setActiveComponent] = useState(1);
    const [shippingCost,setShippingCost]=useState(0);



    console.log('cart',cart); 
    const { state } = useAuthContext();

    const { user} = state;
  

    const [addressDetails, setAddressDetails] = useState<Address[]>(
      user
        ? [
            {
              customerName: user.firstName,
              addressLine: user.address,
              phoneNumber: user.phone,
              selected: true,
            },
          ]
        : []
    );


  return (
    <Dialog open={isOpen}  onOpenChange={onOpenChange}>
      {/* <DialogTrigger asChild>
      <button className="bg-black text-white rounded-md py-2 w-full mt-4 lg:text-[16px] md:text-[14px] sm:text-[14px] text-[12px] font-bold">
              Check Out
            </button>
      </DialogTrigger> */}
      <DialogContent className="max-w-[1200px] ">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <div>
      {/* Step Indicator */}
      <StepIndicator activeStep={activeComponent} />
      {/*conditaional rendering*/}
      {/* Conditional Rendering of Components */}
      {activeComponent === 1 && <PaymentAddress addressDetails={addressDetails} setAddressDetails={setAddressDetails}  activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>}
      {activeComponent === 2 && <PaymentShipping cart={cart} shippingCost={shippingCost} setShippingCost={setShippingCost} activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>}
      {activeComponent === 3 && <PaymentCard shippingCost={shippingCost} addressDetails={addressDetails}  cart={cart}  onOpenChange={onOpenChange}  activeComponent={activeComponent} setActiveComponent={setActiveComponent}/>}

    </div>
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

