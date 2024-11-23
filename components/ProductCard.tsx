import { ProductInterface } from '@/app/(home)/product/[category]/page';
import { useRouter } from 'next/navigation'
import React from "react";

const ProductCard = ({ product }:{
  product: ProductInterface
}) => {
  const router = useRouter()

  return (
    <div className="max-w-sm p-4 border rounded-lg shadow-md bg-[#F6F6F6]">
      <img
        src={product.image}
        alt={product.name}
        className="w-full object-cover rounded-lg p-4"
      />
      <div className="mt-4 text-center">
        <h3 className="text-base font-medium text-gray-900">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.brand}</p>
        <p className="text-xs text-gray-500">{product.category}</p>
        <p className="mt-1 text-lg font-bold text-gray-800">${product.price}</p>
        
        <button
          className="mt-2 px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-800"
          onClick={()=>{
            
            router.push(`/product/${product.category}/${product.id}`);

          }}
        >
          Buy Now
        </button>     
      </div>
    </div>
  );
};

export default ProductCard
