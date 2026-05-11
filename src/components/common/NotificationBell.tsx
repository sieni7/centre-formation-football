'use client'

import { Bell } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function NotificationBell({ userId }: { userId: string }) {
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Initial fetch
    const fetchUnread = async () => {
      const { count } = await supabase
        .from('notification_recipients')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .is('read_at', null)
      
      setUnreadCount(count || 0)
    }

    fetchUnread()

    // Realtime subscription
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notification_recipients', filter: `user_id=eq.${userId}` },
        () => setUnreadCount((prev) => prev + 1)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  return (
    <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
      <Bell className="h-6 w-6 text-gray-600" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}
