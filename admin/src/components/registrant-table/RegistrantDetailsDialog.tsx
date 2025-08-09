"use client";

import { FormEntry } from "@/types/form-entries";
import { getStatusBadgeVariant } from "@/lib/table-actions";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface RegistrantDetailsDialogProps {
  registrant: FormEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RegistrantDetailsDialog({
  registrant,
  open,
  onOpenChange,
}: RegistrantDetailsDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registrant Details</DialogTitle>
          <DialogDescription>
            Complete information for {registrant.first_name}{" "}
            {registrant.last_name}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Full Name
                </label>
                <p className="text-sm">
                  {[
                    registrant.first_name,
                    registrant.middle_name,
                    registrant.last_name,
                    registrant.suffix,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-sm">{registrant.email || "Not provided"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Contact Number
                </label>
                <p className="text-sm">{registrant.contact_number}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Facebook Profile
                </label>
                <p className="text-sm">
                  {registrant.facebook_profile || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  University
                </label>
                <p className="text-sm">{registrant.university}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Course
                </label>
                <p className="text-sm">{registrant.course}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Region
                </label>
                <p className="text-sm">{registrant.region}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  DOST Scholar
                </label>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      registrant.is_dost_scholar ? "default" : "secondary"
                    }
                  >
                    {registrant.is_dost_scholar ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  START Member
                </label>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      registrant.is_start_member ? "default" : "secondary"
                    }
                  >
                    {registrant.is_start_member ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Status */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Registration Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusBadgeVariant(registrant.status)}>
                    {registrant.status.charAt(0).toUpperCase() +
                      registrant.status.slice(1)}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Check-in Status
                </label>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={registrant.is_checked_in ? "default" : "secondary"}
                  >
                    {registrant.is_checked_in ? "Checked In" : "Not Checked In"}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Registration Date
                </label>
                <p className="text-sm">{formatDate(registrant.created_at)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Registrant ID
                </label>
                <p className="text-sm">#{registrant.id}</p>
              </div>
            </div>
          </div>

          {/* Remarks */}
          {registrant.remarks && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Remarks</h3>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">{registrant.remarks}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
