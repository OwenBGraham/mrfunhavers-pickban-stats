import { TeamCard } from "../../components/TeamCard";
import { teamStats } from "@/services/tournament/tournamentData";

export default function TeamsPage() {
  // Debug: Log team stats
  console.log('Teams Page - Team Stats:', teamStats);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Team Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(teamStats).map(([teamName, stats]) => {
          // Debug: Log each team's stats
          console.log(`Team ${teamName} stats:`, {
            wins: stats.wins,
            losses: stats.losses,
            totalMatches: stats.wins + stats.losses,
            winRate: stats.wins + stats.losses > 0 ? (stats.wins / (stats.wins + stats.losses)) * 100 : 0
          });

          return (
            <TeamCard
              key={teamName}
              teamName={teamName}
              stats={{
                agentPicks: stats.agentPicks,
                agentBans: stats.agentBans
              }}
            />
          );
        })}
      </div>
    </div>
  );
} 