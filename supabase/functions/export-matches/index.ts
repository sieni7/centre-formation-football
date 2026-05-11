import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { academy_id } = await req.json()
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  const { data: matches, error } = await supabase
    .from('matches')
    .select(`
      opponent,
      match_date,
      location,
      convocations (
        status,
        players (
          profiles (full_name)
        )
      )
    `)
    .eq('academy_id', academy_id)

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

  const csv = [
    ['Opponent', 'Date', 'Location', 'Player', 'Status'].join(','),
    ...matches.flatMap((m: any) => 
      m.convocations.map((c: any) => 
        [m.opponent, m.match_date, m.location, c.players.profiles.full_name, c.status].join(',')
      )
    )
  ].join('\n')

  return new Response(csv, {
    headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="export.csv"' },
  })
})
