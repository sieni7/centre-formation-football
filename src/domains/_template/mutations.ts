/**
 * Data modification mutations for this domain.
 */
import { supabase } from '@/lib/supabase'

export const createExampleData = async (payload: Record<string, unknown>) => {
  const { data, error } = await supabase
    .from('example_table')
    .insert([payload])
    .select()
  
  if (error) throw error
  return data
}
