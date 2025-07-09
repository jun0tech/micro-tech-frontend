import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface FormInputFieldProps extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  required?: boolean;
  endAdornment?: React.ReactNode;
  wrapperClassName?: string;
}

const FormInputField = React.forwardRef<HTMLInputElement, FormInputFieldProps>(
  (
    {
      label,
      error,
      required,
      endAdornment,
      id,
      className,
      type,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={cn("mb-4", wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={type === "password" && showPassword ? "text" : type}
            className={cn(
              "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors",
              error && "border-red-500 focus:ring-red-500 focus:border-red-500",
              className
            )}
            {...props}
          />
          {type === "password" ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : (
            endAdornment && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                {endAdornment}
              </div>
            )
          )}
        </div>
        {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

FormInputField.displayName = "FormInputField";

export default FormInputField;
