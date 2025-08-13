import { Calendar, Clock, MapPin, Trophy, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import bgImage from "../../public/bg-image.png";

export function EventInfo() {
  return (
    <div className="mb-8">
      <Card className="overflow-hidden">
        <div className="relative bg-gradient-to-r from-primary to-primary/80">
          <Image src={bgImage} alt="Background" objectFit="cover" />
        </div>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Date & Time */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Calendar className="w-5 h-5 text-primary mt-0.5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Date & Time</h3>
                <p className="text-sm text-muted-foreground">August 31, 2025</p>
                <p className="text-sm text-muted-foreground">
                  8:00 AM - 8:00 PM
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Location</h3>
                <p className="text-sm text-muted-foreground">
                  Marco Polo Plaza
                </p>
                <p className="text-sm text-muted-foreground">Cebu City</p>
              </div>
            </div>

            {/* Eligibility */}
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Users className="w-5 h-5 text-primary mt-0.5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Eligibility</h3>
                <Badge variant="secondary" className="mt-1">
                  DOST Scholars Only
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function EventDescription() {
  return (
    <div className="mb-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            About the Event
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed mb-4">
            A 1-day event that aims to bring together DOST-SEI scholars,
            industry experts, and thought leaders to inspire a collective vision
            of progress and innovation in the country.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">TechTalks</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Networking Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Innovation Showcase</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
