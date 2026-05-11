import { LayoutDashboard, Star, Calendar, MessageSquare, Activity, ChevronRight, Trophy, Bell, Zap } from 'lucide-react'
import Link from 'next/link'

export const PlayerDashboard = ({ playerId }: { playerId: string }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mini Sidebar */}
      <aside className="w-24 bg-green-950 flex flex-col items-center py-10 space-y-10 border-r border-white/5">
        <div className="bg-accent p-2 rounded-xl">
           <Zap className="h-6 w-6 text-green-950 fill-current" />
        </div>
        
        <nav className="flex flex-col space-y-8">
           {[LayoutDashboard, Calendar, Star, Activity, MessageSquare].map((Icon, idx) => (
             <button key={idx} className={`p-4 rounded-2xl transition-all ${idx === 0 ? 'bg-accent text-green-950 sport-shadow' : 'text-green-50/40 hover:bg-white/5 hover:text-white'}`}>
                <Icon className="h-6 w-6" />
             </button>
           ))}
        </nav>
        
        <div className="mt-auto">
           <div className="h-12 w-12 rounded-2xl bg-white/10 border border-white/10" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="bg-primary text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Catégorie U19</span>
               <span className="bg-yellow-400 text-green-950 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Elite Talent</span>
            </div>
            <h1 className="text-5xl font-display font-black uppercase tracking-tighter">Bienvenue, <span className="text-primary">Lucas</span></h1>
          </div>
          
          <div className="flex gap-4">
             <button className="bg-white p-4 rounded-3xl sport-shadow relative">
                <Bell className="h-6 w-6 text-slate-400" />
                <span className="absolute top-4 right-4 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Performance Summary */}
          <div className="lg:col-span-8 space-y-10">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'OVR Rating', value: '92', icon: Star, color: 'text-accent' },
                  { label: 'Buts (Saison)', value: '14', icon: Trophy, color: 'text-yellow-600' },
                  { label: 'Matchs Joués', value: '28', icon: Activity, color: 'text-primary' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] sport-shadow border border-slate-100 relative overflow-hidden">
                     <stat.icon className={`absolute -right-4 -bottom-4 h-24 w-24 opacity-5 ${stat.color}`} />
                     <span className="text-sm font-black uppercase tracking-widest text-slate-400 block mb-4">{stat.label}</span>
                     <span className="text-5xl font-black font-display tracking-tight">{stat.value}</span>
                  </div>
                ))}
             </div>

             {/* Next Convocation Card */}
             <div className="bg-primary rounded-[3rem] p-10 text-white sport-shadow flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.1),transparent)]" />
                
                <div>
                   <span className="text-xs font-black uppercase tracking-[0.2em] text-accent block mb-2">Convocation reçue</span>
                   <h2 className="text-4xl font-display font-black uppercase tracking-tighter mb-4">VS AS SAINT-ETIENNE</h2>
                   <div className="flex gap-6 text-green-50/60 text-sm font-bold">
                      <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> 15 JUIN</span>
                      <span className="flex items-center gap-2"><Trophy className="h-4 w-4" /> Championnat</span>
                   </div>
                </div>
                
                <div className="flex gap-4 relative z-10">
                   <button className="bg-accent text-green-950 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all sport-shadow">Confirmer</button>
                   <button className="bg-white/10 hover:bg-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all">Décliner</button>
                </div>
             </div>

             {/* Recent Stats Chart Placeholder */}
             <div className="bg-white rounded-[3rem] p-10 border border-slate-100 sport-shadow">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-2xl font-black font-display uppercase tracking-tight">Courbe de progression</h3>
                   <div className="flex gap-2">
                      <button className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-black uppercase tracking-widest">Saison</button>
                      <button className="px-4 py-2 text-slate-400 text-xs font-black uppercase tracking-widest">Mois</button>
                   </div>
                </div>
                <div className="h-64 w-full bg-slate-50 rounded-[2rem] flex items-end justify-between p-8 gap-4">
                   {[40, 60, 45, 80, 70, 95, 85].map((h, i) => (
                      <div key={i} className="flex-grow bg-primary/20 rounded-full relative group">
                         <div style={{ height: `${h}%` }} className="absolute bottom-0 left-0 right-0 bg-primary rounded-full transition-all group-hover:bg-accent" />
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Player Identity Card */}
          <div className="lg:col-span-4 space-y-10">
             <div className="bg-white rounded-[3rem] p-10 border border-slate-100 sport-shadow text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-32 bg-primary" />
                <div className="relative z-10 pt-12 flex flex-col items-center">
                   <div className="h-32 w-32 rounded-full border-8 border-white bg-slate-200 shadow-xl mb-6 flex items-center justify-center font-black text-4xl text-slate-400">#10</div>
                   <h3 className="text-3xl font-black font-display uppercase tracking-tighter mb-2">Lucas Martin</h3>
                   <span className="text-primary font-black uppercase tracking-[0.2em] text-xs mb-8">Attaquant • U19 Elite</span>
                   
                   <div className="grid grid-cols-2 gap-4 w-full">
                      <div className="bg-slate-50 p-4 rounded-2xl">
                         <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Âge</span>
                         <span className="font-bold">18 ans</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl">
                         <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Taille</span>
                         <span className="font-bold">182 cm</span>
                      </div>
                   </div>
                   
                   <button className="w-full mt-8 border-2 border-slate-100 py-4 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2 group">
                      Profil complet
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                   </button>
                </div>
             </div>

             {/* Coach Feedback */}
             <div className="bg-green-50 rounded-[3rem] p-10 sport-shadow border border-green-100">
                <h3 className="text-xl font-black font-display uppercase tracking-tight mb-8 flex items-center gap-3 text-green-950">
                   <MessageSquare className="h-5 w-5" /> 
                   Coach Feedback
                </h3>
                <div className="bg-white p-6 rounded-3xl relative sport-shadow mb-6">
                   <div className="absolute -top-3 left-8 w-6 h-6 bg-white rotate-45" />
                   <p className="text-sm font-medium leading-relaxed italic text-slate-600">
                      "Excellente vision de jeu lors du dernier entraînement. Travaille encore tes appels de balle en profondeur pour le prochain match contre l'ASSE."
                   </p>
                </div>
                <div className="flex items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-primary" />
                   <div>
                      <p className="text-xs font-black uppercase tracking-widest text-green-900 leading-none">Coach Jean</p>
                      <span className="text-[10px] text-green-900/50 font-bold">Il y a 20 min</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
