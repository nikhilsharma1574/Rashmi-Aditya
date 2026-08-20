"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const images = [
  { src: "/hero.png", alt: "Couple photo 1" },
  { src: "/story.png", alt: "Couple hands" },
  { src: "/gallery1.png", alt: "Wedding decor" },
  // Adding the same images to fill up the gallery for demonstration
  { src: "/gallery1.png", alt: "Wedding decor" },
  { src: "/hero.png", alt: "Couple photo 2" },
  { src: "/story.png", alt: "Details" },
];

export default function FullGallery() {
  return (
    <main className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-12">
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span className="font-medium tracking-wide uppercase text-sm">Back to Home</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-primary mb-4">Our Memories</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">A collection of our favorite moments together.</p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="relative overflow-hidden rounded-xl break-inside-avoid"
            >
              <Image 
                src={img.src} 
                alt={img.alt} 
                width={800} 
                height={800} 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
