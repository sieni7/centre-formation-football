import { supabase } from '@/lib/supabase'

export const getConvocationsForPlayer = async (playerId: string) => {
  const { data, error } = await supabase
    .from('convocations')
    .select('*, matches(*)')
    .eq('player_id', playerId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export const updateConvocationStatus = async (id: string, status: 'ACCEPTED' | 'DECLINED') => {
  const { data, error } = await supabase
    .from('convocations')
    .update({ status, response_date: new Date().toISOString() })
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data
}

export const subscribeToConvocations = (playerId: string, onUpdate: (payload: any) => void) => {
  return supabase
    .channel('public:convocations')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'convocations', filter: `player_id=eq.${playerId}` },
      onUpdate
    )
    .subscribe()
}
