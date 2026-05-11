import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY!

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const DEMO_DATA = {
  academy: {
    name: 'Académie de Démonstration',
    slug: 'academie-demo',
    settings: {
      timezone: 'Europe/Paris',
      currency: 'EUR',
    },
  },
  users: {
    admin: { email: 'admin@demo.com', password: 'Admin123!', full_name: 'Admin Principal', role: 'ACADEMY_ADMIN' },
    coach: { email: 'coach@demo.com', password: 'Coach123!', full_name: 'Jean Dupont', role: 'COACH' },
    players: [
      { email: 'player1@demo.com', password: 'Player123!', full_name: 'Lucas Martin', position: 'ATT', jersey: 10 },
      { email: 'player2@demo.com', password: 'Player123!', full_name: 'Thomas Bernard', position: 'DEF', jersey: 5 },
    ],
  },
}

async function main() {
  console.log('🚀 Démarrage du seed...')

  // 1. Créer l'académie
  const { data: academy, error: academyError } = await supabase
    .from('academies')
    .insert(DEMO_DATA.academy)
    .select()
    .single()

  if (academyError) {
    console.error('❌ Erreur académie:', academyError.message)
    return
  }
  console.log('✅ Académie créée')

  // 2. Créer Admin
  const { data: adminAuth, error: adminError } = await supabase.auth.admin.createUser({
    email: DEMO_DATA.users.admin.email,
    password: DEMO_DATA.users.admin.password,
    email_confirm: true,
  })

  if (adminAuth.user) {
    await supabase.from('profiles').insert({ id: adminAuth.user.id, full_name: DEMO_DATA.users.admin.full_name, role: 'ACADEMY_ADMIN' })
    await supabase.from('users_academies').insert({ user_id: adminAuth.user.id, academy_id: academy.id })
    console.log('✅ Admin créé')
  }

  // 3. Créer Coach
  const { data: coachAuth } = await supabase.auth.admin.createUser({
    email: DEMO_DATA.users.coach.email,
    password: DEMO_DATA.users.coach.password,
    email_confirm: true,
  })

  if (coachAuth.user) {
    await supabase.from('profiles').insert({ id: coachAuth.user.id, full_name: DEMO_DATA.users.coach.full_name, role: 'COACH' })
    await supabase.from('users_academies').insert({ user_id: coachAuth.user.id, academy_id: academy.id })
    console.log('✅ Coach créé')
  }

  // 4. Créer Joueurs
  for (const p of DEMO_DATA.users.players) {
    const { data: pAuth } = await supabase.auth.admin.createUser({ email: p.email, password: p.password, email_confirm: true })
    if (pAuth.user) {
      await supabase.from('profiles').insert({ id: pAuth.user.id, full_name: p.full_name, role: 'PLAYER' })
      await supabase.from('players').insert({ profile_id: pAuth.user.id, academy_id: academy.id, position: p.position, jersey_number: p.jersey })
      await supabase.from('users_academies').insert({ user_id: pAuth.user.id, academy_id: academy.id })
      console.log(`✅ Joueur ${p.full_name} créé`)
    }
  }

  console.log('🎉 Seed terminé avec succès !')
}

main().catch(console.error)
