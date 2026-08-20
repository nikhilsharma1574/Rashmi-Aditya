"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const milestones = [
  { year: "2020", title: "SRM University", description: "No strings attached. Didn't even know each other." },
  { year: "2021", title: "Corporate Life", description: "One working in Bangalore, the other WFH. Still didn't know each other!" },
  { year: "2022", title: "BITS Pilani", description: "Crossed paths and became just friends for 2 years." },
  { year: "2024 - 2025", title: "Again Friends", description: "Reconnected and continued our journey as friends." },
  { year: "2026", title: "Strings Attached", description: "We finally realized it was meant to be." },
];

export default function Story() {
  return (
    <section className="py-24 px-4 bg-background relative" id="story">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4">Our Story</h2>
          <p className="max-w-2xl mx-auto text-foreground/80 leading-relaxed">
            From our very first conversation, we knew there was something special. 
            Over the years, our bond has grown stronger through shared laughter, countless adventures, 
            and a love that feels like coming home. Here is a glimpse into our journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/story.png"
              alt="Our journey"
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="flex flex-col space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 border-l border-primary/30"
              >
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                <h3 className="font-serif text-2xl text-primary mb-1">{milestone.year}</h3>
                <h4 className="text-lg font-medium mb-2">{milestone.title}</h4>
                <p className="text-foreground/70">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
