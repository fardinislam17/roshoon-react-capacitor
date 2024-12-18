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
  shopName: z.string().min(3, 'Store name is required'),
  address: z.string().min(5, 'Valid address is required'),
  buildingNo: z.string().optional(),
  state: z.string().min(3, 'State is required'),
  city: z.string().min(3, 'City is required'),
  zipCode: z
    .string()
    .length(5, 'ZIP Code must be 5 digits')
    .refine((val) => /^\d+$/.test(val), 'ZIP Code must be numeric'),
  ssn: z
    .string()
    .length(9, 'SSN must be 9 digits')
    .refine((val) => /^\d+$/.test(val), 'SSN must be numeric'),
  country: z.string().default('United States'),
});
