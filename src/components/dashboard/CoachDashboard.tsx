import { LayoutDashboard, Users, Calendar, Settings, TrendingUp, Bell, ChevronRight, Search, Plus, Trophy } from 'lucide-react'
import Link from 'next/link'
import { FootballIcon } from '@/components/icons/FootballIcon'

export const CoachDashboard = ({ academyId }: { academyId: string }) => {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-green-950 text-white flex flex-col p-8 relative overflow-hidden">
        {/* Abstract Pitch pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="flex items-center space-x-3 mb-16 relative z-10">
          <div className="bg-accent p-2 rounded-xl">
             <LayoutDashboard className="h-6 w-6 text-green-950" />
          </div>
          <span className="font-display font-black text-xl uppercase tracking-tighter">COACH PANEL</span>
        </div>

        <nav className="space-y-4 flex-grow relative z-10">
          {[
            { icon: LayoutDashboard, label: 'Overview', active: true },
            { icon: Users, label: 'Effectif', active: false },
            { icon: Calendar, label: 'Matchs', active: false },
            { icon: TrendingUp, label: 'Statistiques', active: false },
            { icon: Settings, label: 'Paramètres', active: false },
          ].map((item) => (
            <Link key={item.label} href="#" className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${item.active ? 'bg-accent text-green-950 font-bold sport-shadow' : 'hover:bg-white/5 text-green-50/60'}`}>
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="bg-white/5 p-6 rounded-3xl border border-white/10 relative z-10 mt-auto">
          <div className="flex items-center space-x-4 mb-4">
             <div className="h-10 w-10 rounded-full bg-accent" />
             <div>
                <p className="text-sm font-bold leading-none">Jean Dupont</p>
                <p className="text-[10px] text-green-50/50 uppercase tracking-widest font-black mt-1">Head Coach U19</p>
             </div>
          </div>
          <button className="w-full bg-red-800/20 hover:bg-red-800 text-red-500 hover:text-white py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-black uppercase tracking-tighter mb-2">Bonjour, <span className="text-primary">Coach</span></h1>
            <p className="text-slate-400 font-medium">Voici le programme de votre académie pour aujourd'hui.</p>
          </div>
          
          <div className="flex items-center space-x-6">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" placeholder="Rechercher..." className="bg-white border-slate-100 pl-12 pr-6 py-3 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary outline-none w-64 sport-shadow transition-all group-focus-within:w-80" />
             </div>
             <button className="bg-white p-3 rounded-2xl sport-shadow relative">
                <Bell className="h-6 w-6 text-slate-400" />
                <span className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
             </button>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {[
            { label: 'Joueurs', value: '24', icon: Users, color: 'bg-green-50 text-green-600' },
            { label: 'Matchs (Mois)', value: '6', icon: Calendar, color: 'bg-blue-50 text-blue-600' },
            { label: 'Présence Avg', value: '94%', icon: TrendingUp, color: 'bg-yellow-50 text-yellow-600' },
            { label: 'Victoires', value: '82%', icon: Trophy, color: 'bg-accent/10 text-yellow-700' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-8 rounded-[2rem] sport-shadow border border-slate-100 flex flex-col items-center justify-center text-center">
              <div className={`p-4 rounded-2xl mb-4 ${stat.color}`}>
                 <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-3xl font-black font-display mb-1 tracking-tight">{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Upcoming Match Card */}
          <div className="lg:col-span-2 bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden sport-shadow">
            <div className="absolute top-0 right-0 p-12 opacity-10">
               <FootballIcon className="h-64 w-64" />
            </div>
            
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-12">
                  <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-white/10">Prochain Match • J-4</span>
                  <button className="text-white hover:text-accent transition-colors"><ChevronRight /></button>
               </div>
               
               <div className="flex items-center justify-center gap-12 text-center">
                  <div className="flex flex-col items-center">
                     <div className="h-24 w-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-4">
                        <FootballIcon className="h-12 w-12" />
                     </div>
                     <span className="font-display font-black text-xl uppercase tracking-tighter">Racing Club</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                     <span className="text-6xl font-black font-display text-accent mb-2">VS</span>
                     <span className="text-xs font-black uppercase tracking-widest text-green-50/50">15 JUIN • 15:00</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                     <div className="h-24 w-24 bg-red-800/20 rounded-[2rem] flex items-center justify-center mb-4 border border-red-500/20">
                        <Trophy className="h-12 w-12 text-red-500" />
                     </div>
                     <span className="font-display font-black text-xl uppercase tracking-tighter">AS SAINT-ETIENNE</span>
                  </div>
               </div>
               
               <div className="mt-12 flex justify-center">
                  <button className="btn-accent px-12 py-4 shadow-xl shadow-yellow-400/20">Gérer les convocations</button>
               </div>
            </div>
          </div>

          {/* Player Feed */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 sport-shadow">
             <div className="flex items-center justify-between mb-8">
                <h3 className="font-display font-black uppercase tracking-tight text-xl">Dernières Activités</h3>
                <Plus className="h-5 w-5 text-primary cursor-pointer" />
             </div>
             
             <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                     <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-primary">#{i * 7}</div>
                     <div className="flex-grow">
                        <p className="text-sm font-bold">Lucas Martin</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">A accepté la convocation</p>
                     </div>
                     <span className="text-[10px] text-slate-300 font-bold">2h</span>
                  </div>
                ))}
             </div>
             
             <button className="w-full mt-10 text-sm font-black text-primary uppercase tracking-widest hover:underline transition-all">Voir tout l'historique</button>
          </div>
        </div>
      </main>
    </div>
  )
}
