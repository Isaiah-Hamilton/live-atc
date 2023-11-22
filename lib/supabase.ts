import { createClient } from '@supabase/supabase-js';
import { Database } from './database.type';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export type SupabaseClient = typeof supabase;
export default supabase;
