import { supabase } from '@/lib/supabase'

export const createPlayer = async (payload: any) => {
  const { data, error } = await supabase
    .from('players')
    .insert([payload])
    .select()
  
  if (error) throw error
  return data
}

export const updatePlayer = async (id: string, payload: any) => {
  const { data, error } = await supabase
    .from('players')
    .update(payload)
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data
}

export const softDeletePlayer = async (id: string) => {
  const { data, error } = await supabase
    .from('players')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data
}
