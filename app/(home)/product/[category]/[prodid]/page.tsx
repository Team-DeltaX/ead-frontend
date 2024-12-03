"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdDriveEta } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { FaGalacticRepublic } from "react-icons/fa";
import { Product, productService } from "@/services/product.service";
import { useParams } from "next/navigation";

type Params = {
  prodid: string;
};

const Page = () => {
  const router = useRouter();

  const params = useParams() as Params;
  const { prodid } = params;


  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!parsedProdid) return;

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
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center flex-wrap justify-center ">
        <div className="w-1/2 flex items-center justify-center mb-8 sm:mb-0">

        <img
          src={
            product.images?.length === 0
              ? "/assets/image/default_product.png"
              : product.images
          }
          alt={"product image"}
          className="w-[300px] rounded-lg object-cover"
        />
        </div>
        <div className="sm:pl-8 sm:w-1/2 flex flex-col gap-1 rounded-lg  ">
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
      {/* <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="max-w-sm p-4 border rounded-lg shadow-md bg-[#F6F6F6]"
              >
                <img
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  className="w-full object-cover rounded-lg p-4"
                />
                <div className="mt-4 text-center">
                  <h3 className="text-base font-medium text-gray-900">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-xs text-gray-500">{relatedProduct.brand}</p>
                  <p className="mt-1 text-lg font-bold text-gray-800">
                    ${relatedProduct.price}
                  </p>
                  <button
                    className="mt-2 px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-800"
                    onClick={() => router.push(`/product/${relatedProduct.id}`)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No related products available.</p>
        )}
      </div> */}
    </div>
  );
};

export default Page;
