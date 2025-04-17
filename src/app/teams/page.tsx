import { TeamCard } from "../../components/TeamCard";
import { teamStats } from "@/services/tournament/tournamentData";

export default function TeamsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Team Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(teamStats).map(([teamName, stats]) => (
          <TeamCard
            key={teamName}
            teamName={teamName}
            stats={stats}
          />
        ))}
      </div>
    </div>
  );
} 