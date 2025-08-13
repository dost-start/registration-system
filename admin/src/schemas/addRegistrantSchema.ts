import { REGIONS_ARRAY } from "@/types/form-entries";
import { Constants } from "@/types/supabase";
import z from "zod";

const YEAR_LEVELS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "5th year",
  "6th year",
] as const;
const YEAR_AWARDED_OPTIONS = [
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
] as const;

// Validation schema based on the Supabase types
export const addRegistrantSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  suffix: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  contact_number: z.string().min(1, "Contact number is required"),
  facebook_profile: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  region: z.enum([...REGIONS_ARRAY]),
  university: z.string().min(1, "University is required"),
  course: z.string().min(1, "Course is required"),
  year_level: z.enum(YEAR_LEVELS).optional(),
  year_awarded: z.enum(YEAR_AWARDED_OPTIONS).optional(),
  scholarship_type: z.enum(Constants.public.Enums.scholarship_type),
  is_start_member: z.boolean(),
  status: z.enum(["pending", "accepted", "rejected"] as const),
  is_checked_in: z.boolean(),
  remarks: z
    .string()
    .max(300, "Remarks cannot exceed 300 characters")
    .optional(),
});
