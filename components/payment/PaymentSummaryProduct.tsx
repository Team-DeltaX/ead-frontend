import React from "react";

interface PaymentSummaryProductProps {
  image: string;
  name: string;
  price: number;
}

const PaymentSummaryProduct: React.FC<PaymentSummaryProductProps> = ({
  image,
  name,
  price,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-md mb-4">
      <img src={image} alt={name} className="w-16 h-16 object-cover rounded" />
      <div className="flex-1">
        <h4 className="font-semibold">{name}</h4>
        <p className="text-gray-500">Price: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PaymentSummaryProduct;
