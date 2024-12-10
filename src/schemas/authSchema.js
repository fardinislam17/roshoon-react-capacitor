import * as z from 'zod';

const phoneEmailSchema = z
  .string()
  .nonempty('Email or Phone is required')
  .refine(
    (value) =>
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) || // Email regex
      /^\+?[1-9]\d{1,14}$/.test(value), // Phone number regex
    'Must be a valid email or phone number'
  );

export const signUpSchema = z
  .object({
    phoneOrEmail: phoneEmailSchema,
    firstName: z.string().nonempty('First name is required'),
    lastName: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    repeatPassword: z
      .string()
      .min(6, 'Repeat Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords must match',
    path: ['repeat_password'],
  });
