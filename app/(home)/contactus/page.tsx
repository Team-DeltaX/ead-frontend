"use client";

import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-blue-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full p-8 shadow-lg rounded-xl bg-white">
        {/* Top Section - Contact Us */}
        <div className="col-span-full text-center mb-6">
          <h1 className="text-6xl font-bold text-black-600">Contact Us</h1>
          <p className="text-gray-600 mt-2">We'd love to hear from you!</p>
        </div>

        {/* Left Section - Visit Us */}
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-blue-500 mb-3">
                Visit us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                5123 Market St. #22B.
                <br />
                Charlottesville,
                <br />
                California <br /> 44635
              </p>
              <p className="mt-3 text-gray-600">
                Cyber@gmail.com
                <br />
                (123) 456-7890
              </p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-blue-500 mb-3">
                Careers at Forever
              </h2>
              <p className="text-gray-600">
                Learn more about our team and job openings
              </p>
            </div>
            {/* Next Button */}
            <button
              className="bg-black text-white px-8 py-3 rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
              onClick={() => alert("Navigating to Careers!")}
            >
              Next
            </button>
          </div>
        </div>

        {/* Right Section - Send a Message */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-blue-500 mb-3">
              Send a Message
            </h2>
            <p className="text-gray-600">
              Have any questions or concerns? Send us a message, and we'll get
              back to you as soon as possible.
            </p>
          </div>
          {/* Contact Form */}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
