'use client';

import Image from "next/image";
import { orbitron } from "@/lib/fonts";
import { createClient } from "@supabase/supabase-js";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";



export default function Login() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) {
        throw new Error(error.message);
      }
      router.push('/');

    }
    catch (error: any) {
      console.error("Supabase ERROR: ", error.message);
    }
  }


  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");


  return (
    <div className="flex flex-col items-center justify-center max-h-dvh h-dvh px-10">
      <div
        className="w-auto px-25 py-15 border-2 focus-within:border-primary shadow-2xl shadow-primary transition-shadow duration-300 ease-in-out p-5 rounded-lg flex flex-col gap-5 items-start justify-center">
        <div className="flex flex-col gap-2 items-start justify-center">
          <Image
            src="/logo.png"
            alt="START Logo"
            width={200}
            height={130}
            priority
            className="mb-12 drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
          />
        </div>
        <form className="flex flex-col space-y-8" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <label>Email</label>
            <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="w-1/2 bg-primary rounded-md" type="submit"> Submit </button>
        </form>
      </div>
    </div >
  );
} 
