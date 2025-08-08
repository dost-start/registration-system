"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/components/registration-form/registrationSchema";
import { submitRegistration } from "@/app/actions/registration";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";

type FormErrors = z.inferFormattedError<typeof registrationSchema>;
type SubmitMessageType = {
  success: boolean;
  message: string;
  errors?: FormErrors | null;
  redirectUrl?: string;
};
type FormFieldName = keyof RegistrationFormData;
import { Constants } from "@/types/supabase";

export default function RegistrationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<SubmitMessageType | null>(
    null
  );

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      middleName: "",
      suffix: "",
      contactNumber: "",
      facebookProfile: "",
      region: "",
      university: "",
      course: "",
      dostScholar: false,
      dostStartMember: false,
    },
    mode: "onBlur",
  });

  const formErrors = form.formState.errors;
  const hasFormErrors = Object.keys(formErrors).length > 0;

  useEffect(() => {
    if (hasFormErrors) {
      const errorSummary = document.getElementById("error-summary");
      if (errorSummary) {
        errorSummary.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [hasFormErrors]);

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const result = await submitRegistration(data);
      setSubmitMessage(result);

      if (result.success) {
        form.reset();
        if (result.redirectUrl) {
          setTimeout(() => {
            router.push(result.redirectUrl as string);
          }, 1500);
        }
      } else if (result.errors) {
        Object.entries(result.errors).forEach(([field, error]) => {
          if (
            field !== "formErrors" &&
            error &&
            typeof error === "object" &&
            "_errors" in error &&
            Array.isArray(error._errors) &&
            error._errors.length > 0
          ) {
            form.setError(field as FormFieldName, {
              type: "server",
              message: error._errors[0],
            });
          } else if (Array.isArray(error) && error.length > 0) {
            form.setError(field as FormFieldName, {
              type: "server",
              message: error[0],
            });
          }
        });
        const errorElement = document.querySelector(".text-destructive");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          const errorSummary = document.getElementById("error-summary");
          if (errorSummary) {
            errorSummary.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    } catch {
      setSubmitMessage({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      });

      const errorSummary = document.getElementById("error-summary");
      if (errorSummary) {
        errorSummary.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="registration-form"
      className="bg-gradient-to-r from-summit-blue to-summit-teal py-16 px-4"
    >
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl sm:text-4xl font-bold text-summit-black mb-8 text-center">
          Registration Form
        </h2>

        {submitMessage && (
          <div
            className={cn(
              "mb-6 p-4 rounded-md border",
              submitMessage.success
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            )}
          >
            <p className="font-medium">{submitMessage.message}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    Email *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* First Name */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    First Name *
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Last Name */}
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    Last Name *
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Middle Name */}
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    Middle Name (optional)
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Middle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Suffix */}
            <FormField
              control={form.control}
              name="suffix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    Suffix (optional)
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Suffix" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contact Number */}
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    Contact Number *
                  </FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Facebook Profile */}
            <FormField
              control={form.control}
              name="facebookProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    Facebook Profile Link (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Facebook profile URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Region */}
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    Region *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-60">
                      {Constants.public.Enums.philippine_region.map(
                        (region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* University */}
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    University *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="University/Institution"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course */}
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-medium">
                    Course *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Course/Program"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DOST Scholar */}
            <FormField
              control={form.control}
              name="dostScholar"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-summit-black font-medium">
                      Is a current DOST Scholar?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* DOST START Member */}
            <FormField
              control={form.control}
              name="dostStartMember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-summit-black font-medium">
                      Is a DOST START Member?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {/* In-Person Event Warning */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-4">
              <p className="text-yellow-800 font-medium">
                Note: This event is{" "}
                <span className="font-bold">in-person only</span>. Please ensure
                you are able to physically attend.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full font-semibold transform hover:shadow-md bg-summit-orange hover:bg-summit-orange/90 "
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
