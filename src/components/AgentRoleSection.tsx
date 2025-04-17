import { Agent } from '@/types/valorant';
import { AgentRole } from '@/types/valorant';
import { groupAgentsByRole } from '@/services/agent';
import { agentPicks, agentBans } from '@/services/tournament/tournamentData';
import AgentCard from './AgentCard';

interface AgentRoleSectionProps {
  agents: Agent[];
  agentStats: Record<string, number>;
}

export function AgentRoleSection({ agents, agentStats }: AgentRoleSectionProps) {
  const agentsByRole = groupAgentsByRole(agents);

  // Sort agents within each role by their pick count
  Object.keys(agentsByRole).forEach(role => {
    agentsByRole[role as AgentRole].sort((a, b) => {
      const aPicks = agentStats[a.name] || 0;
      const bPicks = agentStats[b.name] || 0;
      return bPicks - aPicks;
    });
  });

  return (
    <div className="space-y-4">
      {Object.entries(agentsByRole).map(([role, roleAgents]) => (
        <div key={role} className="bg-gray-900 rounded-lg p-3">
          <h2 className="text-lg font-semibold mb-2 text-white">{role}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            {roleAgents.map((agent) => (
              <AgentCard
                key={agent.name}
                agent={agent}
                stats={{
                  agent: agent.name,
                  totalPicks: agentPicks[agent.name] || 0,
                  totalBans: agentBans[agent.name] || 0,
                  pickRate: 0,
                  firstPickRate: 0,
                  teamWinRates: {}
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 