"use client";

import React from "react";
import {Space_Grotesk} from "next/font/google"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";


const Space = Space_Grotesk({
    subsets:["latin-ext"],
    weight:["500"]
})

export function MoveScroleImg() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full my-5 px-5">
            <h1 className={`max-w-7xl ${Space.className}  mx-auto text-3xl sm:text-5xl lg:text-7xl xl:text-8xl text-neutral-800 dark:text-neutral-200 `}>
                HERE'S A<br />SNEAK PEAK
            </h1>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700 dark:text-neutral-200">
                                The first rule of Apple club is that you boast about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <img
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};



const data = [
  {
    category: "Worker Tracking",
    title: "Monitor field agents across multiple locations.",
    src: "/main1.png",
    content: <DummyContent />,
  },
  {
    category: "Geo-Fencing",
    title: "Verify worker presence using GPS zones.",
    src: "/main2.jpg",
    content: <DummyContent />,
  },
  {
    category: "Attendance",
    title: "Capture attendance with location proof.",
    src: "/main3.jpg",
    content: <DummyContent />,
  },
  {
    category: "Campaign Coverage",
    title: "Measure campaign reach in target areas.",
    src: "/main4.jpg",
    content: <DummyContent />,
  },
  {
    category: "Analytics",
    title: "Track productivity and worker performance.",
    src: "/img5.png",
    content: <DummyContent />,
  },
  {
    category: "Reports & Insights",
    title: "Download detailed marketing reports.",
    src: "/img6.png",
    content: <DummyContent />,
  },
];