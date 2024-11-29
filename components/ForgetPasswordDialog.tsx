"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ForgotPasswordForm from "./forms/ForgotPasswordForm";
import Link from "next/link";

const ForgetPasswordDialog = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="w-[90%] md:max-w-[425px] font-SFPro">
        <DialogHeader>
          <DialogTitle>Forget Password</DialogTitle>
          <DialogDescription>Enter email to get OTP</DialogDescription>
        </DialogHeader>
        <ForgotPasswordForm setOpen={setIsDialogOpen} />
        <h1 className="text-center text-sm ">
          Already have an account?{" "}
          <Link href="/auth" className="text-blue-500 hover:underline">
            Login
          </Link>
        </h1>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordDialog;
