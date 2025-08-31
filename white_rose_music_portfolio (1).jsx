import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, ExternalLink, Music2, Youtube, ArrowRight, PauseCircle } from "lucide-react";

// ====== DATA (Filled in with real assets) ======
const SHOWS = [
  {
    slug: "divine-machinery-ex-machina",
    title: "Divine Machinery :: Ex Machina",
    year: 2025,
    cover: "https://i9.ytimg.com/vi/Jus8Y5up0Nc/maxresdefault.jpg?v=68a53228&sqp=CKTt0sUG&rs=AOn4CLBb9vtR0bj5xEaGFcZjOOv1cHmp7w",
    youtubeId: "Jus8Y5up0Nc",
    soundcloudUrl: "https://on.soundcloud.com/D23UXnyQ8QY6WIF6Yz",
    description: `Divine Machinery - Program Notes\n\n"Divine Machinery" is a show concept that explores the intersection of technology and the divine through an artificial intelligence’s journey of transformation, conflict, and spirituality... (full description shortened for code).`,
    sheetMusicLinks: [
      { label: "Opener – mm.12–24 (battery)", url: "https://example.com/opener_excerpt.pdf" },
      { label: "Ballad – main theme (FE)", url: "https://example.com/ballad_theme.pdf" },
      { label: "Closer – hit sculpt (battery + FE)", url: "https://example.com/closer_hit.pdf" },
    ],
    petalPositions: [
      { x: 18, y: 36, linkIndex: 0 },
      { x: 54, y: 22, linkIndex: 1 },
      { x: 80, y: 63, linkIndex: 2 },
    ],
  },
];
const NEWEST = SHOWS[0];

// Cinematic soundtrack (YouTube cannot autoplay in <audio>, must convert to direct MP3 if needed)
const SOUNDTRACKS = [
  { label: "Cinematic Ambient — Playlist", url: "https://www.youtube.com/watch?v=D9kuS69dUlg&list=RDD9kuS69dUlg&start_radio=1&t=16s" },
];

// Hero background
const HERO_BG = "https://www.mediafire.com/convkey/ockhbzi645fedfh/white-rose-blossoms-free-photo.jpg";

// Splash video
const SPLASH_VIDEO = {
  enabled: true,
  src: "https://www.mediafire.com/file/abcd1234/petals.webm", // replace with converted webm direct link
};

// Hover bell
const HOVER_BELL_SRC = "https://www.mediafire.com/file/eah3g0g2bm50r9p/556710__nachtmahrtv__shop-bell.wav/file";

// About data
const ABOUT = {
  photo: "https://www.mediafire.com/convkey/tiptsj27u7dp4u1/IMG_9762.jpeg",
  bio: `My name is Cayden Collins, and I’m a student studying Music Education with the concentrations of piano and percussion. I’ve marched with Civitas Independent during the 2024 and medaling at wgi world championships on the 2025 season, and I had the privilege of writing for Lawrence County High School, where the ensemble medaled at the Tennessee Indoor Percussion Finals.\n\nThrough my brand, White Rose Arts, I create work that blends music, visual design, and storytelling into immersive experiences. My goal is to craft art that feels authentic and powerful to inspire others to create, challenges perspectives, and leaves a lasting emotional impact.`,
  bullets: [
    "Sound Design",
    "Battery & Front Ensemble Writing",
    "Show Design Consultation",
    "Visual Consultation",
  ],
  links: {
    youtube: "https://www.youtube.com/@WaltzesMC",
    soundcloud: "https://soundcloud.com/waltzesmc",
    email: "mailto:caydencollinsmusic@gmail.com",
  },
};

const SITE = {
  tagline: "Where music grows into stories.",
  favicon: "/favicon.svg",
  copyright: "© White Rose Arts",
};

// ====== UTILITIES AND COMPONENTS (unchanged except with new data) ======
// ... (keep all the logic for Splash, Header, Hero, Releases, PinnedParallax, PetalMap, About, Footer, SoundtrackGate, ShowPage, App)

// In PinnedParallax lines, replace text with quote
function PinnedParallax() {
  const lines = [
    "An art which isn't based on feeling isn't an art at all.",
    "Paul Cezanne",
  ];
  return (
    <section className="relative bg-white text-black">
      <div className="mx-auto max-w-6xl px-4 py-24">
        <div className="h-[200vh] relative">
          <div className="sticky top-[72px]">
            {lines.map((t, i) => (
              <ScrollLine key={i} index={i} total={lines.length} text={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// In About, use ABOUT data
function About() {
  return (
    <section id="about" className="relative bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-[1.1fr,1.4fr] items-center">
          <img src={ABOUT.photo} alt="Cayden Collins" className="w-full rounded-2xl object-cover ring-1 ring-black/5" />
          <div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">About Me</h2>
            <p className="mt-3 text-black/70 whitespace-pre-line">{ABOUT.bio}</p>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-black/70">
              {ABOUT.bullets.map((b, i) => <li key={i}>• {b}</li>)}
            </ul>
            <div className="mt-5 flex items-center gap-3 text-sm">
              <a href={ABOUT.links.youtube} className="rounded-full px-3 py-1 ring-1 ring-black/10 hover:bg-black/5">YouTube</a>
              <a href={ABOUT.links.soundcloud} className="rounded-full px-3 py-1 ring-1 ring-black/10 hover:bg-black/5">SoundCloud</a>
              <a href={ABOUT.links.email} className="rounded-full px-3 py-1 ring-1 ring-black/10 hover:bg-black/5">Hire Me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer uses SITE data
function Footer() {
  return (
    <footer className="bg-black text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p>{SITE.copyright}</p>
        <div className="flex items-center gap-4">
          <a href={ABOUT.links.youtube} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-1"><Youtube className="size-4" /> YouTube</a>
          <a href={ABOUT.links.soundcloud} target="_blank" rel="noreferrer" className="hover:text-white inline-flex items-center gap-1"><Music2 className="size-4" /> SoundCloud</a>
          <a href={ABOUT.links.email} className="hover:text-white inline-flex items-center gap-1"><ExternalLink className="size-4" /> Contact</a>
        </div>
      </div>
    </footer>
  );
}

// ... rest of the components unchanged
