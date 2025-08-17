"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import type { FormEntry } from "@/types/form-entries";
import { ChevronDown } from "lucide-react";

interface TableFiltersProps {
  table: Table<FormEntry>;
  searchColumn: string;
  searchValue: string;
  statusFilter: string;
  checkInFilter: string;
  onSearchColumnChange: (column: string) => void;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onCheckInFilterChange: (value: string) => void;
}

const searchableColumns = [
  { key: "first_name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "contact_number", label: "Contact" },
  { key: "university", label: "University" },
  { key: "region", label: "Region" },
  { key: "course", label: "Course" },
  { key: "scholarship_type", label: "Scholarship Type" },
] as const;

export function TableFilters({
  table,
  searchColumn,
  searchValue,
  statusFilter,
  checkInFilter,
  onSearchColumnChange,
  onSearchChange,
  onStatusFilterChange,
  onCheckInFilterChange,
}: TableFiltersProps) {
  return (
    <div className="flex items-start md:items-end space-x-4 gap-4 flex-wrap">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="search-column" className="text-sm font-medium">
          Search By
        </Label>
        <Select value={searchColumn} onValueChange={onSearchColumnChange}>
          <SelectTrigger className="w-[180px]" id="search-column">
            <SelectValue placeholder="Search by..." />
          </SelectTrigger>
          <SelectContent>
            {searchableColumns.map((column) => (
              <SelectItem key={column.key} value={column.key}>
                {column.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="search-input" className="text-sm font-medium">
          Search Term
        </Label>
        <Input
          id="search-input"
          placeholder={`Enter ${searchableColumns
            .find((c) => c.key === searchColumn)
            ?.label.toLowerCase()}...`}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-[250px]"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="status-filter" className="text-sm font-medium">
          Status
        </Label>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger className="w-[140px]" id="status-filter">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="checkin-filter" className="text-sm font-medium">
          Check-in Status
        </Label>
        <Select value={checkInFilter} onValueChange={onCheckInFilterChange}>
          <SelectTrigger className="w-[140px]" id="checkin-filter">
            <SelectValue placeholder="All Check-in" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Check-in</SelectItem>
            <SelectItem value="checked_in">Checked In</SelectItem>
            <SelectItem value="not_checked_in">Not Checked In</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="columns-dropdown" className="text-sm font-medium">
          Columns
        </Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" id="columns-dropdown">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {column.id === "first_name"
                      ? "Name"
                      : column.id === "contact_number"
                      ? "Contact"
                      : column.id === "is_checked_in"
                      ? "Check-in"
                      : column.id === "scholarship_type"
                      ? "Scholarship Type"
                      : column.id.replace(/_/g, " ")}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
