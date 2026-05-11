import { Navbar } from '@/components/public/Navbar'
import { Skeleton } from '@/components/ui/Skeleton'

export default function SquadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-20 bg-gray-50">
        <div className="container px-4">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Notre Effectif</h1>
            <p className="text-gray-600 max-w-xl">Découvrez les talents qui portent haut les couleurs de la Racing Club Academy.</p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Placeholder Skeletons for now */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-4">
                <Skeleton className="h-48 w-full rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
