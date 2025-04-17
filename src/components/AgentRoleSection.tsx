import { Agent, AgentRole } from '@/types/valorant';
import { AgentCard } from './AgentCard';
import { groupAgentsByRole } from '@/utils/agents/agentUtils';

interface AgentRoleSectionProps {
  agents: Agent[];
  agentStats: Record<string, any>; // We'll type this properly when we have the actual data structure
}

export function AgentRoleSection({ agents, agentStats }: AgentRoleSectionProps) {
  const agentsByRole = groupAgentsByRole(agents);

  return (
    <div className="space-y-8">
      {Object.entries(agentsByRole).map(([role, roleAgents]) => (
        <div key={role}>
          <h2 className="text-2xl font-semibold mb-4">{role}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roleAgents.map((agent) => (
              <AgentCard
                key={agent.name}
                agent={agent}
                stats={agentStats[agent.name]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 