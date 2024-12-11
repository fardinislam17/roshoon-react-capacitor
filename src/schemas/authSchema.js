import * as z from 'zod';

const phoneEmailSchema = z
  .string()
  .min(1, 'Email or Phone is required')
  .refine(
    (value) =>
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || // Email regex
      /^\+?[1-9]\d{1,14}$/.test(value), // Phone number regex
    'Must be a valid email or phone number'
  );

export const signUpSchema = z
  .object({
    phoneOrEmail: phoneEmailSchema,
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    repeatPassword: z
      .string()
      .min(6, 'Repeat Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  buildingNo: z.string().min(1, 'Building number is required'),
  state: z.string().min(1, 'State is required'),
  city: z.number().min(1, 'City is required'),
  zipCode: z.string().min(1, 'ZIP Code is required'),
  country: z.string().default('United States'),
});
