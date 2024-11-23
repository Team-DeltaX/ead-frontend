"use client";
import RegisterForm from '@/components/forms/RegistrationForm';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/forms/LoginForm';
import RegistrationForm from '@/components/forms/RegistrationForm';

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
    <div className="min-h-screen bg-slate-200 flex px-12 flex-col items-center justify-center">

      {/* <LoginForm /> */}
      <Card className='w-full md:w-[45%] p-10'>
        
      <RegistrationForm />
      </Card>

      {/* <Link href="user/contactus">contact</Link> */}
    </div>
  );
}

export default Page