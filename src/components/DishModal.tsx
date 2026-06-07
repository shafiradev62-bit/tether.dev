import { useTaste, type Dish } from '@/lib/taste';

export function DishModal({ dish, onClose, onBid }: { 
  dish: Dish; 
  onClose: () => void; 
  onBid: () => void;
}) {
  const { buyNow, getCurrentBid, addToCollection, isConnected } = useTaste();
  const current = getCurrentBid(dish.id);

  return (
    <div className="taste-modal" onClick={onClose}>
      <div className="taste-modal-inner wide" onClick={e => e.stopPropagation()}>
        <div className="taste-modal-header">
          <div>
            <span className="stamp mr-2">{dish.rarity.toUpperCase()}</span>
            <span className="title">{dish.name}</span>
          </div>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>

        <div className="grid md:grid-cols-5 gap-0">
          {/* Image side */}
          <div className="md:col-span-3 relative">
            <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" style={{ minHeight: 340 }} />
            <div className="absolute bottom-4 left-4 bg-background/90 px-3 py-1 text-sm font-mono border border-border">
              {dish.flag} {dish.origin} • ed. {dish.edition}
            </div>
          </div>

          {/* Info + actions */}
          <div className="md:col-span-2 p-6 flex flex-col">
            <div>
              <div className="text-sm text-muted-foreground">BY</div>
              <div className="font-serif text-xl">{dish.chef}</div>
            </div>

            <div className="my-6">
              <div className="label-rough">CURRENT AUCTION</div>
              <div className="font-mono text-4xl mt-1">{current} <span className="text-base align-super text-muted-foreground">USDT</span></div>
              <div className="text-xs mt-1 text-muted-foreground">Settled on the Tether network • Instant finality</div>
            </div>

            <div className="mt-auto space-y-2.5">
              <button onClick={onBid} className="btn-drawn w-full justify-center">PLACE BID</button>
              <button 
                onClick={() => buyNow(dish)} 
                className="btn-drawn-outline w-full justify-center"
              >
                BUY NOW FOR ~{Math.floor(current * 0.92)} USDT
              </button>
              <button 
                onClick={() => { addToCollection(dish.id); onClose(); }} 
                className="w-full py-2 text-xs uppercase tracking-widest hover:underline"
              >
                Add to watch list
              </button>
            </div>

            <div className="mt-7 text-[11px] text-muted-foreground leading-snug">
              Winning bidder receives the 1/1 or edition NFT + a signed physical card from the chef. Redeem at the restaurant for the plated dish (or keep forever).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
