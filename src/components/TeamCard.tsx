import { TeamStatistics } from "@/types/tournament";

interface TeamCardProps {
  teamName: string;
  stats: {
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  };
}

export const TeamCard = ({ teamName, stats }: TeamCardProps) => {
  // Calculate total picks and bans for the team
  const totalPicks = Object.values(stats.agentPicks).reduce((sum, count) => sum + count, 0);
  const totalBans = Object.values(stats.agentBans).reduce((sum, count) => sum + count, 0);
  
  // Calculate pick and ban rates for each agent
  const agentStats = Object.entries(stats.agentPicks).map(([name, picks]) => ({
    name,
    picks,
    bans: stats.agentBans[name] || 0
  }));

  // Sort by picks and get top 3
  const mostPlayedAgents = agentStats
    .sort((a, b) => b.picks - a.picks)
    .slice(0, 3);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">{teamName}</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-400">Total Picks</p>
          <p className="text-2xl font-bold text-white">{totalPicks}</p>
        </div>
        
        <div>
          <p className="text-gray-400">Total Bans</p>
          <p className="text-2xl font-bold text-white">{totalBans}</p>
        </div>
        
        <div>
          <p className="text-gray-400">Most Played Agents</p>
          <div className="mt-2 space-y-2">
            {mostPlayedAgents.map((agent, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-white">{agent.name}</span>
                <span className="text-gray-400">
                  {agent.picks} picks, {agent.bans} bans
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 