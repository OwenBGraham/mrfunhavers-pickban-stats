import { TeamStatistics } from "@/types/tournament";

interface TeamCardProps {
  teamName: string;
  stats: {
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  };
}

export const TeamCard = ({ teamName, stats }: TeamCardProps) => {
  // Calculate most played agents (top 3 by picks)
  const mostPlayedAgents = Object.entries(stats.agentPicks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // Calculate most banned agents (top 3 by bans)
  const mostBannedAgents = Object.entries(stats.agentBans)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-3">{teamName}</h2>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300">Most Played Agents</h3>
          <div className="space-y-1">
            {mostPlayedAgents.map(([agent, picks], index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white text-sm">{agent}</span>
                <span className="text-gray-400 text-sm">{picks} picks</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-300">Most Banned Agents</h3>
          <div className="space-y-1">
            {mostBannedAgents.map(([agent, bans], index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white text-sm">{agent}</span>
                <span className="text-gray-400 text-sm">{bans} bans</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 