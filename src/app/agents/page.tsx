import AgentCard from "@/components/AgentCard";
import { AgentRoleSection } from "@/components/AgentRoleSection";
import { agentPicks, agentBans } from "@/services/tournament";
import { getAgentData } from "@/services/agent";
import { Agent } from "@/types/valorant";

export default function AgentsPage() {
  const agents = Object.keys(agentPicks)
    .map(name => getAgentData(name))
    .filter((agent): agent is Agent => agent !== null);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Agent Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => (
          <AgentCard
            key={agent.name}
            agent={agent}
            stats={{
              agent: agent.name,
              totalPicks: agentPicks[agent.name],
              winRate: 0,
              pickRate: 0,
              firstPickRate: 0,
              teamWinRates: {}
            }}
          />
        ))}
      </div>

      <AgentRoleSection
        agents={agents}
        agentStats={agentPicks}
      />
    </div>
  );
} 