import { Product } from "@/services/product.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <div className="max-w-sm p-4 border rounded-lg shadow-md bg-[#F6F6F6]">
      {product.images && (
        <Image
          src={product.images[0]?.imageUrl || ""}
          alt={product.productName}
          className="w-full object-cover rounded-lg p-4"
          width={300}
          height={300}
        />
      )}

      <div className="mt-2 text-center">
        <h3 className="text-base font-medium text-gray-900">
          {product.productName}
        </h3>
        <p className="text-xs text-gray-500">{product.brand}</p>

        <p className="mt-1 text-lg font-bold text-gray-800">
          ${product.productPrice}
        </p>

        <button
          className="mt-2 px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-800"
          onClick={() => {
            router.push(`/product/${product.category.name}/${product.id}`);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
