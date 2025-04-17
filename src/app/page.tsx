import { AgentRoleSection } from '@/components/AgentRoleSection';
import { mockAgents, mockAgentStats, mockTournament } from '@/lib/mockData';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{mockTournament.name}</h1>
          <p className="text-gray-400">
            {new Date(mockTournament.startDate).toLocaleDateString()} -{' '}
            {new Date(mockTournament.endDate).toLocaleDateString()}
          </p>
        </div>

        <div className="grid gap-8">
          <section className="bg-white/5 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Agent Statistics</h2>
            <AgentRoleSection
              agents={mockAgents}
              agentStats={mockAgentStats}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
