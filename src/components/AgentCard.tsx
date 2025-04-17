import { Agent, AgentStatistics } from '@/types/valorant';
import { getAgentRoleColor, calculateAverageWinRate } from '@/services/agent';

interface AgentCardProps {
  agent: Agent;
  stats: AgentStatistics;
}

export default function AgentCard({ agent, stats }: AgentCardProps) {
  const winRate = calculateAverageWinRate(stats);
  const roleColor = getAgentRoleColor(agent.role);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-full ${roleColor}`} />
        <div>
          <h3 className="text-lg font-semibold">{agent.name}</h3>
          <p className="text-gray-600">{agent.role}</p>
        </div>
      </div>
      <div className="mt-4">
        <p>Picks: {stats.totalPicks}</p>
        <p>Win Rate: {winRate.toFixed(1)}%</p>
      </div>
    </div>
  );
} 