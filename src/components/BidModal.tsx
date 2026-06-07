import { useState } from 'react';
import { useTaste, type Dish } from '@/lib/taste';

export function BidModal({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  const { placeBid, getCurrentBid } = useTaste();
  const current = getCurrentBid(dish.id);
  const [amount, setAmount] = useState(current + 35);

  const handleBid = () => {
    placeBid(dish.id, amount);
    onClose();
  };

  return (
    <div className="taste-modal" onClick={onClose}>
      <div className="taste-modal-inner" onClick={e => e.stopPropagation()}>
        <div className="taste-modal-header">
          <div className="title">Place bid • {dish.name}</div>
          <button onClick={onClose} className="text-2xl leading-none">×</button>
        </div>

        <div className="taste-modal-body space-y-5">
          <div>
            <div className="label-rough mb-1">Current top bid</div>
            <div className="font-mono text-3xl">{current} <span className="text-sm text-muted-foreground">USDT</span></div>
          </div>

          <div>
            <div className="label-rough mb-2">Your bid (USDT on Tether)</div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(parseInt(e.target.value) || current + 10)}
                className="flex-1 text-2xl font-mono"
                min={current + 5}
                step="5"
              />
              <div className="text-xs text-muted-foreground max-w-[110px]">Must beat current by at least 5 USDT</div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground border-l-2 border-primary pl-3">
            Bids settle instantly in USDT. If you win, the chef sends a physical redemption token + the NFT.
          </div>
        </div>

        <div className="taste-modal-footer">
          <button onClick={onClose} className="btn-drawn-outline flex-1">Cancel</button>
          <button onClick={handleBid} className="btn-drawn flex-1">PLACE BID — {amount} USDT</button>
        </div>
      </div>
    </div>
  );
}
