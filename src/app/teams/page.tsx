import { TeamStats } from "@/components/TeamStats";
import { mockAgentStats } from "@/lib/mockData";
import { mockTeams } from "@/lib/mockData";

export default function TeamsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Team Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTeams.map((team) => (
          <TeamStats
            key={team.id}
            agentStats={mockAgentStats}
            teamName={team.name}
          />
        ))}
      </div>
    </div>
  );
} 