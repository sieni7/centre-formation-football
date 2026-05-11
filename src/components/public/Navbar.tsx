import Link from 'next/link'
import { FootballIcon } from '@/components/icons/FootballIcon'
import { NotificationBell } from '@/components/common/NotificationBell'

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-3 transition-transform hover:scale-105">
          <div className="bg-primary p-2 rounded-xl sport-shadow">
            <FootballIcon className="h-8 w-8 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl leading-none">RACING CLUB</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Football Academy</span>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/squad" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Effectif</Link>
          <Link href="/schedule" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Agenda</Link>
          
          <div className="flex items-center space-x-4 ml-4">
            <NotificationBell userId="demo-user" />
            <Link href="/login" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-green-800 transition-all active:scale-95 shadow-lg shadow-green-900/20">
              Espace Pro
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
