'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FootballIcon } from '@/components/icons/FootballIcon'
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-accent p-4 rounded-2xl mb-4 sport-shadow">
            <FootballIcon className="h-10 w-10 text-green-950" />
          </div>
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Connexion Elite</h1>
          <p className="text-green-50/50 font-medium">Accédez à votre académie</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] sport-shadow">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl text-sm flex items-center gap-3">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-black text-green-50/50 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-50/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-accent outline-none transition-all"
                  placeholder="nom@exemple.com"
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
                  Se connecter
                  <LogIn className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex flex-col gap-4 text-center">
            <Link href="/auth/forgot-password" className="text-xs font-bold text-green-50/40 hover:text-accent transition-colors">
              Mot de passe oublié ?
            </Link>
            <div className="h-px bg-white/5 w-full" />
            <p className="text-xs text-green-50/40 font-medium">
              Nouvelle académie ?{' '}
              <Link href="/auth/signup" className="text-accent font-black uppercase tracking-widest hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
        
        <Link href="/" className="mt-8 flex items-center justify-center gap-2 text-green-50/30 hover:text-white transition-colors font-bold text-sm">
          ← Retour au site public
        </Link>
      </div>
    </div>
  )
}
