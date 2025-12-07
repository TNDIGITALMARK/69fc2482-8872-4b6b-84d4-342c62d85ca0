import { createClient } from '@supabase/supabase-js';

const TENANT_ID = '29XXK5csF8PVUShyAC755a86Md12';
const PROJECT_ID = '69fc2482-8872-4b6b-84d4-342c62d85ca0';

const supabase = createClient(
  'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6IjI5WFhLNWNzRjhQVlVTaHlBQzc1NWE4Nk1kMTIiLCJwcm9qZWN0X2lkIjoiNjlmYzI0ODItODg3Mi00YjZiLTg0ZDQtMzQyYzYyZDg1Y2EwIiwianRpIjoiNmVhOWU1YTMtZGVhNi00ZWY0LTgzODctOGJkMmYzMDY3NzU3IiwiaWF0IjoxNzY1MTMzNDM4LCJleHAiOjE3NjUxMzYxMzh9.nYd9Ys_oMcA_giTXWz9XYgO1LmF4nEn9LPKjgrb_0a0`
      }
    }
  }
);

const predictions = [
  {
    title: 'Will Bitcoin reach $150,000 by end of 2025?',
    description: 'Prediction resolves YES if Bitcoin (BTC) reaches or exceeds $150,000 USD on any major exchange by December 31, 2025, 11:59 PM UTC.',
    category: 'Crypto',
    tags: ['bitcoin', 'cryptocurrency', 'btc'],
    closes_at: new Date('2025-12-31').toISOString(),
    yes_votes: 3250,
    no_votes: 1840,
    participant_count: 5090,
  },
  {
    title: 'Will Tesla announce a new vehicle model in 2025?',
    description: 'Resolves YES if Tesla officially announces a completely new vehicle model (not a refresh) during 2025.',
    category: 'Technology',
    tags: ['tesla', 'ev', 'automotive'],
    closes_at: new Date('2025-12-31').toISOString(),
    yes_votes: 2100,
    no_votes: 980,
    participant_count: 3080,
  },
  {
    title: 'Will there be a GTA 6 release date announcement this year?',
    description: 'Resolves YES if Rockstar Games officially announces a specific release date for Grand Theft Auto 6 in 2025.',
    category: 'Entertainment',
    tags: ['gaming', 'gta6', 'rockstar'],
    closes_at: new Date('2025-12-31').toISOString(),
    yes_votes: 5400,
    no_votes: 2200,
    participant_count: 7600,
  },
  {
    title: 'Will SpaceX land humans on Mars by 2030?',
    description: 'Prediction resolves YES if SpaceX successfully lands at least one human on Mars by December 31, 2030.',
    category: 'Science',
    tags: ['spacex', 'mars', 'space exploration'],
    closes_at: new Date('2030-12-31').toISOString(),
    yes_votes: 1850,
    no_votes: 3200,
    participant_count: 5050,
  },
  {
    title: 'Will the S&P 500 hit 7000 by end of 2025?',
    description: 'Resolves YES if the S&P 500 index closes at or above 7000 points on any trading day in 2025.',
    category: 'Finance',
    tags: ['stocks', 'sp500', 'market'],
    closes_at: new Date('2025-12-31').toISOString(),
    yes_votes: 2900,
    no_votes: 1750,
    participant_count: 4650,
  },
  {
    title: 'Will OpenAI release GPT-5 in 2025?',
    description: 'Resolves YES if OpenAI officially releases a model called GPT-5 or equivalent successor to GPT-4 during 2025.',
    category: 'Technology',
    tags: ['ai', 'openai', 'gpt'],
    closes_at: new Date('2025-12-31').toISOString(),
    yes_votes: 4100,
    no_votes: 1300,
    participant_count: 5400,
  },
  {
    title: 'Will England win the 2026 FIFA World Cup?',
    description: 'Resolves YES if England national football team wins the 2026 FIFA World Cup.',
    category: 'Sports',
    tags: ['football', 'worldcup', 'england'],
    closes_at: new Date('2026-07-19').toISOString(),
    yes_votes: 1200,
    no_votes: 3400,
    participant_count: 4600,
  },
  {
    title: 'Will Ethereum transition to full rollup-centric roadmap by 2026?',
    description: 'Resolves YES if Ethereum mainnet successfully implements full rollup-centric scaling by December 2026.',
    category: 'Crypto',
    tags: ['ethereum', 'layer2', 'scaling'],
    closes_at: new Date('2026-12-31').toISOString(),
    yes_votes: 2800,
    no_votes: 1500,
    participant_count: 4300,
  },
  {
    title: 'Will Apple release AR glasses in 2025?',
    description: 'Resolves YES if Apple announces and begins selling consumer AR glasses in 2025.',
    category: 'Technology',
    tags: ['apple', 'ar', 'wearables'],
    closes_at: new Date('2025-12-31').toISOString(),
    yes_votes: 1900,
    no_votes: 2700,
    participant_count: 4600,
  },
  {
    title: 'Will any country adopt Bitcoin as legal tender in 2025?',
    description: 'Resolves YES if any nation-state officially adopts Bitcoin as legal tender during 2025.',
    category: 'Crypto',
    tags: ['bitcoin', 'adoption', 'legal tender'],
    closes_at: new Date('2025-12-31').toISOString(),
    yes_votes: 3300,
    no_votes: 2100,
    participant_count: 5400,
  },
  {
    title: 'Will Netflix subscriber count exceed 300 million in 2025?',
    description: 'Resolves YES if Netflix reports 300+ million subscribers in any quarterly earnings report in 2025.',
    category: 'Entertainment',
    tags: ['netflix', 'streaming', 'subscribers'],
    closes_at: new Date('2025-12-31').toISOString(),
    yes_votes: 2450,
    no_votes: 1820,
    participant_count: 4270,
  },
  {
    title: 'Will quantum computing break RSA-2048 encryption by 2030?',
    description: 'Resolves YES if a quantum computer successfully breaks RSA-2048 encryption by December 31, 2030.',
    category: 'Science',
    tags: ['quantum', 'cryptography', 'security'],
    closes_at: new Date('2030-12-31').toISOString(),
    yes_votes: 1600,
    no_votes: 3800,
    participant_count: 5400,
  },
];

async function seedPredictions() {
  console.log('=== SEEDING PREDICTIONS ===\n');

  for (const pred of predictions) {
    const { data, error } = await supabase
      .from('predictions')
      .insert({
        tenantid: TENANT_ID,
        projectid: PROJECT_ID,
        ...pred,
      })
      .select();

    if (error) {
      console.log(`❌ Failed to insert: ${pred.title}`);
      console.log(`   Error: ${error.message}`);
    } else {
      console.log(`✅ Inserted: ${pred.title}`);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n=== VERIFICATION ===\n');
  const { data: allPredictions, error: fetchError } = await supabase
    .from('predictions')
    .select('*')
    .limit(5);

  if (fetchError) {
    console.log('❌ Failed to fetch predictions:', fetchError.message);
  } else {
    console.log(`✅ Successfully seeded ${allPredictions?.length || 0} predictions (showing first 5)`);
    allPredictions?.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.title}`);
    });
  }
}

seedPredictions().catch(console.error);
