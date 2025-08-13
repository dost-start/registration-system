/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  RegistrationFormData,
  registrationSchema,
} from "@/components/registration-form/registrationSchema";
import { Database, TablesInsert } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function submitRegistration(data: RegistrationFormData) {
  try {
    // Log the received data (remove in production)
    console.log("Registration data received:", data);
    const validationResult = registrationSchema.safeParse(data);

    if (!validationResult.success) {
      // Log validation errors (remove in production)
      console.error("Validation errors:", validationResult.error.format());
      return {
        success: false,
        message: "Please correct the form errors.",
        errors: validationResult.error.format(),
      };
    }

    // Validated data (remove in production)
    const validatedData = validationResult.data;

    // Log successful validation (remove in production)
    console.log(
      "Validation successful. Proceeding with submission:",
      validatedData
    );

    const formEntry: TablesInsert<"form_entries"> = {
      first_name: validatedData.firstName,
      middle_name: validatedData.middleName || null,
      last_name: validatedData.lastName,
      suffix: validatedData.suffix || null,
      email: validatedData.email,
      contact_number: validatedData.contactNumber,
      facebook_profile: validatedData.facebookProfile || null,
      region: validatedData.region,
      university: validatedData.university,
      course: validatedData.course,
      year_level: validatedData.yearLevel,
      year_awarded: validatedData.yearAwarded,
      scholarship_type: validatedData.scholarshipType,
      is_start_member: validatedData.dostStartMember,
      status: "pending", // Default status
      is_checked_in: false, // Default check-in status
    };

    // Log the mapped entry (remove in production)
    console.log("Prepared database entry:", formEntry);

    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }
    const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookies: any) {
          try {
            cookies.forEach(
              (cookie: { name: string; value: string; options?: any }) => {
                cookieStore.set(cookie.name, cookie.value, cookie.options);
              }
            );
          } catch {}
        },
      },
    });

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("form_entries")
      .select("email")
      .eq("email", validatedData.email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is what we want
      console.error("Email check error:", checkError);
      return {
        success: false,
        message: "Failed to verify email availability. Please try again.",
        errors: null,
      };
    }

    if (existingUser) {
      return {
        success: false,
        message:
          "This email is already registered. Please use a different email address or contact support if you believe this is an error.",
        errors: {
          email: {
            _errors: ["This email is already registered"],
          },
          _errors: [],
        },
      };
    }

    const { data: insertedData, error } = await supabase
      .from("form_entries")
      .insert(formEntry)
      .select()
      .single();

    if (error) {
      // Log the error (remove in production)
      console.error("Database error:", error);
      return {
        success: false,
        message: "Registration failed: " + (error.message || "Database error"),
        errors: null,
      };
    }

    console.log("Successfully inserted entry:", insertedData);

    // Encode email in base64 for URL parameter
    const encodedEmail = Buffer.from(validatedData.email).toString("base64");

    return {
      success: true,
      message: "Registration submitted successfully!",
      redirectUrl: `/success?e=${encodedEmail}`,
    };
  } catch (error: unknown) {
    // Error handling (remove in production)
    console.error("Registration submission error:", error);

    return {
      success: false,
      message: `Failed to submit registration: ${
        error instanceof Error ? error.message : "Unknown error"
      }. Please try again.`,
      errors: null,
    };
  }
}
