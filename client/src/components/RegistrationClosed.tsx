import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function RegistrationClosed() {
  return (
    <section
      id="registration-form"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-summit-light-gray to-summit-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-summit-pink/20 rounded-full">
              <Lock className="w-8 h-8 text-summit-pink" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-summit-black mb-4">
            Registration Closed
          </h2>
          <p className="text-xl text-summit-black/70 max-w-2xl mx-auto">
            Thank you for your interest in the National Technovation Summit
            2025. Registration for this event has been closed.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-summit-black/10 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl text-summit-navy">
              National Technovation Summit 2025
            </CardTitle>
            <CardDescription className="text-lg text-summit-black/60">
              Registration Period Has Ended
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-summit-pink/10 border border-summit-pink/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-summit-pink mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-summit-navy mb-2">
                    Registration Status
                  </h3>
                  <p className="text-summit-black/70">
                    Registration for the National Technovation Summit 2025 is
                    now closed. We are no longer accepting new applications for
                    this event.
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="text-center space-y-4">
              <p className="text-summit-black/60">
                Stay updated on future events and opportunities from START.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="mailto:dost.start@gmail.com">
                  <Button
                    variant="default"
                    className="flex items-center gap-2 bg-summit-blue hover:bg-summit-blue/90 text-summit-white"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Us
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
