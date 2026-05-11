import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Need service key for seeding

export const seed = async () => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  console.log('Seeding demo academy...')

  // 1. Create Demo Academy
  const { data: academy, error: acError } = await supabase
    .from('academies')
    .upsert({
      name: 'Racing Club Academy',
      slug: 'racing-club',
    })
    .select()
    .single()

  if (acError) {
    console.error('Error seeding academy:', acError)
    return
  }

  console.log('Academy seeded:', academy.name)

  // 2. Note: Users should be created via Supabase Auth API
  // This is a placeholder for where you would link profiles to academies
}
