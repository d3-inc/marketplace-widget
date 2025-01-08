import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import clsx from 'clsx';
import { cn } from '../../utils/twMerge.js';
import type { ContactInfo, RegistrantContact } from '../../views/cart/hooks/types.js';
import { Button } from '../ui/button.js';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form.js';
import { Input } from '../ui/input.js';
import LocationSelector from '../ui/locationInput.js';
import { PhoneInput } from '../ui/phoneInput.js';
import { ScrollArea } from '../ui/scrollArea.js';

const formSchema = z.object({
  firstName: z
    .string({ required_error: 'First Name is required' })
    .min(2, { message: 'First Name must have at least 2 characters' })
    .max(50, { message: 'First Name cannot exceed 50 characters' }),
  lastName: z
    .string({ required_error: 'Last Name is required' })
    .max(50, { message: 'Last Name cannot exceed 50 characters' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  phone: z.string({ required_error: 'Phone number is required' }),
  country: z
    .tuple([z.string({ required_error: 'Country is required' }), z.string().optional()])
    .refine(([country]) => country.trim() !== '', { message: 'Country cannot be empty' }),
  city: z
    .string({ required_error: 'City is required' })
    .max(100, { message: 'City name cannot exceed 100 characters' }),
  street: z
    .string({ required_error: 'Street address is required' })
    .max(256, { message: 'Street address cannot exceed 256 characters' }),
  postalCode: z
    .string({ required_error: 'ZIP Code is required' })
    .max(10, { message: 'ZIP Code cannot exceed 10 characters' }),
  organization: z
    .string()
    .max(256, { message: 'Organization name cannot exceed 256 characters' })
    .optional(),
});

const formDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  postalCode: '',
  countryCode: '',
  street: '',
  state: '',
  city: '',
  organization: '',
  phoneCountryCode: '',
  phone: '',
};
type ContactFormProps = {
  isWalletIntegrationMode: boolean;
  isButtonDisabled: boolean;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  handleStartCheckout: (contact?: RegistrantContact) => Promise<void>;
};

export function ContactForm({
  isWalletIntegrationMode,
  isButtonDisabled,
  setContactInfo,
  handleStartCheckout,
}: ContactFormProps) {
  const [countryName, setCountryName] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // eslint-disable-next-line prettier/prettier, no-console
      console.log(values, countryName);
      const contact = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        postalCode: values.postalCode,
        countryCode: countryName,
        street: values.street,
        state: values.country[1] ?? '',
        city: values.city,
        organization: values.organization,
        // phone: values.phone,
        phoneCountryCode: '+1',
        phone: '2014563452',
      };
      setContactInfo({
        isFormOpen: false,
        contact,
      });
      handleStartCheckout(contact);
    } catch (error) {
      console.error('Form submission error', error);
    }
  }

  return (
    <ScrollArea
      className={clsx(
        'h-10/12 w-full',
        isWalletIntegrationMode
          ? 'max-h-[76dvh] md:max-h-[430px]'
          : 'max-h-[83dvh] md:max-h-[490px]',
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 max-w-3xl mx-auto px-4 pb-4"
        >
          <div>
            <h5 className={cn('text-sm font-semibold text-left')}>Contact Information</h5>
            <p className={cn('text-sm text-left')}>
              This information will be saved for future purchases
            </p>
          </div>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-1 flex flex-col items-start">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-1 flex flex-col items-start">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Last Name" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1 flex flex-col items-start">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Email" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-1 flex flex-col items-start">
                <FormLabel>Phone number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput placeholder="Enter phone number." {...field} defaultCountry="US" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="text-left">
                  <FormLabel>Country</FormLabel>
                </div>
                <FormControl>
                  <LocationSelector
                    onCountryChange={(country) => {
                      setCountryName(country?.iso2 || '');
                      form.setValue(field.name, [country?.name || '', stateName || '']);
                    }}
                    onStateChange={(state) => {
                      setStateName(state?.name || '');
                      form.setValue(field.name, [
                        form.getValues(field.name)[0] || '',
                        state?.name || '',
                      ]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  If your country has states, it will be appear after selecting country
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="space-y-1 flex flex-col items-start">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="space-y-1 flex flex-col items-start">
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Enter street address" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4 pb-2">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex flex-col items-start">
                    <FormLabel>Zipcode</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Zipcode" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex flex-col items-start">
                    <FormLabel>Organization</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Organization" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button
            disabled={isButtonDisabled}
            type="submit"
            className="rounded-xl w-full bg-[linear-gradient(95deg,_#5744e6_4.29%,_#8936ea_99.74%)] mt-auto"
          >
            Buy Now
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
