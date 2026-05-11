'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function DashboardRedirect() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkRoleAndRedirect = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        return router.push('/auth/login')
      }

      // Récupérer le profil pour connaître le rôle
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !profile) {
        // Par défaut si pas de profil (cas improbable avec les triggers)
        return router.push('/PLAYER')
      }

      // Redirection selon le rôle (on utilise les paths définis dans (dashboard)/[role])
      const roleMap: Record<string, string> = {
        ACADEMY_ADMIN: '/COACH', // Ou un dashboard admin spécifique si existant
        COACH: '/COACH',
        PLAYER: '/PLAYER',
        PARENT: '/PARENT',
      }

      const targetPath = roleMap[profile.role] || '/PLAYER'
      router.push(targetPath)
    }

    checkRoleAndRedirect()
  }, [router, supabase])

  return (
    <div className="h-screen bg-green-950 flex flex-col items-center justify-center text-white">
      <Loader2 className="h-10 w-10 animate-spin text-accent mb-4" />
      <p className="font-display font-black uppercase tracking-widest text-sm animate-pulse">Chargement de votre académie...</p>
    </div>
  )
}
