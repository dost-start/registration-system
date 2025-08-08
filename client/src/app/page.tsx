import Link from "next/link";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import EventDetails from "@/components/EventDetails";
import RegistrationForm from "@/components/registration-form/RegistrationForm";

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
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <HeroBanner />

      {/* Event Details Section */}
      <EventDetails />

      {/* Registration Form Section */}
      <RegistrationForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}
