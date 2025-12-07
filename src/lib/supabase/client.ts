import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hfndfmtxhqvubnfiwzlz.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA';
const supabaseScopedToken = process.env.NEXT_PUBLIC_SUPABASE_SCOPED_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6IjI5WFhLNWNzRjhQVlVTaHlBQzc1NWE4Nk1kMTIiLCJwcm9qZWN0X2lkIjoiNjlmYzI0ODItODg3Mi00YjZiLTg0ZDQtMzQyYzYyZDg1Y2EwIiwianRpIjoiNmVhOWU1YTMtZGVhNi00ZWY0LTgzODctOGJkMmYzMDY3NzU3IiwiaWF0IjoxNzY1MTMzNDM4LCJleHAiOjE3NjUxMzYxMzh9.nYd9Ys_oMcA_giTXWz9XYgO1LmF4nEn9LPKjgrb_0a0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {
      Authorization: `Bearer ${supabaseScopedToken}`
    }
  }
});

export const TENANT_ID = '29XXK5csF8PVUShyAC755a86Md12';
export const PROJECT_ID = '69fc2482-8872-4b6b-84d4-342c62d85ca0';
