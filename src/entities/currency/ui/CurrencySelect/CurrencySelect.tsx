import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/Popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { memo, useState } from "react";
import type { CurrencySymbol } from "../../model/types/currency";

interface Props {
  items?: CurrencySymbol[];
  defaultValue?: string | null;
  callback?: (currency: CurrencySymbol["currency"]) => void;
  placeholder?: string;
  className?: string;
}

export const CurrencySelect = memo(
  ({ items, defaultValue, callback, placeholder, className }: Props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue || "");

    const onSelectItem = (currency: CurrencySymbol["currency"]) => {
      if (currency !== value) {
        callback?.(currency);
        setValue(currency);
      }
      setOpen(false);
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-[200px] justify-between text-black", className)}
            style={{ color: "black" }}
          >
            {value}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder={placeholder} />

            <CommandList>
              <CommandEmpty>Не найдено</CommandEmpty>

              <CommandGroup>
                {items?.map(({ currency }) => (
                  <CommandItem
                    key={currency}
                    value={currency}
                    onSelect={() => onSelectItem(currency)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === currency ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {currency}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
  (prevProps, nextProps) =>
    prevProps.items === nextProps.items &&
    prevProps.defaultValue === nextProps.defaultValue &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.className === nextProps.className,
);
