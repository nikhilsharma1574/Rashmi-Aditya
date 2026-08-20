"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section className="py-24 bg-background overflow-hidden" ref={containerRef} id="gallery">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Gallery</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">Moments captured in time.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-[450px] sm:h-[600px] md:h-[800px]">
          <motion.div style={{ y: y1 }} className="relative h-full rounded-2xl overflow-hidden hidden md:block group cursor-pointer">
            <Link href="/gallery" className="block w-full h-full">
              <Image src="/hero.png" alt="Gallery 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-widest uppercase border border-white px-6 py-3 rounded-sm">View More</span>
              </div>
            </Link>
          </motion.div>
          <motion.div style={{ y: y2 }} className="relative h-full rounded-2xl overflow-hidden group cursor-pointer">
            <Link href="/gallery" className="block w-full h-full">
              <Image src="/gallery1.png" alt="Gallery 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-widest uppercase border border-white px-6 py-3 rounded-sm">View More</span>
              </div>
            </Link>
          </motion.div>
          <motion.div style={{ y: y3 }} className="relative h-full rounded-2xl overflow-hidden hidden md:block group cursor-pointer">
            <Link href="/gallery" className="block w-full h-full">
              <Image src="/story.png" alt="Gallery 3" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-widest uppercase border border-white px-6 py-3 rounded-sm">View More</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
