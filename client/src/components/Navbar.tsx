import Image from "next/image";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onRegisterClick?: () => void;
}

export default function Navbar({ onRegisterClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-gradient-to-r from-white to-summit-light-gray/50 shadow-sm backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo on the left */}
          <div>
            <Image
              src="/logo-s.png"
              alt="START Logo"
              width={120}
              height={40}
              priority
              className="h-10 w-auto"
            />
          </div>

          {/* Register Now button on the right */}
          <div>
            <Button
              onClick={onRegisterClick}
              className="font-semibold px-6 py-2 transform hover:shadow-xl bg-gradient-to-r from-summit-blue to-summit-teal hover:from-summit-blue/90 hover:to-summit-teal/90 transition-all duration-200"
            >
              Register Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
