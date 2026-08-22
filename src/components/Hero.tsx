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

  // 3D Door & Frame Animations for Mobile
  // Initial scale 1.0x with object-contain fits the frame 100% inside mobile screen boundary
  const frameScale = useTransform(scrollYProgress, [0, 0.45], [1.0, 3.2]);
  const doorScale = useTransform(scrollYProgress, [0, 0.45], [1.0, 2.2]);
  const doorLeftRotateY = useTransform(scrollYProgress, [0, 0.45], [0, -110]);
  const doorRightRotateY = useTransform(scrollYProgress, [0, 0.45], [0, 110]);
  const doorLeftX = useTransform(scrollYProgress, [0, 0.45], ["0%", "-90%"]);
  const doorRightX = useTransform(scrollYProgress, [0, 0.45], ["0%", "90%"]);
  const doorOpacity = useTransform(scrollYProgress, [0.35, 0.48], [1, 0]);
  // Scroll To Enter gold prompt fades out immediately when scrolling starts (0.01 to 0.05 scroll progress)
  const scrollPromptOpacity = useTransform(scrollYProgress, [0.01, 0.05], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden flex items-center justify-center">
      {/* 3D ROYAL CARVED PALACE DOORS & FRAME OVERLAY (Mobile Only) */}
      <motion.div 
        style={{ opacity: doorOpacity }}
        className="block md:hidden pointer-events-none fixed inset-0 z-30 overflow-hidden [perspective:1200px]"
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-2">
          {/* BACK LAYER: BOTH DOORS (DoorLeft.png & DoorRight.png - Fits Y-axis 100% and opens in 3D) */}
          <motion.div
            style={{ scale: doorScale }}
            className="absolute inset-0 w-full h-full flex items-center justify-center origin-center z-10"
          >
            {/* Left Door Leaf (DoorLeft.png) */}
            <motion.div
              style={{ x: doorLeftX, rotateY: doorLeftRotateY }}
              className="absolute top-0 left-0 w-1/2 h-full origin-left overflow-hidden shadow-2xl"
            >
              <img
                src="/DoorLeft.png"
                alt="Royal Door Left"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "right center",
                }}
              />
            </motion.div>

            {/* Right Door Leaf (DoorRight.png) */}
            <motion.div
              style={{ x: doorRightX, rotateY: doorRightRotateY }}
              className="absolute top-0 right-0 w-1/2 h-full origin-right overflow-hidden shadow-2xl"
            >
              <img
                src="/DoorRight.png"
                alt="Royal Door Right"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "left center",
                }}
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Center Gold Scroll Prompt (Fades out completely after 12% scroll) */}
        <motion.div 
          style={{ opacity: scrollPromptOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D4AF37] flex flex-col items-center z-40 drop-shadow-lg"
        >
          <p className="text-xs uppercase tracking-[0.25em] mb-2 font-serif font-semibold">Scroll To Enter</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={22} strokeWidth={2} />
          </motion.div>
        </motion.div>
      </motion.div>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-6 relative w-24 h-24 md:w-32 md:h-32 drop-shadow-lg"
        >
          <Image
            src="/logo.png"
            alt="Rashmi & Aditya Monogram"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

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

