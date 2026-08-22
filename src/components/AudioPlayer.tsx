"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Disable music completely on Admin pages (/admin and /admin/login)
    if (pathname.startsWith("/admin")) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      return;
    }

    // Local audio file public/music.mp3
    const audio = new Audio("/music.mp3");
    audio.loop = true; // Auto-repeat continuously on loop
    audio.volume = 0.04; // Low background volume
    audioRef.current = audio;

    // Autoplay logic - starts immediately & handles browser autoplay interaction rules
    const startAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {
          // Silent fallback if browser blocks un-clicked autoplay
        });
      }
    };

    // Try starting audio immediately
    startAudio();

    // Ensure playback begins on any user click / touch / scroll anywhere on screen
    window.addEventListener("click", startAudio);
    window.addEventListener("touchstart", startAudio);
    window.addEventListener("scroll", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("scroll", startAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [pathname]);

  return null; // Invisible component
}
