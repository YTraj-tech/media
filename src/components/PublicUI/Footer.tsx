"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const navLinks = ["FAQS", "PRIVATE TOURS", "ABOUT US"];
const contactLinks = ["CONTACT", "BOOK A TRIP"];

export default function Footer() {
  return (
    <footer
      className="w-full pt-20  text-[#1a1a1a]"
      style={{ fontFamily: "'Barlow Condensed', 'Oswald', sans-serif" }}
    >
      {/* Top border */}
      <div className="h-px w-full" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mx-auto max-w-7xl px-8 py-16 lg:px-12"
      >
        {/* Main grid: Brand | Navigate | Contact */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_1.5fr_1.5fr]">

          {/* Brand */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between">
            <a
              href="#"
              className="text-5xl font-bold  mx-12 text-[#1a1a1a] transition-opacity duration-200 hover:opacity-50"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}
            >
              Woodwind
            </a>
          </motion.div>

          {/* Navigate column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <p
              className="text-sm font-normal text-[#888]"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Navigate
            </p>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="group relative w-fit text-[2rem] font-extrabold uppercase leading-tight text-[#1a1a1a] transition-colors duration-200 hover:text-[#555]"
                  style={{ letterSpacing: "0.01em" }}
                >
                  {link}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1a1a1a] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact column */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <p
              className="text-sm font-normal text-[#888]"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Contact
            </p>
            <nav className="flex flex-col gap-1">
              {contactLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="group relative w-fit text-[2rem] font-extrabold uppercase leading-tight text-[#1a1a1a] transition-colors duration-200 hover:text-[#555]"
                  style={{ letterSpacing: "0.01em" }}
                >
                  {link}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#1a1a1a] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Bottom copyright */}
        <motion.div variants={itemVariants} className="mt-16">
          <p
            className="text-xs text-[#999]"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            © {new Date().getFullYear()} Knut Pedersen. All rights reserved
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}