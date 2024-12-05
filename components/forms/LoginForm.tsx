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

const LoginForm = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { dispatch } = useAuthContext();

  const UserLoginFormValidation = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 8 characters"),
  });

  const form = useForm<z.infer<typeof UserLoginFormValidation>>({
    resolver: zodResolver(UserLoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserLoginFormValidation>) => {
    const user = {
      email: values.email,
      password: values.password,
    };

    console.log("User data:", user); // Debugging log

    setIsLoading(true);
    try {
      await toast.promise(
        (async () => {
          const response = await authService.login(user);

          console.log("Backend response:", response); // Debugging log

          if (response.success) {
            console.log("Login successful:", response.data);
            console.log("Token:", response.data.token);
            console.log("Token:", response.data);

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
       toast.error("Error logging in. Please try again. "+error);
    } finally {
      setIsLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <CustomFormField
          name="email"
          label="Email"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          placeholder="johndoe@gmail.com"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="password"
          label="Password"
          type="password"
          placeholder="********"
        />
        <SubmitButton isLoading={isLoading}>LOGIN</SubmitButton>
      </form>
    </Form>
  );
};

export default LoginForm;
