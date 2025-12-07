'use client';

import { useState, useEffect } from 'react';
import { StatCard } from '@/components/predictions/stat-card';
import { AchievementBadge } from '@/components/predictions/achievement-badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Zap, TrendingUp, ArrowLeft } from 'lucide-react';
import { getAchievements } from '@/lib/supabase/queries';
import type { Achievement } from '@/lib/supabase/types';
import Link from 'next/link';

// Mock user data
const mockUser = {
  id: '1',
  username: 'sarah_chen',
  display_name: 'Sarah Chen',
  avatar_url: null,
  bio: 'Technology predictions expert | Level 4 Forecaster | Crypto enthusiast',
  prediction_accuracy: 78,
  total_predictions: 156,
  correct_predictions: 122,
  reputation_points: 15847,
  level: 4,
  expertise_domains: ['Technology', 'Crypto', 'Finance'],
};

export default function ProfilePage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAchievements();
  }, []);

  async function loadAchievements() {
    try {
      const data = await getAchievements();
      setAchievements(data);
    } catch (error) {
      console.error('Failed to load achievements:', error);
    } finally {
      setLoading(false);
    }
  }

  const unlockedAchievements = achievements.slice(0, 3); // Mock: first 3 unlocked
  const levelProgress = (mockUser.reputation_points % 5000) / 50;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 glass-strong sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gradient font-space-grotesk">
                PredictStream
              </h1>
              <p className="text-sm text-muted-foreground">
                Next-Gen Prediction Markets
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8 glass border-border/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-32 w-32 border-4 border-primary">
                <AvatarImage src={mockUser.avatar_url || undefined} />
                <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                  {mockUser.display_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold font-space-grotesk">
                    {mockUser.display_name}
                  </h2>
                  <Badge className="bg-accent text-accent-foreground">
                    Level {mockUser.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">@{mockUser.username}</p>
                <p className="text-foreground mb-4 max-w-2xl">{mockUser.bio}</p>

                {/* Expertise Domains */}
                <div className="flex flex-wrap gap-2">
                  {mockUser.expertise_domains.map((domain) => (
                    <Badge key={domain} variant="secondary">
                      {domain}
                    </Badge>
                  ))}
                </div>

                {/* Level Progress */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Level Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {mockUser.reputation_points % 5000}/5000 XP
                    </span>
                  </div>
                  <Progress value={levelProgress} className="h-2" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-accent font-space-grotesk">
                  {mockUser.reputation_points.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Reputation Points</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Prediction Accuracy"
            value={`${mockUser.prediction_accuracy}%`}
            icon={Target}
            trend={{ value: 5, label: 'from last month' }}
          />
          <StatCard
            title="Total Predictions"
            value={mockUser.total_predictions}
            icon={TrendingUp}
          />
          <StatCard
            title="Correct Predictions"
            value={mockUser.correct_predictions}
            icon={Trophy}
          />
          <StatCard
            title="Current Streak"
            value="12"
            icon={Zap}
            trend={{ value: 3, label: 'days' }}
          />
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-card/50 glass">
            <TabsTrigger value="achievements">🏆 Achievements</TabsTrigger>
            <TabsTrigger value="predictions">📊 My Predictions</TabsTrigger>
            <TabsTrigger value="stats">📈 Statistics</TabsTrigger>
            <TabsTrigger value="leaderboard">🥇 Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="mt-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold font-space-grotesk mb-2">
                Achievement Collection
              </h3>
              <p className="text-muted-foreground">
                Unlock badges by demonstrating prediction expertise
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {loading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-48 bg-card/50 animate-pulse rounded-lg" />
                ))
              ) : achievements.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <p className="text-muted-foreground">No achievements available yet</p>
                </div>
              ) : (
                achievements.map((achievement, index) => (
                  <AchievementBadge
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={index < 3} // Mock: first 3 unlocked
                    unlockedAt={index < 3 ? new Date().toISOString() : undefined}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="mt-6">
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Your prediction history will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card className="p-8 glass">
              <h3 className="text-xl font-bold font-space-grotesk mb-6">
                Performance Analytics
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Technology</span>
                    <span className="text-accent font-bold">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Crypto</span>
                    <span className="text-accent font-bold">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Finance</span>
                    <span className="text-accent font-bold">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Global leaderboard coming soon
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
