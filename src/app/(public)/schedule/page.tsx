import { Navbar } from '@/components/public/Navbar'
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react'

export default function SchedulePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-20 bg-gray-50">
        <div className="container px-4">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Agenda & Calendrier</h1>
            <p className="text-gray-600 max-w-xl">Suivez les prochaines rencontres et séances d'entraînement de nos équipes.</p>
          </header>

          <div className="max-w-3xl mx-auto space-y-6">
            {/* Example Match Item */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 bg-green-50 text-green-600 rounded-2xl flex flex-col items-center justify-center font-bold">
                  <span className="text-sm">MAI</span>
                  <span className="text-2xl leading-none">15</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">vs Élite Football Club</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 14:30</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Stade Municipal</span>
                  </div>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">Match Amical</span>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-gray-400 py-20 border-dashed">
              <div className="text-center">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Aucun autre événement prévu pour le moment.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
