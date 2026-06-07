import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type Dish = {
  id: string;
  name: string;
  origin: string;
  flag: string;
  img: string;
  chef: string;
  bid: number; // current top bid as number for math
  edition: string;
  rarity: 'common' | 'rare' | 'epic' | 'signature';
};

type BidMap = Record<string, number>;

interface TasteContextType {
  isConnected: boolean;
  address: string | null;
  usdtBalance: number;
  owned: string[]; // dish ids user owns
  bids: BidMap; // live top bids
  connectWallet: () => void;
  disconnectWallet: () => void;
  placeBid: (dishId: string, amount: number) => void;
  buyNow: (dish: Dish) => void;
  mintDish: (dish: Partial<Dish> & { name: string; origin: string; chef: string }) => void;
  addToCollection: (dishId: string) => void;
  getCurrentBid: (id: string) => number;
}

const TasteContext = createContext<TasteContextType | null>(null);

const FAKE_ADDRESSES = [
  '0x7a3f...c9e1',
  '0x4b2d...f18a',
  '0x9e81...22d4',
];

const INITIAL_BIDS: BidMap = {
  '001': 2418, '002': 1820, '003': 740, '004': 612, '005': 395,
  '006': 880, '007': 1150, '008': 520, '009': 1640, '010': 680,
  '011': 910, '012': 445, '013': 320, '014': 510, '015': 1280,
};

export function TasteProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [usdtBalance, setUsdtBalance] = useState(1240);
  const [owned, setOwned] = useState<string[]>(['003', '007']); // start with a couple "owned"
  const [bids, setBids] = useState<BidMap>(INITIAL_BIDS);

  // Simulate very light live bidding on a few popular dishes
  useEffect(() => {
    const interval = setInterval(() => {
      setBids(prev => {
        const next = { ...prev };
        // Randomly bump 2-3 dishes a little (feels alive)
        const candidates = ['001', '002', '009', '015'];
        candidates.forEach(id => {
          if (Math.random() < 0.28) {
            const bump = Math.floor(Math.random() * 18) + 8;
            next[id] = (next[id] || 400) + bump;
          }
        });
        return next;
      });
    }, 14500);
    return () => clearInterval(interval);
  }, []);

  const connectWallet = () => {
    const fake = FAKE_ADDRESSES[Math.floor(Math.random() * FAKE_ADDRESSES.length)];
    setAddress(fake);
    setIsConnected(true);
    setUsdtBalance(1240 + Math.floor(Math.random() * 380));
    toast.success('Wallet connected', {
      description: `${fake} • ${usdtBalance + 200} USDT on Tether`,
      duration: 2200,
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress(null);
    toast.info('Wallet disconnected');
  };

  const getCurrentBid = (id: string) => bids[id] ?? 400;

  const placeBid = (dishId: string, amount: number) => {
    const current = getCurrentBid(dishId);
    if (amount <= current) {
      toast.error('Bid too low', { description: `Current top is ${current} USDT` });
      return;
    }
    if (!isConnected) {
      toast('Connect wallet first', { description: 'You need to connect to bid on-chain' });
      connectWallet();
      return;
    }
    if (amount > usdtBalance + 50) {
      toast.error('Not enough USDT', { description: 'Top up your Tether balance' });
      return;
    }

    setBids(prev => ({ ...prev, [dishId]: amount }));
    // small balance deduction for realism (gasless but still "settled")
    setUsdtBalance(b => Math.max(80, Math.floor(b - (amount * 0.012))));

    toast.success('Bid placed', {
      description: `You are now highest bidder at ${amount} USDT. Chef will be notified.`,
    });

    // 12% chance a competing bid appears shortly after
    if (Math.random() < 0.12) {
      setTimeout(() => {
        setBids(prev => {
          const bump = Math.floor(Math.random() * 29) + 22;
          return { ...prev, [dishId]: (prev[dishId] || amount) + bump };
        });
        toast('Someone just bid higher', { description: 'The kitchen is heating up' });
      }, 6200);
    }
  };

  const buyNow = (dish: Dish) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    const price = Math.floor(getCurrentBid(dish.id) * 0.92);
    if (price > usdtBalance) {
      toast.error('Insufficient balance');
      return;
    }
    setUsdtBalance(b => b - price);
    if (!owned.includes(dish.id)) {
      setOwned(prev => [...prev, dish.id]);
    }
    toast.success(`Bought ${dish.name}`, {
      description: `${price} USDT settled on Tether • Redemption pass in your collection`,
    });
  };

  const mintDish = (partial: Partial<Dish> & { name: string; origin: string; chef: string }) => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    const cost = 185; // "gasless" but we charge a small USDT fee for the ritual
    if (cost > usdtBalance) {
      toast.error('Need more USDT to mint');
      return;
    }

    const newId = (100 + Math.floor(Math.random() * 880)).toString().padStart(3, '0');
    const newDishId = newId;

    setUsdtBalance(b => b - cost);
    setOwned(prev => [...prev, newDishId]);

    // also seed a starting bid
    setBids(prev => ({ ...prev, [newDishId]: 185 }));

    toast.success(`Minted #${newDishId}`, {
      description: `${partial.name} • ${partial.origin} • ${cost} USDT paid to the ledger`,
      duration: 3800,
    });
  };

  const addToCollection = (dishId: string) => {
    if (!owned.includes(dishId)) {
      setOwned(prev => [...prev, dishId]);
      toast('Added to your tastings');
    }
  };

  const value: TasteContextType = {
    isConnected,
    address,
    usdtBalance,
    owned,
    bids,
    connectWallet,
    disconnectWallet,
    placeBid,
    buyNow,
    mintDish,
    addToCollection,
    getCurrentBid,
  };

  return <TasteContext.Provider value={value}>{children}</TasteContext.Provider>;
}

export function useTaste() {
  const ctx = useContext(TasteContext);
  if (!ctx) {
    throw new Error('useTaste must be used inside TasteProvider');
  }
  return ctx;
}
