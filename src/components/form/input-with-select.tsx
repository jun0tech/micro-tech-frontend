'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const InputWithSelect = ({
  defaultValue,
  label,
  placeholder,
  options,
  inputClassName,
  icon,
  onValueChange,
  onInputChange,
  inputValue,
}: {
  defaultValue?: string;
  label?: string;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  inputClassName?: string;
  icon?: React.ReactNode;
  onValueChange?: (value: string) => void;
  onInputChange?: (value: string) => void;
  inputValue?: number;
}) => {
  const [value, setValue] = useState(defaultValue ?? '');

  return (
    <div className="w-full rounded">
      {label && (
        <Label className="mb-1 block text-sm text-grey-dark">{label}</Label>
      )}
      <div className="flex h-14 items-center rounded border border-white-medium bg-primary-extra-light px-3 py-2">
        {icon && <div>{icon}</div>}
        <Input
          className={cn(
            'mx-2 -mt-0.5 h-10 w-full appearance-none border-none p-0 font-bold text-black shadow-none placeholder:text-base placeholder:font-medium placeholder:capitalize placeholder:text-grey-medium focus-visible:outline-none focus-visible:ring-0 md:text-md [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden',
            inputClassName,
          )}
          placeholder={placeholder}
          type="number"
          value={inputValue}
          onChange={(e) => {
            if (onInputChange) {
              onInputChange(e.target.value);
            }
          }}
        />
        <Select
          defaultValue={value}
          onValueChange={(value) => {
            setValue(value);
            if (onValueChange) {
              onValueChange(value);
            }
          }}
        >
          <SelectTrigger className="w-auto border-none bg-transparent p-0 text-grey-dark shadow-none focus:ring-0">
            <SelectValue placeholder="km" />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default InputWithSelect;
