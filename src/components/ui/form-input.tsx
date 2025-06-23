import React from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "./input";
import { Label } from "./label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  helperText?: string;
  name: string;
  nonControlled?: boolean;
  error?: string;
  control?: Control<any>;
}

export function FormInput({
  label,
  icon,
  helperText,
  id,
  className,
  name,
  nonControlled = false,
  error,
  control,
  ...props
}: FormInputProps) {
  const renderInput = (
    field?: { onChange: any; onBlur: any; value: any; name: any },
    fieldError?: string
  ) => (
    <div className="w-full">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          className={`block w-full px-3 py-3 bg-white/50 border ${
            error || fieldError ? "border-red-500" : "border-gray-300/70"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            icon ? "pr-10" : ""
          } ${className}`}
          style={{
            boxShadow: "none",
          }}
          {...(nonControlled ? { name } : { ...field, name })}
          {...props}
        />
        {icon && (
          <div
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              props.type === "password" ? "" : "pointer-events-none"
            }`}
          >
            {icon}
          </div>
        )}
      </div>
      {helperText && !(error || fieldError) && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
      {(error || fieldError) && (
        <p className="mt-1 text-xs text-red-500">{error || fieldError}</p>
      )}
    </div>
  );

  // Use non-controlled mode if explicitly set or if no control is provided
  if (nonControlled || !control) {
    return renderInput();
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) =>
        renderInput(field, fieldState.error?.message)
      }
    />
  );
}

export default FormInput;
