"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyRegistration } from "@/app/actions/verify-registration";

export default function Footer() {
  const [checkEmail, setCheckEmail] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    success: boolean;
    message: string;
    registrationData?: {
      firstName: string;
      lastName: string;
      email: string | null;
      status: "pending" | "rejected" | "accepted";
      createdAt: string;
    } | null;
  } | null>(null);

  const handleStatusCheck = async () => {
    if (!checkEmail || !checkEmail.includes("@")) {
      setCheckResult({
        success: false,
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsChecking(true);
    setCheckResult(null);

    try {
      // Encode email to base64 for verification
      const encodedEmail = Buffer.from(checkEmail).toString("base64");
      const result = await verifyRegistration(encodedEmail);

      setCheckResult(result);
    } catch {
      setCheckResult({
        success: false,
        message: "Failed to check registration status",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "accepted":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };
  return (
    <footer className="bg-summit-navy text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Registration Status Check Section */}
        <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold mb-4 text-summit-white">
            Check Your Registration Status
          </h3>

          <div className="max-w-md mx-auto space-y-4" id="status-check">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={checkEmail}
                onChange={(e) => setCheckEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleStatusCheck();
                  }
                }}
              />
              <Button
                onClick={handleStatusCheck}
                disabled={isChecking}
                variant="secondary"
                className="px-4 bg-summit-teal hover:bg-summit-teal/80"
              >
                {isChecking ? "Checking..." : "Check"}
              </Button>
            </div>

            {checkResult && (
              <div
                className={`p-4 rounded-lg border ${
                  checkResult.success
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                {checkResult.success && checkResult.registrationData ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      {getStatusIcon(checkResult.registrationData.status)}
                      <span className="font-medium">Registration Found</span>
                    </div>
                    <p className="text-sm text-white/80">
                      Name: {checkResult.registrationData.firstName}{" "}
                      {checkResult.registrationData.lastName}
                    </p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={`font-semibold ${getStatusColor(
                          checkResult.registrationData.status
                        )}`}
                      >
                        {checkResult.registrationData.status
                          ?.charAt(0)
                          .toUpperCase() +
                          checkResult.registrationData.status?.slice(1)}
                      </span>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-red-300">{checkResult.message}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6 text-summit-white">
          For More Information, Contact Us
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/company/startdost"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <Linkedin className="w-5 h-5 text-summit-teal group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>

          {/* Email */}
          <a
            href="mailto:dost.start@gmail.com"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <Mail className="w-5 h-5 text-summit-orange group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Email</span>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/STARTDOST"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <Facebook className="w-5 h-5 text-summit-blue group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Facebook</span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/start_dost"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <Instagram className="w-5 h-5 text-summit-pink group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Instagram</span>
          </a>
        </div>

        <div className="border-t border-white/20 pt-6">
          <p className="text-sm text-white/70">
            © 2025 DOST START. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
