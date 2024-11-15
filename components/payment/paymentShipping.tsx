import React from 'react';
import AddressBox from './AddressBox';
import {Button} from '../ui/button';

interface PaymentAddressProps {
  activeComponent: number;
  setActiveComponent: (step: number) => void;
}

const PaymentShipping: React.FC<PaymentAddressProps> = ({ activeComponent, setActiveComponent }) => {
  return (
    <div  className="flex items-center justify-center  w-[1200px] mx-auto mt-10 space-x-4 ">
      <div className='px-10'>
      <h2 className='font-bold pb-4'>Shipment method</h2>
      {/*mapping shipping methods*/}
      <div className='flex flex-col gap-3'>
        {/*regularly shipment*/}
        <div className="flex justify-between p-4 bg-gray-100 w-[1000] rounded-md h-15">
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
        {/*price*/}
        <div>
            <span className="font-extralight">Free</span><br></br>
            
        </div>
         {/*shipment type text*/}
        <div className='ml-10'>
           <span className='font-light'>Regularly shipment</span>
        </div>
      </div>
      {/*button*/}
      <div>
        <span className='font-light'>17 Oct,2023</span>    
      </div>
    </div>
     {/*price shipment*/}
     <div className="flex justify-between p-4 bg-gray-100 w-[1000] rounded-md h-15">
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
        {/*price*/}
        <div>
            <span className="font-extralight">$8.50</span><br></br>
            
        </div>
         {/*shipment type text*/}
        <div className='ml-10'>
           <span className='font-light'>Get your delivery as soon as possible!</span>
        </div>
      </div>
      {/*button*/}
      <div>
        <span className='font-light'>1 Oct,2023</span>    
      </div>
    </div>
    
      </div>
     
      {/*back/nextbutton*/}
      <div className='flex gap-6 justify-end'>
        <Button className='px-10 py-6 border border-black text-lg hover:bg-white hover:text-black bg-white text-black' onClick={()=>{setActiveComponent(activeComponent-1)}}>Back</Button>
        <Button className='px-10 py-6  text-lg hover:bg-black hover:text-white bg-black text-white border-b-2' onClick={()=>{setActiveComponent(activeComponent + 1)}}>Next</Button>

      </div>
   
     

      </div>
     
    </div>
  )
}

export default PaymentShipping
