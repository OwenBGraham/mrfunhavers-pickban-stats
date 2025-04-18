import Link from 'next/link';
import { AgentStatistics } from '@/types/valorant';
import { getAgentImage } from '@/services/agent/utils/agentUtils';

interface AgentCardProps {
  agent: string;
  stats: AgentStatistics;
}

export function AgentCard({ agent, stats }: AgentCardProps) {
  const agentImage = getAgentImage(agent);

  return (
    <Link href={`/agents/${agent.toLowerCase()}`}>
      <div className="bg-gray-800 rounded-lg p-2 hover:bg-gray-700 transition-colors cursor-pointer">
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
              <div className="flex flex-col items-end">
                <p className="text-xs text-gray-400">Picks: {stats.totalPicks}</p>
                <p className="text-xs text-gray-400">Bans: {stats.totalBans}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 