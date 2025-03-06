import { z } from "zod";

export const termsSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

export type TermsFormData = z.infer<typeof termsSchema>;

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

export const careTypeSchema = z.object({
  careType: z.enum(["stationary", "ambulatory", "daycare"], {
    required_error: "Please select a type of care.",
  }),
});

export type CareTypeFormData = z.infer<typeof careTypeSchema>;

export const locationSchema = z.object({
  zipCode: z
    .string()
    .regex(/^\d{5}$/, { message: "Zip code must be 5 digits." }),
});

export type LocationFormData = z.infer<typeof locationSchema>;
