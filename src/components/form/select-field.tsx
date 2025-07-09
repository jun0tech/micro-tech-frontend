"use client";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface SelectFieldProps {
  defaultValue?: string;
  label?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  className?: string;
  onValueChange?: (value: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  wrapperClassName?: string;
  id?: string;
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      defaultValue,
      label,
      required,
      placeholder,
      options,
      className,
      error,
      onValueChange,
      isLoading,
      disabled,
      wrapperClassName,
      id,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue ?? "");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <div className={cn("mb-4", wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {isLoading ? (
            <div className="flex items-center justify-center w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          ) : (
            <select
              id={id}
              ref={ref}
              value={value}
              onChange={handleChange}
              disabled={disabled}
              className={cn(
                "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white",
                error &&
                  "border-red-500 focus:ring-red-500 focus:border-red-500",
                disabled && "bg-gray-50 text-gray-500 cursor-not-allowed",
                className
              )}
              {...props}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        </div>
        {error && <span className="text-sm text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
