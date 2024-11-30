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

const PasswordChange = () => {
  const [isLoading, setIsLoading] = useState(false);

  const UserPasswordChangeValidation = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 8 characters"),
  });

  const form = useForm<z.infer<typeof UserPasswordChangeValidation>>({
    resolver: zodResolver(UserPasswordChangeValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

 const onSubmit = async (values: z.infer<typeof UserPasswordChangeValidation>) => {
   const user = {
     email: values.email,
     password: values.password,
   };

   setIsLoading(true);
   try {
     await toast.promise(
       (async () => {
         const response = await authService.login(user);

          console.log("Backend response:", response); // Debugging log

        
       })(),
       {
         loading: "Logging in...",
         success: "Login successful!",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6 font-SFPro ">
        <CustomFormField
          
          name="currentPassword"
          label="Current Password"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          type="password"
          placeholder="********"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="newPassword"
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
        <SubmitButton isLoading={isLoading}>Change Password</SubmitButton>
      </form>
    </Form>
  );
};

export default PasswordChange;
