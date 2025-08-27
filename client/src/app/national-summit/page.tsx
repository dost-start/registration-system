import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import EventDetails from "@/components/EventDetails";
import RegistrationForm from "@/components/registration-form/RegistrationForm";
import RegistrationClosed from "@/components/RegistrationClosed";
import Footer from "@/components/Footer";
import { getEventRegistrationStatus } from "@/app/actions/event-status";

// Disable caching to ensure real-time status updates
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "National Technovation Summit",
  description: "Join the ultimate innovation challenge",
  keywords: "technology, innovation, summit, competition, hackathon",
  openGraph: {
    title: "National Technovation Summit",
    description: "Join the ultimate innovation challenge",
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

export default async function Home() {
  // Check if registration is closed (no caching to ensure real-time status)
  const isRegistrationClosed = await getEventRegistrationStatus();

  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <HeroBanner />

      {/* Event Details Section */}
      <EventDetails />

      {/* Registration Form Section - Conditional */}
      {isRegistrationClosed ? <RegistrationClosed /> : <RegistrationForm />}

      {/* Footer */}
      <Footer />
    </div>
  );
}
