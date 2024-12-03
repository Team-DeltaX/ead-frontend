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

const PasswordResetForm = ({ setOpen, email, setStep }: {
  setOpen: (open: boolean) => void
  email: string
  setStep: (step: number) => void
 }) => {
  const [isLoading, setIsLoading] = useState(false);

  const PasswordResetFormValidation = z
    .object({
      password: z.string().min(3, "Password must be at least 8 characters"),
      confirmPassword: z
        .string()
        .min(3, "Password must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof PasswordResetFormValidation>>({
    resolver: zodResolver(PasswordResetFormValidation),
    defaultValues: {
      password: "",
      confirmPassword:""
    },
  });

  const onSubmit = async (values: z.infer<typeof PasswordResetFormValidation>) => {
    const user = {
      password: values.password,
      confirmPassword: values.confirmPassword
    };

    console.log("User data:", user); // Debugging log

    setIsLoading(true);
    try {
      await toast.promise(
        (async () => {
          const response = await authService.changePassword(email, user.password);

          console.log("Backend response:", response); // Debugging log

          if (response.success) {
            console.log("Login successful:", response);

            setOpen(false); // Close the modal
            setStep(1); // Set the email
          
            return response.message || "Password updated successfully";
          } else {
            throw new Error(
              response?.error || "Invalid credentials. Please try again."
            );
          }
        })(),
        {
          loading: "Updating password...",
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
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="New Password"
          type="password"
          placeholder="********"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="********"
        />
        <SubmitButton isLoading={isLoading}>Update Password</SubmitButton>
      </form>
    </Form>
  );
};

export default PasswordResetForm;
