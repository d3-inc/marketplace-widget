import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import type { Control } from 'react-hook-form';
import type * as z from 'zod';
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
import { FormControl, FormField, FormItem } from '../ui/form.js';
import { Input } from '../ui/input.js';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover.js';
import { ScrollArea, ScrollBar } from '../ui/scrollArea.js';
import type { contactFormSchema } from './schema.js';

// Import JSON data directly
import UsStates from '../../data/usStates.json';
import type { CountryProps, StateProps } from './types.js';

interface StateInputProps {
  disabled?: boolean;
  onStateChange: (state: StateProps | null) => void;
  control: Control<z.infer<typeof contactFormSchema>>;
  selectedCountry: CountryProps | null;
  selectedState: StateProps | null;
}
const statesData = UsStates as StateProps[];

export const StateInput = ({
  onStateChange,
  control,
  selectedCountry,
  disabled,
  selectedState,
}: StateInputProps) => {
  const [openStateDropdown, setOpenStateDropdown] = useState(false);
  const isSelectedCountryUS = selectedCountry?.iso2 === 'US';

  if (isSelectedCountryUS) {
    return (
      <Popover open={openStateDropdown} onOpenChange={setOpenStateDropdown}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openStateDropdown}
            disabled={!selectedCountry || disabled}
            className="w-full justify-between"
          >
            {selectedState ? <span>{selectedState.name}</span> : <span>Select State...</span>}
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Search state..." />
            <CommandList>
              <CommandEmpty>No state found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-[300px]">
                  {statesData.map((state) => (
                    <CommandItem
                      key={state.id}
                      value={state.name}
                      onSelect={() => {
                        onStateChange(state);
                        setOpenStateDropdown(false);
                      }}
                      className="flex cursor-pointer items-center justify-between text-sm"
                    >
                      <span>{state.name}</span>
                      <Check
                        className={cn(
                          'h-4 w-4',
                          selectedState?.id === state.id ? 'opacity-100' : 'opacity-0',
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
  }
  return (
    <FormField
      control={control}
      name="state"
      render={({ field }) => (
        <FormItem className="space-y-1 flex flex-col items-start">
          <FormControl>
            <Input
              placeholder="Enter State"
              type="text"
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                onStateChange({ id: 0, name: value, stateCode: value });
              }}
              disabled={disabled}
              readOnly={!selectedCountry}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
