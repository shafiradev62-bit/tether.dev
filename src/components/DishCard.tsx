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

export function DishCard({ d, index = 0 }: { d: Dish; index?: number }) {
  const rarity = RARITY_STYLE[d.rarity];

  const handlePlaceBid = () => {
    alert(`Place bid for ${d.name} - ${d.bid} USDT`);
  };

  const handleViewDish = () => {
    alert(`Viewing ${d.name} from ${d.origin}`);
  };

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
      className="card-recipe group relative overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={d.img}
          alt={`${d.name} from ${d.origin} — culinary NFT`}
          loading="lazy" width={640} height={640}
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
        />

        {/* Rarity dot + label — top left, like a hand stamp */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className="label-rough px-2 py-0.5"
            style={{
              background: "var(--background)",
              opacity: 0.9,
              borderRadius: "4px",
              border: `1px solid ${rarity.dot}44`,
              color: rarity.dot,
            }}
          >
            {rarity.label}
          </span>
        </div>

        {/* Edition — top right */}
        <div
          className="absolute top-3 right-3 font-mono text-[11px] px-2 py-0.5"
          style={{
            background: "var(--background)",
            opacity: 0.85,
            borderRadius: "6px 4px 8px 4px",
          }}
        >
          #{d.id}
        </div>

        {/* Origin + edition — bottom overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span
            className="text-[11px] px-2 py-0.5"
            style={{ background: "var(--background)", opacity: 0.85, borderRadius: "4px 8px 4px 6px" }}
          >
            <span className="mr-1">{d.flag}</span>{d.origin}
          </span>
          <span
            className="text-[11px] font-mono px-2 py-0.5"
            style={{ background: "var(--background)", opacity: 0.85, borderRadius: "6px 4px 8px 4px" }}
          >
            ed. {d.edition}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-serif text-[1.08rem] italic leading-snug">{d.name}</h3>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={d.chefImg} alt={d.chef} loading="lazy" width={64} height={64}
              className="w-6 h-6 object-cover border border-border flex-shrink-0"
              style={{ borderRadius: "50% 40% 50% 40%" }}
            />
            <span className="text-xs text-muted-foreground truncate">{d.chef}</span>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="label-rough">top bid</div>
            <div className="font-mono text-[0.82rem] mt-0.5">{d.bid} <span className="text-muted-foreground">USDT</span></div>
          </div>
        </div>

        {/* Action buttons — hand-drawn style */}
        <div className="mt-3.5 flex gap-2">
          <button
            className="btn-drawn flex-1 justify-center"
            style={{ padding: "0.45rem 0.5rem", fontSize: "0.78rem" }}
            onClick={handlePlaceBid}
          >
            Place bid
          </button>
          <button
            className="btn-drawn-outline flex-1 justify-center"
            style={{ padding: "0.45rem 0.5rem", fontSize: "0.78rem" }}
            onClick={handleViewDish}
          >
            View dish
          </button>
        </div>
      </div>
    </motion.article>
  );
}
