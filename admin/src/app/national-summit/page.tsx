"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users } from "lucide-react";

import { fetchRegistrantStats } from "@/lib/data";
import { exportRegistrantsToCSV } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/components/AdminHeader";
import { EventInfo, EventDescription } from "@/components/EventInfo";
import { StatsCards } from "@/components/StatsCards";
import { QuickActions } from "@/components/QuickActions";
import type { RegistrantStats } from "@/types/form-entries";

export default function EventDashboard() {
  const [stats, setStats] = useState<RegistrantStats>({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
    checkedIn: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleExportCSV = async () => {
    try {
      await exportRegistrantsToCSV();
    } catch (err) {
      console.error("Error exporting CSV:", err);
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await fetchRegistrantStats();
        setStats(statsData);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load registration statistics");
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Dashboard
          </h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <AdminHeader title="Event Dashboard">
        <Link href="/national-summit/manage">
          <Button className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Manage Event
          </Button>
        </Link>
      </AdminHeader>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventInfo />
        <EventDescription />

        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Registration Summary
          </h2>
          <StatsCards stats={stats} isLoading={isLoading} />
        </div>

        <QuickActions onExportCSV={handleExportCSV} />
      </main>
    </div>
  );
}
