import { AgentStats } from '../types/agent';

interface StatsSummaryProps {
  agentStats: Record<string, AgentStats>;
}

export const StatsSummary = ({ agentStats }: StatsSummaryProps) => {
  // Calculate overall statistics
  const totalPicks = Object.values(agentStats).reduce((sum, stats) => sum + stats.totalPicks, 0);
  const averageWinRate = Object.values(agentStats).reduce((sum, stats) => sum + stats.winRate, 0) / Object.keys(agentStats).length;
  const averagePickRate = Object.values(agentStats).reduce((sum, stats) => sum + stats.pickRate, 0) / Object.keys(agentStats).length;
  const averageFirstPickRate = Object.values(agentStats).reduce((sum, stats) => sum + stats.firstPickRate, 0) / Object.keys(agentStats).length;

  // Find most picked agent
  const mostPickedAgent = Object.entries(agentStats).reduce((max, [name, stats]) => 
    stats.totalPicks > max.stats.totalPicks ? { name, stats } : max,
    { name: '', stats: { totalPicks: 0 } as AgentStats }
  );

  // Find highest win rate agent
  const highestWinRateAgent = Object.entries(agentStats).reduce((max, [name, stats]) => 
    stats.winRate > max.stats.winRate ? { name, stats } : max,
    { name: '', stats: { winRate: 0 } as AgentStats }
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Overall Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Picks */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Total Picks</h3>
          <p className="text-3xl font-bold text-white">{totalPicks}</p>
        </div>

        {/* Average Win Rate */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Average Win Rate</h3>
          <p className="text-3xl font-bold text-white">{averageWinRate.toFixed(1)}%</p>
        </div>

        {/* Average Pick Rate */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Average Pick Rate</h3>
          <p className="text-3xl font-bold text-white">{averagePickRate.toFixed(1)}%</p>
        </div>

        {/* Average First Pick Rate */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Average First Pick Rate</h3>
          <p className="text-3xl font-bold text-white">{averageFirstPickRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Picked Agent */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Most Picked Agent</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-white">{mostPickedAgent.name}</p>
            <p className="text-lg text-gray-300">{mostPickedAgent.stats.totalPicks} picks</p>
          </div>
        </div>

        {/* Highest Win Rate Agent */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Highest Win Rate</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-white">{highestWinRateAgent.name}</p>
            <p className="text-lg text-gray-300">{highestWinRateAgent.stats.winRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 