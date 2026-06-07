import { useState } from 'react';
import { useTaste } from '@/lib/taste';

const CHEF_OPTIONS = [
  'Kenji Watanabe', 'Giulia Romano', 'Diego Hernández', 'Anaya Iyer',
  'Lucien Marchand', 'Rama Pradipta', 'Min-ji Park'
];

export function MintModal({ onClose }: { onClose: () => void }) {
  const { mintDish, isConnected } = useTaste();
  const [name, setName] = useState('My Signature Dish');
  const [origin, setOrigin] = useState('Bandung, ID');
  const [chef, setChef] = useState(CHEF_OPTIONS[0]);
  const [loading, setLoading] = useState(false);

  const handleMint = () => {
    setLoading(true);
    // fake on-chain delay
    setTimeout(() => {
      mintDish({ name, origin, chef });
      setLoading(false);
      onClose();
    }, 680);
  };

  return (
    <div className="taste-modal" onClick={onClose}>
      <div className="taste-modal-inner" onClick={e => e.stopPropagation()}>
        <div className="taste-modal-header">
          <div className="title">Mint a new dish on Tether</div>
          <button onClick={onClose} className="text-2xl leading-none">×</button>
        </div>

        <div className="taste-modal-body space-y-5 text-sm">
          <div>
            <div className="label-rough mb-1.5">DISH NAME</div>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="label-rough mb-1.5">ORIGIN / KITCHEN</div>
              <input value={origin} onChange={e => setOrigin(e.target.value)} className="w-full" />
            </div>
            <div>
              <div className="label-rough mb-1.5">CHEF</div>
              <select value={chef} onChange={e => setChef(e.target.value)} className="w-full border-2 border-ink bg-background p-2">
                {CHEF_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-border text-xs text-muted-foreground">
            Cost: <span className="font-mono text-foreground">185 USDT</span> (settled on Tether, gas sponsored by the collective).<br />
            You receive the NFT + a physical stamped recipe card mailed from the chef.
          </div>
        </div>

        <div className="taste-modal-footer">
          <button onClick={onClose} className="btn-drawn-outline flex-1">Cancel</button>
          <button 
            onClick={handleMint} 
            disabled={loading || !name} 
            className="btn-drawn flex-1 disabled:opacity-60"
          >
            {loading ? 'SIGNING ON LEDGER...' : 'MINT • PAY 185 USDT'}
          </button>
        </div>
      </div>
    </div>
  );
}
