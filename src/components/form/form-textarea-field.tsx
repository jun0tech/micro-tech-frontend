import React from "react";
import { cn } from "../../lib/utils";

interface FormTextareaFieldProps
  extends React.ComponentPropsWithoutRef<"textarea"> {
  label?: string;
  error?: string;
  required?: boolean;
  wrapperClassName?: string;
}

const FormTextareaField = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaFieldProps
>(
  (
    { label, error, required, id, className, wrapperClassName, ...props },
    ref
  ) => {
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
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical min-h-[80px]",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

FormTextareaField.displayName = "FormTextareaField";

export default FormTextareaField;
