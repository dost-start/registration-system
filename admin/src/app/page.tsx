"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { orbitron } from "../lib/fonts";
import { DashboardStats } from "@/components/DashboardStats";
import type { User } from "@supabase/supabase-js";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (err) {
        setError("Failed to initialize authentication");
        console.error("Auth initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (!error) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center min-h-screen bg-white">
        <div className="animate-pulse">
          <div className="w-48 h-32 bg-gray-200 rounded-lg mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid place-items-center min-h-screen bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Configuration Error
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Please check your environment variables.
          </p>
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
              <Image
                src="/logo-s.png"
                alt="START Logo"
                width={100}
                height={32}
                priority
                className="h-8 w-auto"
              />
              <h1
                className={`${orbitron.variable} font-orbitron text-xl font-bold text-primary`}
              >
                Admin Portal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut} size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-8">
          <div>
            <Image
              src="/logo.png"
              alt="START Logo"
              width={200}
              height={130}
              priority
              className="mx-auto mb-8 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
            />

            <h1
              className={`${orbitron.variable} font-orbitron text-4xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text bg-gradient-to-r text-primary tracking-wide animate-pulse`}
            >
              Starting soon...
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto">
              Preparing your admin experience. Dashboard features coming soon.
            </p>
          </div>

          {/* Quick Stats Cards */}
          <DashboardStats />
        </div>
      </main>
    </div>
  );
}
