import { Agent, AgentStatistics } from '@/types/valorant';
import Link from 'next/link';

interface AgentCardProps {
  agent: Agent;
  stats: AgentStatistics;
}

export default function AgentCard({ agent, stats }: AgentCardProps) {
  return (
    <Link href={`/agents/${agent.name.toLowerCase()}`} className="block">
      <div className="bg-gray-800 rounded-lg shadow-md p-3 text-white hover:bg-gray-700 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
            <p className="text-xs text-gray-300">{agent.role}</p>
          </div>
          <div className="flex space-x-4 text-sm">
            <div className="text-center">
              <p className="text-gray-400 text-xs">Picks</p>
              <p className="font-medium">{stats.totalPicks}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs">Bans</p>
              <p className="font-medium">{stats.totalBans}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 