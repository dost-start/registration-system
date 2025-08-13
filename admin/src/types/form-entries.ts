import { Database } from "./supabase";

export type FormEntry = Database["public"]["Tables"]["form_entries"]["Row"];
export type FormEntryInsert =
  Database["public"]["Tables"]["form_entries"]["Insert"];
export type FormEntryUpdate =
  Database["public"]["Tables"]["form_entries"]["Update"];

export type StatusType = Database["public"]["Enums"]["status"];
export type RegionType = Database["public"]["Enums"]["philippine_region"];

export interface RegistrantStats {
  total: number;
  accepted: number;
  rejected: number;
  pending: number;
  checkedIn: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export const REGIONS_ARRAY: RegionType[] = [
  "Region I",
  "Region II",
  "Region III",
  "Region IV-A",
  "Region IV-B",
  "Region V",
  "Region VI",
  "Region VII",
  "Region VIII",
  "Region IX",
  "Region X",
  "Region XI",
  "Region XII",
  "Region XIII",
  "NCR",
  "CAR",
  "BARMM",
  "NIR",
];
