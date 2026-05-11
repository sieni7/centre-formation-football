'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FootballIcon } from '@/components/icons/FootballIcon'
import { UserPlus, Mail, Lock, Trophy, AlertCircle, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [academyName, setAcademyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // 1. Inscription Auth
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: academyName, // On stocke temporairement le nom de l'académie ici
          }
        }
      })

      if (signupError) throw signupError

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-12 rounded-[2.5rem] max-w-md sport-shadow">
          <div className="bg-accent h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Mail className="h-10 w-10 text-green-950" />
          </div>
          <h2 className="text-3xl font-display font-black text-white uppercase mb-4">Vérifiez vos emails</h2>
          <p className="text-green-50/60 leading-relaxed mb-8">
            Un lien de confirmation a été envoyé à <strong>{email}</strong>. Veuillez cliquer dessus pour activer votre compte académie.
          </p>
          <Link href="/auth/login" className="btn-accent w-full py-4">
            Retour à la connexion
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-accent p-4 rounded-2xl mb-4 sport-shadow">
            <FootballIcon className="h-10 w-10 text-green-950" />
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Nouvelle Académie</h1>
          <p className="text-green-50/50 font-medium">Commencez votre formation aujourd'hui</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] sport-shadow">
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl text-sm flex items-center gap-3">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-green-50/50 uppercase tracking-widest ml-1">Nom de l'Académie</label>
              <div className="relative">
                <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-50/30" />
                <input
                  type="text"
                  value={academyName}
                  onChange={(e) => setAcademyName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                  placeholder="Ex: Racing Club Elite"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-green-50/50 uppercase tracking-widest ml-1">Email Administrateur</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-50/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                  placeholder="admin@academie.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-green-50/50 uppercase tracking-widest ml-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-50/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-accent py-5 text-lg shadow-xl shadow-yellow-400/10 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  Créer mon académie
                  <UserPlus className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-green-50/40 font-medium">
            Déjà inscrit ?{' '}
            <Link href="/auth/login" className="text-accent font-black uppercase tracking-widest hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
