"use client";
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import RegistrationForm from '@/components/forms/RegistrationForm';

import React from 'react'


const Page = () => {

  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-200 flex px-2 md:px-12 flex-col items-center justify-center">

      {/* <LoginForm /> */}
      <Card className='w-full md:max-w-[500px] p-3 md:p-10'>

        <RegistrationForm />
      <p className='text-center pt-4'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => router.push("/")}>Login</span></p>
      </Card>

      {/* <Link href="user/contactus">contact</Link> */}
    </div>
  );
}

export default Page