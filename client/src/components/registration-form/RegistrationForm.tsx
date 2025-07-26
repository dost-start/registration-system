"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { cn } from "@/lib/utils";
import { registrationSchema, type RegistrationFormData } from "@/components/registration-form/registrationSchema";

export default function RegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    alert("Registration submitted successfully!");
  };

  return (
    <section id="registration-form" className="bg-summit-light-gray py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-summit-black mb-8 text-center">
          Registration Form
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-summit-black font-medium">
              Email *
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email address"
              className={cn(
                "w-full",
                errors.email && "border-destructive focus-visible:ring-destructive"
              )}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* First Name */}
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-summit-black font-medium">
              First Name *
            </Label>
            <Input 
              id="firstName" 
              type="text" 
              placeholder="Enter your first name"
              className={cn(
                "w-full",
                errors.firstName && "border-destructive focus-visible:ring-destructive"
              )}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-summit-black font-medium">
              Last Name *
            </Label>
            <Input 
              id="lastName" 
              type="text" 
              placeholder="Enter your last name"
              className={cn(
                "w-full",
                errors.lastName && "border-destructive focus-visible:ring-destructive"
              )}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>

          {/* Middle Name (optional) */}
          <div className="space-y-2">
            <Label htmlFor="middleName" className="text-summit-black font-medium">
              Middle Name (optional)
            </Label>
            <Input 
              id="middleName" 
              type="text" 
              placeholder="Enter your middle name"
              className="w-full"
              {...register("middleName")}
            />
          </div>

          {/* Suffix (optional) */}
          <div className="space-y-2">
            <Label htmlFor="suffix" className="text-summit-black font-medium">
              Suffix (optional)
            </Label>
            <Input 
              id="suffix" 
              type="text" 
              placeholder="e.g., Jr., Sr., III"
              className="w-full"
              {...register("suffix")}
            />
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-summit-black font-medium">
              Contact Number *
            </Label>
            <Input 
              id="contactNumber" 
              type="tel" 
              placeholder="Enter your contact number"
              className={cn(
                "w-full",
                errors.contactNumber && "border-destructive focus-visible:ring-destructive"
              )}
              {...register("contactNumber")}
            />
            {errors.contactNumber && (
              <p className="text-destructive text-sm mt-1">{errors.contactNumber.message}</p>
            )}
          </div>

          {/* Facebook Profile Link (optional) */}
          <div className="space-y-2">
            <Label htmlFor="facebookProfile" className="text-summit-black font-medium">
              Facebook Profile Link (optional)
            </Label>
            <Input 
              id="facebookProfile" 
              type="url" 
              placeholder="Enter your Facebook profile URL"
              className={cn(
                "w-full",
                errors.facebookProfile && "border-destructive focus-visible:ring-destructive"
              )}
              {...register("facebookProfile")}
            />
            {errors.facebookProfile && (
              <p className="text-destructive text-sm mt-1">{errors.facebookProfile.message}</p>
            )}
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label htmlFor="region" className="text-summit-black font-medium">
              Region *
            </Label>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger 
                    className={cn(
                      "w-full",
                      errors.region && "border-destructive focus-visible:ring-destructive"
                    )}
                  >
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ncr">National Capital Region (NCR)</SelectItem>
                    <SelectItem value="car">Cordillera Administrative Region (CAR)</SelectItem>
                    <SelectItem value="region1">Region I - Ilocos Region</SelectItem>
                    <SelectItem value="region2">Region II - Cagayan Valley</SelectItem>
                    <SelectItem value="region3">Region III - Central Luzon</SelectItem>
                    <SelectItem value="region4a">Region IV-A - CALABARZON</SelectItem>
                    <SelectItem value="region4b">Region IV-B - MIMAROPA</SelectItem>
                    <SelectItem value="region5">Region V - Bicol Region</SelectItem>
                    <SelectItem value="region6">Region VI - Western Visayas</SelectItem>
                    <SelectItem value="region7">Region VII - Central Visayas</SelectItem>
                    <SelectItem value="region8">Region VIII - Eastern Visayas</SelectItem>
                    <SelectItem value="region9">Region IX - Zamboanga Peninsula</SelectItem>
                    <SelectItem value="region10">Region X - Northern Mindanao</SelectItem>
                    <SelectItem value="region11">Region XI - Davao Region</SelectItem>
                    <SelectItem value="region12">Region XII - SOCCSKSARGEN</SelectItem>
                    <SelectItem value="region13">Region XIII - Caraga</SelectItem>
                    <SelectItem value="barmm">BARMM - Bangsamoro Autonomous Region</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.region && (
              <p className="text-destructive text-sm mt-1">{errors.region.message}</p>
            )}
          </div>

          {/* University */}
          <div className="space-y-2">
            <Label htmlFor="university" className="text-summit-black font-medium">
              University *
            </Label>
            <Input 
              id="university" 
              type="text" 
              placeholder="Enter your university/institution"
              className={cn(
                "w-full",
                errors.university && "border-destructive focus-visible:ring-destructive"
              )}
              {...register("university")}
            />
            {errors.university && (
              <p className="text-destructive text-sm mt-1">{errors.university.message}</p>
            )}
          </div>

          {/* Course */}
          <div className="space-y-2">
            <Label htmlFor="course" className="text-summit-black font-medium">
              Course *
            </Label>
            <Input 
              id="course" 
              type="text" 
              placeholder="Enter your course/program"
              className={cn(
                "w-full",
                errors.course && "border-destructive focus-visible:ring-destructive"
              )}
              {...register("course")}
            />
            {errors.course && (
              <p className="text-destructive text-sm mt-1">{errors.course.message}</p>
            )}
          </div>

          {/* DOST Scholar Checkboxes */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Controller
                name="dostScholar"
                control={control}
                render={({ field }) => (
                  <Checkbox 
                    id="dostScholar" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="dostScholar" className="text-summit-black font-medium">
                Is a current DOST Scholar?
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Controller
                name="dostStartMember"
                control={control}
                render={({ field }) => (
                  <Checkbox 
                    id="dostStartMember"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="dostStartMember" className="text-summit-black font-medium">
                Is a DOST START Member?
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit"
              size="lg"
              className="w-full font-semibold transform hover:shadow-xl"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
