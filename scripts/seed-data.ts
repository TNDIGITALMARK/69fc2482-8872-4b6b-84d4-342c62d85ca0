import { supabase, TENANT_ID, PROJECT_ID } from '../src/lib/supabase/client';

const mockPredictions = [
  {
    title: 'Will Tesla stock hit $300 by December 2025?',
    description: 'Based on current market trends, earnings reports, and analyst predictions.',
    category: 'Finance',
    odds_yes: 67,
    odds_no: 33,
    participant_count: 2847,
    total_volume: 45620,
    status: 'active',
    closes_at: new Date('2025-12-31').toISOString(),
    tags: ['tesla', 'stocks', 'earnings'],
  },
  {
    title: 'Will Avatar 3 gross over $2 billion worldwide?',
    description: 'Avatar 3 box office performance prediction based on previous installments.',
    category: 'Entertainment',
    odds_yes: 42,
    odds_no: 58,
    participant_count: 1856,
    total_volume: 32180,
    status: 'active',
    closes_at: new Date('2026-01-15').toISOString(),
    tags: ['movies', 'box-office', 'avatar'],
  },
  {
    title: 'Will Bitcoin reach $150,000 in 2025?',
    description: 'Cryptocurrency market prediction considering halving cycles and institutional adoption.',
    category: 'Crypto',
    odds_yes: 55,
    odds_no: 45,
    participant_count: 4521,
    total_volume: 78450,
    status: 'active',
    closes_at: new Date('2025-12-31').toISOString(),
    tags: ['bitcoin', 'crypto', 'halving'],
  },
  {
    title: 'Will Apple launch an AR headset in 2025?',
    description: 'Based on patents, supply chain leaks, and analyst reports.',
    category: 'Technology',
    odds_yes: 73,
    odds_no: 27,
    participant_count: 3256,
    total_volume: 56780,
    status: 'active',
    closes_at: new Date('2025-12-31').toISOString(),
    tags: ['apple', 'ar', 'technology'],
  },
  {
    title: 'Will the Lakers make the NBA playoffs this season?',
    description: 'Los Angeles Lakers playoff chances based on current team performance.',
    category: 'Sports',
    odds_yes: 81,
    odds_no: 19,
    participant_count: 5632,
    total_volume: 92340,
    status: 'active',
    closes_at: new Date('2025-04-15').toISOString(),
    tags: ['nba', 'lakers', 'playoffs'],
  },
  {
    title: 'Will AI reach AGI by 2030?',
    description: 'Artificial General Intelligence achievement timeline prediction.',
    category: 'Technology',
    odds_yes: 35,
    odds_no: 65,
    participant_count: 6854,
    total_volume: 125680,
    status: 'active',
    closes_at: new Date('2030-12-31').toISOString(),
    tags: ['ai', 'agi', 'technology'],
  },
  {
    title: 'Will SpaceX land humans on Mars by 2030?',
    description: 'SpaceX Mars mission timeline based on Starship development.',
    category: 'Science',
    odds_yes: 28,
    odds_no: 72,
    participant_count: 4125,
    total_volume: 68450,
    status: 'active',
    closes_at: new Date('2030-12-31').toISOString(),
    tags: ['spacex', 'mars', 'space'],
  },
  {
    title: 'Will Ethereum price exceed $10,000 in 2025?',
    description: 'Ethereum price prediction considering ETH 2.0 developments.',
    category: 'Crypto',
    odds_yes: 38,
    odds_no: 62,
    participant_count: 3876,
    total_volume: 62340,
    status: 'active',
    closes_at: new Date('2025-12-31').toISOString(),
    tags: ['ethereum', 'crypto', 'eth'],
  },
];

const mockAchievements = [
  {
    name: 'First Prediction',
    description: 'Make your first prediction on any market',
    badge_icon: '🎯',
    badge_color: '#4299E1',
    requirement_type: 'predictions_count',
    requirement_value: 1,
    rarity: 'common',
  },
  {
    name: 'Century Club',
    description: 'Make 100 predictions across all categories',
    badge_icon: '💯',
    badge_color: '#805AD5',
    requirement_type: 'predictions_count',
    requirement_value: 100,
    rarity: 'rare',
  },
  {
    name: 'Sharp Shooter',
    description: 'Achieve 80% prediction accuracy',
    badge_icon: '🎖️',
    badge_color: '#38B2AC',
    requirement_type: 'accuracy',
    requirement_value: 80,
    rarity: 'epic',
  },
  {
    name: 'Hot Streak',
    description: 'Get 10 predictions correct in a row',
    badge_icon: '🔥',
    badge_color: '#F56565',
    requirement_type: 'streak',
    requirement_value: 10,
    rarity: 'rare',
  },
  {
    name: 'Tech Oracle',
    description: 'Become an expert in Technology predictions',
    badge_icon: '💻',
    badge_color: '#667EEA',
    requirement_type: 'category_expert',
    requirement_value: 50,
    rarity: 'epic',
  },
  {
    name: 'Reputation King',
    description: 'Earn 10,000 reputation points',
    badge_icon: '👑',
    badge_color: '#F6E05E',
    requirement_type: 'reputation',
    requirement_value: 10000,
    rarity: 'legendary',
  },
  {
    name: 'Crypto Sage',
    description: 'Master cryptocurrency predictions',
    badge_icon: '₿',
    badge_color: '#F7931A',
    requirement_type: 'category_expert',
    requirement_value: 50,
    rarity: 'epic',
  },
  {
    name: 'Market Maker',
    description: 'Create 25 prediction markets',
    badge_icon: '📊',
    badge_color: '#48BB78',
    requirement_type: 'predictions_count',
    requirement_value: 25,
    rarity: 'rare',
  },
];

async function seedData() {
  console.log('🌱 Starting database seed...\n');

  // Seed Predictions
  console.log('📊 Seeding predictions...');
  for (const prediction of mockPredictions) {
    try {
      const { data, error } = await supabase
        .from('predictions')
        .insert({
          tenantid: TENANT_ID,
          projectid: PROJECT_ID,
          ...prediction,
        })
        .select()
        .single();

      if (error) {
        console.log(`  ❌ Failed: ${prediction.title}`);
        console.log(`     Error: ${error.message}`);
      } else {
        console.log(`  ✅ Created: ${prediction.title}`);
      }
    } catch (err) {
      console.log(`  ❌ Error: ${err}`);
    }
  }

  // Seed Achievements
  console.log('\n🏆 Seeding achievements...');
  for (const achievement of mockAchievements) {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .insert({
          tenantid: TENANT_ID,
          projectid: PROJECT_ID,
          ...achievement,
        })
        .select()
        .single();

      if (error) {
        console.log(`  ❌ Failed: ${achievement.name}`);
        console.log(`     Error: ${error.message}`);
      } else {
        console.log(`  ✅ Created: ${achievement.name}`);
      }
    } catch (err) {
      console.log(`  ❌ Error: ${err}`);
    }
  }

  console.log('\n✨ Seed complete!\n');
}

seedData().catch(console.error);
