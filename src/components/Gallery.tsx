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
    <section className="py-16 md:py-24 bg-background overflow-hidden" ref={containerRef} id="gallery">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-primary text-xs uppercase tracking-[0.25em] font-medium mb-2 block">Captured Moments</span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-3">Photo Gallery</h2>
          <p className="text-foreground/70 max-w-xl mx-auto text-sm md:text-base">Glimpses of our love, journey & celebrations.</p>
        </motion.div>

        {/* MOBILE GALLERY: Compact 2-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 md:h-[700px]">
          {/* Card 1 */}
          <motion.div style={{ y: y1 }} className="relative h-44 sm:h-64 md:h-full rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer shadow-sm shadow-primary/5">
            <Link href="/gallery" className="block w-full h-full">
              <Image src="/hero.png" alt="Gallery 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-6 text-left">
                <span className="text-[10px] md:text-xs font-semibold text-white/90 uppercase tracking-widest bg-primary/80 self-start px-2 py-0.5 rounded mb-1">Wedding</span>
                <p className="text-white text-xs md:text-base font-serif font-medium line-clamp-1">The Grand Beginning</p>
              </div>
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div style={{ y: y2 }} className="relative h-44 sm:h-64 md:h-full rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer shadow-sm shadow-primary/5">
            <Link href="/gallery" className="block w-full h-full">
              <Image src="/gallery1.png" alt="Gallery 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-6 text-left">
                <span className="text-[10px] md:text-xs font-semibold text-white/90 uppercase tracking-widest bg-primary/80 self-start px-2 py-0.5 rounded mb-1">Celebrations</span>
                <p className="text-white text-xs md:text-base font-serif font-medium line-clamp-1">Ceremony Decor</p>
              </div>
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div style={{ y: y3 }} className="relative h-44 sm:h-64 md:h-full rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer col-span-2 md:col-span-1 shadow-sm shadow-primary/5">
            <Link href="/gallery" className="block w-full h-full">
              <Image src="/story.png" alt="Gallery 3" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-6 text-left">
                <span className="text-[10px] md:text-xs font-semibold text-white/90 uppercase tracking-widest bg-primary/80 self-start px-2 py-0.5 rounded mb-1">Us</span>
                <p className="text-white text-xs md:text-base font-serif font-medium line-clamp-1">Together Forever</p>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* View Full Gallery CTA */}
        <div className="mt-8 text-center">
          <Link 
            href="/gallery"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 text-xs md:text-sm tracking-widest uppercase font-medium transition-all duration-300 shadow-sm"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
