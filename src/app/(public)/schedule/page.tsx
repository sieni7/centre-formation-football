import { Navbar } from '@/components/public/Navbar'
import { Calendar as CalendarIcon, MapPin, Clock, ChevronLeft, ChevronRight, Trophy, Info } from 'lucide-react'

const matches = [
  { id: 1, opponent: 'AS Saint-Étienne', date: '15 Juin 2026', time: '15:00', location: 'Stade Municipal', category: 'U19', type: 'Championnat', status: 'Upcoming' },
  { id: 2, opponent: 'Olympique Lyonnais', date: '22 Juin 2026', time: '14:30', location: 'Terrain A', category: 'U17', type: 'Coupe', status: 'Upcoming' },
  { id: 3, opponent: 'Olympique de Marseille', date: '29 Juin 2026', time: '16:00', location: 'Stade Municipal', category: 'U19', type: 'Championnat', status: 'Upcoming' },
  { id: 4, opponent: 'Paris SG', date: '10 Mai 2026', time: '15:00', location: 'Parc des Princes', category: 'U19', type: 'Championnat', status: 'Completed', score: '2 - 1' },
]

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <header className="bg-green-950 pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl mb-6">
                <CalendarIcon className="h-4 w-4 text-accent" />
                <span className="text-white text-xs font-black uppercase tracking-widest">Calendrier Officiel</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-4">Agenda des <span className="text-accent">Matchs</span></h1>
              <p className="text-green-50/50 text-lg font-medium">Ne manquez aucune rencontre de nos jeunes talents.</p>
            </div>
            
            <div className="flex bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10">
               <button className="p-3 text-white hover:bg-white/10 rounded-xl transition-colors"><ChevronLeft /></button>
               <div className="px-8 flex items-center justify-center font-bold text-white uppercase tracking-widest">Juin 2026</div>
               <button className="p-3 text-white hover:bg-white/10 rounded-xl transition-colors"><ChevronRight /></button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-12">
           {/* Section Title */}
           <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black font-display uppercase tracking-tight">Matchs à venir</h2>
              <div className="h-px flex-grow bg-slate-200" />
           </div>

           <div className="space-y-6">
              {matches.filter(m => m.status === 'Upcoming').map((match) => (
                <div key={match.id} className="group bg-white rounded-3xl sport-shadow border border-slate-100 flex flex-col md:flex-row overflow-hidden transition-all hover:border-primary">
                   <div className="bg-primary md:w-48 p-8 flex flex-col items-center justify-center text-white text-center">
                      <span className="text-4xl font-black font-display mb-1">{match.date.split(' ')[0]}</span>
                      <span className="text-xs font-black uppercase tracking-widest opacity-70">{match.date.split(' ').slice(1).join(' ')}</span>
                   </div>
                   
                   <div className="flex-grow p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                         <div className="flex items-center gap-3 mb-3">
                            <span className="bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">{match.category}</span>
                            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md flex items-center gap-1">
                               <Trophy className="h-3 w-3" /> {match.type}
                            </span>
                         </div>
                         <h3 className="text-2xl font-black font-display uppercase tracking-tight mb-4">vs {match.opponent}</h3>
                         
                         <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2 text-slate-400">
                               <Clock className="h-4 w-4" />
                               <span className="text-sm font-bold tracking-wide">{match.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                               <MapPin className="h-4 w-4" />
                               <span className="text-sm font-bold tracking-wide">{match.location}</span>
                            </div>
                         </div>
                      </div>
                      
                      <button className="bg-slate-50 hover:bg-primary hover:text-white p-4 rounded-2xl transition-all active:scale-95 text-primary group-hover:sport-shadow">
                         <Info className="h-6 w-6" />
                      </button>
                   </div>
                </div>
              ))}
           </div>

           {/* Results Section */}
           <div className="flex items-center gap-4 pt-12">
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-slate-400">Résultats récents</h2>
              <div className="h-px flex-grow bg-slate-200" />
           </div>

           <div className="space-y-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              {matches.filter(m => m.status === 'Completed').map((match) => (
                <div key={match.id} className="bg-white rounded-3xl border border-slate-100 flex flex-col md:flex-row overflow-hidden">
                   <div className="bg-slate-200 md:w-48 p-8 flex flex-col items-center justify-center text-slate-500 text-center">
                      <span className="text-4xl font-black font-display mb-1">{match.date.split(' ')[0]}</span>
                      <span className="text-xs font-black uppercase tracking-widest opacity-70">{match.date.split(' ').slice(1).join(' ')}</span>
                   </div>
                   
                   <div className="flex-grow p-8 flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div>
                         <h3 className="text-2xl font-black font-display uppercase tracking-tight mb-2">vs {match.opponent}</h3>
                         <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{match.type} • {match.location}</span>
                      </div>
                      
                      <div className="bg-green-50 text-primary px-8 py-4 rounded-[2rem] text-3xl font-black font-display tracking-widest shadow-inner">
                         {match.score}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </main>

      <footer className="bg-white py-12 border-t text-center">
         <p className="text-slate-400 font-medium">Racing Club Academy • Agenda Officiel</p>
      </footer>
    </div>
  )
}
