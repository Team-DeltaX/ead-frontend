"use client";
import RegisterForm from '@/components/forms/RegistrationForm';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

import React from 'react'

const user = {
  $id: "user123",
  name: "Samitha Wijenayake",
  email: "johndoe@gmail.com",
  phone: "0711402286",
};

const Page = () => {

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-500 p-6">
      <Card className="w-full max-w-lg bg-white rounded-lg shadow-xl p-8 mb-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h1>
        <RegisterForm user={user} />
      </Card>
      <button
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
        onClick={() => router.push("user/contactus")}
      >
        Contact Us
      </button>
      {/* <Link href="user/contactus">contact</Link> */}
    </div>
  );
}

export default Page