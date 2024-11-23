"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormFeild";
import SubmitButton from "../SubmitButton";
import { authService } from "@/services/auth.service";

const LoginForm = ({
    setOpen,
}:{
    setOpen: (open: boolean) => void;
}) => {

    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

        try {
            const user = {

                email: values.email,
                password: values.password
            };

            await authService.login(user).then((response) => {
                console.log("login",response);

                if (response) {
                    sessionStorage.setItem("token", response.data.token);
                    setOpen(false);
                }
                
            })



        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
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
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="********"
                />
                <SubmitButton isLoading={isLoading}>Login</SubmitButton>
            </form>
        </Form>
    )


}

export default LoginForm;