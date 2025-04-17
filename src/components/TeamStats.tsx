import { AgentStats } from '@/types/agent';

interface TeamStatsProps {
  agentStats: Record<string, AgentStats>;
  teamName: string;
}

export const TeamStats = ({ agentStats, teamName }: TeamStatsProps) => {
  // Filter stats for the specific team
  const teamStats = Object.entries(agentStats).filter(([_, stats]) => 
    stats.teamWinRates[teamName] !== undefined
  );

  // Calculate team-specific statistics
  const totalTeamPicks = teamStats.reduce((sum, [_, stats]) => sum + stats.totalPicks, 0);
  const averageTeamWinRate = teamStats.length > 0
    ? teamStats.reduce((sum, [_, stats]) => sum + (stats.teamWinRates[teamName] || 0), 0) / teamStats.length
    : 0;

  // Find most picked agent for this team
  const mostPickedAgent = teamStats.reduce((max, [name, stats]) => 
    stats.totalPicks > max.stats.totalPicks ? { name, stats } : max,
    { name: '', stats: { totalPicks: 0 } as AgentStats }
  );

  // Find highest win rate agent for this team
  const highestWinRateAgent = teamStats.reduce((max, [name, stats]) => 
    (stats.teamWinRates[teamName] || 0) > (max.stats.teamWinRates[teamName] || 0) 
      ? { name, stats } 
      : max,
    { name: '', stats: { teamWinRates: { [teamName]: 0 } } as AgentStats }
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">{teamName} Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Team Picks */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Total Team Picks</h3>
          <p className="text-3xl font-bold text-white">{totalTeamPicks}</p>
        </div>

        {/* Average Team Win Rate */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Average Team Win Rate</h3>
          <p className="text-3xl font-bold text-white">{averageTeamWinRate.toFixed(1)}%</p>
        </div>

        {/* Number of Agents Used */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Agents Used</h3>
          <p className="text-3xl font-bold text-white">{teamStats.length}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Picked Agent for Team */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Most Picked Agent</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-white">{mostPickedAgent.name}</p>
            <p className="text-lg text-gray-300">{mostPickedAgent.stats.totalPicks} picks</p>
          </div>
        </div>

        {/* Highest Win Rate Agent for Team */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Highest Win Rate</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-white">{highestWinRateAgent.name}</p>
            <p className="text-lg text-gray-300">
              {(highestWinRateAgent.stats.teamWinRates[teamName] || 0).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 