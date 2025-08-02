import { z } from "zod";

export const registrationSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .min(1, "First name is required"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .min(1, "Last name is required"),
  middleName: z.string().optional(),
  suffix: z.string().optional(),
  contactNumber: z
    .string()
    .regex(
      /^09\d{9}$/,
      "Please enter a valid contact number starting with 09 (e.g., 09XXXXXXXXX)"
    )
    .min(1, "Contact number is required"),
  facebookProfile: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  region: z.string().min(1, "Please select your region"),
  university: z
    .string()
    .min(2, "University name must be at least 2 characters")
    .min(1, "University is required"),
  course: z
    .string()
    .min(2, "Course name must be at least 2 characters")
    .min(1, "Course is required"),
  // not sure if this needs to be required
  dostScholar: z.boolean(),
  dostStartMember: z.boolean(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
