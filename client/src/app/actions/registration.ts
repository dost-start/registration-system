"use server";

import {
  RegistrationFormData,
  registrationSchema,
} from "@/components/registration-form/registrationSchema";
import { TablesInsert, Database } from "@/types/supabase";

// Define region type to match form values
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

// Map form region values to database enum values
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

    // Server-side validation
    const validationResult = registrationSchema.safeParse(data);

    if (!validationResult.success) {
      // Log validation errors
      console.error("Validation errors:", validationResult.error.format());

      // Return structured validation errors
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

    // TODO: Map the data to the Supabase schema and insert into the database
    const formEntry: Partial<TablesInsert<"form_entries">> = {
      first_name: validatedData.firstName,
      middle_name: validatedData.middleName || null,
      last_name: validatedData.lastName,
      suffix: validatedData.suffix || null,
      email: validatedData.email,
      contact_number: validatedData.contactNumber,
      facebook_profile: validatedData.facebookProfile || null,
      region: mapRegionToDbEnum(validatedData.region), // Convert to database enum format
      university: validatedData.university,
      course: validatedData.course,
      is_dost_scholar: validatedData.dostScholar,
      is_start_member: validatedData.dostStartMember,
      status: "pending", // Default status
      is_checked_in: false, // Default check-in status
    };

    // Log the mapped entry (remove in production)
    console.log("Prepared database entry:", formEntry);

    // TODO: Replace with actual database insertion
    // const { data: insertedData, error } = await supabaseClient.from('form_entries').insert(formEntry).select().single();

    // Simulate database operation for now
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Uncomment and use this when integrated with Supabase
    // if (error) {
    //   console.error("Database error:", error);
    //   return {
    //     success: false,
    //     message: "Registration failed: " + (error.message || "Database error"),
    //     errors: null,
    //   };
    // }

    // Return success response with redirect URL
    return {
      success: true,
      message: "Registration submitted successfully!",
      redirectUrl: "/success", // URL to redirect to on success
    };
  } catch (error: any) {
    // Comprehensive error handling
    console.error("Registration submission error:", error);

    return {
      success: false,
      message: `Failed to submit registration: ${
        error?.message || "Unknown error"
      }. Please try again.`,
      errors: null,
    };
  }
}
