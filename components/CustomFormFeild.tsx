import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

export enum FormFieldType {
  INPUT = "input",
  PASSWORD = "password",
}

interface CustomFormFieldProps {
  name: string;
  control: any; // React Hook Form's `control` object
  fieldType: FormFieldType;
  placeholder: string;
  icon?: React.ReactNode; // Optional icon to display in the field
  error?: string; // Validation error message
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  name,
  control,
  fieldType,
  placeholder,
  icon,
  error,
}) => {
  return (
    <div>
      <div
        className={`flex items-center space-x-3 bg-gray-100 rounded-lg px-4 py-3 shadow-md ${
          error ? "ring-2 ring-red-500" : "focus-within:ring-2 focus-within:ring-blue-500"
        }`}
      >
        {icon && <div className="text-blue-500">{icon}</div>}
        <Input
          type={fieldType === FormFieldType.PASSWORD ? "password" : "text"}
          placeholder={placeholder}
          {...control.register(name)}
          className="bg-transparent w-full outline-none placeholder-gray-400"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomFormField;
