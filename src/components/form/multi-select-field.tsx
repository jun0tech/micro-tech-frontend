'use client';

import { Check, ChevronDown, X } from 'lucide-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

interface GroupOption {
  [key: string]: Option[];
}

interface MultiSelectFieldProps {
  value?: Option[];
  defaultOptions?: Option[];
  /** manually controlled options */
  options?: Option[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  /** Loading component. */
  loadingIndicator?: React.ReactNode;
  /** Empty component. */
  emptyIndicator?: React.ReactNode;
  /** Debounce time for async search. Only work with `onSearch`. */
  delay?: number;
  /**
   * Only work with `onSearch` prop. Trigger search when `onFocus`.
   * For example, when user click on the input, it will trigger the search to get initial options.
   **/
  triggerSearchOnFocus?: boolean;
  /** async search */
  onSearch?: (value: string) => Promise<Option[]>;
  onChange?: (options: Option[]) => void;
  /** Limit the maximum number of selected options. */
  maxSelected?: number;
  /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
  onMaxSelected?: (maxLimit: number) => void;
  disabled?: boolean;
  /** Group the options base on provided key. */
  groupBy?: string;
  className?: string;
  badgeClassName?: string;
  error?: boolean;
  icon?: React.ReactNode;
}

export interface MultiSelectFieldRef {
  selectedValue: Option[];
  focus: () => void;
  reset: () => void;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

function transToGroupOption(options: Option[], groupBy?: string): GroupOption {
  if (options.length === 0) {
    return {};
  }
  if (!groupBy) {
    return {
      '': options,
    };
  }

  const groupOption: GroupOption = {};
  options.forEach((option) => {
    const key = (option[groupBy] as string) || '';
    if (!groupOption[key]) {
      groupOption[key] = [];
    }
    groupOption[key].push(option);
  });
  return groupOption;
}

const MultiSelectField = React.forwardRef<
  MultiSelectFieldRef,
  MultiSelectFieldProps
>(
  (
    {
      value,
      onChange,
      placeholder = 'Select options',
      label,
      required,
      defaultOptions = [],
      options: arrayOptions,
      delay,
      onSearch,
      loadingIndicator = (
        <div className="flex items-center justify-center py-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          <span className="ml-2">Loading...</span>
        </div>
      ),
      emptyIndicator = (
        <div className="py-6 text-center text-base">No results found</div>
      ),
      maxSelected = Number.MAX_SAFE_INTEGER,
      onMaxSelected,
      disabled,
      groupBy,
      className,
      badgeClassName,
      triggerSearchOnFocus = false,
      error,
      icon,
    }: MultiSelectFieldProps,
    ref: React.Ref<MultiSelectFieldRef>,
  ) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const badgeContainerRef = useRef<HTMLDivElement>(null);

    const [selected, setSelected] = useState<Option[]>(value || []);
    const [pendingSelected, setPendingSelected] = useState<Option[]>(
      value || [],
    );
    const [options, setOptions] = useState<GroupOption>(
      transToGroupOption(defaultOptions, groupBy),
    );
    const [inputValue, setInputValue] = useState('');
    const debouncedSearchTerm = useDebounce(inputValue, delay);

    React.useImperativeHandle(
      ref,
      () => ({
        selectedValue: [...selected],
        focus: () => triggerRef?.current?.focus(),
        reset: () => {
          setSelected([]);
          setPendingSelected([]);
        },
      }),
      [selected],
    );

    // Handle dropdown open/close
    const handleOpenChange = (open: boolean) => {
      if (open) {
        // When opening, initialize pending selection with current selection
        setPendingSelected(selected);
      } else {
        // When closing, apply pending selections and notify parent
        setSelected(pendingSelected);
        if (JSON.stringify(pendingSelected) !== JSON.stringify(selected)) {
          onChange?.(pendingSelected);
        }
      }
      setOpen(open);
    };

    const handleUnselect = React.useCallback(
      (option: Option, e?: React.MouseEvent) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        const newOptions = pendingSelected.filter(
          (s) => s.value !== option.value,
        );
        setPendingSelected(newOptions);
      },
      [pendingSelected],
    );

    const handleToggleOption = React.useCallback(
      (option: Option) => {
        if (option.disable) return;

        // If already selected, remove it
        if (pendingSelected.some((item) => item.value === option.value)) {
          handleUnselect(option);
          return;
        }

        // Otherwise add it, check max limit
        if (pendingSelected.length >= maxSelected) {
          onMaxSelected?.(pendingSelected.length);
          return;
        }

        const newOptions = [...pendingSelected, option];
        setPendingSelected(newOptions);
      },
      [handleUnselect, maxSelected, onMaxSelected, pendingSelected],
    );

    useEffect(() => {
      if (value) {
        setSelected(value);
        if (!open) {
          setPendingSelected(value);
        }
      }
    }, [value, open]);

    useEffect(() => {
      /** If `onSearch` is provided, do not trigger options updated. */
      if (!arrayOptions || onSearch) {
        return;
      }
      const newOption = transToGroupOption(arrayOptions || [], groupBy);
      if (JSON.stringify(newOption) !== JSON.stringify(options)) {
        setOptions(newOption);
      }
    }, [arrayOptions, groupBy, onSearch, options]);

    useEffect(() => {
      /** async search */
      const doSearch = async () => {
        setIsLoading(true);
        try {
          const res = await onSearch?.(debouncedSearchTerm);
          setOptions(transToGroupOption(res || [], groupBy));
        } finally {
          setIsLoading(false);
        }
      };

      const exec = async () => {
        if (!onSearch || !open) return;

        if (triggerSearchOnFocus) {
          await doSearch();
        }

        if (debouncedSearchTerm) {
          await doSearch();
        }
      };

      void exec();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchTerm, groupBy, open, triggerSearchOnFocus]);

    // Flatten all options for display in dropdown
    const allOptions = React.useMemo(() => {
      const flatOptions: Option[] = [];

      Object.values(options).forEach((optionGroup) => {
        optionGroup.forEach((option) => {
          flatOptions.push(option);
        });
      });

      return flatOptions;
    }, [options]);

    const displayedGroups = Object.keys(options).filter(
      (groupName) => options[groupName].length > 0,
    );

    const handleClearAll = () => {
      const fixedOptions = pendingSelected.filter((opt) => opt.fixed);
      setPendingSelected(fixedOptions);
    };

    return (
      <div className="flex w-full flex-col">
        {label && (
          <Label className={cn('mb-2 text-grey-dark', error && 'text-red-500')}>
            {label}
            {required && <span className="ml-[2px] text-red-500">*</span>}
          </Label>
        )}

        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger
            ref={triggerRef}
            disabled={disabled}
            className={cn(
              'flex h-[40px] w-full items-center justify-between rounded border border-white-medium bg-white px-3 py-2 text-left text-sm shadow-none focus:outline-none focus:ring-0',
              error && 'border-red-500',
              className,
            )}
          >
            <div className="flex flex-1 items-center overflow-hidden">
              {selected.length > 0 ? (
                <div
                  ref={badgeContainerRef}
                  className="flex items-center gap-1 overflow-hidden"
                >
                  {selected.map((option) => (
                    <Badge
                      key={option.value}
                      className={cn(
                        'bg-primary text-white hover:bg-primary-dark',
                        badgeClassName,
                        'whitespace-nowrap',
                      )}
                    >
                      {option.label}
                      {!(option.fixed || disabled) && (
                        <span
                          role="button"
                          tabIndex={0}
                          className="ml-1 cursor-pointer rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          onClick={(e) => {
                            handleUnselect(option, e);
                            // Apply changes immediately when clicking X on a badge
                            setSelected(
                              pendingSelected.filter(
                                (opt) => opt.value !== option.value,
                              ),
                            );
                            onChange?.(
                              pendingSelected.filter(
                                (opt) => opt.value !== option.value,
                              ),
                            );
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleUnselect(option);
                              // Apply changes immediately when clicking X on a badge
                              setSelected(
                                pendingSelected.filter(
                                  (opt) => opt.value !== option.value,
                                ),
                              );
                              onChange?.(
                                pendingSelected.filter(
                                  (opt) => opt.value !== option.value,
                                ),
                              );
                            }
                          }}
                        >
                          <X className="h-3 w-3 text-white" />
                        </span>
                      )}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-grey-medium">{placeholder}</span>
              )}
            </div>
            {icon || (
              <ChevronDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
            )}
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0"
            align="start"
          >
            <div className="flex items-center border-b px-3 py-2">
              <input
                ref={inputRef}
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                placeholder="Search..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={disabled}
                autoFocus
              />
              {inputValue && (
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setInputValue('')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setInputValue('');
                    }
                  }}
                  className="ml-2 cursor-pointer"
                >
                  <X className="h-4 w-4 opacity-50" />
                </div>
              )}
            </div>

            <div className="max-h-[300px] overflow-auto">
              {isLoading
                ? loadingIndicator
                : allOptions.length === 0
                  ? emptyIndicator
                  : displayedGroups.map((groupName) => (
                      <div key={groupName} className="py-1">
                        {groupName && (
                          <div className="px-2 py-1.5 text-xs font-semibold text-grey-dark">
                            {groupName}
                          </div>
                        )}
                        {options[groupName].map((option) => {
                          const isSelected = pendingSelected.some(
                            (item) => item.value === option.value,
                          );

                          return (
                            <div
                              key={option.value}
                              className={cn(
                                'relative flex w-full cursor-pointer select-none items-center justify-between rounded-sm px-3 py-2 pl-2 pr-8 text-sm outline-none hover:bg-white-medium focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none',
                                option.disable && 'cursor-default opacity-50',
                                isSelected && 'font-medium text-primary',
                              )}
                              onClick={() => handleToggleOption(option)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  handleToggleOption(option);
                                }
                              }}
                            >
                              <span>{option.label}</span>
                              {isSelected && (
                                <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
                                  <Check className="h-4 w-4 text-primary" />
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
            </div>

            {pendingSelected.length > 0 && (
              <div className="border-t p-2">
                <div
                  className="cursor-pointer text-center text-xs text-grey-dark hover:text-primary"
                  onClick={handleClearAll}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleClearAll();
                    }
                  }}
                >
                  Clear all
                </div>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

MultiSelectField.displayName = 'MultiSelectField';
export default MultiSelectField;
