'use client'

import { Bell } from 'lucide-react'
import { useState } from 'react'

export const NotificationBell = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all relative group"
      >
        <Bell className="h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
        <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-slate-50" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-96 bg-white rounded-3xl sport-shadow border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
          <div className="bg-primary p-6 text-white flex justify-between items-center">
            <h4 className="font-display font-black uppercase tracking-widest text-sm">Notifications</h4>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">3 Nouvelles</span>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`p-6 border-b border-slate-50 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer ${i === 1 ? 'bg-green-50/30' : ''}`}>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${i === 1 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1">Nouvelle convocation reçue</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Le coach Jean vous a convoqué pour le match contre l'ASSE le 15 Juin.</p>
                  <span className="text-[10px] text-slate-300 font-bold mt-3 block uppercase tracking-widest">Il y a {i * 10} min</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full py-4 bg-slate-50 text-xs font-black text-primary uppercase tracking-widest hover:bg-slate-100 transition-colors">
            Marquer tout comme lu
          </button>
        </div>
      )}
    </div>
  )
}
