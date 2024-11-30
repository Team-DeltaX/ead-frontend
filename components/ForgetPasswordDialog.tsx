"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EmailForm from "./forms/EmailForm";
import OTPForm from "./forms/OTPForm";
import PasswordResetForm from "./forms/ForgetPasswordResetForm";
import Link from "next/link";
import { useState } from "react";

const ForgetPasswordDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[90%] md:max-w-[425px] font-SFPro">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>Forget Password</DialogTitle>
              <DialogDescription>Enter email to get OTP</DialogDescription>
            </DialogHeader>
            <EmailForm
              setEmail={setEmail}
              setStep={setStep}
            />
            <h1 className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth" className="text-blue-500 hover:underline">
                Login
              </Link>
            </h1>
          </>
        ) : step === 2 ? (
          <>
            <DialogHeader>
              <DialogTitle>One-Time Password</DialogTitle>
              <DialogDescription>
                Enter your one-time password
              </DialogDescription>
            </DialogHeader>
            <OTPForm
              setStep={setStep}
              email={email}
            />
          </>
        ) : step === 3 ? (
          <>
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>Enter your new password</DialogDescription>
            </DialogHeader>
            <PasswordResetForm
              setOpen={setIsDialogOpen}
              setStep={setStep}
              email={email}
            />
            <h1 className="text-center text-sm">
              Go to{" "}
              <Link href="/auth" className="text-blue-500 hover:underline">
                Login
              </Link>
            </h1>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordDialog;
