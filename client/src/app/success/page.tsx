import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, FileText } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Registration Successful - National Technovation Summit",
  description:
    "Your registration has been successfully completed. We will contact you soon via email.",
  openGraph: {
    title: "Registration Successful - National Technovation Summit",
    description:
      "Your registration has been successfully completed. We will contact you soon via email.",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1751719220/SUMMIT_cbyrru.png",
        width: 1200,
        height: 630,
        alt: "National Technovation Summit",
      },
    ],
  },
};

export default function SuccessPage() {
  return (
    <div className="py-12 min-h-screen bg-gradient-to-br from-summit-light-gray via-white to-summit-blue/5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-summit-black mb-4 leading-tight font-kagitingan">
            Registration Successful!
          </h1>
          <p className="text-xl text-summit-black/70 mb-6">
            Thank you for registering for the National Technovation Summit 2025
          </p>
        </div>

        {/* Email Notification Card */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-summit-blue/10 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-summit-blue" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-summit-black mb-3">
            Check Your Email
          </h3>
          <p className="text-summit-black/70 leading-relaxed">
            We will send you an email regarding the status of your registration.
            Please check your inbox (and spam folder) for updates about your
            application.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            asChild
            className="w-full max-w-[250px] font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl bg-gradient-to-r from-summit-blue to-summit-teal hover:from-summit-blue/90 hover:to-summit-teal/90 text-white"
          >
            <a href="/primer.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="w-5 h-5 mr-2" />
              View Primer
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full max-w-[250px] font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 hover:shadow-lg border-summit-blue text-summit-blue hover:bg-summit-blue/5"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-summit-blue/5 to-summit-teal/5 rounded-xl p-6 border border-gray-100">
            <h4 className="font-semibold text-summit-black mb-2">
              What&apos;s Next?
            </h4>
            <p className="text-sm text-summit-black/70">
              Our team will review your registration and send you confirmation
              details. Make sure to mark <strong>August 31, 2025</strong> on
              your calendar!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
