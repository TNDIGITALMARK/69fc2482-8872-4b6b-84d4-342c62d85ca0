'use client';

import { useState } from 'react';
import { Lightning, TrendingUp, Clock, User, Menu, Search } from 'lucide-react';
import { getMockPredictions } from '@/lib/mock-data';
import { MarketCard } from '@/components/markets/market-card';
import { CategoryFilter } from '@/components/markets/category-filter';
import { SideMenu } from '@/components/navigation/side-menu';

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [menuOpen, setMenuOpen] = useState(false);

  // Get all predictions or filter by category
  const allPredictions = getMockPredictions();
  const predictions = selectedCategory === 'All'
    ? allPredictions
    : allPredictions.filter(p => p.category === selectedCategory);

  // Calculate stats
  const totalMarkets = allPredictions.filter(p => p.status === 'active').length;
  const totalVolume = allPredictions.reduce((sum, p) => sum + (p.total_volume || 0), 0);
  const endingSoon = allPredictions.filter(p => {
    const closeDate = new Date(p.closes_at);
    const now = new Date();
    const diffDays = (closeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays < 365 && diffDays > 0;
  }).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-lg bg-background/80">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <Lightning className="w-6 h-6 text-white" fill="white" />
            </div>
            <h1 className="text-xl font-bold font-heading">ORACLE</h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary/70 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary/70 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero px-4 pt-12 pb-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
            <Lightning className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Leveraged Predictions</span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-5xl font-bold text-center font-heading mb-4 leading-tight">
          Predict the Future.
          <br />
          <span className="text-gradient">Amplify Your Edge.</span>
        </h2>

        <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Trade on real-world events with up to 10x leverage. Put your convictions to work.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8 max-w-2xl mx-auto">
          <div className="glass rounded-2xl p-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold font-heading">{totalMarkets}</div>
            <div className="text-xs text-muted-foreground text-center">Active Markets</div>
          </div>

          <div className="glass rounded-2xl p-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Lightning className="w-5 h-5 text-primary" fill="currentColor" />
            </div>
            <div className="text-2xl font-bold font-heading">${(totalVolume / 1000).toFixed(0)}K</div>
            <div className="text-xs text-muted-foreground text-center">Total Volume</div>
          </div>

          <div className="glass rounded-2xl p-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold font-heading">{endingSoon}</div>
            <div className="text-xs text-muted-foreground text-center">Ending Soon</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search markets..."
            className="w-full pl-12 pr-4 py-4 bg-card/50 backdrop-blur-sm border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 py-6 border-b border-border/40">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Featured Markets Section */}
      <section className="px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightning className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold font-heading">Featured Markets</h3>
        </div>

        <div className="space-y-4">
          {predictions.slice(0, 10).map((prediction) => (
            <MarketCard key={prediction.id} prediction={prediction} />
          ))}
        </div>

        {predictions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No markets found in this category</p>
          </div>
        )}
      </section>

      {/* Bottom Spacing */}
      <div className="h-24" />

      {/* Side Menu */}
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}
