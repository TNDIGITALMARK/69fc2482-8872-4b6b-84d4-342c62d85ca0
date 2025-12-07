export interface UserProfile {
  id: string;
  tenantid: string;
  projectid: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  prediction_accuracy: number;
  total_predictions: number;
  correct_predictions: number;
  reputation_points: number;
  level: number;
  expertise_domains: string[];
  created_at: string;
  updated_at: string;
}

export interface Prediction {
  id: string;
  tenantid: string;
  projectid: string;
  title: string;
  description: string | null;
  category: string;
  odds_yes: number;
  odds_no: number;
  participant_count: number;
  total_volume: number;
  status: 'active' | 'pending' | 'resolved' | 'cancelled';
  resolution: 'yes' | 'no' | 'cancelled' | null;
  closes_at: string;
  resolved_at: string | null;
  tags: string[];
  image_url: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserPrediction {
  id: string;
  tenantid: string;
  projectid: string;
  user_id: string;
  prediction_id: string;
  choice: 'yes' | 'no';
  confidence: number;
  stake_amount: number;
  is_correct: boolean | null;
  points_earned: number | null;
  created_at: string;
}

export interface Achievement {
  id: string;
  tenantid: string;
  projectid: string;
  name: string;
  description: string;
  badge_icon: string;
  badge_color: string;
  requirement_type: 'predictions_count' | 'accuracy' | 'streak' | 'category_expert' | 'reputation';
  requirement_value: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  created_at: string;
}

export interface UserAchievement {
  id: string;
  tenantid: string;
  projectid: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
}
