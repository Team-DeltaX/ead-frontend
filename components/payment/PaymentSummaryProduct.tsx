import React from 'react'
import Image from 'next/image';

function PaymentSummaryProduct() {
  return (
    <div className='flex items-center justify-between rounded-md bg-gray-100 h-20 px-4'>
        <div className='flex items-center'>
            <div className='mr-2'>
            <Image src='/assets/image/Product Image.svg' alt='' width={35} height={35} />
            </div>
            <div>
                <span className='font-sm'>Apple iphone 14 Pro Max 128GB</span>
            </div>    
        </div>
        <div>
            <span className='font-semibold'>$1399</span>
        </div>



    </div>
  )
}

export default PaymentSummaryProduct