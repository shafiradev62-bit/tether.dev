import { motion } from "framer-motion";
import { DISHES } from "./DishCard";

const COLLECTIONS = [
  { title: "Ramen Atlas", chef: "Kenji Watanabe", items: [0, 7, 13], floor: "742", accent: "var(--primary)" },
  { title: "Mediterránea", chef: "Carlos Mendoza", items: [8, 12, 4], floor: "458", accent: "var(--leaf)" },
  { title: "Spice Route", chef: "Anaya Iyer", items: [6, 10, 3], floor: "611", accent: "var(--spice)" },
];

/* Slightly different collection card shapes */
const COLL_SHAPES = [
  "6px 18px 8px 14px / 14px 6px 18px 8px",
  "14px 6px 18px 8px / 8px 14px 6px 18px",
  "10px 14px 6px 18px / 18px 8px 14px 6px",
];

export function PopularCollections() {
  return (
    <section className="border-b border-border" style={{ background: "var(--surface)" }}>
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight leading-tight">
            Popular collections
          </h2>
          <a href="#all" className="link-rough">Explore all →</a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {COLLECTIONS.map((c, ci) => (
            <motion.div
              key={c.title}
              initial={false} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.45, delay: ci * 0.09 }}
              className="card-recipe p-4"
              style={{ borderRadius: COLL_SHAPES[ci] }}
            >
              {/* Mosaic image grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="aspect-[4/5] overflow-hidden rounded-lg">
                  <img
                    src={DISHES[c.items[0]].img} alt={DISHES[c.items[0]].name}
                    loading="lazy" width={640} height={640}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-rows-2 gap-3">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={DISHES[c.items[1]].img} alt={DISHES[c.items[1]].name}
                      loading="lazy" width={640} height={640}
                      className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>
                  <div className="overflow-hidden relative rounded-lg">
                    <img
                      src={DISHES[c.items[2]].img} alt={DISHES[c.items[2]].name}
                      loading="lazy" width={640} height={640}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 grid place-items-center bg-background/65 font-serif italic text-xl">
                      +24
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif italic text-lg leading-tight">{c.title}</h3>
                  <p className="label-rough mt-1">Curated by {c.chef}</p>
                </div>
                <div className="text-right">
                  <div className="label-rough">Floor</div>
                  <div className="font-mono text-sm mt-0.5" style={{ color: c.accent }}>
                    {c.floor} USDT
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    n: "01", t: "Connect & verify",
    d: "Link your wallet on the Tether network. Chefs verify via partner restaurant proof.",
    icon: "wallet",
  },
  {
    n: "02", t: "Mint your signature",
    d: "Upload the recipe, plating photos and origin story. We seal it as an ERC-721 with redemption metadata.",
    icon: "spark",
  },
  {
    n: "03", t: "List the dish",
    d: "Choose auction or fixed price. Royalties stream back to the kitchen on every resale.",
    icon: "list",
  },
  {
    n: "04", t: "Serve & redeem",
    d: "Collectors redeem the NFT for a tasting at the chef's restaurant — or hold it forever.",
    icon: "plate",
  },
];

/* Hand-sketched icon paths — imperfect lines */
function StepIcon({ name }: { name: string }) {
  const c = "var(--primary)";
  if (name === "wallet") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 8.5c0-.5 0-1.5 1-2h12c1.2 0 2 .9 2 2v7c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8.5Z" stroke={c} strokeWidth="1.5"/>
      <path d="M16 8V6c0-1.1-1-2-2-2H5c-1 0-2 .8-2 1.8" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="17" cy="13.5" r="1.2" fill={c}/>
    </svg>
  );
  if (name === "spark") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 3 9 13h6l-4 8" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (name === "list") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h10M4 17h13" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 21h8M12 17v4M5 5h14l-2 7a5 5 0 0 1-10 0L5 5Z" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const STEP_SHAPES = [
  "6px 14px 8px 12px / 12px 8px 14px 6px",
  "12px 6px 14px 8px / 8px 12px 6px 14px",
  "8px 12px 6px 14px / 14px 6px 12px 8px",
  "14px 8px 12px 6px / 6px 14px 8px 12px",
];

export function HowItWorks() {
  return (
    <section id="mint" className="border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <div className="chip mb-4">For chefs</div>
            <h2 className="font-serif italic text-4xl md:text-5xl tracking-tight leading-tight">
              Mint your kitchen's{" "}
              <span className="text-gradient">provenance.</span>
            </h2>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Four steps from prep to ledger. No gas tokens, no Discord ritual —
              just your recipe, signed and settled in USDT.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={false} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}
                className="card-recipe p-5 rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-10 h-10 grid place-items-center rounded-full"
                    style={{
                      background: "var(--primary)",
                    }}
                  >
                    <StepIcon name={s.icon} />
                  </div>
                  <span className="label-rough">{s.n}</span>
                </div>
                <h3 className="font-serif italic text-[1.15rem] mb-1.5">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TetherStrip() {
  return (
    <section className="border-b border-border">
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 bg-primary/10 grid place-items-center rounded-lg border border-primary/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M9 7v13M15 7v13" stroke="var(--primary)" strokeWidth="1.9" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="label-rough mb-0.5 text-primary">Settlement</div>
            <div className="font-serif italic text-xl leading-snug text-foreground">
              Every bite, settled in USDT on Tether.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5 label-rough">
          <span>· Gasless minting</span>
          <span>· 0.5% royalty floor</span>
          <span>· tether.dev verified</span>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ background: "var(--background)" }}>
      <div className="max-w-[1280px] mx-auto px-6 py-16 grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
        <div>
          <div className="font-serif italic text-[1.4rem] mb-3 text-foreground">
            taste<span className="text-gradient">.nft</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            A marketplace for the world's flavors. Built by cooks, for collectors.
            Settled on the Tether network.
          </p>
        </div>

        {[
          { h: "Marketplace", l: ["Discover", "Auctions", "Collections", "Activity"] },
          { h: "For chefs", l: ["Apply", "Mint guide", "Royalties", "Press kit"] },
          { h: "Stay seasoned", l: [] },
        ].map((col) => (
          <div key={col.h}>
            <div className="label-rough mb-4">{col.h}</div>
            {col.h === "Stay seasoned" ? (
              <form
                className="flex border border-border p-1 rounded-lg"
              >
                <input
                  type="email"
                  placeholder="your@kitchen.email"
                  className="flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  className="btn-drawn"
                  style={{ padding: "0.4rem 0.9rem", fontSize: "0.78rem" }}
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <ul className="space-y-2 text-sm">
                {col.l.map((i) => (
                  <li key={i}>
                    <a className="text-muted-foreground hover:text-foreground transition-colors" href="#">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="divider-ink mx-6" />
      <div className="max-w-[1280px] mx-auto px-6 py-5 flex flex-wrap justify-between gap-4 label-rough">
        <span>© 2026 taste.nft — every dish, on-chain.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Contract</a>
        </div>
      </div>
    </footer>
  );
}
