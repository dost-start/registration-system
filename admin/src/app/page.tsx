import Image from "next/image";
import { orbitron } from "../lib/fonts";

export default function Home() {
  return (
    <div className="grid place-items-center min-h-screen bg-white">
      <main className="flex flex-col items-center justify-center text-center px-4">
        <Image
          src="/logo.png"
          alt="START Logo"
          width={200}
          height={130}
          priority
          className="mb-12 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
        />

        <h1
          className={`${orbitron.variable} font-orbitron text-4xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text bg-gradient-to-r text-primary tracking-wide animate-pulse`}
        >
          Starting soon...
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl">
          Preparing your experience. Please stand by.
        </p>
      </main>
    </div>
  );
}
