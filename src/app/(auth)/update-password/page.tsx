'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { FootballIcon } from '@/components/icons/FootballIcon'
import { Lock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) throw error
      setSuccess(true)
      setTimeout(() => router.push('/auth/login'), 3000)
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-accent p-4 rounded-2xl mb-4 sport-shadow">
            <FootballIcon className="h-10 w-10 text-green-950" />
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter text-center">Nouveau Mot de Passe</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] sport-shadow">
          {success ? (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-accent mx-auto mb-6" />
              <h2 className="text-xl font-bold text-white mb-4">Mis à jour !</h2>
              <p className="text-green-50/60 text-sm">
                Votre mot de passe a été modifié. Redirection vers la connexion...
              </p>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl text-sm flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black text-green-50/50 uppercase tracking-widest ml-1">Nouveau mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-50/30" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-accent py-5 text-lg shadow-xl shadow-yellow-400/10 disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Enregistrer'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
