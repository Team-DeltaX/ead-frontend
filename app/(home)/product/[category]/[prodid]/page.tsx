"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdDriveEta } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { FaGalacticRepublic } from "react-icons/fa";
import { Product, productService } from "@/services/product.service";
import { useParams } from "next/navigation"; // Import the `useParams` hook

type Params = {
  prodid: string;
};

const Page = () => {
  const router = useRouter();

  // Unwrap params using the useParams hook and type it explicitly
  const params = useParams() as Params; // Explicitly typing params as Params
  const { prodid } = params;

  const parsedProdid = parseInt(prodid, 10); // Parse prodid to an integer

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!parsedProdid) return; // Prevent fetch if prodid is invalid or not available

    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(parsedProdid);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [parsedProdid]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state
  }

  if (!product) {
    return <div>Product not found</div>; // Show a "not found" message
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-wrap ">
        <div className="sm:pl-8 sm:w-1/2 flex-1 rounded-lg mt-4">
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <p className="text-gray-500">{product.brand}</p>
          <p className="mt-2 text-lg text-gray-800 font-semibold">
            ${product.productPrice}
          </p>
          <p className="mt-4">{product.productDescription}</p>

          <div className="flex mt-6 space-x-4">
            <button
              className="px-6 py-2 sm:px-4 bg-white text-black rounded-lg border border-black hover:bg-gray-400"
              onClick={() => router.push("/product")}
            >
              Go Back
            </button>
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
              Add to Cart
            </button>
          </div>
          <div className="flex flex-row mt-3 space-x-4">
            <div className="flex">
              <div className="w-1/3 rounded-lg bg-[#F6F6F6] p-1 flex items-center justify-center">
                <MdDriveEta className="text-4xl text-gray-800" />
              </div>
              <div className="w-2/3 p-2 text-sm text-gray-600">
                Free delivery
              </div>
              <div className="w-1/3 rounded-lg bg-[#F6F6F6] p-1 flex items-center justify-center">
                <CiShop className="text-4xl text-gray-800" />
              </div>
              <div className="w-2/3 p-2 text-sm text-gray-600">In Stock</div>
              <div className="w-1/3 rounded-lg bg-[#F6F6F6] p-1 flex items-center justify-center">
                <FaGalacticRepublic className="text-4xl text-gray-800" />
              </div>
              <div className="w-2/3 p-2 text-sm text-gray-600">
                1 year Guaranteed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
