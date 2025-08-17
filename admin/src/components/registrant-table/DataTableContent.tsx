"use client";

import { flexRender, Table, ColumnDef } from "@tanstack/react-table";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FormEntry } from "@/types/form-entries";

interface DataTableContentProps {
  table: Table<FormEntry>;
  columns: ColumnDef<FormEntry>[];
}

export function DataTableContent({ table, columns }: DataTableContentProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <UITable className="relative">
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
                          ? "md:sticky md:right-0 bg-background z-10 min-w-[100px]"
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
                          ? "md:sticky md:right-0 bg-background z-10 min-w-[100px]"
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
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
    </div>
  );
}
