'use client'

import { useQuery } from '@tanstack/react-query'
import { getPlayers } from '@/domains/players'
import { getMatches } from '@/domains/matches'
import { Users, Calendar, Trophy, Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/Skeleton'

export function CoachDashboard({ academyId }: { academyId: string }) {
  const { data: players, isLoading: loadingPlayers } = useQuery({
    queryKey: ['players', academyId],
    queryFn: () => getPlayers(academyId)
  })

  const { data: matches, isLoading: loadingMatches } = useQuery({
    queryKey: ['matches', academyId],
    queryFn: () => getMatches(academyId)
  })

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord Coach</h1>
          <p className="text-gray-500 text-sm">Gérez votre effectif et vos rencontres.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4" /> Nouveau Match
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Joueurs</p>
            <p className="text-2xl font-bold">{loadingPlayers ? '...' : players?.length || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Matchs Prévus</p>
            <p className="text-2xl font-bold">{loadingMatches ? '...' : matches?.length || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Victoires</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Players List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold">Derniers Joueurs</h3>
            <button className="text-green-600 text-sm font-semibold hover:underline">Voir tout</button>
          </div>
          <div className="p-0">
            {loadingPlayers ? (
              <div className="p-6 space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                  <tr>
                    <th className="px-6 py-3">Nom</th>
                    <th className="px-6 py-3">Poste</th>
                    <th className="px-6 py-3">N°</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {players?.slice(0, 5).map((player: any) => (
                    <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{player.profiles?.full_name}</td>
                      <td className="px-6 py-4 text-gray-500">{player.position}</td>
                      <td className="px-6 py-4">{player.jersey_number}</td>
                    </tr>
                  ))}
                  {(!players || players.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-400 italic">Aucun joueur enregistré.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Matches List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold">Agenda Matchs</h3>
            <button className="text-green-600 text-sm font-semibold hover:underline">Voir tout</button>
          </div>
          <div className="p-6 space-y-4">
            {loadingMatches ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : matches?.length === 0 ? (
              <div className="py-12 text-center text-gray-400 italic">Aucun match prévu.</div>
            ) : (
              matches?.map((match: any) => (
                <div key={match.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                  <div className="bg-green-50 text-green-600 h-10 w-10 rounded flex flex-col items-center justify-center font-bold text-xs">
                    <span>{new Date(match.match_date).getDate()}</span>
                  </div>
                  <div>
                    <p className="font-bold">vs {match.opponent}</p>
                    <p className="text-xs text-gray-500">{new Date(match.match_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {match.location}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
