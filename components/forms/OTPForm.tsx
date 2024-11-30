"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "../SubmitButton";
import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const OTPForm = ({
  email,
  setStep
}: {
  email: string;
  setStep: (step: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
          const response = await authService.validateOtp(email, user.OTP);

          console.log("Backend response:", response); // Debugging log

          if (response.success) {
            console.log("Login successful:", response);

            setStep(3);

            return response.message || "OTP validated successfully";
          } else {
            setStep(1);
            throw new Error(
              response?.error || "Invalid credentials. Please try again."
            );
          }
        })(),
        {
          loading: "Validating OTP...",
          success: (message) => message,
          error: (error) => error?.message || "An unexpected error occurred.",
        }
      );
    } catch (error) {
      setStep(1);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <div className="grid items-center justify-center">
          {/* Use Controller to bind react-hook-form with InputOTP */}
          <Controller
            name="OTP"
            control={form.control}
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={field.value}
                onChange={(otpValue) => {
                  field.onChange(otpValue);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </div>
        <SubmitButton isLoading={isLoading}>Submit OTP</SubmitButton>
      </form>
    </Form>
  );
};

export default OTPForm;
