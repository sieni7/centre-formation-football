'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { FootballIcon } from '@/components/icons/FootballIcon'
import { Mail, ArrowLeft, AlertCircle, Loader2, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })

      if (error) throw error
      setSuccess(true)
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
          <h1 className="text-3xl font-display font-black text-white uppercase tracking-tighter text-center">Récupération</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] sport-shadow">
          {success ? (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-accent mx-auto mb-6" />
              <h2 className="text-xl font-bold text-white mb-4">Email envoyé !</h2>
              <p className="text-green-50/60 text-sm mb-8">
                Vérifiez votre boîte de réception pour les instructions de réinitialisation.
              </p>
              <Link href="/auth/login" className="btn-accent w-full py-4">
                Retour à la connexion
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-6">
              <p className="text-sm text-green-50/60 text-center mb-6">
                Entrez votre email pour recevoir un lien de réinitialisation.
              </p>

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

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-accent py-5 text-lg disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : 'Envoyer le lien'}
              </button>
              
              <Link href="/auth/login" className="flex items-center justify-center gap-2 text-xs font-bold text-green-50/40 hover:text-white transition-colors uppercase tracking-widest">
                <ArrowLeft className="h-4 w-4" /> Retour
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
