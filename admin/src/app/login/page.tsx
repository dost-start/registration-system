'use client';

import Image from "next/image";
import { orbitron } from "@/lib/fonts";
import * as Form from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from 'zod';
import { createClient } from "@supabase/supabase-js";
import { FormEvent, useState } from "react";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";



export default function Login() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const router = useRouter();
  const formSchema = z.object({
    email: z.email(),
    password: z.string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })
      if (error) {
        throw new Error(error.message);
      }
      router.push('/');

    }
    catch (error: unknown) {
      if (error instanceof Error)
        console.error("Supabase ERROR: ", error.message);
      else
        console.error("Unexpected ERROR: ", error);

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
        <Form.Form {...form}>
          <form className="flex flex-col space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <Form.FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Email</Form.FormLabel>
                  <Form.FormControl>
                    <Input  {...field} />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />

            <Form.FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Password</Form.FormLabel>
                  <Form.FormControl>
                    <Input type="password" {...field} />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
            <button className="w-1/2 bg-primary rounded-md" type="submit"> Submit </button>
          </form>
        </Form.Form>
      </div>
    </div >
  );
} 
