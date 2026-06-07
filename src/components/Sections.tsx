import { useState, useEffect } from "react";
import { DishCard, DISHES, type Dish } from "./DishCard";
import { useTaste } from "@/lib/taste";
import { BidModal } from "./BidModal";
import { DishModal } from "./DishModal";
import { ChefModal } from "./ChefModal";
import { MintModal } from "./MintModal";

const FILTERS = ["All", "Asia", "Europe", "Americas", "Street"];

function getCuisine(d: Dish) {
  const o = d.origin.toLowerCase();
  if (o.includes('jp') || o.includes('kr') || o.includes('th') || o.includes('vn') || o.includes('id') || o.includes('in')) return 'Asia';
  if (o.includes('it') || o.includes('fr') || o.includes('es') || o.includes('gr')) return 'Europe';
  if (o.includes('mx') || o.includes('us') || o.includes('ar')) return 'Americas';
  return 'Street';
}

export function LiveAuctions() {
  const { getCurrentBid } = useTaste();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [bidDish, setBidDish] = useState<Dish | null>(null);
  const [countdown, setCountdown] = useState(137); // fake live timer

  useEffect(() => {
    const t = setInterval(() => setCountdown(c => Math.max(41, c - 1)), 28000);
    return () => clearInterval(t);
  }, []);

  const filtered = DISHES.filter(d => activeFilter === "All" || getCuisine(d) === activeFilter).slice(0, 4);

  return (
    <section id="auctions" className="border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="chip mb-4">
              <span className="w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
              CLOSING IN <span className="font-mono ml-1 bid-ticker">{Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}</span>
            </div>
            <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight leading-tight">Live auctions</h2>
            <p className="text-muted-foreground mt-2 max-w-lg text-sm leading-relaxed">
              Every bid settles in USDT on the Tether network. Highest bidder gets the plate + the proof.
            </p>
          </div>
          <a href="#discover" className="link-rough">See full menu →</a>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-pill ${activeFilter === f ? 'filter-pill-active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((d, i) => (
            <DishCard 
              key={d.id} 
              d={{...d, bid: String(getCurrentBid(d.id))}} 
              index={i}
              onBid={() => setBidDish(d)}
              onView={() => setSelectedDish(d)}
            />
          ))}
        </div>
      </div>

      {bidDish && <BidModal dish={bidDish} onClose={() => setBidDish(null)} />}
      {selectedDish && (
        <DishModal 
          dish={selectedDish} 
          onClose={() => setSelectedDish(null)} 
          onBid={() => { setBidDish(selectedDish); setSelectedDish(null); }} 
        />
      )}
    </section>
  );
}

import chef1 from "@/assets/chef-1.jpg";
import chef2 from "@/assets/chef-2.jpg";
import chef3 from "@/assets/chef-3.jpg";
import chef4 from "@/assets/chef-4.jpg";
import chef5 from "@/assets/chef-5.jpg";
import chef6 from "@/assets/chef-6.jpg";
import chef7 from "@/assets/chef-7.jpg";
import chef8 from "@/assets/chef-8.jpg";

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

export function TopChefs() {
  const [openChef, setOpenChef] = useState<string | null>(null);
  const [openDish, setOpenDish] = useState<any>(null);
  const [bidDish, setBidDish] = useState<any>(null);

  return (
    <section id="chefs" className="border-b border-border" style={{ background: "var(--surface)" }}>
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight leading-tight">Featured chefs</h2>
            <p className="text-muted-foreground mt-2 text-sm">Real kitchens. Real signatures. On the ledger.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {CHEFS.map((c, i) => (
            <div 
              key={i} 
              onClick={() => setOpenChef(c.name)}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-24 h-24 mb-4 overflow-hidden border-[2.5px] border-ink" style={{ borderRadius: '40% 55% 38% 60%' }}>
                <img src={c.img} alt={c.name} className="w-full h-full object-cover grayscale-[0.1]" />
              </div>
              <h3 className="font-serif text-lg leading-tight group-hover:underline">{c.name}</h3>
              <p className="label-rough mt-1">{c.drops} drops · {c.country}</p>
            </div>
          ))}
        </div>
      </div>

      {openChef && (
        <ChefModal 
          chefName={openChef} 
          onClose={() => setOpenChef(null)} 
          onOpenDish={(d) => { setOpenChef(null); setOpenDish(d); }} 
        />
      )}
      {openDish && (
        <DishModal 
          dish={openDish} 
          onClose={() => setOpenDish(null)} 
          onBid={() => { setBidDish(openDish); setOpenDish(null); }} 
        />
      )}
      {bidDish && <BidModal dish={bidDish} onClose={() => setBidDish(null)} />}
    </section>
  );
}

export function TodaysPicks() {
  const { getCurrentBid } = useTaste();
  const [visible, setVisible] = useState(8);
  const [sortMode, setSortMode] = useState<'default' | 'price' | 'rare'>('default');

  let shown = [...DISHES].slice(4, 4 + visible);

  if (sortMode === 'price') {
    shown.sort((a, b) => getCurrentBid(b.id) - getCurrentBid(a.id));
  } else if (sortMode === 'rare') {
    const order: any = { signature: 4, epic: 3, rare: 2, common: 1 };
    shown.sort((a, b) => order[b.rarity] - order[a.rarity]);
  }

  return (
    <section id="discover" className="border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight leading-tight">Today's picks</h2>
            <p className="text-muted-foreground mt-2 text-sm">What the council is fighting over right now.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Default", "$ Price high", "Rarest"].map((label, idx) => {
              const modes: any[] = ['default', 'price', 'rare'];
              const m = modes[idx];
              return (
                <button 
                  key={idx} 
                  onClick={() => setSortMode(m)} 
                  className={`chip cursor-pointer ${sortMode === m ? 'border-primary text-primary' : ''}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {shown.map((d, i) => (
            <DishCard 
              key={d.id} 
              d={{...d, bid: String(getCurrentBid(d.id))}} 
              index={i} 
              onBid={() => { /* handled inside now via context + modals */ }}
              onView={() => { /* we open detail via global for now, DishCard will handle via context later */ }}
            />
          ))}
        </div>

        {visible < 11 && (
          <div className="mt-10 flex justify-center">
            <button 
              className="btn-drawn-outline" 
              onClick={() => setVisible(v => Math.min(12, v + 4))}
            >
              Load more dishes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
