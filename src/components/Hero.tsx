"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Scroll To Enter prompt fades out when scrolling starts
  const scrollPromptOpacity = useTransform(scrollYProgress, [0.01, 0.05], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/hero.png"
          alt="Rashmi and Aditya"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className="relative z-10 text-center text-white flex flex-col items-center px-4"
      >

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm md:text-base tracking-[0.3em] uppercase mb-4"
        >
          We Are Getting Married
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-4 md:mb-6"
        >
          Rashmi & Aditya
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-lg md:text-2xl font-light tracking-widest"
        >
          December 4, 2026
        </motion.p>
      </div>

      <motion.div
        style={{ opacity: scrollPromptOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex-col items-center z-10"
      >
        <p className="text-xs uppercase tracking-widest mb-2">Scroll</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={24} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
}

