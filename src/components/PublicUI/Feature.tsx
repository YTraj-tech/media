import { Space_Grotesk } from "next/font/google"
import Image from "next/image"

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
})

const Feature = () => {
  return (
    <section className="px-56 py-10">
      {/* container */}
      <div className="flex items-center gap-8">
        
        {/* LEFT SIDE */}
        <div className="w-1/2 flex flex-col gap-6">
          <h1 className={`text-8xl ${space.className}`}>
            DONT <br />
            MISS THE <br />
            BOAT!
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed">
            Many past visitors make sure to sail on the Woodwind <br />
            during every visit and recommend it to friends, leading <br />
            to early bookings. Since spots may fill up a week in <br />
            advance, we suggest <b>reserving as early as possible.</b>
          </p>

          <button className="bg-black text-white px-6 py-3 rounded-xl w-fit">
            Check Availability
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2">
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/logo.webp" // replace this
              alt="Boat"
              fill
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Feature