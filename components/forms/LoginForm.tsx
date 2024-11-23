"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormFeild";
import SubmitButton from "../SubmitButton";

const LoginForm = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const UserLoginFormValidation = z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });


    const form = useForm<z.infer<typeof UserLoginFormValidation>>({
        resolver: zodResolver(UserLoginFormValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof UserLoginFormValidation>) => {
        setIsLoading(true);

        try {
            const user = {

                email: values.email,
                password: values.password
            };


        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
                <section className="mb-12 space-y-4">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700">Login</p>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"

                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="password"
                    label="Password"
                />
                <SubmitButton isLoading={isLoading}>Login</SubmitButton>
            </form>
        </Form>
    )


}

export default LoginForm;