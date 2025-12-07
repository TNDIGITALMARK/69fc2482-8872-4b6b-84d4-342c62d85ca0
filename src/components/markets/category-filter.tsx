'use client';

import { Grid3x3, Bitcoin, Building2, Trophy } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  { name: 'All', icon: Grid3x3, emoji: '🎯' },
  { name: 'Crypto', icon: Bitcoin, emoji: '₿' },
  { name: 'Politics', icon: Building2, emoji: '🏛️' },
  { name: 'Sports', icon: Trophy, emoji: '⚽' },
];

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.name;
        const Icon = category.icon;

        return (
          <button
            key={category.name}
            onClick={() => onSelectCategory(category.name)}
            className={`
              flex items-center gap-2 px-5 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all
              ${isSelected
                ? 'bg-accent text-white shadow-lg shadow-accent/30'
                : 'bg-secondary/50 text-foreground hover:bg-secondary/70'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
