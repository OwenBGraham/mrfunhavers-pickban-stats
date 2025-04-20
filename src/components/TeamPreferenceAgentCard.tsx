import Link from 'next/link';
import { AgentStatistics } from '@/types/valorant';
import { getAgentImage } from '@/services/agent/utils/agentUtils';

interface TeamPreferenceAgentCardProps {
  agent: string;
  stats: AgentStatistics;
  teamStats: Record<string, {
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  }>;
  type: 'picks' | 'bans';
  sortOption?: 'picks-desc' | 'picks-asc' | 'bans-desc' | 'bans-asc';
}

export function TeamPreferenceAgentCard({ 
  agent, 
  stats, 
  teamStats, 
  type,
  sortOption = 'picks-desc' 
}: TeamPreferenceAgentCardProps) {
  const agentImage = getAgentImage(agent);
  const isSortingByBans = sortOption.startsWith('bans');

  // Get the top team that has picked/banned this agent
  const topTeam = Object.entries(teamStats)
    .map(([teamName, stats]) => ({
      teamName,
      count: type === 'picks' ? stats.agentPicks[agent] || 0 : stats.agentBans[agent] || 0
    }))
    .filter(data => data.count > 0)
    .sort((a, b) => b.count - a.count)[0];

  const StatsDisplay = () => (
    <div className="flex flex-col items-end text-xs text-gray-400">
      {isSortingByBans ? (
        <>
          <div className="flex gap-1">
            <span>Bans:</span>
            <span>{stats.totalBans}</span>
            {stats.banRate > 0 && (
              <span className="text-red-400">({stats.banRate.toFixed(1)}%)</span>
            )}
          </div>
          <div className="flex gap-1">
            <span>Picks:</span>
            <span>{stats.totalPicks}</span>
            {stats.pickRate > 0 && (
              <span className="text-blue-400">({stats.pickRate.toFixed(1)}%)</span>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-1">
            <span>Picks:</span>
            <span>{stats.totalPicks}</span>
            {stats.pickRate > 0 && (
              <span className="text-blue-400">({stats.pickRate.toFixed(1)}%)</span>
            )}
          </div>
          <div className="flex gap-1">
            <span>Bans:</span>
            <span>{stats.totalBans}</span>
            {stats.banRate > 0 && (
              <span className="text-red-400">({stats.banRate.toFixed(1)}%)</span>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <Link href={`/agents/${agent.toLowerCase()}`}>
      <div className="bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition-colors cursor-pointer border border-black/40">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 flex-shrink-0">
            <img
              src={agentImage}
              alt={agent}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-semibold text-white">{agent}</h3>
                <p className="text-xs text-gray-400">{stats.role}</p>
              </div>
              <StatsDisplay />
            </div>
            {topTeam && (
              <div className="mt-2 pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">Top Team:</span>
                    <span className="text-white">{topTeam.teamName}</span>
                  </div>
                  <span className="text-gray-300">{topTeam.count} {type}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 