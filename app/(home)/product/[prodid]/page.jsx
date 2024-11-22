"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { MdDriveEta } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { FaGalacticRepublic } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro Max",
    price: 1299,
    brand: "Apple",
    storage: "256GB",
    batteryCapacity: "4323mAh",
    description: "The ultimate iPhone experience with unparalleled features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndYBNHmnuV8-xuvyBHiXRg7XXSH34vtXoXg&s",
    category: "Smartphones",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23 Ultra",
    price: 1199,
    brand: "Samsung",
    storage: "128GB",
    batteryCapacity: "5000mAh",
    description: "The pinnacle of Samsung innovation with stunning features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdeSoJWzJ7Mu85-gpfgV7hHqNiKE0dQnQq5A&s",
    category: "Smartphones",
  },
  {
    id: 3,
    name: "Samsung Galaxy S23 Ultra",
    price: 1199,
    brand: "Samsung",
    storage: "128GB",
    batteryCapacity: "5000mAh",
    description: "The pinnacle of Samsung innovation with stunning features.",
    image: "https://s.alicdn.com/@sc04/kf/H4467cbfe96cb42639c74d4aa9aa5b199f.jpg_300x300.jpg",
    category: "mobilephone",
  },
  {
    id: 4,
    name: "Apple iPhone 14 Pro Max",
    price: 1299,
    brand: "Apple",
    storage: "256GB",
    batteryCapacity: "4323mAh",
    description: "The ultimate iPhone experience with unparalleled features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndYBNHmnuV8-xuvyBHiXRg7XXSH34vtXoXg&s",
    category: "Smartphones",
  },
  {
    id: 5,
    name: "Apple iPhone 14 Pro Max",
    price: 1299,
    brand: "Apple",
    storage: "256GB",
    batteryCapacity: "4323mAh",
    description: "The ultimate iPhone experience with unparalleled features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndYBNHmnuV8-xuvyBHiXRg7XXSH34vtXoXg&s",
    category: "mobilephone",
  },
  {
    id: 6,
    name: "Apple iPhone 14 Pro Max",
    price: 1299,
    brand: "Apple",
    storage: "256GB",
    batteryCapacity: "4323mAh",
    description: "The ultimate iPhone experience with unparalleled features.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRndYBNHmnuV8-xuvyBHiXRg7XXSH34vtXoXg&s",
    category: "Smartphones",
  },
];

const Page = ({ params }) => {
  const router = useRouter();
  const { prodid } = React.use(params);

  const product = products.find((p) => p.id.toString() === prodid);

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    // <div>page {prodid}</div>
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-wrap ">
        <img
          src={product.image}
          alt={product.name}
          className="w-full sm:w-1/2 object-cover rounded-lg flex items-center justify-center  bg-[#db3f3f] "
        />
        <div className="sm:pl-8 sm:w-1/2 flex-1 rounded-lg mt-4 ">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-500">{product.brand}</p>
          <p className="mt-2 text-lg text-gray-800 font-semibold">
            ${product.price}
          </p>
          <p className="mt-4">{product.description}</p>
          <p className="mt-4 text-sm text-gray-600">Storage: {product.storage}</p>
          <p className="mt-1 text-sm text-gray-600">
            Battery Capacity: {product.batteryCapacity}
          </p>
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
                Free deivery
              </div>
              <div className="w-1/3 rounded-lg bg-[#F6F6F6] p-1 flex items-center justify-center">
                 <CiShop  className="text-4xl text-gray-800" />
              </div>
              <div className="w-2/3 p-2 text-sm text-gray-600">
                In Stock
              </div>
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

      {/* Related Products Section */}
      <div className="mt-8">
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
      </div>

    </div>

  )
}

export default Page








// <div className="flex flex-wrap">
//   {/* Main Image Area */}
//   <div className="flex flex-col sm:w-1/2">
//     <div className="flex justify-center items-center rounded-lg bg-[#db3f3f] mb-4">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-full object-cover rounded-lg"
//       />
//     </div>
//     {/* Small Images Section */}
//     <div className="flex space-x-2">
//       <img
//         src="https://via.placeholder.com/100"
//         alt="Small Image 1"
//         className="w-1/4 object-cover rounded-lg border"
//       />
//       <img
//         src="https://via.placeholder.com/100"
//         alt="Small Image 2"
//         className="w-1/4 object-cover rounded-lg border"
//       />
//       <img
//         src="https://via.placeholder.com/100"
//         alt="Small Image 3"
//         className="w-1/4 object-cover rounded-lg border"
//       />
//       <img
//         src="https://via.placeholder.com/100"
//         alt="Small Image 4"
//         className="w-1/4 object-cover rounded-lg border"
//       />
//     </div>
//   </div>

//   {/* Product Details Area */}
//   <div className="sm:pl-8 sm:w-1/2 flex-1 rounded-lg mt-4">
//     <h1 className="text-2xl font-bold">{product.name}</h1>
//     <p className="text-gray-500">{product.brand}</p>
//     <p className="mt-2 text-lg text-gray-800 font-semibold">
//       ${product.price}
//     </p>
//     <p className="mt-4">{product.description}</p>
//     <p className="mt-4 text-sm text-gray-600">Storage: {product.storage}</p>
//     <p className="mt-1 text-sm text-gray-600">
//       Battery Capacity: {product.batteryCapacity}
//     </p>

//     {/* Buttons */}
//     <div className="flex mt-6 space-x-4">
//       <button
//         className="px-6 py-2 sm:px-4 bg-white text-black rounded-lg border border-black hover:bg-gray-400"
//         onClick={() => router.push("/product")}
//       >
//         Go Back
//       </button>
//       <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
//         Add to Cart
//       </button>
//     </div>

//     {/* Additional Features */}
//     <div className="flex flex-row mt-3 space-x-4">
//       <div className="flex">
//         <div className="w-1/3 rounded-lg bg-[#F6F6F6] p-1 flex items-center justify-center">
//           <MdDriveEta className="text-4xl text-gray-800" />
//         </div>
//         <div className="w-2/3 p-2 text-sm text-gray-600">
//           Free delivery
//         </div>
//         <div className="w-1/3 rounded-lg bg-[#F6F6F6] p-1 flex items-center justify-center">
//           <CiShop className="text-4xl text-gray-800" />
//         </div>
//         <div className="w-2/3 p-2 text-sm text-gray-600">
//           In Stock
//         </div>
//         <div className="w-1/3 rounded-lg bg-[#F6F6F6] p-1 flex items-center justify-center">
//           <FaGalacticRepublic className="text-4xl text-gray-800" />
//         </div>
//         <div className="w-2/3 p-2 text-sm text-gray-600">
//           1 year Guaranteed
//         </div>
//       </div>
//     </div>
//   </div>
// </div>



