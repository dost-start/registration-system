import { getStatusBadgeVariant, truncateText } from "@/lib/table-actions";
import { FormEntry, StatusType } from "@/types/form-entries";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CheckCircle,
  Clock,
  Copy,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
  UserCheck,
  UserX,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { EditRemarksDialog } from "./EditRemarksDialog";
import { RegistrantDetailsDialog } from "./RegistrantDetailsDialog";

interface Props {
  isUpdating: number | null;
  onDataChange: () => void;
  toggleCheckIn: (registrant: FormEntry) => void;
  updateRegistrantStatus: (id: number, status: StatusType) => void;
  deleteRegistrant: (id: number) => void;
}

// Action Cell Component
function ActionCell({
  registrant,
  isUpdating,
  toggleCheckIn,
  updateRegistrantStatus,
  deleteRegistrant,
  onDataChange,
}: {
  registrant: FormEntry;
  isUpdating: number | null;
  toggleCheckIn: (registrant: FormEntry) => void;
  updateRegistrantStatus: (id: number, status: StatusType) => void;
  deleteRegistrant: (id: number) => void;
  onDataChange: () => void;
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditRemarksOpen, setIsEditRemarksOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {/* Check-in/Check-out Actions */}
      <Button
        onClick={(e) => {
          e.stopPropagation();
          toggleCheckIn(registrant);
        }}
        className="flex items-center gap-2"
        variant={"outline"}
        disabled={isUpdating === registrant.id}
      >
        {registrant.is_checked_in ? (
          <>
            <UserX className="w-4 h-4" />
            <span className="font-bold text-destructive">Check Out</span>
          </>
        ) : (
          <>
            <UserCheck className="w-4 h-4" />
            <span className="font-bold text-primary">Check In</span>
          </>
        )}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* View Information */}
          <DropdownMenuItem
            onClick={() => setIsDetailsOpen(true)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            <span>View Information</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(registrant.email || "")
            }
            className="flex items-center gap-2"
          >
            <Copy className="h-4 w-4" />
            <span>Copy email</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsEditRemarksOpen(true)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Remarks</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSeparator />

          {/* Status Update Actions */}
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Update Status
          </DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => updateRegistrantStatus(registrant.id, "accepted")}
            disabled={
              registrant.status === "accepted" || isUpdating === registrant.id
            }
            className="flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Accept</span>
            {registrant.status === "accepted" && (
              <Badge variant="secondary" className="ml-auto text-xs">
                Current
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => updateRegistrantStatus(registrant.id, "pending")}
            disabled={
              registrant.status === "pending" || isUpdating === registrant.id
            }
            className="flex items-center gap-2"
          >
            <Clock className="w-4 h-4 text-yellow-600" />
            <span>Set Pending</span>
            {registrant.status === "pending" && (
              <Badge variant="secondary" className="ml-auto text-xs">
                Current
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => updateRegistrantStatus(registrant.id, "rejected")}
            disabled={
              registrant.status === "rejected" || isUpdating === registrant.id
            }
            className="flex items-center gap-2"
          >
            <XCircle className="w-4 h-4 text-destructive" />
            <span>Reject</span>
            {registrant.status === "rejected" && (
              <Badge variant="secondary" className="ml-auto text-xs">
                Current
              </Badge>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete Action */}
          <DropdownMenuItem
            onClick={() => deleteRegistrant(registrant.id)}
            className="flex items-center gap-2 text-red-600 focus:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RegistrantDetailsDialog
        registrant={registrant}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />

      <EditRemarksDialog
        registrant={registrant}
        open={isEditRemarksOpen}
        onOpenChange={setIsEditRemarksOpen}
        onSuccess={onDataChange}
      />
    </div>
  );
}

export default function RegistrantTableColumns({
  isUpdating,
  onDataChange,
  toggleCheckIn,
  updateRegistrantStatus,
  deleteRegistrant,
}: Props): ColumnDef<FormEntry>[] {
  return [
    {
      accessorKey: "first_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      size: 150,
      minSize: 150,
      filterFn: (row, _columnId, filterValue) => {
        const firstName = row.original.first_name || "";
        const middleName = row.original.middle_name || "";
        const lastName = row.original.last_name || "";
        const suffix = row.original.suffix || "";

        const fullName = [firstName, middleName, lastName, suffix]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return fullName.includes(filterValue.toLowerCase());
      },
      cell: ({ row }) => {
        const firstName = row.getValue("first_name") as string;
        const lastName = row.original.last_name;
        const middleName = row.original.middle_name;
        const suffix = row.original.suffix;

        const fullName = [firstName, middleName, lastName, suffix]
          .filter(Boolean)
          .join(" ");

        return (
          <div className="font-medium min-w-[150px]">
            {truncateText(fullName, 25)}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return <div className="lowercase">{truncateText(email, 30)}</div>;
      },
    },
    {
      accessorKey: "contact_number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const contact = row.getValue("contact_number") as string;
        return <div>{contact}</div>;
      },
    },
    {
      accessorKey: "university",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            University
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const university = row.getValue("university") as string;
        return <div>{truncateText(university, 20)}</div>;
      },
    },
    {
      accessorKey: "region",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Region
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const region = row.getValue("region") as string;
        return <div>{region}</div>;
      },
    },
    {
      accessorKey: "course",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Course
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const course = row.getValue("course") as string;
        return <div>{truncateText(course, 20)}</div>;
      },
    },
    {
      accessorKey: "scholarship_type",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Scholarship Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const scholarshipType = row.getValue("scholarship_type") as string;
        return <div>{truncateText(scholarshipType, 15)}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as StatusType;

        return (
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusBadgeVariant(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "is_checked_in",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Check-in
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isCheckedIn = row.getValue("is_checked_in") as boolean;

        return (
          <div className="flex items-center space-x-2">
            <Badge variant={isCheckedIn ? "default" : "secondary"}>
              {isCheckedIn ? "Checked In" : "Not Checked In"}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "remarks",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Remarks
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const remarks = row.getValue("remarks") as string | null;
        return (
          <div className="max-w-32">
            {remarks ? (
              truncateText(remarks, 20)
            ) : (
              <span className="text-muted-foreground italic">No remarks</span>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const registrant = row.original;

        return (
          <ActionCell
            registrant={registrant}
            isUpdating={isUpdating}
            toggleCheckIn={toggleCheckIn}
            updateRegistrantStatus={updateRegistrantStatus}
            deleteRegistrant={deleteRegistrant}
            onDataChange={onDataChange}
          />
        );
      },
    },
  ];
}
