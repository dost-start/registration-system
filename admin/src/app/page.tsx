import Image from "next/image";
import { orbitron } from "../lib/fonts";

export default function Home() {
  return (
    <section className="bg-[url('/background.svg')] bg-cover bg-center">
      <section className="w-[90%] min-h-screen overflow-hidden mx-auto flex flex-col py-10">
        <div className="flex flex-row items-center justify-between mb-10">
          <h1 className="flex flex-row gap-3 items-center md:text-4xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 md:w-12 h-auto" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z"/></svg>
            EVENTS DASHBOARD
          </h1>
          <div className="w-12 h-12 md:w-16 md:h-16 relative">
            <Image src="/logo-s.png" alt="START Logo" fill />
          </div>
        </div>
        <div id="eventsContainer" className="flex flex-col gap-8 w-full">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-white rounded-lg shadow-md min-h-[30vh]">
            <div className="min-h-60 w-1/4 min-w-[200px] relative">
              <Image src="/summit-dsk.webp" alt="National Summit" fill className="object-cover rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-xl lg:text-3xl font-semibold text-center md:text-left">National Technovation Summit</h2>
              <p className="text-lg lg:text-xl text-gray-600 text-justify">Join us for the annual National Summit where leaders from across the country gather to discuss key issues.</p>
              <span className="text-gray-500">Date: August 31, 2025</span>
              <div className="w-full flex flex-wrap gap-x-8 gap-y-2 mt-4">
                <h2 className="text-xl font-bold text-primary">300 Registrants</h2>
                <h2 className="text-xl font-bold text-green-300">300 Accepted</h2>
                <h2 className="text-xl font-bold text-red-300">0 Rejected</h2>
                <h2 className="text-xl font-bold text-gray-300">0 Pending</h2>
              </div>
              <div className="flex gap-4 mt-4 w-full items-center justify-center md:justify-start">
                <a href="/manage" className="bg-primary/80 text-black px-6 py-2 rounded-lg hover:bg-primary/50 transition duration-300">Manage Registrations</a>
              </div>
            </div>
          </div>
        </div>
      
      </section>
    </section>
  );
}
