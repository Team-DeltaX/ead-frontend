"use client";

import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100 font-SFPro">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full p-8 shadow-lg rounded-xl bg-white">
        {/* Left Section - Image */}
        <div className="flex justify-center items-center">
          <Image
            src="/assets/image/contactus.png"
            alt="Phone"
            width={400}
            height={400}
            className="rounded-lg shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right Section - Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl font-black text-gray-800 mb-6 leading-tight">
            Contact US 
          </h1>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-500 mb-3">Visit us</h2>
            <p className="text-gray-600 leading-relaxed">
              2972 Westheimer Rd.<br />
              Santa Ana, Illinois<br />
              85486
            </p>
            <p className="mt-3 text-gray-600">
              contact@company.com<br />
              (406) 555-0120
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-500 mb-3">
              Careers at Forever
            </h2>
            <p className="text-gray-600">Learn more about our team and job openings</p>
          </div>
          {/* Next Button */}
          <button
            className="bg-gray-900 text-white px-8 py-3 rounded-lg shadow-md hover:bg-gray-700 transition-all duration-300"
            onClick={() => alert("Navigating to Careers!")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

