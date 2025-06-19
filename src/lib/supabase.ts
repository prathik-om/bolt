import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

// For demo purposes, we'll create a mock client if no real credentials are provided
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Disable auth for demo
    autoRefreshToken: false,
  },
})

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any) {
  console.error('Supabase error:', error)
  
  if (error?.code === 'PGRST116') {
    throw new Error('No data found')
  }
  
  if (error?.code === '23505') {
    throw new Error('This record already exists')
  }
  
  if (error?.code === '23503') {
    throw new Error('Cannot delete this record as it is being used elsewhere')
  }
  
  throw new Error(error?.message || 'An unexpected error occurred')
}