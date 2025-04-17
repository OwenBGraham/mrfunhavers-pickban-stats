import { AgentRoleSection } from '@/components/AgentRoleSection';
import { getAgentData } from '@/services/agent';
import { agentPicks } from '@/services/tournament/tournamentData';

export default function AgentsPage() {
  const agents = Object.keys(agentPicks)
    .map(name => getAgentData(name))
    .filter((agent): agent is NonNullable<typeof agent> => agent !== null);

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