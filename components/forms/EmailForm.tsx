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

const EmailForm = ({ 
  setEmail,
  setStep
 }: { 
    setEmail: (email: string) => void
   setStep: (step: number) => void
 }) => {
  const [isLoading, setIsLoading] = useState(false);

  

  const EmailFormValidation = z.object({
    email: z.string().email("Invalid email address"),
  });

  const form = useForm<z.infer<typeof EmailFormValidation>>({
    resolver: zodResolver(EmailFormValidation),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof EmailFormValidation>) => {
    const email = {
      email: values.email,
    };

    console.log("Email:", email); // Debugging log

    setIsLoading(true);
    try {
      await toast.promise(
        (async () => {
          const response = await authService.sentOtp(email);

          console.log("Backend response:", response); // Debugging log

          if (response.success) {
            console.log("Login successful:", response);

            setEmail(email.email); // Close the modal
            setStep(2); // Set the email
            

          

           return response.message || "Check your email for the OTP";
          } else {
            setStep(1);
            throw new Error(
              response?.error || "Invalid credentials. Please try again."
            );
          }
        })(),
        {
          loading: "Sending OTP...",
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
      <CustomFormField
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="johndoe@gmail.com"
      />
      <SubmitButton isLoading={isLoading}>Send OTP</SubmitButton>
    </form>
    </Form>
  );
};

export default EmailForm;
