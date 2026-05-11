import { Navbar } from '@/components/public/Navbar'
import Link from 'next/link'
import { ArrowRight, Trophy, Users, Calendar } from 'lucide-react'
import { FootballIcon } from '@/components/icons/FootballIcon'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-navy-900 text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />
          <div className="container relative z-20 px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              L'Excellence au Service du <span className="text-green-500">Football</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200">
              Formez les talents de demain avec une rigueur professionnelle et une passion dévouée.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/squad" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition-all">
                Découvrir l'Effectif <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/schedule" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-semibold backdrop-blur-md transition-all">
                Voir l'Agenda
              </Link>
            </div>
          </div>
        </section>

        {/* Stats/Features Section */}
        <section className="py-24 bg-gray-50">
          <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Formation de Pointe</h3>
                <p className="text-gray-600">Un encadrement professionnel pour chaque catégorie d'âge.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Trophy className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Succès Garantis</h3>
                <p className="text-gray-600">Plusieurs titres régionaux et nationaux remportés.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Suivi Rigoureux</h3>
                <p className="text-gray-600">Un calendrier de matchs et d'entraînements optimisé.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy-950 text-white py-12 border-t border-white/10">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <FootballIcon className="h-6 w-6 text-green-500" />
            <span className="font-bold text-lg">Racing Club Academy</span>
          </div>
          <p className="text-gray-400 text-sm">© 2026 Racing Club Academy. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
