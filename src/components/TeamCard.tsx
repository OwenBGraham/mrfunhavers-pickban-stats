import { TeamStatistics } from "@/types/tournament";

interface TeamCardProps {
  teamName: string;
  stats: {
    wins: number;
    losses: number;
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  };
}

export const TeamCard = ({ teamName, stats }: TeamCardProps) => {
  const totalMatches = stats.wins + stats.losses;
  const winRate = totalMatches > 0 ? (stats.wins / totalMatches) * 100 : 0;
  const mostPlayedAgents = Object.entries(stats.agentPicks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name, picks]) => ({ name, picks }));

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">{teamName}</h2>
      
      <div className="space-y-4">
        <div>
          <p className="text-gray-400">Total Matches</p>
          <p className="text-2xl font-bold text-white">{totalMatches}</p>
        </div>
        
        <div>
          <p className="text-gray-400">Win Rate</p>
          <p className="text-2xl font-bold text-white">{winRate.toFixed(1)}%</p>
        </div>
        
        <div>
          <p className="text-gray-400">Most Played Agents</p>
          <div className="mt-2 space-y-2">
            {mostPlayedAgents.map((agent, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-white">{agent.name}</span>
                <span className="text-gray-400">{agent.picks} picks</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 