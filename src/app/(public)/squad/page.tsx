import { Navbar } from '@/components/public/Navbar'
import { FootballIcon } from '@/components/icons/FootballIcon'
import { Trophy, Star, Shield, Zap } from 'lucide-react'

const players = [
  { id: 1, name: 'Jean Dupont', position: 'Gardien', number: 1, category: 'U19', status: 'Détenteur', rating: 88 },
  { id: 2, name: 'Lucas Martin', position: 'Défenseur', number: 4, category: 'U19', status: 'Capitaine', rating: 92 },
  { id: 3, name: 'Thomas Bernard', position: 'Milieu', number: 8, category: 'U17', status: 'Espoir', rating: 90 },
  { id: 4, name: 'Hugo Petit', position: 'Attaquant', number: 10, category: 'U19', status: 'Buteur', rating: 95 },
  { id: 5, name: 'Nathan Robert', position: 'Milieu', number: 6, category: 'U17', status: 'Technicien', rating: 87 },
  { id: 6, name: 'Enzo Richard', position: 'Défenseur', number: 5, category: 'U19', status: 'Roc', rating: 89 },
]

export default function SquadPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <header className="bg-primary pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Abstract Pitch Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] aspect-square border-2 border-white/10 rounded-full pointer-events-none" />
        <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[80%] aspect-square border-2 border-white/5 rounded-full pointer-events-none" />
        
        <div className="container mx-auto relative z-10 text-center">
          <div className="inline-block bg-accent/20 text-accent px-4 py-1 rounded-lg text-sm font-black uppercase tracking-widest mb-6">Saison 2025/2026</div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-4">L'Effectif <span className="text-accent">Élite</span></h1>
          <p className="text-green-50/60 text-lg max-w-xl mx-auto font-medium">Découvrez les talents qui façonnent le futur du Racing Club Academy.</p>
        </div>
      </header>

      <main className="container mx-auto px-6 -mt-16 pb-32 relative z-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {['Tous', 'U19', 'U17', 'Gardiens', 'Défenseurs', 'Milieux', 'Attaquants'].map((filter) => (
            <button key={filter} className="bg-white px-6 py-3 rounded-xl sport-shadow font-bold text-sm uppercase tracking-wider hover:bg-primary hover:text-white transition-all active:scale-95">
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player) => (
            <div key={player.id} className="group bg-white rounded-[2rem] overflow-hidden sport-shadow border border-slate-100 transition-all hover:-translate-y-2">
              <div className="relative aspect-[4/3] bg-slate-100">
                {/* Jersey Number Background */}
                <span className="absolute bottom-0 right-0 text-[12rem] font-black leading-none text-slate-200 pointer-events-none translate-y-1/4 translate-x-1/4">
                  {player.number}
                </span>
                
                {/* Stats Badge */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="bg-primary text-white p-2 rounded-xl flex flex-col items-center shadow-lg shadow-green-900/40">
                    <span className="text-xs font-black leading-none mb-1">OVR</span>
                    <span className="text-2xl font-black leading-none">{player.rating}</span>
                  </div>
                  <div className="bg-accent text-green-950 p-2 rounded-xl flex items-center justify-center">
                    <Zap className="h-5 w-5 fill-current" />
                  </div>
                </div>

                {/* Status Tag */}
                <div className="absolute bottom-6 left-6">
                  <span className="bg-green-950/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-white/20">
                    {player.status}
                  </span>
                </div>
                
                {/* Mock Avatar Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                   <FootballIcon className="w-full h-full text-slate-200/50" />
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-black text-primary uppercase tracking-widest mb-1 block">{player.position} • {player.category}</span>
                    <h3 className="text-2xl font-bold font-display uppercase tracking-tight">{player.name}</h3>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl">
                    <Shield className="h-6 w-6 text-slate-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                   <div className="text-center">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Matchs</span>
                      <span className="text-lg font-bold font-display">24</span>
                   </div>
                   <div className="text-center border-x border-slate-100">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Buts</span>
                      <span className="text-lg font-bold font-display">{player.position === 'Attaquant' ? '12' : '2'}</span>
                   </div>
                   <div className="text-center">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Passes</span>
                      <span className="text-lg font-bold font-display">5</span>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white py-12 border-t text-center">
         <p className="text-slate-400 font-medium">© 2026 Racing Club Academy • L'Elite de Demain</p>
      </footer>
    </div>
  )
}
