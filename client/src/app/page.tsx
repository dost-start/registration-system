"use client";

import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import EventDetails from "@/components/EventDetails";
import RegistrationForm from "@/components/registration-form/RegistrationForm";
import Footer from "@/components/Footer";

export default function Home() {
  const scrollToRegistration = () => {
    const element = document.getElementById("registration-form");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <Navbar onRegisterClick={scrollToRegistration} />

      {/* Hero Section */}
      <HeroBanner />

      {/* Event Details Section */}
      <EventDetails onRegisterClick={scrollToRegistration} />

      {/* Registration Form Section */}
      <RegistrationForm />

      {/* Footer */}
      <Footer />
    </div>
  );
}
