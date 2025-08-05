"use server";

import {
  RegistrationFormData,
  registrationSchema,
} from "@/components/registration-form/registrationSchema";
import { TablesInsert, Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type FormRegion =
  | "ncr"
  | "car"
  | "region1"
  | "region2"
  | "region3"
  | "region4a"
  | "region4b"
  | "region5"
  | "region6"
  | "region7"
  | "region8"
  | "region9"
  | "region10"
  | "region11"
  | "region12"
  | "region13"
  | "barmm";

function mapRegionToDbEnum(
  formRegion: string
): Database["public"]["Enums"]["philippine_region"] {
  const regionMap: Record<
    FormRegion,
    Database["public"]["Enums"]["philippine_region"]
  > = {
    ncr: "NCR - National Capital Region",
    car: "CAR - Cordillera Administrative Region",
    region1: "Region I - Ilocos Region",
    region2: "Region II - Cagayan Valley",
    region3: "Region III - Central Luzon",
    region4a: "Region IV-A - CALABARZON",
    region4b: "MIMAROPA Region",
    region5: "Region V - Bicol Region",
    region6: "Region VI - Western Visayas",
    region7: "Region VII - Central Visayas",
    region8: "Region VIII - Eastern Visayas",
    region9: "Region IX - Zamboanga Peninsula",
    region10: "Region X - Northern Mindanao",
    region11: "Region XI - Davao Region",
    region12: "Region XII - SOCCSKSARGEN",
    region13: "Region XIII - Caraga",
    barmm: "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao",
  };

  return regionMap[formRegion as FormRegion] || "NCR - National Capital Region"; // Fallback to NCR if not found
}

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
      region: mapRegionToDbEnum(validatedData.region),
      university: validatedData.university,
      course: validatedData.course,
      is_dost_scholar: validatedData.dostScholar,
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
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {}
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {}
        },
      },
    });

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

    return {
      success: true,
      message: "Registration submitted successfully!",
      redirectUrl: "/success",
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
