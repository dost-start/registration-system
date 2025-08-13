"use client";

import { submitRegistration } from "@/app/actions/registration";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/components/registration-form/registrationSchema";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Constants } from "@/types/supabase";
import { YEAR_AWARDED_OPTIONS, YEAR_LEVELS } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormErrors = z.inferFormattedError<typeof registrationSchema>;
type SubmitMessageType = {
  success: boolean;
  message: string;
  errors?: FormErrors | null;
  redirectUrl?: string;
};
type FormFieldName = keyof RegistrationFormData;

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
      region: undefined,
      university: "",
      course: "",
      yearLevel: undefined,
      yearAwarded: undefined,
      scholarshipType: undefined,
      dostStartMember: false,
      hasReadPrimer: false,
      agreeToDataPrivacy: false,
    },
    mode: "onBlur",
  });

  const formErrors = form.formState.errors;
  const hasFormErrors = Object.keys(formErrors).length > 0;

  useEffect(() => {
    if (hasFormErrors) {
      // Focus on the first error field, or the registration form title if no specific field error
      const firstErrorField = document.querySelector(".text-destructive");
      const registrationFormTitle = document.getElementById(
        "registration-form-title"
      );

      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (registrationFormTitle) {
        registrationFormTitle.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
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

        // Focus on the registration form and scroll to the first error
        const registrationFormTitle = document.getElementById(
          "registration-form-title"
        );
        const firstErrorField = document.querySelector(".text-destructive");

        if (firstErrorField) {
          // Scroll to the first error field
          firstErrorField.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else if (registrationFormTitle) {
          // Scroll to the top of the registration form
          registrationFormTitle.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        // For general errors, scroll to the top of the registration form
        const registrationFormTitle = document.getElementById(
          "registration-form-title"
        );
        if (registrationFormTitle) {
          registrationFormTitle.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    } catch {
      setSubmitMessage({
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      });

      // Focus on the registration form title for unexpected errors
      const registrationFormTitle = document.getElementById(
        "registration-form-title"
      );
      if (registrationFormTitle) {
        registrationFormTitle.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const watch = form.watch();

  console.log(watch.region);

  return (
    <section
      id="registration-form"
      className="bg-gradient-to-r from-summit-blue to-summit-teal py-16 px-4"
    >
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow border-summit-orange border-2">
        <h2
          id="registration-form-title"
          className="text-3xl sm:text-4xl font-bold text-summit-black mb-8 text-center"
        >
          Registration Form
        </h2>

        {submitMessage && (
          <div
            id="error-summary"
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

            {/* Year Level */}
            <FormField
              control={form.control}
              name="yearLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-semibold">
                    Year Level *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YEAR_LEVELS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Scholarship Type */}
            <FormField
              control={form.control}
              name="scholarshipType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-semibold">
                    Scholarship Type *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select scholarship type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Constants.public.Enums.scholarship_type.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Year Awarded */}
            <FormField
              control={form.control}
              name="yearAwarded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-summit-black font-semibold">
                    Year Awarded *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year awarded" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {YEAR_AWARDED_OPTIONS.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DOST START Member */}
            <FormField
              control={form.control}
              name="dostStartMember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
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

            {/* Confirmation Checkboxes */}
            <div className="space-y-4 border-t pt-6">
              <h3 className="text-lg font-semibold text-summit-black">
                Before you submit
              </h3>

              {/* Event Primer Confirmation */}
              <FormField
                control={form.control}
                name="hasReadPrimer"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={(checked) =>
                          field.onChange(checked || false)
                        }
                      />
                    </FormControl>
                    <FormLabel className="text-summit-black font-medium text-sm leading-relaxed">
                      <span>
                        I have read the{" "}
                        <a
                          href="/primer.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-summit-blue hover:text-summit-blue/80 underline font-semibold"
                        >
                          event primer
                        </a>
                        . *
                      </span>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Data Privacy Policy Confirmation */}
              <FormField
                control={form.control}
                name="agreeToDataPrivacy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={(checked) =>
                          field.onChange(checked || false)
                        }
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-summit-black font-medium text-sm leading-relaxed">
                        <span>
                          I have read and agree to the{" "}
                          <a
                            href="/data-privacy-policy.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-summit-blue hover:text-summit-blue/80 underline font-semibold inline"
                          >
                            Data Privacy Policy
                          </a>
                          . *
                        </span>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>

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
