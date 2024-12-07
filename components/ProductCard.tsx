import { Product } from "@/services/product.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <div data-cy={`product-card-${product.id}`} className="max-w-sm border rounded-lg shadow-md bg-[#F6F6F6] w-[250px]">
    
      {product.images && (
        <Image
          src={product.images[0]?.imageUrl || "https://wbco.sa/storage/images/documents/_res/wrh/def_product.png"}
          alt={product.productName}
          className="w-full h-48 object-cover rounded-lg  "
          width={300}
          height={300}
        />
      )}

      <div className="mt-2 py-3 text-center">
        <h3 data-cy={`product-name-${product.id}`} className="text-base font-medium text-gray-900">
          {product.productName}
        </h3>
        <p data-cy={`product-brand-${product.id}`} className="text-xs text-gray-500">{product.productBrand}</p>

        <p data-cy={`product-price-${product.id}`} className="mt-1 text-lg font-bold text-gray-800">
          ${product.productPrice}
        </p>

        <button
          className="mt-2  px-3 py-1 bg-black text-white rounded-lg hover:bg-gray-800"
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
