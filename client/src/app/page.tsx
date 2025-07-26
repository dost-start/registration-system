import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative">
      {/* Navbar */}
      <Navbar />
      
      {/* Banner Background Section */}
      <div className="relative h-64 sm:h-80 md:h-96 lg:h-140">
        <Image
          src="https://res.cloudinary.com/dsz9ok0yq/image/upload/v1751719220/SUMMIT_cbyrru.png"
          alt="National Technovation Summit"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Main Content Below Banner */}
      <main className="bg-summit-white py-4 px-4">
        <div className="max-w-3xl p-5 m-5 mx-auto text-justify">
          <h3 className="text-3xl sm:text-4xl font-bold text-summit-black mb-8">
            Join the Ultimate Innovation Challenge
          </h3>
          
          <p className="text-lg sm:text-xl text-summit-black mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
            mollit anim id est laborum.
          </p>
          
          <p className="text-lg sm:text-xl text-summit-black mb-12 max-w-2xl mx-auto">
            Sed ut perspiciatis unde omnis iste natus error sit 
            voluptatem accusantium doloremque laudantium, totam rem aperiam, 
            eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae 
            vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit 
            aspernatur aut odit aut fugit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
            variant="default"
            size = "lg"
            className="font-semibold px-6 py-2 transform hover:shadow-xl">
              <p className="text-white">Register Now</p>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="font-semibold px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
