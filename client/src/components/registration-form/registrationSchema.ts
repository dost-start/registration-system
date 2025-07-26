import * as yup from "yup";

// Yup validation schema for registration form
export const registrationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  middleName: yup.string().optional().default(""),
  suffix: yup.string().optional().default(""),
  contactNumber: yup
    .string()
    .matches(
      /^09\d{9}$/,
      "Please enter a valid contact number starting with 09 (e.g., 09XXXXXXXXX)"
    )
    .required("Contact number is required"),
  facebookProfile: yup
    .string()
    .url("Please enter a valid URL")
    .optional()
    .default(""),
  region: yup
    .string()
    .required("Please select your region"),
  university: yup
    .string()
    .min(2, "University name must be at least 2 characters")
    .required("University is required"),
  course: yup
    .string()
    .min(2, "Course name must be at least 2 characters")
    .required("Course is required"),
  dostScholar: yup.boolean().optional().default(false),
  dostStartMember: yup.boolean().optional().default(false),
});

// Type inference from schema
export type RegistrationFormData = yup.InferType<typeof registrationSchema>;
