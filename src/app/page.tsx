import { StatCard } from '@/components/StatCard';
import { TopAgentsList } from '@/components/TopAgentsList';
import { AgentStatsGraph } from '@/components/AgentStatsGraph';
import { TeamAgentPreferences } from '@/components/TeamAgentPreferences';
import { agentPicks, agentBans, pickPeakData, banPeakData, teamStats } from '@/services/tournament/tournamentData';

export default function Home() {
  // Ensure we have data before proceeding
  if (!agentPicks || !agentBans || !pickPeakData || !banPeakData || !teamStats) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-gray-400">Loading statistics...</div>
        </div>
      </main>
    );
  }

  // Find most picked agent
  const mostPickedAgent = Object.entries(agentPicks)
    .sort(([, a], [, b]) => b - a)[0];

  // Find most banned agent
  const mostBannedAgent = Object.entries(agentBans)
    .sort(([, a], [, b]) => b - a)[0];

  // Get top 5 picked agents
  const topPickedAgents = Object.entries(agentPicks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Get top 5 banned agents
  const topBannedAgents = Object.entries(agentBans)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard
              title="Most Picked Agent"
              agentName={mostPickedAgent[0]}
              value={mostPickedAgent[1]}
            />
            <StatCard
              title="Most Banned Agent"
              agentName={mostBannedAgent[0]}
              value={mostBannedAgent[1]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopAgentsList
              title="Top 5 Picked Agents"
              agents={topPickedAgents}
              type="picks"
              peakData={pickPeakData}
            />
            <TopAgentsList
              title="Top 5 Banned Agents"
              agents={topBannedAgents}
              type="bans"
              peakData={banPeakData}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TeamAgentPreferences
              title="Team Preferences for Top Picked Agents"
              agents={topPickedAgents}
              teamStats={teamStats}
              type="picks"
            />
            <TeamAgentPreferences
              title="Team Preferences for Top Banned Agents"
              agents={topBannedAgents}
              teamStats={teamStats}
              type="bans"
            />
          </div>

          <AgentStatsGraph
            agentPicks={agentPicks}
            agentBans={agentBans}
          />
        </div>
      </div>
    </main>
  );
}
