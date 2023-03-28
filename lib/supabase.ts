import { createClient } from '@supabase/supabase-js'
import { Database } from './database.type'

export const SUPABASE_URL = 'https://ecymmfjqjfxjgydzysng.supabase.co'
export const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjeW1tZmpxamZ4amd5ZHp5c25nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkwMDk1MjcsImV4cCI6MTk2NDU4NTUyN30.mN2D5Yv5Bo3T9lBcNCSR4v_wdj5tGzBc_KblpNV8sRs'

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)

export type SupabaseClient = typeof supabase
export default supabase
