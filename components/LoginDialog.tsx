"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from "./forms/LoginForm"
import Link from "next/link"

const LoginDialog = () => {

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button  className="bg-black hover:bg-gray-700 text-white py-1.5 px-8 rounded focus:border-black font-SFPro">LOGIN</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Enter your credentials to access your account.
          </DialogDescription>
        </DialogHeader>
        <LoginForm setOpen={setIsDialogOpen} />
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link
            href="/auth"
            className="text-blue-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog


