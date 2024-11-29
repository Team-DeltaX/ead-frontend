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

const PasswordResetForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { dispatch } = useAuthContext();

  const PasswordResetFormValidation = z.object({
    password: z.string().min(3, "Password must be at least 8 characters"),
  });

  const form = useForm<z.infer<typeof PasswordResetFormValidation>>({
    resolver: zodResolver(PasswordResetFormValidation),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PasswordResetFormValidation>) => {
    const user = {
      password: values.password,
    };

    console.log("User data:", user); // Debugging log

    setIsLoading(true);
    try {
      await toast.promise(
        (async () => {
          const response = await authService.changePassword(user);

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
        name="confirmpassword"
        label="Confirm Password"
        type="password"
        placeholder="********"
      />
      <SubmitButton isLoading={false}>Update Password</SubmitButton>
    </form>
    </Form>
  );
};

export default PasswordResetForm;
