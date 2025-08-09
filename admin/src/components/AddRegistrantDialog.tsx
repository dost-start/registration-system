import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { RegionType } from "@/types/form-entries";

interface AddRegistrantDialogProps {
  onRegistrantAdded: () => void;
}

export function AddRegistrantDialog({
  onRegistrantAdded,
}: AddRegistrantDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix: string;
    email: string;
    contact_number: string;
    facebook_profile: string;
    region: RegionType;
    university: string;
    course: string;
    is_dost_scholar: boolean;
    is_start_member: boolean;
    status: "pending" | "accepted" | "rejected";
    is_checked_in: boolean;
    remarks: string;
  }>({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    email: "",
    contact_number: "",
    facebook_profile: "",
    region: "Region VII" as RegionType,
    university: "",
    course: "",
    is_dost_scholar: true,
    is_start_member: false,
    status: "pending",
    is_checked_in: false,
    remarks: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      const supabase = createClient();
      const { error } = await supabase.from("form_entries").insert({
        ...formData,
        created_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      setOpen(false);
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        email: "",
        contact_number: "",
        facebook_profile: "",
        region: "Region VII" as RegionType,
        university: "",
        course: "",
        is_dost_scholar: true,
        is_start_member: false,
        status: "pending",
        is_checked_in: false,
        remarks: "",
      });
      onRegistrantAdded();
    } catch (err) {
      console.error("Error adding registrant:", err);
      setError(err instanceof Error ? err.message : "Failed to add registrant");
    } finally {
      setIsLoading(false);
    }
  };

  const regions = [
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
    "MIMAROPA",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Registrant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Registrant</DialogTitle>
          <DialogDescription>
            Add a new registrant to the National Technovation Summit 2025.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="middle_name">Middle Name</Label>
              <Input
                id="middle_name"
                value={formData.middle_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    middle_name: e.target.value,
                  }))
                }
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="suffix">Suffix</Label>
              <Input
                id="suffix"
                value={formData.suffix}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, suffix: e.target.value }))
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_number">Contact Number *</Label>
            <Input
              id="contact_number"
              value={formData.contact_number}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contact_number: e.target.value,
                }))
              }
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebook_profile">Facebook Profile</Label>
            <Input
              id="facebook_profile"
              value={formData.facebook_profile}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  facebook_profile: e.target.value,
                }))
              }
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Region *</Label>
              <Select
                value={formData.region}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    region: value as RegionType,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">University *</Label>
              <Input
                id="university"
                value={formData.university}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    university: e.target.value,
                  }))
                }
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course *</Label>
            <Input
              id="course"
              value={formData.course}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, course: e.target.value }))
              }
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  status: value as "pending" | "accepted" | "rejected",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_dost_scholar"
                checked={formData.is_dost_scholar}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_dost_scholar: !!checked,
                  }))
                }
              />
              <Label htmlFor="is_dost_scholar">DOST Scholar</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_start_member"
                checked={formData.is_start_member}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    is_start_member: !!checked,
                  }))
                }
              />
              <Label htmlFor="is_start_member">START Member</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_checked_in"
                checked={formData.is_checked_in}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_checked_in: !!checked }))
                }
              />
              <Label htmlFor="is_checked_in">Checked In</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Input
              id="remarks"
              value={formData.remarks}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, remarks: e.target.value }))
              }
              disabled={isLoading}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Registrant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
