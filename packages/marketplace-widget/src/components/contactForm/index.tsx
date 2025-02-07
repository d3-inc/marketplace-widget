import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';

import { cn } from '../../utils/twMerge.js';
import type { ContactInfo, RegistrantContact } from '../../views/cart/hooks/types.js';
import { Button } from '../ui/button.js';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form.js';
import { Input } from '../ui/input.js';
import { ScrollArea } from '../ui/scrollArea.js';
import { CountrySelector } from './countrySelector.js';
import { contactFormSchema } from './schema.js';
import { StateInput } from './stateInput.js';
import type { CountryProps } from './types.js';

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
  contactInfo: ContactInfo['contact'];
};

export function ContactForm({
  isWalletIntegrationMode,
  isButtonDisabled,
  setContactInfo,
  handleStartCheckout,
  contactInfo,
}: ContactFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<CountryProps | null>(null);
  const [selectedState, setSelectedState] = useState<{ id: number; name: string } | null>(null);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactInfo ?? formDefaultValues,
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    try {
      const contact = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        postalCode: values.postalCode,
        countryCode: selectedCountry?.iso2 ?? '',
        state: values.state ?? '',
        street: values.street,
        city: values.city,
        organization: values.organization,
        phone: values.phone,
        phoneCountryCode: values.phoneCountryCode,
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="contact-form-container"
        className="flex flex-col w-full h-full flex-grow"
      >
        <div className="mb-2 px-3">
          <h5 className={cn('text-sm font-semibold text-left')}>Contact Information</h5>
        </div>
        <div className={cn('flex flex-col flex-grow gap-3 overflow-hidden')}>
          <ScrollArea
            className={clsx(
              'h-9/12 w-full',
              isWalletIntegrationMode
                ? 'max-h-[83dvh] md:max-h-[360px]'
                : 'max-h-[83dvh] md:max-h-[425px]',
            )}
          >
            <div className="space-y-3 px-3">
              <div className="flex gap-4 w-full">
                <div className="flex-1 flex-grow items-start">
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
                </div>
                <div className="flex-1 flex-grow items-start">
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
                </div>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-1 flex flex-col items-start">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 w-full">
                <div className="flex-[8] items-start">
                  <FormField
                    control={form.control}
                    name="phoneCountryCode"
                    render={({ field }) => (
                      <FormItem className="space-y-1 flex flex-col items-start">
                        <FormLabel>Phone Country Code</FormLabel>
                        <FormControl>
                          <Input placeholder="+1" type="text" {...field} />
                        </FormControl>
                        <FormMessage className="text-start" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-[12] items-start">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-1 flex flex-col items-start">
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Phone number" type="text" {...field} />
                        </FormControl>
                        <FormMessage className="text-start" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex-1 flex-grow items-start">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="text-left">
                          <FormLabel>Country</FormLabel>
                        </div>
                        <FormControl>
                          <CountrySelector
                            onCountryChange={(country) => {
                              setSelectedCountry(country);
                              form.setValue(field.name, country?.name || '');
                              form.setValue('state', '');
                            }}
                            selectedCountry={selectedCountry}
                          />
                        </FormControl>
                        <FormMessage className="text-start" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 flex-grow items-start">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <div className="text-left">
                          <FormLabel>State</FormLabel>
                        </div>
                        <FormControl>
                          <StateInput
                            selectedState={selectedState}
                            control={form.control}
                            onStateChange={(state) => {
                              setSelectedState(state);
                              form.setValue(field.name, state?.name || '');
                            }}
                            selectedCountry={selectedCountry}
                          />
                        </FormControl>
                        <FormMessage className="text-start" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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

              <div className="flex gap-4 w-full pb-2">
                <div className="flex-1 flex-grow items-start">
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

                <div className="flex-1 flex-grow items-start">
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
            </div>
          </ScrollArea>
        </div>
        <div className="px-3">
          <Button
            disabled={isButtonDisabled}
            type="submit"
            className="rounded-xl w-full bg-[linear-gradient(95deg,_#5744e6_4.29%,_#8936ea_99.74%)] mt-auto mb-1 md:mt-1"
          >
            Buy Now
          </Button>
        </div>
      </form>
    </Form>
  );
}
