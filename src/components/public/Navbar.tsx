import Link from 'next/link'
import { FootballIcon } from '@/components/icons/FootballIcon' // To be created

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <FootballIcon className="h-8 w-8 text-green-600" />
          <span className="font-bold text-xl hidden md:inline-block">Racing Club Academy</span>
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/squad" className="hover:text-green-600 transition-colors">Effectif</Link>
          <Link href="/schedule" className="hover:text-green-600 transition-colors">Agenda</Link>
          <Link href="/login" className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors">Espace Pro</Link>
        </div>
      </div>
    </nav>
  )
}
