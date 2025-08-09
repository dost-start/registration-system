"use client";

import { Download, RefreshCw, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminHeader } from "@/components/AdminHeader";
import { CompactStatsCards } from "@/components/StatsCards";
import { RegistrantDataTable } from "@/components/registrant-table/RegistrantDataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllRegistrants } from "@/lib/data";
import { exportRegistrantsListToCSV } from "@/lib/export";
import type { FormEntry, RegistrantStats } from "@/types/form-entries";
import { AddRegistrantDialog } from "@/components/AddRegistrantDialog";

export default function EventManagement() {
  const [registrants, setRegistrants] = useState<FormEntry[]>([]);
  const [stats, setStats] = useState<RegistrantStats>({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
    checkedIn: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const registrantsData = await fetchAllRegistrants();
      setRegistrants(registrantsData);

      // Calculate stats from the fetched data
      const total = registrantsData.length;
      const accepted = registrantsData.filter(
        (r) => r.status === "accepted"
      ).length;
      const rejected = registrantsData.filter(
        (r) => r.status === "rejected"
      ).length;
      const pending = registrantsData.filter(
        (r) => r.status === "pending"
      ).length;
      const checkedIn = registrantsData.filter((r) => r.is_checked_in).length;

      setStats({
        total,
        accepted,
        rejected,
        pending,
        checkedIn,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load registrant data");
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh data without showing the main loading spinner
  const refreshData = async () => {
    try {
      const registrantsData = await fetchAllRegistrants();
      setRegistrants(registrantsData);

      // Calculate stats from the fetched data
      const total = registrantsData.length;
      const accepted = registrantsData.filter(
        (r) => r.status === "accepted"
      ).length;
      const rejected = registrantsData.filter(
        (r) => r.status === "rejected"
      ).length;
      const pending = registrantsData.filter(
        (r) => r.status === "pending"
      ).length;
      const checkedIn = registrantsData.filter((r) => r.is_checked_in).length;

      setStats({
        total,
        accepted,
        rejected,
        pending,
        checkedIn,
      });
    } catch (err) {
      console.error("Error refreshing data:", err);
      // Don't set error state here as it would disrupt the UI
    }
  };

  const handleExportCSV = () => {
    exportRegistrantsListToCSV(registrants);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Management
          </h1>
          <p className="text-muted-foreground">{error}</p>
          <Button onClick={fetchData} className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <AdminHeader
        title="Event Management"
        showBackButton
        backButtonHref="/national-summit"
        backButtonText="Back to Dashboard"
      >
        <Button
          onClick={fetchData}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
        <Button
          onClick={handleExportCSV}
          variant="outline"
          size="sm"
          disabled={registrants.length === 0}
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </AdminHeader>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="mb-8">
          <CompactStatsCards stats={stats} />
        </div>

        {/* Registrants Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Registrants Management
              </div>
              <AddRegistrantDialog onRegistrantAdded={refreshData} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                <span className="ml-2">Loading registrants...</span>
              </div>
            ) : (
              <RegistrantDataTable
                data={registrants}
                onDataChange={refreshData}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
