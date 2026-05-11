import { CoachDashboard } from "@/components/dashboard/CoachDashboard";
import { PlayerDashboard } from "@/components/dashboard/PlayerDashboard";

export default async function DashboardPage({ params }: { params: { role: string } }) {
  const { role } = await params;
  
  const academyId = "demo-academy-id"; 
  const playerId = "demo-player-id";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {role === "COACH" || role === "ACADEMY_ADMIN" ? (
        <CoachDashboard academyId={academyId} />
      ) : role === "PLAYER" ? (
        <PlayerDashboard playerId={playerId} />
      ) : (
        <div className="p-12 text-center bg-white rounded-[2rem] sport-shadow border border-slate-100 max-w-2xl mx-auto mt-20">
          <h1 className="text-4xl font-display font-black uppercase tracking-tighter mb-4">Espace {role}</h1>
          <p className="text-slate-500 font-medium">Le tableau de bord pour ce rôle est en cours de déploiement.</p>
        </div>
      )}
    </div>
  )
}
