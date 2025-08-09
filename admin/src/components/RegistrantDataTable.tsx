"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  MoreHorizontal,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  UserCheck,
  UserX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import type { FormEntry, StatusType } from "@/types/form-entries";

interface DataTableProps {
  data: FormEntry[];
  onDataChange: () => void;
}

export function RegistrantDataTable({ data, onDataChange }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  const updateRegistrantStatus = async (id: number, status: StatusType) => {
    try {
      setIsUpdating(id);
      const supabase = createClient();

      const { error } = await supabase
        .from("form_entries")
        .update({ status })
        .eq("id", id);

      if (error) {
        console.error("Error updating status:", error);
        return;
      }

      onDataChange();
    } catch (error) {
      console.error("Error updating registrant status:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const toggleCheckIn = async (id: number, isCheckedIn: boolean) => {
    try {
      setIsUpdating(id);
      const supabase = createClient();

      const { error } = await supabase
        .from("form_entries")
        .update({ is_checked_in: !isCheckedIn })
        .eq("id", id);

      if (error) {
        console.error("Error updating check-in status:", error);
        return;
      }

      onDataChange();
    } catch (error) {
      console.error("Error updating check-in status:", error);
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
      const supabase = createClient();

      const { error } = await supabase
        .from("form_entries")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting registrant:", error);
        return;
      }

      onDataChange();
    } catch (error) {
      console.error("Error deleting registrant:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const columns: ColumnDef<FormEntry>[] = [
    {
      accessorKey: "first_name",
      header: "Name",
      cell: ({ row }) => {
        const firstName = row.getValue("first_name") as string;
        const lastName = row.original.last_name;
        const middleName = row.original.middle_name;
        const suffix = row.original.suffix;

        const fullName = [firstName, middleName, lastName, suffix]
          .filter(Boolean)
          .join(" ");

        return <div className="font-medium">{fullName}</div>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return <div className="text-sm text-muted-foreground">{email}</div>;
      },
    },
    {
      accessorKey: "university",
      header: "University",
      cell: ({ row }) => {
        const university = row.getValue("university") as string;
        return (
          <div className="max-w-[200px] truncate" title={university}>
            {university}
          </div>
        );
      },
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => {
        const region = row.getValue("region") as string;
        return <Badge variant="outline">{region}</Badge>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as StatusType;
        const variant =
          status === "accepted"
            ? "success"
            : status === "rejected"
            ? "destructive"
            : "secondary";

        const icon =
          status === "accepted" ? (
            <CheckCircle className="w-3 h-3 mr-1" />
          ) : status === "rejected" ? (
            <XCircle className="w-3 h-3 mr-1" />
          ) : (
            <Clock className="w-3 h-3 mr-1" />
          );

        return (
          <Badge variant={variant} className="flex items-center w-fit">
            {icon}
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "is_checked_in",
      header: "Check-in",
      cell: ({ row }) => {
        const isCheckedIn = row.getValue("is_checked_in") as boolean;
        return (
          <Badge variant={isCheckedIn ? "success" : "secondary"}>
            {isCheckedIn ? "Checked In" : "Not Checked In"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Registered",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at") as string);
        return (
          <div className="text-sm text-muted-foreground">
            {date.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const registrant = row.original;
        const isLoading = isUpdating === registrant.id;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                disabled={isLoading}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(registrant.email || "")
                }
              >
                Copy email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  toggleCheckIn(registrant.id, registrant.is_checked_in)
                }
                disabled={isLoading}
                className={
                  registrant.is_checked_in ? "text-red-600" : "text-green-600"
                }
              >
                {registrant.is_checked_in ? (
                  <>
                    <UserX className="w-4 h-4 mr-2" />
                    Check Out
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 mr-2" />
                    Check In
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  updateRegistrantStatus(registrant.id, "accepted")
                }
                disabled={registrant.status === "accepted" || isLoading}
                className="text-green-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => updateRegistrantStatus(registrant.id, "pending")}
                disabled={registrant.status === "pending" || isLoading}
                className="text-yellow-600"
              >
                <Clock className="w-4 h-4 mr-2" />
                Set to Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  updateRegistrantStatus(registrant.id, "rejected")
                }
                disabled={registrant.status === "rejected" || isLoading}
                className="text-red-600"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => deleteRegistrant(registrant.id)}
                disabled={isLoading}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name or email..."
          value={
            (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            const value = event.target.value;
            table.getColumn("first_name")?.setFilterValue(value);
            table.getColumn("email")?.setFilterValue(value);
          }}
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
                  No registrants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of{" "}
          {table.getCoreRowModel().rows.length} registrant(s) displayed.
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
