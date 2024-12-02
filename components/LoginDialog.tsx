"use client";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import LoginForm from "./forms/LoginForm"
import Link from "next/link"
import ForgetPasswordDialog from "./ForgetPasswordDialog"
import React, { useState } from "react";

const LoginDialog = ({ isDialogOpen, setIsDialogOpen }: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) => {

  const [isForgetPasswordDialogOpen, setIsForgetPasswordDialogOpen] = useState(false);
  

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[90%] md:max-w-[425px] font-SFPro">
        <DialogHeader>
          <DialogTitle>LOGIN</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        <LoginForm setOpen={setIsDialogOpen} />
        <h1 className="justify-center text-sm mt-4 flex items-center">
           Forgot your password?{" "}
          <p className="text-blue-500 hover:underline" onClick={() =>{ setIsForgetPasswordDialogOpen(true);
            setIsDialogOpen(false)
          }}>
            Reset Password
          </p>
        </h1>
        <h1 className="text-center text-sm ">
          Don&apos;t have an account?{" "}
          <Link href="/auth" className="text-blue-500 hover:underline">
            Register
          </Link>
        </h1>
      </DialogContent>
      <ForgetPasswordDialog
        isDialogOpen={isForgetPasswordDialogOpen}
        setIsDialogOpen={setIsForgetPasswordDialogOpen}
      />
    </Dialog>
  );
};

export default LoginDialog


