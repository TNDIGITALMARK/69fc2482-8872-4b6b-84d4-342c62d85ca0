'use client';

import { X, Grid3x3, TrendingUp, Trophy, Wallet } from 'lucide-react';
import { useEffect } from 'react';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-[280px] bg-card border-l border-border z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-bold font-heading">Menu</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              <MenuItem icon={Grid3x3} label="Markets" onClick={onClose} />
              <MenuItem icon={TrendingUp} label="Portfolio" onClick={onClose} />
              <MenuItem icon={Trophy} label="Leaderboard" onClick={onClose} />
            </div>
          </nav>

          {/* Balance Display */}
          <div className="p-4 border-t border-border">
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-heading">$7,500</div>
                  <div className="text-xs text-muted-foreground">Available Balance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface MenuItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}

function MenuItem({ icon: Icon, label, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/50 transition-colors text-left"
    >
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
