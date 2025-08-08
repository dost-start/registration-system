"use client";

import { Button } from "@/components/ui/button";

interface EventDetailsProps {
  onRegisterClick: () => void;
}

export default function EventDetails({ onRegisterClick }: EventDetailsProps) {
  return (
    <main className="bg-summit-white min-h-[calc(100vh-200px)] flex items-center py-4 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Event Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-summit-black mb-2 leading-tight font-kagitingan">
            National Technovation Summit 2025
          </h1>
          <p className="text-xl sm:text-2xl text-summit-black/70 font-medium">
            Ignite, Connect, and Impact the Nation
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-summit-blue/5 to-summit-teal/5 rounded-2xl p-8 border border-gray-100 shadow-md">
            <p className="text-lg text-summit-black/80 mb-6 max-w-2xl mx-auto">
              Don&apos;t miss this opportunity to be part of the innovation
              revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="default"
                size="lg"
                onClick={onRegisterClick}
                className="w-full max-w-[250px] font-semibold px-10 py-4 text-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl bg-gradient-to-r from-summit-blue to-summit-teal hover:from-summit-blue/90 hover:to-summit-teal/90 text-white"
              >
                Register Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className=" w-full max-w-[250px] font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 hover:shadow-lg border-summit-blue text-summit-blue hover:bg-summit-blue/5"
              >
                <a href="/primer.pdf" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Event Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column - Event Info */}
          <div className="space-y-8">
            {/* Date & Time */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-summit-blue rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold text-summit-black">
                  Date & Time
                </h3>
              </div>
              <p className="text-lg text-summit-black/80 mb-1">
                August 31, 2025
              </p>
              <p className="text-base text-summit-black/60">
                8:00 AM - 8:00 PM
              </p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-summit-teal rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold text-summit-black">
                  Location
                </h3>
              </div>
              <p className="text-lg text-summit-black/80 mb-1">
                Marco Polo Plaza,
              </p>
              <p className="text-base text-summit-black/60">Cebu City</p>
            </div>

            {/* Who Can Join */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-summit-pink rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold text-summit-black">
                  Who Can Register
                </h3>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-summit-pink/10 text-summit-pink border border-summit-pink/20">
                  DOST Scholars Only
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - About */}
          <div className="space-y-8">
            {/* About the Event */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-summit-orange rounded-full mr-3"></div>
                <h3 className="text-xl font-semibold text-summit-black">
                  Overview
                </h3>
              </div>
              <div className="space-y-4 text-summit-black/80">
                <p className="text-base leading-relaxed">
                  A 1-day summit to ignite innovation, connect sectors, and
                  recognize impactful projects from the hackathon.
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold text-summit-black mb-3">
                    What We Have:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-summit-orange rounded-full mr-3"></span>
                      TechTalks
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-summit-orange rounded-full mr-3"></span>
                      Networking Sessions
                    </li>
                    <li className="flex items-center text-sm">
                      <span className="w-1.5 h-1.5 bg-summit-orange rounded-full mr-3"></span>
                      Innovation Booths
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
