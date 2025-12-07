'use client';

import { useState, useEffect } from 'react';
import { PredictionCard } from '@/components/predictions/prediction-card';
import { StatCard } from '@/components/predictions/stat-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TrendingUp, Users, Target, Clock, Plus } from 'lucide-react';
import { getPredictions, getTrendingPredictions } from '@/lib/supabase/queries';
import type { Prediction } from '@/lib/supabase/types';
import Link from 'next/link';

export default function DashboardPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trending');

  useEffect(() => {
    loadPredictions();
  }, [activeTab]);

  async function loadPredictions() {
    setLoading(true);
    try {
      // Use mock data for now
      const { getMockPredictions, getMockTrendingPredictions } = await import('@/lib/mock-data');

      let data: Prediction[];
      if (activeTab === 'trending') {
        data = getMockTrendingPredictions(20);
      } else if (activeTab === 'all') {
        data = getMockPredictions({ status: 'active', limit: 50 });
      } else {
        data = getMockPredictions({ status: 'active', category: activeTab, limit: 50 });
      }
      setPredictions(data);
    } catch (error) {
      console.error('Failed to load predictions:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleVote = (predictionId: string, choice: 'yes' | 'no') => {
    console.log('Vote:', predictionId, choice);
    // TODO: Implement voting logic
  };

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
            <div className="flex items-center gap-4">
              <Link href="/create">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Prediction
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline">
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Markets"
            value="247"
            icon={TrendingUp}
            trend={{ value: 12, label: 'from last week' }}
          />
          <StatCard
            title="Total Users"
            value="15.8K"
            icon={Users}
            trend={{ value: 8, label: 'from last week' }}
          />
          <StatCard
            title="Prediction Accuracy"
            value="74%"
            icon={Target}
          />
          <StatCard
            title="Avg Response Time"
            value="2.3m"
            icon={Clock}
          />
        </div>

        {/* Predictions Feed */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold font-space-grotesk">
              Live Predictions
            </h2>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-card/50 glass">
              <TabsTrigger value="trending">🔥 Trending</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Technology">💻 Technology</TabsTrigger>
              <TabsTrigger value="Sports">⚽ Sports</TabsTrigger>
              <TabsTrigger value="Entertainment">🎬 Entertainment</TabsTrigger>
              <TabsTrigger value="Politics">🏛️ Politics</TabsTrigger>
              <TabsTrigger value="Crypto">₿ Crypto</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-80 bg-card/50 animate-pulse rounded-lg"
                    />
                  ))}
                </div>
              ) : predictions.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground text-lg mb-4">
                    No predictions found in this category
                  </p>
                  <Link href="/create">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Create the first one
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {predictions.map((prediction) => (
                    <PredictionCard
                      key={prediction.id}
                      prediction={prediction}
                      onVote={(choice) => handleVote(prediction.id, choice)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
