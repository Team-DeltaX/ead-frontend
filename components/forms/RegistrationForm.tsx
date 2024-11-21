"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Importing React Iconsnpm install zod
import { FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLock } from "react-icons/fa";

import { Form } from "@/components/ui/form";
import SubmitButton from "../SubmitButton";
import CustomFormField, { FormFieldType } from "../CustomFormFeild";

// Validation schema using Zod
const PatientFormValidation = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  phone: z.string().nonempty("Phone number is required"),
  address: z.string().nonempty("Address is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
});

// Default form values
const PatientFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm = ({
  user,
}: {
  user: { $id: string; name: string; email: string; phone: string };
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const { errors } = form.formState;

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    try {
      const newUser = {
        userId: user.$id,
        ...values,
      };

      console.log("User registered:", newUser);

     
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        {/* Form Header */}
        <div className="space-y-1 text-center">
          <p className="text-gray-600">Let's set up your account</p>
        </div>

        {/* Personal Information */}
        <section className="space-y-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            placeholder="Enter your name"
            icon={<FaUser className="text-blue-500" />}
            error={errors.name?.message}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            placeholder="Enter your email"
            icon={<FaEnvelope className="text-blue-500" />}
            error={errors.email?.message}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="phone"
            placeholder="Enter your phone number"
            icon={<FaPhoneAlt className="text-blue-500" />}
            error={errors.phone?.message}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            placeholder="Enter your address"
            icon={<FaMapMarkerAlt className="text-blue-500" />}
            error={errors.address?.message}
          />
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            placeholder="Create a password"
            icon={<FaLock className="text-blue-500" />}
            error={errors.password?.message}
          />
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="confirmPassword"
            placeholder="Confirm your password"
            icon={<FaLock className="text-blue-500" />}
            error={errors.confirmPassword?.message}
          />
        </section>

        {/* Submit Button */}
        <SubmitButton isLoading={isLoading}>Create Account</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
