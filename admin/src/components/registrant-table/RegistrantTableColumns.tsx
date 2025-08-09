import { getStatusBadgeVariant, truncateText } from "@/lib/table-actions";
import { FormEntry, StatusType } from "@/types/form-entries";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle,
  Clock,
  Copy,
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
}: {
  registrant: FormEntry;
  isUpdating: number | null;
  toggleCheckIn: (registrant: FormEntry) => void;
  updateRegistrantStatus: (id: number, status: StatusType) => void;
  deleteRegistrant: (id: number) => void;
}) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
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

          <DropdownMenuSeparator />

          {/* Check-in/Check-out Actions */}
          <DropdownMenuItem
            onClick={() => toggleCheckIn(registrant)}
            className="flex items-center gap-2"
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
          </DropdownMenuItem>

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
    </>
  );
}

export default function RegistrantTableColumns({
  isUpdating,
  toggleCheckIn,
  updateRegistrantStatus,
  deleteRegistrant,
}: Props): ColumnDef<FormEntry>[] {
  return [
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

        return <div className="font-medium">{truncateText(fullName, 25)}</div>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return <div className="lowercase">{truncateText(email, 30)}</div>;
      },
    },
    {
      accessorKey: "contact_number",
      header: "Contact",
      cell: ({ row }) => {
        const contact = row.getValue("contact_number") as string;
        return <div>{contact}</div>;
      },
    },
    {
      accessorKey: "university",
      header: "University",
      cell: ({ row }) => {
        const university = row.getValue("university") as string;
        return <div>{truncateText(university, 20)}</div>;
      },
    },
    {
      accessorKey: "region",
      header: "Region",
      cell: ({ row }) => {
        const region = row.getValue("region") as string;
        return <div>{region}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as StatusType;
        const registrant = row.original;
        const isLoading = isUpdating === registrant.id;

        return (
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusBadgeVariant(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            {isLoading && (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "is_checked_in",
      header: "Check-in",
      cell: ({ row }) => {
        const isCheckedIn = row.getValue("is_checked_in") as boolean;
        const registrant = row.original;
        const isLoading = isUpdating === registrant.id;

        return (
          <div className="flex items-center space-x-2">
            <Badge variant={isCheckedIn ? "default" : "secondary"}>
              {isCheckedIn ? "Checked In" : "Not Checked In"}
            </Badge>
            {isLoading && (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
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
          />
        );
      },
    },
  ];
}
