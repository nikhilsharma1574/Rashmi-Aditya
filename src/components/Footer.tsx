"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-10 text-center bg-background border-t border-primary/10">
      <div className="max-w-4xl mx-auto px-4 flex justify-center">
        <img
          src="/logo.png"
          alt="Rashmi & Aditya Monogram"
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
      </div>
    </footer>
  );
}
