"use client";

import { motion } from "framer-motion";

const events = [
  {
    title: "Haldi Ceremony",
    date: "December 2, 2026",
    time: "10:00 AM",
    location: "Lakeview Terrace, Bhilai",
    description: "A morning filled with laughter, vibrant colors, and blessings.",
    theme: "Yellow & White",
    colors: [
      { hex: "#FFD700", name: "Marigold Yellow" },
      { hex: "#FFA500", name: "Bright Amber" },
      { hex: "#FFFFFF", name: "Pure White" },
      { hex: "#F5F5DC", name: "Cream Ivory" },
    ]
  },
  {
    title: "Sangeet",
    date: "December 3, 2026",
    time: "6:00 PM Onwards",
    location: "The Royal Gardens, Bhilai",
    description: "Join us for an evening of music, dance, and colorful celebrations as we kick off the wedding festivities.",
    theme: "Vibrant / Pastels",
    colors: [
      { hex: "#E91E63", name: "Royal Magenta" },
      { hex: "#9C27B0", name: "Deep Purple" },
      { hex: "#00BCD4", name: "Turquoise Teal" },
      { hex: "#F48FB1", name: "Soft Pastel Pink" },
    ]
  },
  {
    title: "The Wedding",
    date: "December 4, 2026",
    time: "5:00 PM Onwards",
    location: "Grand Palace Courtyard, Bhilai",
    description: "Witness our union as we take our vows under the open sky.",
    theme: "Traditional / Reds",
    colors: [
      { hex: "#B71C1C", name: "Bridal Crimson Red" },
      { hex: "#D4AF37", name: "Royal Metallic Gold" },
      { hex: "#880E4F", name: "Deep Maroon" },
      { hex: "#FFF8E7", name: "Warm Off-White" },
    ]
  }
];

export default function Events() {
  return (
    <section className="py-24 px-4 bg-primary/5 relative" id="events">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Wedding Events</h2>
          <p className="max-w-2xl mx-auto text-foreground/80">
            We can&apos;t wait to celebrate with you! Here is the schedule for our wedding celebrations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-primary/10 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <h3 className="font-serif text-2xl text-primary mb-2">{event.title}</h3>
              <div className="text-sm uppercase tracking-wider text-foreground/60 mb-4 font-semibold">
                {event.date} | {event.time}
              </div>
              <p className="font-medium mb-3">{event.location}</p>
              <p className="text-foreground/70 leading-relaxed mb-6 flex-grow">{event.description}</p>
              
              <div className="mt-auto pt-4 border-t border-primary/10">
                <p className="text-xs uppercase tracking-wide font-semibold text-primary mb-2.5">
                  Color Palette:
                </p>
                {/* 4 Real Color Circles */}
                <div className="flex items-center gap-3">
                  {event.colors.map((color, cIdx) => (
                    <div
                      key={cIdx}
                      className="group relative"
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-black/10 shadow-sm transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: color.hex }}
                      />
                      {/* Tooltip on hover */}
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 bg-black/80 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 font-sans">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
