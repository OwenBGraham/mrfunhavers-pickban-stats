import { AgentStats } from '@/types/agent';

interface MapStatsProps {
  agentStats: Record<string, AgentStats>;
  mapName: string;
}

export const MapStats = ({ agentStats, mapName }: MapStatsProps) => {
  // Filter stats for the specific map
  const mapStats = Object.entries(agentStats).filter(([_, stats]) => 
    stats.mapWinRates?.[mapName] !== undefined
  );

  // Calculate map-specific statistics
  const totalMapPicks = mapStats.reduce((sum, [_, stats]) => sum + stats.totalPicks, 0);
  const averageMapWinRate = mapStats.length > 0
    ? mapStats.reduce((sum, [_, stats]) => sum + (stats.mapWinRates?.[mapName] || 0), 0) / mapStats.length
    : 0;

  // Find most picked agent for this map
  const mostPickedAgent = mapStats.reduce<{ name: string; stats: AgentStats }>(
    (max, [name, stats]) => 
      stats.totalPicks > max.stats.totalPicks ? { name, stats } : max,
    { name: '', stats: { totalPicks: 0 } as AgentStats }
  );

  // Find highest win rate agent for this map
  const highestWinRateAgent = mapStats.reduce<{ name: string; stats: AgentStats }>(
    (max, [name, stats]) => 
      (stats.mapWinRates?.[mapName] || 0) > (max.stats.mapWinRates?.[mapName] || 0)
        ? { name, stats }
        : max,
    { name: '', stats: { mapWinRates: {} } as AgentStats }
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">{mapName} Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Map Picks */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Total Map Picks</h3>
          <p className="text-3xl font-bold text-white">{totalMapPicks}</p>
        </div>

        {/* Average Map Win Rate */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Average Map Win Rate</h3>
          <p className="text-3xl font-bold text-white">{averageMapWinRate.toFixed(1)}%</p>
        </div>

        {/* Number of Agents Used */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Agents Used</h3>
          <p className="text-3xl font-bold text-white">{mapStats.length}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Picked Agent for Map */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Most Picked Agent</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-white">{mostPickedAgent.name}</p>
            <p className="text-lg text-gray-300">{mostPickedAgent.stats.totalPicks} picks</p>
          </div>
        </div>

        {/* Highest Win Rate Agent for Map */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-300 text-sm mb-1">Highest Win Rate</h3>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-white">{highestWinRateAgent.name}</p>
            <p className="text-lg text-gray-300">
              {(highestWinRateAgent.stats.mapWinRates?.[mapName] || 0).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 