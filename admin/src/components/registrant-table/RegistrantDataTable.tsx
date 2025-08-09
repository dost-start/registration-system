"use client";

import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  handleStatusUpdate,
  handleCheckInToggle,
  handleRegistrantDelete,
} from "@/lib/table-actions";
import type { FormEntry, StatusType } from "@/types/form-entries";
import RegistrantTableColumns from "@/components/registrant-table/RegistrantTableColumns";

interface DataTableProps {
  data: FormEntry[];
  onDataChange: () => void;
}

export function RegistrantDataTable({ data, onDataChange }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("first_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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
