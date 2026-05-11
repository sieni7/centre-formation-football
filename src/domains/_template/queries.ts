/**
 * Data retrieval queries for this domain.
 */
import { supabase } from '@/lib/supabase'

export const getExampleData = async () => {
  const { data, error } = await supabase
    .from('example_table')
    .select('*')
  
  if (error) throw error
  return data
}
