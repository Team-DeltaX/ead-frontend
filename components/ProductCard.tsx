import { Product } from "@/services/product.service";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <div className="max-w-sm  border rounded-lg shadow-md bg-[#F6F6F6] w-[250px]">
      <div
        className={`${
          product.images?.length === 0 ? "flex items-center justify-center" : ""
        }`}
      >
        <img
          src={
            product.images?.length === 0
              ? // ? "/assets/image/default_product.png"
                "https://wbco.sa/storage/images/documents/_res/wrh/def_product.png"
              : product.images[0].imageUrl
          }
          alt={"product image"}
          className="w-full h-48 object-cover rounded-2xl p-2"
        />
      </div>

      <div className="mt-1 text-center p-4">
        <h3 className="text-base font-medium text-gray-900">
          {product.productName}
        </h3>
        <p className="text-xs text-gray-500">{product.productBrand}</p>

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
