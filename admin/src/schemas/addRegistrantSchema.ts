import { REGIONS_ARRAY } from "@/types/form-entries";
import z from "zod";

// Validation schema based on the Supabase types
export const addRegistrantSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  suffix: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  contact_number: z.string().min(1, "Contact number is required"),
  facebook_profile: z.string().optional(),
  region: z.enum([...REGIONS_ARRAY]),
  university: z.string().min(1, "University is required"),
  course: z.string().min(1, "Course is required"),
  is_dost_scholar: z.boolean(),
  is_start_member: z.boolean(),
  status: z.enum(["pending", "accepted", "rejected"] as const),
  is_checked_in: z.boolean(),
  remarks: z.string().optional(),
});
