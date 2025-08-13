"use client";

import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  LocationIcon,
  UsersIcon,
  InnovationIcon,
  NetworkIcon,
  TechIcon,
} from "@/components/EventIcons";
import Link from "next/link";

export default function EventDetails() {
  return (
    <main className="bg-gradient-to-br from-summit-light-gray via-white to-summit-blue/5 min-h-[calc(100vh-200px)] flex items-center py-4 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Event Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-summit-black mb-2 leading-tight font-kagitingan">
            National Technovation Summit 2025
          </h1>
          <p className="text-xl sm:text-2xl text-summit-black/70 font-medium">
            Imagine, Innovate, and Impact the Nation
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-summit-blue/5 to-summit-teal/5 rounded-2xl p-8 border border-gray-100 shadow-md backdrop-blur-sm">
            <p className="text-lg text-summit-black/80 mb-6 max-w-2xl mx-auto">
              Don&apos;t miss this opportunity to be part of the innovation
              revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="#registration-form">
                <Button
                  variant="default"
                  size="lg"
                  className="w-[250px] font-semibold px-10 py-4 text-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl bg-gradient-to-r from-summit-blue to-summit-teal hover:from-summit-blue/90 hover:to-summit-teal/90 text-white"
                >
                  Register Now
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-[250px] font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200 hover:shadow-lg border-summit-blue text-summit-blue hover:bg-summit-blue/5"
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
            <div className="bg-summit-blue/10 rounded-xl p-6 shadow-lg border border-summit-blue hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <CalendarIcon />
                <h3 className="text-xl font-semibold text-summit-black ml-3">
                  Date & Time
                </h3>
              </div>
              <div className="ml-13">
                <p className="text-lg text-summit-black font-semibold">
                  August 31, 2025
                </p>
                <div className="flex items-center">
                  <p className="text-base text-summit-black font-medium">
                    8:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-summit-teal/10 rounded-xl p-6 shadow-lg border border-summit-teal hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <LocationIcon />
                <h3 className="text-xl font-semibold text-summit-black ml-3">
                  Location
                </h3>
              </div>
              <div className="ml-13">
                <p className="text-lg text-summit-black font-semibold mb-1">
                  Marco Polo Plaza,
                </p>
                <p className="text-base text-summit-black font-medium">
                  Cebu City
                </p>
              </div>
            </div>

            {/* Who Can Join */}
            <div className="bg-summit-pink/10 rounded-xl p-6 shadow-lg border border-summit-pink hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <UsersIcon />
                <h3 className="text-xl font-semibold text-summit-black ml-3">
                  Who Can Register
                </h3>
              </div>
              <div className="ml-13 space-y-3">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-summit-pink/20 text-summit-black border border-summit-pink/20 hover:bg-summit-pink/30 transition-colors duration-200">
                  All Undergraduate DOST Scholars
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - About */}
          <div className="space-y-8">
            {/* About the Event */}
            <div className="bg-summit-orange/10 rounded-xl p-6 shadow-lg border border-summit-orange h-full hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-summit-orange/10 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-summit-orange rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-summit-black ml-3">
                  Overview
                </h3>
              </div>
              <div className="space-y-4 text-summit-black/80 ml-13">
                <p className="text-base leading-relaxed text-summit-black">
                  A 1-day event that aims to bring together DOST-SEI scholars,
                  industry experts, and thought leaders to inspire a collective
                  vision of progress and innovation in the country.
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold text-summit-black mb-4">
                    What We Have:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm">
                      <TechIcon />
                      <span className="ml-3 font-semibold">TechTalks</span>
                    </li>
                    <li className="flex items-center text-sm">
                      <NetworkIcon />
                      <span className="ml-3 font-semibold">
                        Networking Sessions
                      </span>
                    </li>
                    <li className="flex items-center text-sm">
                      <InnovationIcon />
                      <span className="ml-3 font-semibold">
                        Innovation Booths
                      </span>
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
