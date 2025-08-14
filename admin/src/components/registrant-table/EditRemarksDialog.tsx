"use client";

import { FormEntry } from "@/types/form-entries";
import { handleRegistrantInfoUpdate } from "@/lib/table-actions";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface EditRemarksDialogProps {
  registrant: FormEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function EditRemarksDialog({
  registrant,
  open,
  onOpenChange,
  onSuccess,
}: EditRemarksDialogProps) {
  const [remarks, setRemarks] = useState(registrant.remarks || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      await handleRegistrantInfoUpdate(
        registrant.id,
        { remarks: remarks.trim() || null },
        () => {
          onSuccess();
          onOpenChange(false);
        }
      );
    } catch (error) {
      console.error("Failed to update remarks:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setRemarks(registrant.remarks || "");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Remarks</DialogTitle>
          <DialogDescription>
            Update remarks for {registrant.first_name} {registrant.last_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks..."
              maxLength={300}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {remarks.length}/300 characters
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
