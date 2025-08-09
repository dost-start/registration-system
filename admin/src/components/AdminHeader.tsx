import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LogOut } from "lucide-react";

import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { orbitron } from "@/lib/fonts";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  children?: React.ReactNode;
}

export function AdminHeader({
  title,
  subtitle = "National Technovation Summit 2025",
  showBackButton = false,
  backButtonText = "Back to Dashboard",
  backButtonHref = "/national-summit",
  children,
}: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <>
                <Link href={backButtonHref}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {backButtonText}
                  </Button>
                </Link>
                <div className="h-6 border-l border-gray-300"></div>
              </>
            )}
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
            <div className="hidden md:block">
              <h1
                className={`${orbitron.variable} font-orbitron text-xl font-bold text-primary`}
              >
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {children}
            <form action={signOut}>
              <Button variant="outline" type="submit" size="sm">
                <LogOut className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
