import { supabase, TENANT_ID, PROJECT_ID } from './client';
import type { Prediction, UserProfile, Achievement, UserPrediction } from './types';

// ===================================
// PREDICTIONS
// ===================================

export async function getPredictions(options?: {
  status?: 'active' | 'pending' | 'resolved' | 'cancelled';
  category?: string;
  limit?: number;
}) {
  let query = supabase
    .from('predictions')
    .select('*')
    .order('participant_count', { ascending: false });

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as Prediction[];
}

export async function getPrediction(id: string) {
  const { data, error } = await supabase
    .from('predictions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Prediction;
}

export async function getTrendingPredictions(limit: number = 10) {
  const { data, error } = await supabase
    .from('predictions')
    .select('*')
    .eq('status', 'active')
    .order('participant_count', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Prediction[];
}

export async function createPrediction(prediction: {
  title: string;
  description?: string;
  category: string;
  closes_at: string;
  tags?: string[];
  image_url?: string;
  created_by?: string;
}) {
  const { data, error } = await supabase
    .from('predictions')
    .insert({
      tenantid: TENANT_ID,
      projectid: PROJECT_ID,
      ...prediction,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Prediction;
}

// ===================================
// USER PROFILES
// ===================================

export async function getUserProfile(id: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as UserProfile;
}

export async function getUserProfileByUsername(username: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) throw error;
  return data as UserProfile;
}

export async function createUserProfile(profile: {
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
}) {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      tenantid: TENANT_ID,
      projectid: PROJECT_ID,
      ...profile,
    })
    .select()
    .single();

  if (error) throw error;
  return data as UserProfile;
}

export async function getLeaderboard(limit: number = 20) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('reputation_points', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as UserProfile[];
}

// ===================================
// USER PREDICTIONS
// ===================================

export async function submitPrediction(userPrediction: {
  user_id: string;
  prediction_id: string;
  choice: 'yes' | 'no';
  confidence: number;
  stake_amount?: number;
}) {
  const { data, error } = await supabase
    .from('user_predictions')
    .insert({
      tenantid: TENANT_ID,
      projectid: PROJECT_ID,
      ...userPrediction,
    })
    .select()
    .single();

  if (error) throw error;
  return data as UserPrediction;
}

export async function getUserPredictions(userId: string) {
  const { data, error } = await supabase
    .from('user_predictions')
    .select(`
      *,
      prediction:predictions(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// ===================================
// ACHIEVEMENTS
// ===================================

export async function getAchievements() {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('rarity', { ascending: true });

  if (error) throw error;
  return data as Achievement[];
}

export async function getUserAchievements(userId: string) {
  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievements(*)
    `)
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createAchievement(achievement: {
  name: string;
  description: string;
  badge_icon: string;
  badge_color: string;
  requirement_type: 'predictions_count' | 'accuracy' | 'streak' | 'category_expert' | 'reputation';
  requirement_value: number;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}) {
  const { data, error } = await supabase
    .from('achievements')
    .insert({
      tenantid: TENANT_ID,
      projectid: PROJECT_ID,
      ...achievement,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Achievement;
}
