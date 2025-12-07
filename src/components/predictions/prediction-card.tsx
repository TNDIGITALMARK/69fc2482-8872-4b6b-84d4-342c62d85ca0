'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, TrendingUp, Users } from 'lucide-react';
import type { Prediction } from '@/lib/supabase/types';
import { format, formatDistanceToNow } from 'date-fns';

interface PredictionCardProps {
  prediction: Prediction;
  onVote?: (choice: 'yes' | 'no') => void;
}

export function PredictionCard({ prediction, onVote }: PredictionCardProps) {
  const timeRemaining = formatDistanceToNow(new Date(prediction.closes_at), { addSuffix: true });
  const isActive = prediction.status === 'active';

  return (
    <Card className="gradient-card border-border/50 glass p-6 hover:shadow-lg hover:glow-blue-soft transition-all duration-300 animate-slide-up">
      {/* Category Badge */}
      <div className="flex items-start justify-between mb-4">
        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 font-space-grotesk">
          {prediction.category}
        </Badge>
        {prediction.status === 'resolved' && (
          <Badge
            variant={prediction.resolution === 'yes' ? 'default' : 'destructive'}
            className="font-medium"
          >
            {prediction.resolution?.toUpperCase()}
          </Badge>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-3 font-space-grotesk leading-tight">
        {prediction.title}
      </h3>

      {/* Description */}
      {prediction.description && (
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {prediction.description}
        </p>
      )}

      {/* Odds Display */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">YES</span>
          <span className="text-lg font-bold text-accent">{prediction.odds_yes.toFixed(0)}%</span>
        </div>
        <Progress value={prediction.odds_yes} className="h-2" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">NO</span>
          <span className="text-lg font-bold text-destructive">{prediction.odds_no.toFixed(0)}%</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{prediction.participant_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          <span>{prediction.total_volume} pts</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{timeRemaining}</span>
        </div>
      </div>

      {/* Action Buttons */}
      {isActive && onVote && (
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onVote('yes')}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            Bet YES
          </Button>
          <Button
            onClick={() => onVote('no')}
            variant="destructive"
            className="font-semibold"
          >
            Bet NO
          </Button>
        </div>
      )}

      {/* Tags */}
      {prediction.tags && prediction.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {prediction.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}
