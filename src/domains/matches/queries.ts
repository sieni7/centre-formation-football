import { supabase } from '@/lib/supabase'

export const getMatches = async (academyId: string) => {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .eq('academy_id', academyId)
    .is('deleted_at', null)
    .order('match_date', { ascending: true })
  
  if (error) throw error
  return data
}

export const createMatch = async (payload: any) => {
  const { data, error } = await supabase
    .from('matches')
    .insert([payload])
    .select()
  
  if (error) throw error
  return data
}
