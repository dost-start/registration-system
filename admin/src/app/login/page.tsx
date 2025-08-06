import Image from "next/image";
import { orbitron } from "../../lib/fonts";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center max-h-dvh h-dvh px-10">
      <div
        className="w-auto px-25 py-15 group focus-within:border-2 focus-within:border-primary focus-within:shadow-2xl shadow-primary transition-shadow duration-300 ease-in-out p-5 rounded-lg flex flex-col gap-5 items-start justify-center">
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
        <form className="flex flex-col space-y-8" >
          <div className="flex flex-col space-y-4">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />

            <label>Password</label>
            <input type="text" placeholder="Password" />
          </div>
          <button className="w-1/2 bg-primary rounded-md" type="submit"> Submit </button>
        </form>
      </div>
    </div >
  );
} 
