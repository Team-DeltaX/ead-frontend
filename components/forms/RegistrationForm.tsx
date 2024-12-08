"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


import { Form } from "@/components/ui/form";
import SubmitButton from "../SubmitButton";
import CustomFormField, { FormFieldType } from "../CustomFormFeild";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/hooks/useAuthContext";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

    const { dispatch } = useAuthContext();

  const UserRegisterFormValidation = z
    .object({
      firstName: z.string().nonempty("First name is required"),
      lastName: z.string().nonempty("Last name is required"),
      email: z.string().email("Invalid email").nonempty("Email is required"),
      phone: z
        .string()
        .nonempty("Phone number is required")
        .regex(/^0\d{9}$/, "Phone number must start with 0 and have exactly 10 digits"),
      address: z.string().nonempty("Address is required"),
      password: z.string().min(6, "Password must be at least 6 characters long"),
      confirmPassword: z.string().min(6, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });



  const form = useForm<z.infer<typeof UserRegisterFormValidation>>({
    resolver: zodResolver(UserRegisterFormValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserRegisterFormValidation>) => {
    setIsLoading(true);

    try {
      
      await authService.register(values).then((response) => {
        console.log("register", response);

        if (response.success) {
          router.push("/");

          dispatch({
            type: "LOGIN",
            payload: {
              user: response.data.user,
              token: response.data.token,
              role: response.data.role,
            },
          });
        }
      })
      


    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-full">
        <section className="mb-5 space-y-4">
          <h1 className="text-2xl font-semibold">REGISTER</h1>
          <p className="text-gray-500">Create an account to get started</p>
        </section>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <CustomFormField
            name="firstName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="John"
          />
          <CustomFormField
            name="lastName"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="Doe"
          />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4  md:space-y-0">
          <CustomFormField
            name="email"
            control={form.control}
            fieldType={FormFieldType.INPUT}
            placeholder="johndoe@gmail.com"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            placeholder="0712345678"
          />
        </div>
        <CustomFormField
          name="address"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          placeholder="123, Main Street, Colombo 05"
        />
        <CustomFormField
          name="password"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          placeholder="Password"
          type="password"
        />
        <CustomFormField
          name="confirmPassword"
          control={form.control}
          fieldType={FormFieldType.INPUT}
          placeholder="Confirm Password"
          type="password"
        />



        <SubmitButton isLoading={isLoading}>REGISTER</SubmitButton>
      </form>
    </Form>
  )
};

export default RegisterForm;
