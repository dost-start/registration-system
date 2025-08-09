"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Download,
  LogOut,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { orbitron } from "@/lib/fonts";
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

  const exportToCSV = async () => {
    try {
      const supabase = createClient();

      // Fetch all registrant data for export
      const { data: registrants, error } = await supabase
        .from("form_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!registrants || registrants.length === 0) return;

      // Create CSV headers
      const headers = [
        "ID",
        "First Name",
        "Middle Name",
        "Last Name",
        "Suffix",
        "Email",
        "Contact Number",
        "Facebook Profile",
        "Region",
        "University",
        "Course",
        "DOST Scholar",
        "START Member",
        "Status",
        "Checked In",
        "Created At",
        "Remarks",
      ];

      // Create CSV rows
      const rows = registrants.map((registrant) => [
        registrant.id,
        registrant.first_name,
        registrant.middle_name || "",
        registrant.last_name,
        registrant.suffix || "",
        registrant.email || "",
        registrant.contact_number,
        registrant.facebook_profile || "",
        registrant.region,
        registrant.university,
        registrant.course,
        registrant.is_dost_scholar ? "Yes" : "No",
        registrant.is_start_member ? "Yes" : "No",
        registrant.status,
        registrant.is_checked_in ? "Yes" : "No",
        new Date(registrant.created_at).toISOString(),
        registrant.remarks || "",
      ]);

      // Combine headers and rows
      const csvContent = [headers, ...rows]
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `registrants_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error exporting CSV:", err);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();

        // Single request to get all form entries with only the fields we need for stats
        const { data: entries, error } = await supabase
          .from("form_entries")
          .select("status, is_checked_in");

        if (error) {
          throw error;
        }

        // Filter the data to calculate stats
        const total = entries?.length || 0;
        const accepted =
          entries?.filter((entry) => entry.status === "accepted").length || 0;
        const rejected =
          entries?.filter((entry) => entry.status === "rejected").length || 0;
        const pending =
          entries?.filter((entry) => entry.status === "pending").length || 0;
        const checkedIn =
          entries?.filter((entry) => entry.is_checked_in === true).length || 0;

        setStats({
          total,
          accepted,
          rejected,
          pending,
          checkedIn,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load registration statistics");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Image
                  src="/logo-s.png"
                  alt="START Logo"
                  width={100}
                  height={32}
                  priority
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
              <div>
                <h1
                  className={`${orbitron.variable} font-orbitron text-xl font-bold text-primary`}
                >
                  Event Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  National Technovation Summit 2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/national-summit/manage">
                <Button className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Manage Event
                </Button>
              </Link>
              <form action={signOut}>
                <Button variant="outline" type="submit" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Information Section */}
        <div className="mb-8">
          <Card className="overflow-hidden">
            <div className="relative h-64 bg-gradient-to-r from-primary to-primary/80">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <h1
                    className={`${orbitron.variable} font-orbitron text-4xl font-bold mb-2`}
                  >
                    National Technovation Summit 2025
                  </h1>
                  <p className="text-xl font-medium opacity-90">
                    Ignite, Connect, and Impact the Nation
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Date & Time */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Date & Time
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      August 31, 2025
                    </p>
                    <p className="text-sm text-muted-foreground">
                      8:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Marco Polo Plaza
                    </p>
                    <p className="text-sm text-muted-foreground">Cebu City</p>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Users className="w-5 h-5 text-primary mt-0.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Eligibility
                    </h3>
                    <Badge variant="secondary" className="mt-1">
                      DOST Scholars Only
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Description */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                About the Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A 1-day summit designed to ignite innovation, connect sectors,
                and recognize impactful projects. This event brings together
                DOST scholars from across the Philippines to showcase
                technological innovations and foster collaboration.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">TechTalks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    Networking Sessions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    Innovation Showcase
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Registration Statistics */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Registration Summary
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="pb-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 bg-gray-200 rounded w-12 mb-2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Total Registrations */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Registrations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {stats.total}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All registrants
                  </p>
                </CardContent>
              </Card>

              {/* Accepted */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Accepted
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {stats.accepted}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Approved attendees
                  </p>
                </CardContent>
              </Card>

              {/* Pending */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Awaiting review
                  </p>
                </CardContent>
              </Card>

              {/* Rejected */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Rejected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.rejected}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Declined applications
                  </p>
                </CardContent>
              </Card>

              {/* Checked In */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Checked In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.checkedIn}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Present at event
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Quick Actions
          </h2>
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
                  View, approve, reject, and manage all event registrations.
                  Update registrant status and handle check-ins.
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
                  Export registrant data in various formats for external
                  analysis and reporting.
                </p>
                <Button
                  onClick={exportToCSV}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
