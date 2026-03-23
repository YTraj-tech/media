import Navbar from "@/components/Navbar"
import { delay } from "@/lib/delay";
import Link from "next/link";
import { useUser,Show, UserButton } from "@clerk/nextjs";

export default async function publiclayout({ children }: { children: React.ReactNode }) {
  await delay(3000); // 3 seconds delay
  
  return (
    <div className="flex flex-col">
      <main className="pt-20">
        <Navbar/>
        {children}
      </main>

    </div>
  )
}