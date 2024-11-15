import React from 'react'
import PaymentSummaryProduct from './PaymentSummaryProduct';

interface PaymentAddressProps {
  activeComponent: number;
  setActiveComponent: (step: number) => void;
}


const PaymentCard: React.FC<PaymentAddressProps> = ({ activeComponent, setActiveComponent }) => {
  return (
    <div  className="flex items-center justify-center w-full sm:w-[1200px] mx-auto mt-10 space-x-4 ">
      {/*two divs rowwise*/}
     <div className='h-[430px] w-full flex sm:flex-row flex-col gap-3 justify-between'>
      {/*summary*/}
      <div className='w-full sm:w-1/2 shadow-md rounded-md'>
      {/*summary*/}
      <div >
        <h3 className='p-4 font-semibold'>Summary</h3>
       
      </div>
      {/*product list*/}
      <div className='p-4'>
      <PaymentSummaryProduct></PaymentSummaryProduct>
      </div>
      {/*shipment details*/}
      <div className='px-4'>
        <span className='text-gray-400'>Address</span><br></br>
        <span className='text-sm '>187/1 Galle Road,Katubedda</span><br></br>
        <div className='mt-2'>
        <span className='text-gray-400'>Shipment method</span><br></br>
        <span className='text-'>Free</span>
        </div>
        {/*total*/}
        <div className='mt-4'>
          {/*subtotal*/}
          <div className='flex justify-between'>
            <div>
              <span className='text-sm'>SubTotal</span>
            </div>
            <div>
              <span className='text-sm'>$2347</span>
            </div>
          </div>
           {/*tax*/}
           <div className='flex justify-between mt-2'>
            <div>
              <span className='text-sm text-gray-400'>Estimated tax</span>
            </div>
            <div>
              <span className='text-sm text-gray-400'>$50</span>
            </div>
          </div>
           {/*final totall*/}
           <div className='flex justify-between mt-8'>
            <div>
              <span className='text-sm'>Total</span>
            </div>
            <div>
              <span className='text-sm'>$2397</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      {/*carddetails*/}
      <div className='w-full sm:w-1/2 bg-green-500 rounded-md h-full'>hi card</div>
     </div>
     
    </div>
  )
}

export default PaymentCard;