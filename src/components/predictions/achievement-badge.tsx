'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, Target, Star } from 'lucide-react';
import type { Achievement } from '@/lib/supabase/types';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked?: boolean;
  unlockedAt?: string;
}

const rarityColors = {
  common: 'text-gray-400 border-gray-400/30',
  rare: 'text-blue-400 border-blue-400/30',
  epic: 'text-purple-400 border-purple-400/30',
  legendary: 'text-yellow-400 border-yellow-400/30',
};

const rarityGlows = {
  common: '',
  rare: 'glow-blue-soft',
  epic: 'shadow-lg shadow-purple-500/20',
  legendary: 'glow-green',
};

const iconMap = {
  predictions_count: Trophy,
  accuracy: Target,
  streak: Zap,
  category_expert: Star,
  reputation: Trophy,
};

export function AchievementBadge({ achievement, unlocked = false, unlockedAt }: AchievementBadgeProps) {
  const Icon = iconMap[achievement.requirement_type] || Trophy;

  return (
    <Card
      className={`
        relative p-4 border-2 transition-all duration-300
        ${unlocked ? rarityColors[achievement.rarity] : 'opacity-40 grayscale'}
        ${unlocked ? rarityGlows[achievement.rarity] : ''}
        ${unlocked ? 'hover:scale-105 cursor-pointer' : ''}
      `}
    >
      {/* Rarity Badge */}
      <div className="absolute top-2 right-2">
        <Badge
          variant="outline"
          className={`text-xs uppercase ${rarityColors[achievement.rarity]}`}
        >
          {achievement.rarity}
        </Badge>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-3">
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center
            ${unlocked ? 'bg-card' : 'bg-muted'}
            border-2 ${rarityColors[achievement.rarity]}
          `}
          style={{ backgroundColor: unlocked ? achievement.badge_color : undefined }}
        >
          <Icon className="h-8 w-8" />
        </div>
      </div>

      {/* Name */}
      <h4 className="text-center font-bold text-sm mb-2 font-space-grotesk">
        {achievement.name}
      </h4>

      {/* Description */}
      <p className="text-center text-xs text-muted-foreground line-clamp-2">
        {achievement.description}
      </p>

      {/* Unlock Date */}
      {unlocked && unlockedAt && (
        <p className="text-center text-xs text-muted-foreground mt-2">
          Unlocked {new Date(unlockedAt).toLocaleDateString()}
        </p>
      )}

      {/* Locked Overlay */}
      {!unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
          <div className="text-center">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-xs text-muted-foreground">Locked</p>
          </div>
        </div>
      )}
    </Card>
  );
}
