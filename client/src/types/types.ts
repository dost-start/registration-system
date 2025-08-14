import { Database } from "./supabase";

// Type for Philippine regions from Supabase enum
export type RegionType = Database["public"]["Enums"]["philippine_region"];

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

export const YEAR_LEVELS = [
  "1st year",
  "2nd year",
  "3rd year",
  "4th year",
  "5th year",
  "6th year",
] as const;
export const YEAR_AWARDED_OPTIONS = [
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
] as const;
