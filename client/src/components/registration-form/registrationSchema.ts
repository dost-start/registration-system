import { z } from "zod";

export const registrationSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
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
  university: z.string().min(1, "University is required"),
  course: z.string().min(1, "Course is required"),
  // DOST Scholar is required to be true
  dostScholar: z.boolean().refine((val) => val === true, {
    message: "You must be a current DOST Scholar to register",
  }),
  dostStartMember: z.boolean(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
