'use client';

import { Clock } from 'lucide-react';
import type { Prediction } from '@/lib/supabase/types';
import { formatDistanceToNow } from 'date-fns';

interface MarketCardProps {
  prediction: Prediction;
}

export function MarketCard({ prediction }: MarketCardProps) {
  const yesPercent = prediction.odds_yes || 50;
  const noPercent = prediction.odds_no || 50;

  // Determine if this is a "hot" market (high volume or participants)
  const isHot = (prediction.participant_count > 5000) || (prediction.total_volume && prediction.total_volume > 100000);

  // Format the timeframe
  const timeframe = formatDistanceToNow(new Date(prediction.closes_at), { addSuffix: false });

  // Get category icon/emoji
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'Crypto': '₿',
      'Technology': '💻',
      'Tech': '💻',
      'Sports': '⚽',
      'Entertainment': '🎬',
      'Politics': '🏛️',
      'Science': '🔬',
      'Finance': '💰',
    };
    return icons[category] || '📊';
  };

  return (
    <div className="glass rounded-2xl p-4 border border-border/50 hover:border-primary/50 transition-all cursor-pointer relative overflow-hidden group">
      {/* Category Badge & Time */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-secondary/50 text-xs font-medium flex items-center gap-1.5">
            <span>{getCategoryIcon(prediction.category)}</span>
            <span className="uppercase tracking-wide">{prediction.category}</span>
          </div>
          {isHot && (
            <div className="px-2.5 py-1 rounded-full bg-accent text-white text-xs font-bold">
              🔥 HOT
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeframe}</span>
        </div>
      </div>

      {/* Question */}
      <h3 className="text-base font-semibold mb-4 line-clamp-2 leading-snug">
        {prediction.title}
      </h3>

      {/* Prediction Bars */}
      <div className="space-y-3 mb-4">
        {/* Yes Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Yes</span>
            <span className="font-bold text-success">{yesPercent.toFixed(0)}%</span>
          </div>
          <div className="relative h-2 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-success rounded-full transition-all duration-500"
              style={{ width: `${yesPercent}%` }}
            />
          </div>
        </div>

        {/* No Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">No</span>
            <span className="font-bold text-destructive">{noPercent.toFixed(0)}%</span>
          </div>
          <div className="relative h-2 bg-secondary/30 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-destructive rounded-full transition-all duration-500"
              style={{ width: `${noPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30">
        <div className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>${((prediction.total_volume || 0) / 1000).toFixed(1)}K</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-primary">⚡</span>
          <span>Up to 10x</span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl" />
      </div>
    </div>
  );
}
