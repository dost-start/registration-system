"use server";

// import { redirect } from "next/navigation";
import { RegistrationFormData } from "@/components/registration-form/registrationSchema";

export async function submitRegistration(data: RegistrationFormData) {
  try {
    // Log the received data (remove in production)
    console.log("Registration data received:", data);

    // Delay (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Temp return success (change in production)
    return {
      success: true,
      message: "Registration submitted successfully! We will contact you soon.",
    };
  } catch (error) {
    // For debugging (remove in production)
    console.error("Registration submission error:", error);
    return {
      success: false,
      message: "Failed to submit registration. Please try again.",
    };
  }
}
