import { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { useTaste } from "@/lib/taste";

const NAV = ["Discover", "Auctions", "Chefs", "Cuisines", "About"];

export function Navbar() {
  const { isConnected, address, usdtBalance, owned, connectWallet, disconnectWallet } = useTaste();
  const [showCollection, setShowCollection] = useState(false);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-border"
        style={{ background: "var(--background)" }}
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
                <span className="absolute -bottom-0.5 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-primary" />
                {i === 0 && (
                  <span className="absolute -top-2 -right-3 text-[9px] font-mono px-1 py-0.5 leading-none bg-primary text-primary-foreground">
                    new
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {!isConnected ? (
              <>
                <button
                  onClick={connectWallet}
                  className="btn-drawn-outline hidden sm:inline-flex"
                  style={{ padding: "8px 15px", fontSize: "0.78rem" }}
                >
                  Sign in
                </button>
                <button
                  onClick={connectWallet}
                  className="btn-drawn"
                  style={{ padding: "8px 16px", fontSize: "0.78rem" }}
                >
                  Connect wallet
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowCollection(true)}
                className="btn-drawn-outline flex items-center gap-2 text-xs"
                style={{ padding: "6px 11px" }}
              >
                <span className="font-mono">{address}</span>
                <span className="text-[10px] px-1.5 py-px border border-current/40">
                  {usdtBalance} USDT
                </span>
                <span className="text-[10px] opacity-60">· {owned.length} dishes</span>
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* My Collection / Tastings Ledger */}
      {showCollection && isConnected && (
        <div className="taste-modal" onClick={() => setShowCollection(false)}>
          <div className="taste-modal-inner collection-page" onClick={e => e.stopPropagation()}>
            <div className="taste-modal-header">
              <div>
                <div className="title">My Tastings</div>
                <div className="text-[10px] text-muted-foreground font-mono tracking-[1.5px] mt-0.5">LEDGER • TETHER SETTLED</div>
              </div>
              <button onClick={() => setShowCollection(false)} className="text-xl leading-none px-2">×</button>
            </div>

            <div className="taste-modal-body">
              {owned.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">No dishes yet. Mint or win an auction.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {owned.map((id, idx) => (
                    <div key={idx} className="border border-border p-3 text-sm flex gap-3">
                      <div className="w-16 h-16 bg-muted flex-shrink-0" style={{ background: 'repeating-linear-gradient(45deg,#ddd,#ddd 2px,#f1e9dc 2px,#f1e9dc 5px)' }} />
                      <div className="min-w-0">
                        <div className="font-serif">Dish #{id}</div>
                        <div className="text-xs text-muted-foreground">Settled on Tether • Redemption ready</div>
                        <div className="mt-2">
                          <span className="stamp text-[9px]">OWNED</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 text-[11px] text-muted-foreground">These NFTs live on the Tether network. Present the token at the chef's kitchen for the real meal.</div>
            </div>

            <div className="taste-modal-footer">
              <button onClick={disconnectWallet} className="btn-drawn-outline flex-1">Disconnect</button>
              <button onClick={() => setShowCollection(false)} className="btn-drawn flex-1">Close ledger</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
