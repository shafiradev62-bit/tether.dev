import { motion } from "framer-motion";
import { Logo } from "./Logo";

const NAV = ["Discover", "Auctions", "Chefs", "Cuisines", "About"];

export function Navbar() {
  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {NAV.map((n, i) => (
            <a
              key={n}
              href={`#${n.toLowerCase()}`}
              className="hover:text-foreground transition-colors relative group"
            >
              {n}
              {/* Clean underline on hover */}
              <span
                className="absolute -bottom-0.5 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-primary"
              />
              {/* New badge on first nav item */}
              {i === 0 && (
                <span
                  className="absolute -top-2 -right-3 text-[9px] font-mono px-1 py-0.5 leading-none bg-primary text-primary-foreground rounded"
                >
                  new
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="btn-drawn-outline hidden sm:inline-flex"
            style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}
          >
            Sign in
          </button>
          <button
            className="btn-drawn"
            style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }}
          >
            Connect wallet
          </button>
        </div>
      </div>
    </motion.header>
  );
}
