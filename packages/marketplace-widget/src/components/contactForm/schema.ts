import * as z from 'zod';

export const contactFormSchema = z.object({
  firstName: z
    .string({ required_error: 'First Name is required' })
    .max(50, { message: 'First Name cannot exceed 50 characters' })
    .refine((value) => value.trim() !== '', { message: 'First Name is required' }),
  lastName: z
    .string({ required_error: 'Last Name is required' })
    .max(50, { message: 'Last Name cannot exceed 50 characters' })
    .refine((value) => value.trim() !== '', { message: 'Last Name is required' }),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email format' })
    .refine((value) => value.trim() !== '', { message: 'Email is required' }),
  phone: z
    .string({ required_error: 'Phone number is required' })
    .refine((value) => value.trim() !== '', { message: 'Phone number is required' }),
  country: z
    .string({ required_error: 'Country is required' })
    .refine((value) => value.trim() !== '', { message: 'Country is required' }),
  state: z
    .string({ required_error: 'State is required' })
    .refine((value) => value.trim() !== '', { message: 'State is required' }),
  city: z
    .string({ required_error: 'City is required' })
    .max(100, { message: 'City name cannot exceed 100 characters' })
    .refine((value) => value.trim() !== '', { message: 'City is required' }),
  street: z
    .string({ required_error: 'Street address is required' })
    .max(256, { message: 'Street address cannot exceed 256 characters' })
    .refine((value) => value.trim() !== '', { message: 'Street address is required' }),
  postalCode: z
    .string({ required_error: 'ZIP Code is required' })
    .max(10, { message: 'ZIP Code cannot exceed 10 characters' })
    .refine((value) => value.trim() !== '', { message: 'ZIP Code is required' }),
  organization: z
    .string() // Organization is optional
    .max(256, { message: 'Organization name cannot exceed 256 characters' })
    .optional(),
});
