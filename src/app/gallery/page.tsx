"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Wedding", "Sangeet", "Mehendi", "Bachelorette", "Us"];

const defaultImages = [
  { id: "def-1", url: "/hero.png", caption: "Rashmi & Aditya", category: "Wedding" },
  { id: "def-2", url: "/story.png", caption: "Together Forever", category: "Us" },
  { id: "def-3", url: "/gallery1.png", caption: "Ceremony Decor", category: "Wedding" },
];

interface GalleryItem {
  id: string;
  url: string;
  caption?: string | null;
  category: string;
}

export default function FullGallery() {
  const [images, setImages] = useState<GalleryItem[]>(defaultImages);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const uploaded: GalleryItem[] = await res.json();
          if (uploaded.length > 0) {
            setImages([...uploaded, ...defaultImages]);
          }
        }
      } catch (err) {
        console.error("Failed to load uploaded photos:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  const filteredImages = selectedCategory === "All"
    ? images
    : images.filter((img) => img.category === selectedCategory);

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
          className="text-center mb-12"
        >
          <h1 className="font-serif text-5xl md:text-6xl text-primary mb-4">Our Memories</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg mb-8">A collection of our favorite moments together.</p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                    : "bg-white text-foreground/70 hover:bg-primary/10 border border-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-foreground/50 animate-pulse font-serif text-xl">Loading memories...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-2xl border border-primary/10">
            <p className="text-foreground/60 font-serif text-lg">No photos in &quot;{selectedCategory}&quot; category yet.</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img, i) => (
              <motion.div
                key={img.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="relative overflow-hidden rounded-xl break-inside-avoid group cursor-pointer shadow-md shadow-primary/5 border border-primary/5"
              >
                <Image 
                  src={img.url} 
                  alt={img.caption || `Gallery photo ${i + 1}`} 
                  width={800} 
                  height={800} 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-widest bg-primary/80 self-start px-2.5 py-1 rounded-md mb-2">
                    {img.category || "Us"}
                  </span>
                  {img.caption && (
                    <p className="text-white text-base font-serif">{img.caption}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
