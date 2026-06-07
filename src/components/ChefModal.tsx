import { useTaste } from '@/lib/taste';
import { DISHES } from './DishCard';

export function ChefModal({ chefName, onClose, onOpenDish }: { 
  chefName: string; 
  onClose: () => void;
  onOpenDish: (d: any) => void;
}) {
  const { addToCollection } = useTaste();
  const chefDishes = DISHES.filter(d => d.chef === chefName || chefName.includes(d.chef.split(' ')[0]));

  return (
    <div className="taste-modal" onClick={onClose}>
      <div className="taste-modal-inner" onClick={e => e.stopPropagation()}>
        <div className="taste-modal-header">
          <div className="title">{chefName}'s Kitchen</div>
          <button onClick={onClose} className="text-2xl">×</button>
        </div>

        <div className="taste-modal-body">
          <div className="text-sm text-muted-foreground mb-4">Peer-reviewed. On-chain provenance since 2024.</div>

          {chefDishes.length > 0 ? (
            <div className="space-y-3">
              {chefDishes.slice(0, 5).map(d => (
                <div key={d.id} className="flex gap-4 border border-border p-3 items-center cursor-pointer hover:bg-surface-2" onClick={() => { onOpenDish(d); onClose(); }}>
                  <img src={d.img} className="w-16 h-16 object-cover flex-shrink-0 border border-border" alt="" />
                  <div className="min-w-0 flex-1">
                    <div className="font-serif">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.origin} • ed. {d.edition}</div>
                  </div>
                  <div className="text-right text-xs font-mono">
                    {d.bid} USDT<br />
                    <span className="text-[10px] opacity-60">top bid</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-sm">This chef has dishes in the archive. Explore the full menu.</div>
          )}
        </div>

        <div className="taste-modal-footer">
          <button onClick={() => { addToCollection(chefDishes[0]?.id); onClose(); }} className="btn-drawn-outline flex-1">Follow this kitchen</button>
          <button onClick={onClose} className="btn-drawn flex-1">Close</button>
        </div>
      </div>
    </div>
  );
}
