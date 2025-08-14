import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { FormEntryInsert, REGIONS_ARRAY } from "@/types/form-entries";
import { Constants } from "@/types/supabase";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { addRegistrantSchema } from "@/schemas/addRegistrantSchema";
import { YEAR_AWARDED_OPTIONS, YEAR_LEVELS } from "@/types/types";

type AddRegistrantFormData = z.infer<typeof addRegistrantSchema>;

interface AddRegistrantDialogProps {
  onRegistrantAdded: () => void;
}

export function AddRegistrantSheet({
  onRegistrantAdded,
}: AddRegistrantDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AddRegistrantFormData>({
    resolver: zodResolver(addRegistrantSchema),
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      suffix: "",
      email: "",
      contact_number: "",
      facebook_profile: "",
      region: undefined,
      university: "",
      course: "",
      year_level: undefined,
      year_awarded: undefined,
      scholarship_type: undefined,
      is_start_member: false,
      status: "pending",
      is_checked_in: false,
      remarks: "",
    },
  });

  const handleSubmit = async (data: AddRegistrantFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();

      // Check if email already exists
      const { data: existingUser, error: checkError } = await supabase
        .from("form_entries")
        .select("email")
        .eq("email", data.email)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // PGRST116 is "not found" error, which is what we want
        throw checkError;
      }

      if (existingUser) {
        throw new Error("A registrant with this email address already exists");
      }

      // Convert form data to match FormEntryInsert type
      const insertData: FormEntryInsert = {
        ...data,
        // Convert empty strings to null for optional fields
        middle_name: data.middle_name || null,
        suffix: data.suffix || null,
        email: data.email || null,
        facebook_profile: data.facebook_profile || null,
        remarks: data.remarks || null,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("form_entries").insert(insertData);

      if (error) {
        throw error;
      }

      setOpen(false);
      form.reset({
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        email: "",
        contact_number: "",
        facebook_profile: "",
        region: undefined,
        university: "",
        course: "",
        year_level: undefined,
        year_awarded: undefined,
        scholarship_type: undefined,
        is_start_member: false,
        status: "pending",
        is_checked_in: false,
        remarks: "",
      });
      onRegistrantAdded();
    } catch (err) {
      console.error("Error adding registrant:", err);
      setError(err instanceof Error ? err.message : "Failed to add registrant");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Add Registrant</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto p-4 w-full md:max-w-[600px] lg:max-w-[800px]">
        <SheetHeader>
          <SheetTitle>Add New Registrant</SheetTitle>
          <SheetDescription>
            Add a new registrant to the National Technovation Summit 2025.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="middle_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="suffix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suffix</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebook_profile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Profile (URL)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="https://facebook.com/..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {REGIONS_ARRAY.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>University *</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course *</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Level</FormLabel>
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

            <FormField
              control={form.control}
              name="year_awarded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Awarded</FormLabel>
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

            <FormField
              control={form.control}
              name="scholarship_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scholarship Type *</FormLabel>
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

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="is_start_member"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>START Member</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_checked_in"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Checked In</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isLoading}
                      placeholder="Enter remarks..."
                      maxLength={300}
                      rows={4}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground">
                    {(field.value || "").length}/300 characters
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="border-t flex flex-row justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
                className="w-full"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Adding..." : "Add Registrant"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
