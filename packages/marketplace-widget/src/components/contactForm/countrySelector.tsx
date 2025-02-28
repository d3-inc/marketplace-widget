import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/twMerge.js';
import { Button } from '../ui/button.js';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command.js';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.js';
import { ScrollArea, ScrollBar } from '../ui/scrollArea.js';

// Import JSON data directly
import countries from '../../data/countries.json';
import type { CountryProps } from './types.js';

interface CountrySelectProps {
  disabled?: boolean;
  onCountryChange: (country: CountryProps | null) => void;
  selectedCountry: CountryProps | null;
}
// Cast imported JSON data to their respective types
const countriesData = countries as CountryProps[];

export const CountrySelector = ({
  disabled,
  onCountryChange,
  selectedCountry,
}: CountrySelectProps) => {
  const [openCountryDropdown, setOpenCountryDropdown] = useState(false);

  return (
    <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={openCountryDropdown}
          disabled={disabled}
          className="w-full justify-between"
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <span>{selectedCountry.emoji}</span>
              <span>{selectedCountry.name}</span>
            </div>
          ) : (
            <span>Select Country...</span>
          )}
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[250px] md:h-[300px]">
                {countriesData.map((country) => (
                  <CommandItem
                    key={country.id}
                    value={country.name}
                    onSelect={() => {
                      onCountryChange(country);
                      setOpenCountryDropdown(false);
                    }}
                    className="flex cursor-pointer items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span>{country.emoji}</span>
                      <span>{country.name}</span>
                    </div>
                    <Check
                      className={cn(
                        'h-4 w-4',
                        selectedCountry?.id === country.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
