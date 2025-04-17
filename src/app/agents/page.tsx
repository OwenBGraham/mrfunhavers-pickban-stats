import { AgentCard } from "@/components/AgentCard";
import { AgentRoleSection } from "@/components/AgentRoleSection";
import { mockAgentStats } from "@/lib/mockData";
import { mockAgents } from "@/lib/mockData";

export default function AgentsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Agent Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(mockAgentStats).map(([agentName, stats]) => {
          const agent = mockAgents.find(a => a.name === agentName);
          if (!agent) return null;
          
          return (
            <AgentCard
              key={agentName}
              agent={agent}
              stats={stats}
            />
          );
        })}
      </div>

      <AgentRoleSection
        agents={mockAgents}
        agentStats={mockAgentStats}
      />
    </div>
  );
} 