import { motion } from "framer-motion";
import { useState } from "react";
import { DishCard, DISHES } from "./DishCard";
import chef1 from "@/assets/chef-1.jpg";
import chef2 from "@/assets/chef-2.jpg";
import chef3 from "@/assets/chef-3.jpg";
import chef4 from "@/assets/chef-4.jpg";
import chef5 from "@/assets/chef-5.jpg";
import chef6 from "@/assets/chef-6.jpg";
import chef7 from "@/assets/chef-7.jpg";
import chef8 from "@/assets/chef-8.jpg";

const FILTERS = ["All cuisines", "Asia", "Europe", "Americas", "Africa", "Desserts", "Street food"];

export function LiveAuctions() {
  return (
    <section id="auctions" className="border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="chip mb-4">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--spice)", boxShadow: "0 0 5px var(--spice)" }}
              />
              Closing soon
            </div>
            <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight leading-tight">
              Live auctions
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
              Each dish settles on-chain in USDT on the Tether network. Bid above
              the reserve and the chef ships you a redemption pass.
            </p>
          </div>
          <a href="#all" className="link-rough">See all 124 →</a>
        </div>

        /* Filter pills */
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f, i) => (
            <button
              key={f}
              className={`filter-pill cursor-pointer ${i === 0 ? "filter-pill-active" : ""}`}
              onClick={() => console.log(`Filter selected: ${f}`)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {DISHES.slice(0, 4).map((d, i) => <DishCard key={d.id} d={d} index={i} />)}
        </div>
      </div>
    </section>
  );
}

const CHEFS = [
  { name: "Kenji Watanabe", country: "JP", drops: 18, img: chef1 },
  { name: "Giulia Romano", country: "IT", drops: 24, img: chef2 },
  { name: "Yousef El Amrani", country: "MA", drops: 11, img: chef3 },
  { name: "Diego Hernández", country: "MX", drops: 16, img: chef4 },
  { name: "Anaya Iyer", country: "IN", drops: 20, img: chef5 },
  { name: "Lucien Marchand", country: "FR", drops: 32, img: chef6 },
  { name: "Min-ji Park", country: "KR", drops: 14, img: chef7 },
  { name: "Rama Pradipta", country: "ID", drops: 9, img: chef8 },
];

/* Irregular avatar shapes so they don't look like stock UI */
export function TopChefs() {
  return (
    <section id="chefs" className="border-b border-border" style={{ background: "var(--surface)" }}>
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight leading-tight">
              Featured chefs
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">Verified, peer-reviewed, on-chain.</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              className="btn-drawn-outline w-10 h-10 flex items-center justify-center rounded-full"
              style={{ padding: 0 }}
              aria-label="Previous"
              onClick={() => console.log("Previous chefs")}
            >
              ←
            </button>
            <button
              className="btn-drawn w-10 h-10 flex items-center justify-center rounded-full"
              style={{ padding: 0 }}
              aria-label="Next"
              onClick={() => console.log("Next chefs")}
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {CHEFS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={false} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex flex-col items-center text-center group"
            >
              <div
                className="w-24 h-24 mb-4 overflow-hidden ring-warm rounded-full transition-transform duration-500 group-hover:scale-[1.05]"
              >
                <img
                  src={c.img} alt={c.name}
                  width={200} height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-lg leading-tight">{c.name}</h3>
              <p className="label-rough mt-1">{c.drops} drops · {c.country}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TodaysPicks() {
  return (
    <section id="discover" className="border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight leading-tight">
              Today's picks
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">Curated by our culinary council.</p>
          </div>
<div className="flex flex-wrap gap-2">
             {["⌗ Category", "$ Price", "◆ Rarity", "⌁ Chain"].map((f) => (
               <button key={f} className="chip cursor-pointer hover:border-primary/40 transition-colors" onClick={() => console.log(`Sort selected: ${f}`)}>
                 {f}
               </button>
             ))}
           </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {DISHES.slice(4, 12).map((d, i) => <DishCard key={d.id} d={d} index={i} />)}
        </div>

<div className="mt-10 flex justify-center">
           <button className="btn-drawn-outline" onClick={() => console.log("Load more dishes")}>
             Load 112 more dishes
           </button>
         </div>
      </div>
    </section>
  );
}
