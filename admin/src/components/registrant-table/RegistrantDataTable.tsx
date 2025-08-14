"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  handleBatchCheckIn,
  handleCheckInToggle,
  handleRegistrantDelete,
  handleStatusUpdate,
} from "@/lib/table-actions";
import type { FormEntry, StatusType } from "@/types/form-entries";
import { ChevronDown, UserCheck, UserX } from "lucide-react";
import RegistrantTableColumns from "./RegistrantTableColumns";

interface DataTableProps {
  data: FormEntry[];
  onDataChange: () => void;
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

export function RegistrantDataTable({ data, onDataChange }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    scholarship_type: false,
    course: false,
    region: false,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isUpdating, setIsUpdating] = useState<number | null>(null);
  const [isBatchUpdating, setIsBatchUpdating] = useState(false);
  const [searchColumn, setSearchColumn] = useState<string>("first_name");
  const [searchValue, setSearchValue] = useState<string>("");

  const updateRegistrantStatus = async (id: number, newStatus: StatusType) => {
    try {
      setIsUpdating(id);
      const registrant = data.find((r) => r.id === id);
      if (registrant) {
        await handleStatusUpdate(registrant, newStatus, onDataChange);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const toggleCheckIn = async (registrant: FormEntry) => {
    try {
      setIsUpdating(registrant.id);
      await handleCheckInToggle(registrant, onDataChange);
    } catch (error) {
      console.error("Failed to toggle check-in:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const batchCheckIn = async (isCheckedIn: boolean) => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.id);

    if (selectedIds.length === 0) {
      alert("Please select registrants to check in/out");
      return;
    }

    try {
      setIsBatchUpdating(true);
      await handleBatchCheckIn(selectedIds, isCheckedIn, onDataChange);
      setRowSelection({});
    } catch (error) {
      console.error("Failed to batch update check-in:", error);
    } finally {
      setIsBatchUpdating(false);
    }
  };

  const deleteRegistrant = async (id: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this registrant? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      setIsUpdating(id);
      await handleRegistrantDelete(id, onDataChange);
    } catch (error) {
      console.error("Failed to delete registrant:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const columns = RegistrantTableColumns({
    isUpdating,
    onDataChange,
    toggleCheckIn,
    updateRegistrantStatus,
    deleteRegistrant,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Update search filter when search column or value changes
  const handleSearchChange = (value: string) => {
    setSearchValue(value);

    if (searchColumn === "first_name") {
      // Custom filter for name that includes first_name, middle_name, and last_name
      table.getColumn("first_name")?.setFilterValue(value);
    } else {
      table.getColumn(searchColumn)?.setFilterValue(value);
    }
  };

  const handleSearchColumnChange = (column: string) => {
    // Clear previous filter
    table.getColumn(searchColumn)?.setFilterValue("");
    setSearchColumn(column);
    setSearchValue("");
  };

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          <Select value={searchColumn} onValueChange={handleSearchColumnChange}>
            <SelectTrigger className="w-[180px]">
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
          <Input
            placeholder={`Filter by ${searchableColumns
              .find((c) => c.key === searchColumn)
              ?.label.toLowerCase()}...`}
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
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

        {/* Batch actions */}
        {selectedCount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedCount} selected
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => batchCheckIn(true)}
              disabled={isBatchUpdating}
              className="h-8"
            >
              <UserCheck className="w-4 h-4 mr-1" />
              Check In All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => batchCheckIn(false)}
              disabled={isBatchUpdating}
              className="h-8"
            >
              <UserX className="w-4 h-4 mr-1" />
              Check Out All
            </Button>
          </div>
        )}
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="relative">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={
                          header.column.id === "is_checked_in" ||
                          header.column.id === "actions"
                            ? "sticky right-0 bg-background z-10  min-w-[100px]"
                            : header.column.id === "first_name"
                            ? "min-w-[150px]"
                            : "min-w-[100px]"
                        }
                        style={
                          header.column.id === "actions"
                            ? { right: 0 }
                            : header.column.id === "is_checked_in"
                            ? { right: "120px" }
                            : undefined
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          cell.column.id === "is_checked_in" ||
                          cell.column.id === "actions"
                            ? "sticky right-0 bg-background z-10 min-w-[100px]"
                            : cell.column.id === "first_name"
                            ? "min-w-[150px]"
                            : "min-w-[100px]"
                        }
                        style={
                          cell.column.id === "actions"
                            ? { right: 0 }
                            : cell.column.id === "is_checked_in"
                            ? { right: "120px" }
                            : undefined
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
