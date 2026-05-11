'use client'

import { useQuery } from '@tanstack/react-query'
import { getConvocationsForPlayer } from '@/domains/convocations'
import { Trophy, Calendar, Activity, Check, X } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'

export function PlayerDashboard({ playerId }: { playerId: string }) {
  const { data: convocations, isLoading: loadingConvocations } = useQuery({
    queryKey: ['convocations', playerId],
    queryFn: () => getConvocationsForPlayer(playerId)
  })

  const nextMatch = convocations?.find(c => c.status === 'PENDING')?.matches

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Mon Espace Joueur</h1>
        <p className="text-gray-500 text-sm">Suivez vos performances et votre agenda.</p>
      </header>

      {/* Highlights */}
      {nextMatch && (
        <div className="bg-green-600 text-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Calendar className="h-8 w-8" />
            </div>
            <div>
              <p className="text-green-100 text-sm font-semibold uppercase tracking-wider">Prochain Match</p>
              <h3 className="text-2xl font-bold">vs {nextMatch.opponent}</h3>
              <p className="text-green-500 bg-white inline-block px-2 py-0.5 rounded text-xs font-bold mt-1">
                {new Date(nextMatch.match_date).toLocaleDateString()} • {nextMatch.location}
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-white text-green-600 px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-50 transition-colors">
              <Check className="h-5 w-5" /> Accepter
            </button>
            <button className="flex-1 md:flex-none bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-800 transition-colors">
              <X className="h-5 w-5" /> Décliner
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Buts</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Présence</p>
            <p className="text-2xl font-bold">0%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Matchs Joués</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  )
}
