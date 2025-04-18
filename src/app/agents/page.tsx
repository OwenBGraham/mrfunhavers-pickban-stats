import { AgentRoleSection } from '@/components/AgentRoleSection';
import { getAgentData } from '@/services/agent';
import { agentPicks } from '@/services/tournament/tournamentData';
import { AgentName, AgentRole } from '@/types/valorant';

// Define the agent data structure
const agentData: Record<AgentName, { role: AgentRole }> = {
  'Astra': { role: 'Controller' },
  'Breach': { role: 'Initiator' },
  'Brimstone': { role: 'Controller' },
  'Chamber': { role: 'Sentinel' },
  'Clove': { role: 'Controller' },
  'Cypher': { role: 'Sentinel' },
  'Deadlock': { role: 'Sentinel' },
  'Fade': { role: 'Initiator' },
  'Gekko': { role: 'Initiator' },
  'Harbor': { role: 'Controller' },
  'Iso': { role: 'Duelist' },
  'Jett': { role: 'Duelist' },
  'KAY/O': { role: 'Initiator' },
  'Killjoy': { role: 'Sentinel' },
  'Neon': { role: 'Duelist' },
  'Omen': { role: 'Controller' },
  'Phoenix': { role: 'Duelist' },
  'Raze': { role: 'Duelist' },
  'Reyna': { role: 'Duelist' },
  'Sage': { role: 'Sentinel' },
  'Skye': { role: 'Initiator' },
  'Sova': { role: 'Initiator' },
  'Tejo': { role: 'Initiator' },
  'Viper': { role: 'Controller' },
  'Vyse': { role: 'Sentinel' },
  'Waylay': { role: 'Duelist' },
  'Yoru': { role: 'Duelist' }
};

export default function AgentsPage() {
  // Get all agents from the agentData object
  const agents = Object.entries(agentData).map(([name, data]) => ({
    name: name as AgentName,
    role: data.role
  }));

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mad Science Draft Series 2 & 3 2025</h1>
          <p className="text-gray-400">
            03/07/25 - 03/09/25 & 04/11/25 - 04/13/25
          </p>
        </div>

        <div className="grid gap-8">
          <section className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Agent Statistics</h2>
            <AgentRoleSection
              agents={agents}
              agentStats={agentPicks}
            />
          </section>
        </div>
      </div>
    </main>
  );
} 