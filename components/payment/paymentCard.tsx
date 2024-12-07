import React, { useEffect } from "react";
import PaymentSummaryProduct from "./PaymentSummaryProduct";
import { Button } from "../ui/button";
import md5 from "crypto-js/md5";
import Script from "next/script";
import { Cart } from "@/services/cart.service";
import { Address } from "../../services/payment.service";
import { CreateOrder, orderService } from "@/services/order.service";

declare global {
  interface Window {
    payhere: {
      startPayment: (data: PaymentData) => void;
      onCompleted: (callback: (paymentId: string) => void) => void;
      onDismissed: (callback: () => void) => void;
      onError: (callback: (error: string) => void) => void;
    };
  }
}

interface PaymentData {
  sandbox: boolean;
  merchant_id: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;
  order_id: string;
  items: string;
  amount: number;
  currency: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  hash: string;
}

interface PaymentAddressProps {
  activeComponent: number;
  setActiveComponent: (step: number) => void;
  onOpenChange: (open: boolean) => void;
  cart: Cart;
  addressDetails: Address[]; // Receive address details as a prop
  shippingCost: number;
  fetchData: () => void;
}

const PaymentCard: React.FC<PaymentAddressProps> = ({
  shippingCost,
  addressDetails,
  cart,
  activeComponent,
  setActiveComponent,
  onOpenChange,
  fetchData,
}) => {
  const selectedAddress = addressDetails.find((address) => address.selected); // Find the selected address

  const subtotal = cart.totalAmount;
  const finalTotal = subtotal + shippingCost + 99.99;

  const orderId = "123456";
  const name = "Iphone16";
  const amount = finalTotal;
  const merchantId = "1228659";
  const merchantSecret =
    "MjY0OTk5MTk1MjI3MzM3MDY5NDIyODQ5ODU0NDM5MjAwOTMxMzEwNg==";

  const amountFormatted = parseFloat(amount.toString())
    .toLocaleString("en-US", { minimumFractionDigits: 2 })
    .replaceAll(",", "");

  const hashedSecret = md5(merchantSecret).toString().toUpperCase();
  const amountFormated = parseFloat(amountFormatted)
    .toLocaleString("en-US", { minimumFractionDigits: 2 })
    .replaceAll(",", "");
  const currency = "LKR";

  const hash = md5(
    merchantId + orderId + amountFormated + currency + hashedSecret
  )
    .toString()
    .toUpperCase();

  const paymentData: PaymentData = {
    sandbox: true,
    merchant_id: merchantId,
    return_url: "http://localhost:3000/bookings",
    cancel_url: "http://sample.com/cancel",
    notify_url: "http://sample.com/notify",
    order_id: orderId,
    items: name,
    amount: amount,
    currency: currency,
    first_name: "kanishka",
    last_name: "udayanga",
    email: "mskanihskaudayang@gmail.com",
    phone: "0784657729",
    address: "kurunda",
    city: "city",
    country: "Lanka",
    hash: hash,
  };

  useEffect(() => {
    const loadPayHereScript = () => {
      const script = document.createElement("script");
      script.src = "https://www.payhere.lk/lib/payhere.js";
      script.async = true;
      script.onload = () => {
        console.log("PayHere script loaded");
      };
      script.onerror = () => {
        console.error("Failed to load PayHere script");
      };
      document.body.appendChild(script);
    };

    if (!window.payhere) {
      loadPayHereScript();
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    const initializePayHere = () => {
      if (window.payhere) {
        window.payhere.onCompleted = async (paymentId) => {
          try {
            const orderData: CreateOrder = {
              totalAmount: finalTotal,
              shippingAddress: selectedAddress?.addressLine || "",
              shippingMethod:
                shippingCost === 0 ? "Free Shipping" : "Standard Shipping",
            };

            const order = await orderService.addOrder(orderData);
            fetchData();
            console.log("Order created successfully:", order);
          } catch (error) {
            console.error("Error creating order:", error);
          }
          console.log("Payment completed. Payment Id:", paymentId);
        };
      } else {
        console.log("Waiting for PayHere to initialize...");
        setTimeout(initializePayHere, 100);
      }
    };

    script.onload = initializePayHere;

    return () => {
      document.body.removeChild(script);
    };
  }, [finalTotal, selectedAddress, shippingCost]);

  // const paymentDone = () => {
  //   console.log("paymentDone");
  //   console.log(paymentData);

  //   window.payhere.startPayment(paymentData);
  // };

  const payment = async () => {
    window.payhere.startPayment(paymentData);

    // window.payhere.onCompleted(async (paymentId: string) => {

    //   console.log("Payment completed. Payment Id:" + paymentId);
    //  try {
    //     const orderData: CreateOrder = {
    //       totalAmount: finalTotal,
    //       shippingAddress: selectedAddress?.addressLine || '',
    //       shippingMethod: shippingCost === 0 ? 'Free Shipping' : 'Standard Shipping'
    //     };

    //     const order = await orderService.addOrder(orderData);

    //     console.log('Order created successfully:', order);
    //   } catch (error) {
    //     console.error('Error creating order:', error);
    //   }
    // });
  };
  return (
    <>
      <Script
        src="https://www.payhere.lk/lib/payhere.js"
        strategy="beforeInteractive"
      />
      <div className="flex max-w-[900px] items-center justify-center w-full sm:w-[1200px] mx-auto mt-10 space-x-4">
        <div className="h-[430px] w-full flex sm:flex-row flex-col gap-3 justify-between">
          <div className="w-full sm:w-1/2 shadow-md rounded-md">
            <div>
              <h3 className="p-4 font-semibold">Summary</h3>
            </div>
            <div className="p-4 h-[300px] overflow-y-auto hide-scrollbar">
              {cart.items.map((product, index) => (
                <PaymentSummaryProduct
                  key={index}
                  image={
                    product.product.images?.[0]?.imageUrl ||
                    "/path/to/default-image.jpg"
                  } // Fallback to a default image
                  name={product.product.productName || "Unnamed Product"} // Fallback to a default name
                  price={product.unitPrice || 0} // Fallback to 0 for price
                />
              ))}
            </div>
          </div>
          <div className="w-full sm:w-1/2 shadow-md rounded-md">
            <div>
              <h3 className="p-4 font-semibold">Payment Details</h3>
            </div>
            <div className="p-4">
              <div className="p-4 bg-gray-200 rounded-md">
                <span className="text-gray-400">Address</span>
                <br />
                <span className="text-sm ">
                  {" "}
                  {selectedAddress
                    ? `${selectedAddress.addressLine}`
                    : "No address selected"}
                </span>
                <br />
                <div className="mt-2">
                  <span className="text-gray-400">Shipment cost</span>
                  <br />
                  <span>
                    {shippingCost == 0 ? "Free" : "$" + shippingCost}{" "}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-sm">SubTotal</span>
                    </div>
                    <div>
                      <span className="text-sm">${subtotal}</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div>
                      <span className="text-sm text-gray-400">
                        Estimated tax
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">$99.99</span>
                    </div>
                  </div>
                  <div className="flex justify-between mt-8">
                    <div>
                      <span className="text-sm">Total</span>
                    </div>
                    <div>
                      <span className="text-sm">${finalTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-6 justify-end mt-4">
                  <Button
                    className="px-10 py-6 border border-black text-lg hover:bg-white hover:text-black bg-white text-black"
                    onClick={() => setActiveComponent(activeComponent - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    className="px-10 py-6 text-lg hover:bg-green-500 hover:text-white bg-green-500 text-white border-b-2"
                    onClick={() => {
                      onOpenChange(false);
                      payment();
                    }}
                  >
                    PayNow
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentCard;
