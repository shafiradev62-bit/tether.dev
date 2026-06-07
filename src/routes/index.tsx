import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LiveAuctions, TopChefs, TodaysPicks } from "@/components/Sections";
import { PopularCollections, HowItWorks, TetherStrip, Footer } from "@/components/MoreSections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TASTE.NFT — Collect the world's flavors, on-chain" },
      { name: "description", content: "Marketplace for culinary NFTs from chefs around the world. Mint, collect, and trade signature dishes. Settled in USDT on the Tether network." },
      { property: "og:title", content: "TASTE.NFT — Collect the world's flavors" },
      { property: "og:description", content: "Marketplace for culinary NFTs from chefs around the world." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LiveAuctions />
      <TopChefs />
      <TodaysPicks />
      <PopularCollections />
      <HowItWorks />
      <TetherStrip />
      <Footer />
    </main>
  );
}
