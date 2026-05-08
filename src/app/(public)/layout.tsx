import { delay } from "@/lib/delay"
import NavBar from "@/components/PublicUI/NavBar"


export default async function publiclayout({ children }: { children: React.ReactNode }) {
     await delay(3000)
  return (
    <div className="flex  flex-col my-5">
      <main>
        <NavBar/>
        {children}
      </main>

    </div>
  )
}