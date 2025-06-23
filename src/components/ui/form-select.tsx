import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
  control?: Control<any>;
  nonControlled?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export function FormSelect({
  label,
  name,
  options,
  placeholder = "Select an option",
  helperText,
  error,
  control,
  nonControlled = false,
  required,
  className = "",
  id,
  disabled,
}: FormSelectProps) {
  const renderSelect = (
    field?: { onChange: any; onBlur: any; value: any; name: any },
    fieldError?: string
  ) => (
    <div className="w-full">
      <Label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </Label>
      <div className="relative">
        <Select
          disabled={disabled}
          defaultValue={nonControlled ? undefined : field?.value}
          onValueChange={nonControlled ? undefined : field?.onChange}
        >
          <SelectTrigger
            id={id}
            className={`w-full h-12 px-3 bg-white/50 border ${
              error || fieldError ? "border-red-500" : "border-gray-300/70"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
            style={{
              boxShadow: "none",
            }}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="rounded-md border-gray-300/70">
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
    return renderSelect();
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) =>
        renderSelect(field, fieldState.error?.message)
      }
    />
  );
}

export default FormSelect;
