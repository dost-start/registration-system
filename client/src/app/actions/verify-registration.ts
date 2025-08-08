/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function verifyRegistration(encodedEmail: string) {
  try {
    // Decode the base64 email
    const email = Buffer.from(encodedEmail, "base64").toString("utf-8");

    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Invalid email parameter",
        registrationData: null,
      };
    }

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

    // Query the database for the registration
    const { data: registrationData, error } = await supabase
      .from("form_entries")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Database error:", error);
      return {
        success: false,
        message: "Registration not found",
        registrationData: null,
      };
    }

    if (!registrationData) {
      return {
        success: false,
        message: "Registration not found",
        registrationData: null,
      };
    }

    // Return success with registration data
    return {
      success: true,
      message: "Registration found",
      registrationData: {
        firstName: registrationData.first_name,
        lastName: registrationData.last_name,
        email: registrationData.email,
        status: registrationData.status,
        createdAt: registrationData.created_at,
      },
    };
  } catch (error) {
    console.error("Verification error:", error);
    return {
      success: false,
      message: "Failed to verify registration",
      registrationData: null,
    };
  }
}
