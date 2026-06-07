import { useState } from "react";
import { motion } from "framer-motion";
import heroFood from "@/assets/hero-food.jpg";
import { useTaste } from "@/lib/taste";
import { MintModal } from "./MintModal";

/* SVG filter definitions for the hand-drawn wobble effect */
function HandDrawnFilters() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
      aria-hidden="true"
    >
      <defs>
        {/* Main button wobble */}
        <filter id="squiggle" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.018 0.025"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/* Hover state — slightly more jitter */}
        <filter id="squiggle-hover" x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.022 0.03"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        {/* Smaller wobble for chips/tags */}
        <filter id="squiggle-sm" x="-3%" y="-15%" width="106%" height="130%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02 0.03"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}

export { HandDrawnFilters };

export function Hero() {
  const [showMint, setShowMint] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          <motion.div
            initial={false} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: "0 0 5px var(--primary)" }} />
            Live auction · 24 dishes from 18 countries
          </motion.div>

          <motion.h1
            initial={false} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-serif text-[clamp(2.6rem,6vw,5rem)] leading-[0.96] tracking-tight text-foreground"
          >
            Collect the world's<br />
            <span className="text-gradient italic">flavors,</span> on-chain.
          </motion.h1>

          <motion.p
            initial={false} animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-md text-muted-foreground text-[1.05rem] leading-relaxed"
          >
            TASTE.NFT is the marketplace for culinary provenance. Chefs from
            Tokyo to Oaxaca mint their signature dishes — you collect, trade,
            and earn a real bite at partner restaurants.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#auctions" className="btn-drawn">
              Explore the menu
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <button onClick={() => setShowMint(true)} className="btn-drawn-outline">
              Mint a dish
            </button>
          </div>

          <div className="mt-12 flex gap-10 max-w-md">
            {[
              { k: "12.4K", l: "Dishes minted" },
              { k: "184", l: "Chefs onboarded" },
              { k: "USDT", l: "Settled on Tether" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={false} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.09 }}
              >
                <div className="font-serif text-[1.6rem] leading-none">{s.k}</div>
                <div className="label-rough mt-1.5">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <motion.div
          initial={false} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative"
        >
          {/* Floating bid chip */}
          <motion.div
            initial={false} animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute -top-5 -left-5 z-10 bg-surface border border-border p-3 pr-5 flex items-center gap-3 ring-warm rounded-lg"
          >
            <div
              className="w-9 h-9 bg-primary/15 grid place-items-center rounded-full"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="label-rough">Top bid · ramen #001</div>
              <div className="font-mono text-sm mt-0.5">2,418 <span className="text-muted-foreground">USDT</span></div>
            </div>
          </motion.div>

          <motion.div
            initial={false} animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="absolute -bottom-5 -right-3 z-10 bg-surface border border-border p-3 pr-5 flex items-center gap-3 rounded-lg"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-surface"
                  style={{ background: `oklch(0.65 0.14 ${i * 55 + 30})` }} />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-semibold">42</span>
              <span className="text-muted-foreground"> chefs bidding</span>
            </div>
          </motion.div>

          {/* Main image */}
          <div
            className="relative aspect-square overflow-hidden ring-warm rounded-2xl"
          >
            <img
              src={heroFood}
              alt="A featured culinary NFT — gourmet ramen photographed under dramatic studio lighting"
              width={1024} height={1024}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <div className="label-rough text-cream/60 mb-1">Featured drop</div>
                <div className="font-serif text-[1.4rem] italic text-cream leading-tight">
                  Tonkotsu #001 — Hakata, JP
                </div>
              </div>
              <div
                className="bg-background/75 backdrop-blur px-3 py-1.5 font-mono text-xs rounded-md"
              >
                ⏱ 02:14:39
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cuisine marquee strip */}
      <div className="border-t border-border overflow-hidden" style={{ background: "var(--surface)" }}>
        <div
          className="flex gap-10 py-3.5 whitespace-nowrap font-serif text-xl text-muted-foreground"
          style={{ animation: "marquee 42s linear infinite" }}
        >
          {[
            "Japan 寿司", "Italia pasta", "México tacos", "France boulangerie",
            "India masala", "Việt phở", "España paella", "한국 김치",
            "ไทย แกง", "Lebanon mezze", "Perú ceviche", "Indonesia rendang",
            "Japan 寿司", "Italia pasta", "México tacos", "France boulangerie",
            "India masala", "Việt phở", "España paella", "한국 김치",
          ].map((c, i) => (
            <span key={i} className="inline-flex items-center gap-10">
              {c}
              <span className="w-1 h-1 rounded-full bg-primary inline-block" />
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      {showMint && <MintModal onClose={() => setShowMint(false)} />}
    </section>
  );
}
