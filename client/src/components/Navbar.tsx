import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
          <div>
            <Link href="#registration-form">
              <Button className="font-semibold px-6 py-2 transform hover:shadow-xl">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
