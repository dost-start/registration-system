"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Users, Download, RefreshCw, LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrantDataTable } from "@/components/RegistrantDataTable";
import { orbitron } from "@/lib/fonts";
import type { FormEntry, RegistrantStats } from "@/types/form-entries";

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
      const supabase = createClient();

      // Fetch all registrants
      const { data: registrantsData, error: registrantsError } = await supabase
        .from("form_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (registrantsError) {
        throw registrantsError;
      }

      setRegistrants(registrantsData || []);

      // Calculate stats
      const total = registrantsData?.length || 0;
      const accepted =
        registrantsData?.filter((r) => r.status === "accepted").length || 0;
      const rejected =
        registrantsData?.filter((r) => r.status === "rejected").length || 0;
      const pending =
        registrantsData?.filter((r) => r.status === "pending").length || 0;
      const checkedIn =
        registrantsData?.filter((r) => r.is_checked_in).length || 0;

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

  useEffect(() => {
    fetchData();
  }, []);

  const exportToCSV = () => {
    if (registrants.length === 0) return;

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
  };

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
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/national-summit">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
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
                  Event Management
                </h1>
                <p className="text-sm text-muted-foreground">
                  National Technovation Summit 2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
                onClick={exportToCSV}
                variant="outline"
                size="sm"
                disabled={registrants.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.total}
              </div>
            </CardContent>
          </Card>

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
            </CardContent>
          </Card>

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
            </CardContent>
          </Card>

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
            </CardContent>
          </Card>

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
            </CardContent>
          </Card>
        </div>

        {/* Registrants Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Registrants Management
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
                onDataChange={fetchData}
              />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
