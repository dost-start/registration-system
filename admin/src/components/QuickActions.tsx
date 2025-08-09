import Link from "next/link";
import { Users, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickActionsProps {
  onExportCSV: () => void;
}

export function QuickActions({ onExportCSV }: QuickActionsProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Registrant Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              View, approve, reject, and manage all event registrations. Update
              registrant status and handle check-ins.
            </p>
            <Link href="/national-summit/manage">
              <Button className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Manage Registrants
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Data Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Export registrant data in various formats for external analysis
              and reporting.
            </p>
            <Button onClick={onExportCSV} variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
