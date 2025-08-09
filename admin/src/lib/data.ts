import { createClient } from "@/lib/supabase/client";
import type {
  FormEntry,
  RegistrantStats,
  StatusType,
} from "@/types/form-entries";

/**
 * Fetch all registrants from the database
 */
export async function fetchAllRegistrants(): Promise<FormEntry[]> {
  const supabase = createClient();

  const { data: registrants, error } = await supabase
    .from("form_entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch registrants: ${error.message}`);
  }

  return registrants || [];
}

/**
 * Fetch registration statistics
 */
export async function fetchRegistrantStats(): Promise<RegistrantStats> {
  const supabase = createClient();

  // Single request to get all form entries with only the fields we need for stats
  const { data: entries, error } = await supabase
    .from("form_entries")
    .select("status, is_checked_in");

  if (error) {
    throw new Error(`Failed to fetch stats: ${error.message}`);
  }

  // Calculate stats from the fetched data
  const total = entries?.length || 0;
  const accepted =
    entries?.filter((entry) => entry.status === "accepted").length || 0;
  const rejected =
    entries?.filter((entry) => entry.status === "rejected").length || 0;
  const pending =
    entries?.filter((entry) => entry.status === "pending").length || 0;
  const checkedIn =
    entries?.filter((entry) => entry.is_checked_in === true).length || 0;

  return {
    total,
    accepted,
    rejected,
    pending,
    checkedIn,
  };
}

/**
 * Update registrant status
 */
export async function updateRegistrantStatus(
  id: number,
  status: StatusType
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("form_entries")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update status: ${error.message}`);
  }
}

/**
 * Toggle registrant check-in status
 */
export async function toggleRegistrantCheckIn(
  id: number,
  isCheckedIn: boolean
): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from("form_entries")
    .update({ is_checked_in: isCheckedIn })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update check-in status: ${error.message}`);
  }
}

/**
 * Delete a registrant
 */
export async function deleteRegistrant(id: number): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("form_entries").delete().eq("id", id);

  if (error) {
    throw new Error(`Failed to delete registrant: ${error.message}`);
  }
}
