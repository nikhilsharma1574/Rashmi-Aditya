"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-16 text-center bg-background border-t border-primary/10">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-serif text-3xl md:text-5xl text-primary mb-4"
        >
          Rashmi & Aditya
        </motion.h2>
        <p className="text-foreground/70 tracking-widest uppercase text-sm mb-8">
          December 4, 2026
        </p>
        <p className="text-foreground/50 text-sm">
          We can&apos;t wait to share our special day with you.
        </p>
      </div>
    </footer>
  );
}
