import { Agent, AgentStatistics } from '@/types/valorant';
import { calculateAverageWinRate } from '@/utils/agents/agentUtils';

interface AgentCardProps {
  agent: Agent;
  stats: AgentStatistics;
}

export function AgentCard({ agent, stats }: AgentCardProps) {
  const averageWinRate = calculateAverageWinRate(stats);

  return (
    <div className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">{agent.name}</h3>
        <span className="px-2 py-1 text-sm rounded-full bg-white/10">
          {agent.role}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-400">Pick Rate</p>
            <p className="text-lg font-medium">{stats.pickRate.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Win Rate</p>
            <p className="text-lg font-medium">{averageWinRate.toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-400">Total Picks</p>
            <p className="text-lg font-medium">{stats.totalPicks}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">First Pick Rate</p>
            <p className="text-lg font-medium">{stats.firstPickRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
} 