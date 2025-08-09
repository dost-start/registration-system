'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { orbitron } from "../lib/fonts";

import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  useEffect(() => {
    const checkUser = async () => {
      const { error } = await supabase.auth.getUser();
      if (error) {
        router.push('/login');
      }
    };
    checkUser();
  }, [router, supabase])

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("Log out");
    supabase.auth.signOut();
  }
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
        <Button onClick={handleClick}>Sign Out</Button>
      </main>
    </div>
  );
}
