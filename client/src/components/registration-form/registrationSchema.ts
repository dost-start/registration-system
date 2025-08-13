import {
  REGIONS_ARRAY,
  YEAR_AWARDED_OPTIONS,
  YEAR_LEVELS,
} from "@/types/types";
import { Constants } from "@/types/supabase";
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
  region: z.enum(REGIONS_ARRAY, {
    message: "Please select a valid region",
  }),
  university: z.string().min(1, "University is required"),
  course: z.string().min(1, "Course is required"),
  yearLevel: z.enum(YEAR_LEVELS, {
    message: "Please select a valid year level",
  }),
  yearAwarded: z.enum(YEAR_AWARDED_OPTIONS, {
    message: "Please select the year you were awarded the scholarship",
  }),
  scholarshipType: z.enum(Constants.public.Enums.scholarship_type, {
    message: "Please select a valid scholarship type",
  }),
  dostStartMember: z.boolean(),
  hasReadPrimer: z.boolean().refine((val) => val === true, {
    message: "You must read the event primer before registering",
  }),
  agreeToDataPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Data Privacy Policy to register",
  }),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
