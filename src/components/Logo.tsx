import { motion } from "framer-motion";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Clean geometric bowl icon */}
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        {/* Bowl rim */}
        <circle cx="20" cy="20" r="14" stroke="var(--primary)" strokeWidth="2" />
        {/* Bowl detail */}
        <path d="M10 20 H30" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
        {/* Steam */}
        <path d="M16 12 V8M20 10 V6M24 12 V8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <span className="font-serif text-[1.25rem] tracking-tight leading-none text-foreground">
        taste<span className="text-gradient italic font-bold">.nft</span>
      </span>
    </div>
  );
}
