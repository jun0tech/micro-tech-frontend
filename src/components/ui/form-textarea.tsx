import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "./label";
import { Textarea } from "./textarea";

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  helperText?: string;
  error?: string;
  control?: Control<any>;
  nonControlled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
}

export function FormTextarea({
  label,
  name,
  helperText,
  error,
  control,
  nonControlled = false,
  required,
  className = "",
  id,
  ...props
}: FormTextareaProps) {
  const renderTextarea = (
    field?: { onChange: any; onBlur: any; value: any; name: any },
    fieldError?: string
  ) => (
    <div className="w-full">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </Label>
      <div className="relative">
        <Textarea
          id={id}
          className={`block w-full px-3 py-3 bg-white/50 border ${
            error || fieldError ? "border-red-500" : "border-gray-300/70"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
          style={{
            boxShadow: "none",
          }}
          {...(nonControlled ? { name } : { ...field, name })}
          {...props}
        />
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
    return renderTextarea();
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) =>
        renderTextarea(field, fieldState.error?.message)
      }
    />
  );
}

export default FormTextarea;
