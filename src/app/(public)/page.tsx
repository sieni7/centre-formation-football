import { Navbar } from '@/components/public/Navbar'
import Link from 'next/link'
import { ArrowRight, Trophy, Users, Calendar, Star, ChevronRight } from 'lucide-react'
import { FootballIcon } from '@/components/icons/FootballIcon'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-green-900">
          {/* Pitch Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container relative z-20 px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">Le futur du football commence ici</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-black text-white mb-8 tracking-tighter leading-[0.9]">
              DOMINEZ LE <br />
              <span className="text-accent underline decoration-green-500 underline-offset-8">TERRAIN</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-green-50/80 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Une formation d'élite, des coachs certifiés et un parcours professionnel pour les talents de demain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link href="/squad" className="btn-accent text-lg px-10 py-5 group">
                Rejoindre l'élite 
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/schedule" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 rounded-xl font-bold backdrop-blur-md transition-all flex items-center justify-center gap-2">
                Voir l'agenda
              </Link>
            </div>
          </div>
          
          {/* Bottom Fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20" />
        </section>

        {/* Stats Grid */}
        <section className="py-24 -mt-20 relative z-30">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-3xl sport-shadow border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                <div className="h-20 w-20 bg-green-50 text-primary rounded-2xl flex items-center justify-center mb-8 rotate-3 hover:rotate-0 transition-transform">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-display uppercase tracking-tight">Formation Élite</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Programmes personnalisés adaptés à chaque catégorie d'âge, du U9 au U19.
                </p>
              </div>
              
              <div className="bg-primary p-10 rounded-3xl sport-shadow text-white flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                <div className="h-20 w-20 bg-white/10 text-accent rounded-2xl flex items-center justify-center mb-8 -rotate-3 hover:rotate-0 transition-transform">
                  <Trophy className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-display uppercase tracking-tight">Success Story</h3>
                <p className="text-green-50/70 leading-relaxed font-medium">
                  Plus de 45 joueurs formés évoluant aujourd'hui dans les plus grands clubs européens.
                </p>
              </div>
              
              <div className="bg-white p-10 rounded-3xl sport-shadow border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
                <div className="h-20 w-20 bg-yellow-50 text-yellow-600 rounded-2xl flex items-center justify-center mb-8 rotate-6 hover:rotate-0 transition-transform">
                  <Calendar className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-display uppercase tracking-tight">Suivi Digital</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  Une application dédiée pour les parents et les joueurs afin de suivre l'agenda en temps réel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4">Highlights</h2>
                <div className="h-2 w-24 bg-accent rounded-full" />
              </div>
              <Link href="/squad" className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                Voir tout l'effectif <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group relative bg-white rounded-3xl overflow-hidden sport-shadow border border-slate-100">
                  <div className="aspect-[4/5] bg-slate-200 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-black text-primary italic text-xl">
                    #{i * 7}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1 block">Milieu de terrain</span>
                    <h4 className="text-xl font-bold font-display uppercase">Lucas Silva</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-950 text-white py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-8">
                <div className="bg-accent p-2 rounded-xl">
                  <FootballIcon className="h-6 w-6 text-green-950" />
                </div>
                <span className="font-display font-black text-2xl uppercase tracking-tighter">Racing Club Academy</span>
              </Link>
              <p className="text-green-50/50 max-w-sm leading-relaxed">
                Rejoignez la meilleure académie de formation du pays. Notre mission est d'élever le niveau du football local en formant des athlètes complets.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-accent">Navigation</h4>
              <ul className="space-y-4 text-green-50/70">
                <li><Link href="/squad" className="hover:text-white transition-colors">Effectif</Link></li>
                <li><Link href="/schedule" className="hover:text-white transition-colors">Agenda</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Espace Pro</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-sm text-accent">Contact</h4>
              <ul className="space-y-4 text-green-50/70">
                <li>Stade de la Paix</li>
                <li>contact@racingclub.com</li>
                <li>+225 07 00 00 00 00</li>
              </ul>
            </div>
          </div>
          <div className="h-px w-full bg-white/5 mb-8" />
          <p className="text-center text-green-50/30 text-sm">© 2026 Racing Club Academy. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
