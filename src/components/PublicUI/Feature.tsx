import { Space_Grotesk } from "next/font/google"
import Image from "next/image"

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
})

const Feature = () => {
  return (
    <section className="mx-3 md:px-20 md:py-10">
      {/* container */}
      <div className="flex justify-center items-center gap-x-12">
        
        {/* LEFT SIDE */}
        <div className=" w-1/2 px-3 md:w-1/2 flex flex-col gap-6">
          <h1 className={`text-2xl sm:text-3xl md:text-5xl  lg:text-6xl xl:text-8xl ${space.className}`}>
            DONT <br />
            MISS THE <br />
            BOAT!
          </h1>

          <p className="hidden  lg:block  text-sm xl:text-xl  text-gray-500 leading-relaxed">
            Many past visitors make sure to sail on the Woodwind <br />
            during every visit and recommend it to friends, leading <br />
            to early bookings. Since spots may fill up a week in <br />
            advance, we suggest <b>reserving as early as possible.</b>
          </p>

          <button className="bg-black text-white md:px-6 md:py-3 rounded-xl w-fit">
            Check Availability
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2">
          <div className="w-full relative h-100 rounded-2xl overflow-hidden">
            <Image
              src="/logo.png" // replace this
              alt="Boat"
              fill
              className=" h-9 w-12  md:object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default Feature