import { motion } from "framer-motion";
import pizza from "@/assets/food-pizza.jpg";
import sushi from "@/assets/food-sushi.jpg";
import tacos from "@/assets/food-tacos.jpg";
import nasi from "@/assets/food-nasigoreng.jpg";
import croissant from "@/assets/food-croissant.jpg";
import bibim from "@/assets/food-bibimbap.jpg";
import curry from "@/assets/food-curry.jpg";
import pho from "@/assets/food-pho.jpg";
import paella from "@/assets/food-paella.jpg";
import tiramisu from "@/assets/food-tiramisu.jpg";
import tagine from "@/assets/food-tagine.jpg";
import burger from "@/assets/food-burger.jpg";
import gyros from "@/assets/food-gyros.jpg";
import padthai from "@/assets/food-padthai.jpg";
import asado from "@/assets/food-asado.jpg";

import chef1 from "@/assets/chef-1.jpg";
import chef2 from "@/assets/chef-2.jpg";
import chef3 from "@/assets/chef-3.jpg";
import chef4 from "@/assets/chef-4.jpg";
import chef5 from "@/assets/chef-5.jpg";
import chef6 from "@/assets/chef-6.jpg";
import chef7 from "@/assets/chef-7.jpg";
import chef8 from "@/assets/chef-8.jpg";

export type Dish = {
  id: string; name: string; origin: string; flag: string;
  img: string; chef: string; chefImg: string; bid: string; edition: string;
  rarity: "common" | "rare" | "epic" | "signature";
};

export const DISHES: Dish[] = [
  { id: "001", name: "Tonkotsu Ramen", origin: "Hakata, JP", flag: "🇯🇵", img: sushi, chef: "Kenji Watanabe", chefImg: chef1, bid: "2,418", edition: "1/1", rarity: "signature" },
  { id: "002", name: "Margherita D.O.P.", origin: "Napoli, IT", flag: "🇮🇹", img: pizza, chef: "Giulia Romano", chefImg: chef2, bid: "1,820", edition: "3/12", rarity: "epic" },
  { id: "003", name: "Tacos al Pastor", origin: "CDMX, MX", flag: "🇲🇽", img: tacos, chef: "Diego Hernández", chefImg: chef4, bid: "740", edition: "8/50", rarity: "rare" },
  { id: "004", name: "Nasi Goreng Kambing", origin: "Jakarta, ID", flag: "🇮🇩", img: nasi, chef: "Rama Pradipta", chefImg: chef8, bid: "612", edition: "5/25", rarity: "rare" },
  { id: "005", name: "Croissant au Beurre", origin: "Paris, FR", flag: "🇫🇷", img: croissant, chef: "Lucien Marchand", chefImg: chef6, bid: "395", edition: "44/100", rarity: "common" },
  { id: "006", name: "Dolsot Bibimbap", origin: "Seoul, KR", flag: "🇰🇷", img: bibim, chef: "Min-ji Park", chefImg: chef7, bid: "880", edition: "12/40", rarity: "rare" },
  { id: "007", name: "Butter Chicken", origin: "New Delhi, IN", flag: "🇮🇳", img: curry, chef: "Anaya Iyer", chefImg: chef5, bid: "1,150", edition: "2/15", rarity: "epic" },
  { id: "008", name: "Phở Bò Tái", origin: "Hà Nội, VN", flag: "🇻🇳", img: pho, chef: "Linh Trần", chefImg: chef7, bid: "520", edition: "18/60", rarity: "common" },
  { id: "009", name: "Paella Valenciana", origin: "Valencia, ES", flag: "🇪🇸", img: paella, chef: "Carlos Mendoza", chefImg: chef6, bid: "1,640", edition: "4/20", rarity: "epic" },
  { id: "010", name: "Tiramisù della Nonna", origin: "Treviso, IT", flag: "🇮🇹", img: tiramisu, chef: "Giulia Romano", chefImg: chef2, bid: "680", edition: "9/30", rarity: "rare" },
  { id: "011", name: "Lamb Tagine", origin: "Marrakech, MA", flag: "🇲🇦", img: tagine, chef: "Youssef El Amrani", chefImg: chef3, bid: "910", edition: "6/24", rarity: "rare" },
  { id: "012", name: "Smash Stack", origin: "Brooklyn, US", flag: "🇺🇸", img: burger, chef: "Maya Foster", chefImg: chef2, bid: "445", edition: "31/80", rarity: "common" },
  { id: "013", name: "Souvláki Pita", origin: "Athens, GR", flag: "🇬🇷", img: gyros, chef: "Nikos Papadakis", chefImg: chef6, bid: "320", edition: "22/75", rarity: "common" },
  { id: "014", name: "Pad Thai Goong", origin: "Bangkok, TH", flag: "🇹🇭", img: padthai, chef: "Suthida Chen", chefImg: chef7, bid: "510", edition: "14/45", rarity: "rare" },
  { id: "015", name: "Bife de Chorizo", origin: "Buenos Aires, AR", flag: "🇦🇷", img: asado, chef: "Mateo Ríos", chefImg: chef4, bid: "1,280", edition: "3/18", rarity: "epic" },
];

const RARITY_STYLE: Record<Dish["rarity"], { dot: string; label: string }> = {
  common: { dot: "var(--leaf)", label: "common" },
  rare: { dot: "var(--primary)", label: "rare" },
  epic: { dot: "var(--spice)", label: "epic" },
  signature: { dot: "var(--cream)", label: "signature" },
};

/* Each card gets a slightly different corner radius — feels hand-placed */
const CARD_SHAPES = [
  "4px 14px 6px 12px / 12px 6px 14px 4px",
  "12px 4px 14px 6px / 6px 14px 4px 12px",
  "6px 12px 4px 14px / 14px 4px 12px 6px",
  "10px 6px 12px 4px / 4px 12px 6px 10px",
];

import { useState } from 'react';
import { motion } from "framer-motion";
import { useTaste, type Dish as TasteDish } from '@/lib/taste';
import { BidModal } from './BidModal';
import { DishModal } from './DishModal';

export type Dish = {
  id: string; name: string; origin: string; flag: string;
  img: string; chef: string; chefImg: string; bid: string; edition: string;
  rarity: "common" | "rare" | "epic" | "signature";
};

export function DishCard({ d, index = 0, onBid, onView }: { 
  d: Dish; 
  index?: number; 
  onBid?: () => void; 
  onView?: () => void;
}) {
  const { placeBid, getCurrentBid } = useTaste();
  const [localBidOpen, setLocalBidOpen] = useState(false);
  const [localViewOpen, setLocalViewOpen] = useState(false);

  const rarity = RARITY_STYLE[d.rarity];
  const liveBid = getCurrentBid(d.id);

  const handlePlaceBid = () => {
    if (onBid) return onBid();
    setLocalBidOpen(true);
  };

  const handleViewDish = () => {
    if (onView) return onView();
    setLocalViewOpen(true);
  };

  // convert to the shape expected by modals
  const dishForModal: TasteDish = {
    ...d,
    bid: liveBid,
  };

  return (
    <>
      <motion.article
        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
        className="card-recipe group relative overflow-hidden"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={d.img}
            alt={`${d.name} from ${d.origin}`}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-3 left-3">
            <span className="stamp text-[9px]">{rarity.label}</span>
          </div>

          <div className="absolute top-3 right-3 font-mono text-[10px] px-2 py-px bg-background/90 border border-border">
            #{d.id}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px]">
            <span className="px-2 py-px bg-background/90 border border-border">{d.flag} {d.origin}</span>
            <span className="px-2 py-px bg-background/90 border border-border font-mono">ed. {d.edition}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-serif text-[1.05rem] italic leading-snug">{d.name}</h3>

          <div className="mt-3 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <img src={d.chefImg} alt="" className="w-5 h-5 object-cover border border-border" style={{ borderRadius: '40% 55% 40% 55%' }} />
              <span className="truncate text-muted-foreground">{d.chef}</span>
            </div>
            <div className="text-right font-mono">
              {liveBid} <span className="text-[10px] text-muted-foreground">USDT</span>
            </div>
          </div>

          <div className="mt-3.5 flex gap-2">
            <button onClick={handlePlaceBid} className="btn-drawn flex-1 justify-center text-xs" style={{ padding: '7px 8px' }}>
              Place bid
            </button>
            <button onClick={handleViewDish} className="btn-drawn-outline flex-1 justify-center text-xs" style={{ padding: '7px 8px' }}>
              View dish
            </button>
          </div>
        </div>
      </motion.article>

      {localBidOpen && <BidModal dish={dishForModal} onClose={() => setLocalBidOpen(false)} />}
      {localViewOpen && (
        <DishModal 
          dish={dishForModal} 
          onClose={() => setLocalViewOpen(false)} 
          onBid={() => { setLocalViewOpen(false); setLocalBidOpen(true); }} 
        />
      )}
    </>
  );
}
