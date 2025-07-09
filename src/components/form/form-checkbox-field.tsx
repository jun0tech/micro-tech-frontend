import React from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { cn } from "../../lib/utils";

interface FormCheckboxFieldProps
  extends React.ComponentPropsWithoutRef<"input"> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
}

interface ControlledCheckboxProps extends FormCheckboxFieldProps {
  control: Control<any>;
  name: string;
}

// Uncontrolled version
const FormCheckboxField = React.forwardRef<
  HTMLInputElement,
  FormCheckboxFieldProps
>(({ label, error, id, className, wrapperClassName, ...props }, ref) => {
  return (
    <div className={cn("flex items-center space-x-2", wrapperClassName)}>
      <input
        type="checkbox"
        id={id}
        ref={ref}
        className={cn(
          "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 select-none"
        >
          {label}
        </label>
      )}
      {error && <span className="text-sm text-red-500 ml-1">{error}</span>}
    </div>
  );
});

FormCheckboxField.displayName = "FormCheckboxField";

// Controlled version
export const ControlledCheckbox: React.FC<ControlledCheckboxProps> = ({
  control,
  name,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <FormCheckboxField
          {...props}
          ref={ref}
          checked={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default FormCheckboxField;
