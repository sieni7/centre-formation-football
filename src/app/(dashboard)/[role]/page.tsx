import { CoachDashboard } from "@/components/dashboard/CoachDashboard";
import { PlayerDashboard } from "@/components/dashboard/PlayerDashboard";
// import { ParentDashboard } from "@/components/dashboard/ParentDashboard";

export default async function DashboardPage({ params }: { params: { role: string } }) {
  const { role } = await params;
  
  // In a real app, we'd get these IDs from the session/profile
  const academyId = "demo-academy-id"; 
  const playerId = "demo-player-id";

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      {role === "COACH" || role === "ACADEMY_ADMIN" ? (
        <CoachDashboard academyId={academyId} />
      ) : role === "PLAYER" ? (
        <PlayerDashboard playerId={playerId} />
      ) : (
        <div className="p-8 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
          <h1 className="text-2xl font-bold capitalize mb-4">Espace {role}</h1>
          <p className="text-gray-600">Le tableau de bord pour ce rôle est en cours de déploiement.</p>
        </div>
      )}
    </div>
  )
}
