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

const LoginDialog = ({ isDialogOpen, setIsDialogOpen }: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}) => {


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
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/auth" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog


