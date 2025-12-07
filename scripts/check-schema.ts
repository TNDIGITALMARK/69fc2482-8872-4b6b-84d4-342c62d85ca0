import { createClient } from '@supabase/supabase-js';

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

async function checkSchema() {
  console.log('Checking database schema...\n');

  const tables = ['predictions', 'user_profiles', 'achievements', 'user_predictions', 'user_achievements'];

  for (const table of tables) {
    const { error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`❌ ${table}: Does not exist (${error.message})`);
    } else {
      console.log(`✅ ${table}: Exists (${count} rows)`);
    }
  }
}

checkSchema().catch(console.error);
