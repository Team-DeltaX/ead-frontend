"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormFeild";
import SubmitButton from "../SubmitButton";
import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OTPForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { dispatch } = useAuthContext();

  const OTPFormValidation = z.object({
    OTP: z.string().length(6, "OTP must be 6 characters"),
  });

  const form = useForm<z.infer<typeof OTPFormValidation>>({
    resolver: zodResolver(OTPFormValidation),
    defaultValues: {
      OTP: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof OTPFormValidation>) => {
    const user = {
      OTP: values.OTP,
    };

    console.log("User data:", user); // Debugging log

    setIsLoading(true);
    try {
      await toast.promise(
        (async () => {
          const response = await authService.validateOtp();

          console.log("Backend response:", response); // Debugging log

          if (response.success) {
            console.log("Login successful:", response);
            console.log("Token:", response.data.token);

            dispatch({
              type: "LOGIN",
              payload: {
                user: response.data.user,
                token: response.data.token,
                role: response.data.role,
              },
            });

            setOpen(false); // Close the modal

            if (response.data.role.toLowerCase() === "admin") {
              // Redirect to admin dashboard
              router.push("/admin");
            }
            return "Logged in successfully!"; // Success message
          } else {
            throw new Error(
              response?.error || "Invalid credentials. Please try again."
            );
          }
        })(),
        {
          loading: "Logging in...",
          success: (message) => message,
          error: (error) => error?.message || "An unexpected error occurred.",
        }
      );
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <div className="grid items-center justify-center">
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <SubmitButton isLoading={false}>Submit OTP</SubmitButton>
      </form>
    </Form>
  );
};

export default OTPForm;
