"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-10 text-center bg-background border-t border-primary/10">
      <div className="max-w-4xl mx-auto px-4 flex justify-center">
        <img
          src="/logo.png"
          alt="Rashmi & Aditya Monogram"
          className="w-28 h-28 md:w-40 md:h-40 object-contain drop-shadow-md"
        />
      </div>
    </footer>
  );
}
