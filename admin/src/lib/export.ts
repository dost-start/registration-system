import { createClient } from "@/lib/supabase/client";
import type { FormEntry } from "@/types/form-entries";

/**
 * CSV headers for registrant data export
 */
export const CSV_HEADERS = [
  "ID",
  "First Name",
  "Middle Name",
  "Last Name",
  "Suffix",
  "Email",
  "Contact Number",
  "Facebook Profile",
  "Region",
  "University",
  "Course",
  "Year Level",
  "Year Awarded",
  "Scholarship Type",
  "START Member",
  "Status",
  "Checked In",
  "Created At",
  "Remarks",
];

/**
 * Convert a single registrant to CSV row format
 */
export function registrantToCSVRow(registrant: FormEntry): string[] {
  return [
    registrant.id.toString(),
    registrant.first_name,
    registrant.middle_name || "",
    registrant.last_name,
    registrant.suffix || "",
    registrant.email || "",
    registrant.contact_number,
    registrant.facebook_profile || "",
    registrant.region,
    registrant.university,
    registrant.course,
    registrant.year_level || "",
    registrant.year_awarded || "",
    registrant.scholarship_type,
    registrant.is_start_member ? "Yes" : "No",
    registrant.status,
    registrant.is_checked_in ? "Yes" : "No",
    new Date(registrant.created_at).toISOString(),
    registrant.remarks || "",
  ];
}

/**
 * Generate CSV content from registrant data
 */
export function generateCSVContent(registrants: FormEntry[]): string {
  const rows = registrants.map(registrantToCSVRow);
  return [CSV_HEADERS, ...rows]
    .map((row) => row.map((field) => `"${field}"`).join(","))
    .join("\n");
}

/**
 * Download CSV file with given content and filename
 */
export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Export all registrants to CSV file
 */
export async function exportRegistrantsToCSV(): Promise<void> {
  try {
    const supabase = createClient();

    // Fetch all registrant data for export
    const { data: registrants, error } = await supabase
      .from("form_entries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!registrants || registrants.length === 0) return;

    const csvContent = generateCSVContent(registrants);
    const filename = `registrants_${
      new Date().toISOString().split("T")[0]
    }.csv`;

    downloadCSV(csvContent, filename);
  } catch (err) {
    console.error("Error exporting CSV:", err);
    throw err;
  }
}

/**
 * Export specific registrants to CSV file
 */
export function exportRegistrantsListToCSV(registrants: FormEntry[]): void {
  if (registrants.length === 0) return;

  const csvContent = generateCSVContent(registrants);
  const filename = `registrants_${new Date().toISOString().split("T")[0]}.csv`;

  downloadCSV(csvContent, filename);
}
