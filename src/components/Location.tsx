"use client";

import { motion } from "framer-motion";

export default function Location() {
  return (
    <section className="py-24 px-4 bg-primary/5" id="location">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6">The Venue</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-xl font-medium mb-1">Grand Palace Courtyard</h3>
              <p className="text-foreground/70">Bhilai, Chhattisgarh</p>
              <p className="text-foreground/70">India</p>
            </div>
            <div>
              <p className="text-foreground/70 leading-relaxed">
                Our wedding celebrations will take place in the beautiful city of Bhilai, Chhattisgarh.
              </p>
            </div>
          </div>
          
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-lg font-medium tracking-wide"
          >
            Get Directions
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-200"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.41709420875!2d81.25884279093355!3d21.193847953255163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293ccce6962295%3A0xc619eb6ccaf33ec2!2sBhilai%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Venue Map"
          />
        </motion.div>
      </div>
    </section>
  );
}
