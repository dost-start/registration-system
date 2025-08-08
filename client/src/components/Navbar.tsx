import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex items-center space-x-4">
            <Link href="#status-check">
              <Button variant="outlinePrimary" className="px-4">
                <span className="hidden sm:inline">
                  Check Registration Status
                </span>
                <Search className="inline sm:hidden w-5 h-5 text-summit-blue" />
              </Button>
            </Link>
            <Link href="#registration-form">
              <Button className="font-semibold px-6 py-2 transform hover:shadow-xl">
                <span className="hidden sm:inline">Register Now</span>
                <UserPlus className="inline sm:hidden w-5 h-5 text-white" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
