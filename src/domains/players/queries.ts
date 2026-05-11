import { supabase } from '@/lib/supabase'

export const getPlayers = async (academyId: string) => {
  const { data, error } = await supabase
    .from('players')
    .select('*, profiles(*)')
    .eq('academy_id', academyId)
    .is('deleted_at', null)
  
  if (error) throw error
  return data
}

export const getPlayer = async (id: string) => {
  const { data, error } = await supabase
    .from('players')
    .select('*, profiles(*)')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}
