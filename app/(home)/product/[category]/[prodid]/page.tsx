"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdDriveEta } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { FaGalacticRepublic } from "react-icons/fa";
import { Product, productService } from "@/services/product.service";
import { useParams } from "next/navigation";
import LoginDialog from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import Spinner from "@/components/Spinner";
import { cartService } from "@/services/cart.service";
import Image from "next/image";

type Params = {
  prodid: string;
};

const Page = () => {
  const router = useRouter();

  const { state } = useAuthContext();
  const { isLoggedIn } = state;

  const params = useParams() as Params;
  const { prodid } = params;

  const parsedProdid = parseInt(prodid, 10);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!parsedProdid) return;

    const fetchProduct = async () => {
      try {
        const response = await productService.getProductById(parsedProdid);
        const fetchedProduct = response.data;
        setProduct(response.data);

        const relatedResponse = await productService.getProductsByBrand(
          fetchedProduct.productBrand
        );
        setRelatedProducts(
          relatedResponse.data.filter(
            (prod: Product) =>
              prod.productBrand === fetchedProduct.productBrand &&
              prod.id !== fetchedProduct.id
          )
        );
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [parsedProdid]);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
    } else {
      // Add to cart
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center  md:min-h-[450px]">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex items-center flex-wrap justify-center ">
        <div className="w-full sm:w-1/2 flex items-center justify-center mb-8 sm:mb-0">
          {product.images?.length === 0 ? (
            <Image
              src="https://wbco.sa/storage/images/documents/_res/wrh/def_product.png"
               // ? "/assets/image/default_product.png"
              alt="default product"
              className="w-[300px] rounded-lg object-cover"
              width={300}
              height={300}
            />
          ) : (
            <div className="flex flex-col sm:flex-row sm:space-x-3">
              <div className="flex sm:flex-col space-y-1 sm:space-y-0 sm:w-[100px]">
                {product.images?.slice(1, 3).map((image, index) => (
                  <Image
                    key={index}
                    src={image.imageUrl}
                    alt={`product image ${index + 1}`}
                    className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-lg object-cover"
                    width={100}
                    height={100}
                  />
                ))}
              </div>
              <Image
                src={
                  product.images?.[0]?.imageUrl ||
                  "https://wbco.sa/storage/images/documents/_res/wrh/def_product.png"
                }
                alt="main product image"
                className="w-[300px] rounded-lg object-cover"
                width={300}
                height={300}
              />
            </div>
          )}
        </div>

        <div className="sm:pl-8 sm:w-1/2 flex flex-col gap-1 rounded-lg  ">
          <h1 className="text-2xl font-bold">{product.productName}</h1>
          <p className="text-gray-500">{product.productBrand}</p>
          <p className="mt-2 text-lg text-gray-800 font-semibold">
            ${product.productPrice}
          </p>
          <p className="mt-4">{product.productDescription}</p>

          <div className="flex mt-6 space-x-4">
            <Button
              className="px-6 py-2 sm:px-4 bg-white text-black rounded-lg border border-black hover:bg-gray-500 hover:text-white"
              onClick={() => router.push("/product")}
            >
              Go Back
            </Button>
            <Button
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              onClick={() => product.id && cartService.increaseCartItem(product.id)}
            >
              Add to Cart
            </Button>
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

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="max-w-sm p-3 border rounded-lg shadow-md bg-[#F6F6F6]"
              >
                <Image
                  src={relatedProduct.images?.[0]?.imageUrl|| "https://wbco.sa/storage/images/documents/_res/wrh/def_product.png"}
                  alt={relatedProduct.productName}
                  className="w-full h-48 object-cover rounded-2xl p-1"
                  width={300}
                  height={300}
                />
                <div className="mt-4 text-center">
                  <h3 className="text-base font-medium text-gray-900">
                    {relatedProduct.productName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {relatedProduct.productBrand}
                  </p>
                  <p className="mt-1 text-lg font-bold text-gray-800">
                    ${relatedProduct.productPrice}
                  </p>
                  <button
                    className="mt-2 px-4 py-1 bg-black text-white rounded-lg hover:bg-gray-800"
                    onClick={() =>
                      router.push(
                        `/product/${product.category.name}/${relatedProduct.id}`
                      )
                    }
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
      </div>
      <LoginDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default Page;
