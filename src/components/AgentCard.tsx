import Link from 'next/link';
import { AgentStatistics } from '@/types/valorant';
import { getAgentImage } from '@/services/agent/utils/agentUtils';

interface AgentCardProps {
  agent: string;
  stats: AgentStatistics;
  sortOption?: 'picks-desc' | 'picks-asc' | 'bans-desc' | 'bans-asc';
}

export function AgentCard({ agent, stats, sortOption = 'picks-desc' }: AgentCardProps) {
  const agentImage = getAgentImage(agent);
  const isSortingByBans = sortOption.startsWith('bans');

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
          </div>
        </div>
      </div>
    </Link>
  );
} 