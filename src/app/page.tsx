'use client';

import { StatCard } from '@/components/StatCard';
import { AgentCard } from '@/components/AgentCard';
import { TeamPreferenceAgentCard } from '@/components/TeamPreferenceAgentCard';
import { AgentStatsGraph } from '@/components/AgentStatsGraph';
import { agentPicks, agentBans, pickPeakData, banPeakData, teamStats, mapStats } from '@/services/tournament/tournamentData';
import { getAgentData } from '@/services/agent';

export default function Home() {
  // Calculate total matches from the map stats
  const totalMatches = Object.values(mapStats).reduce((sum, map) => sum + (map?.totalMatches || 0), 0);

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

  // Get top 5 picked agents with full stats
  const topPickedAgents = Object.entries(agentPicks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([agentName, picks]) => {
      const agent = getAgentData(agentName);
      const bans = agentBans[agentName] || 0;
      const pickRate = (picks / (totalMatches * 10)) * 100;
      const banRate = (bans / (totalMatches * 5)) * 100;

      return {
        agent: agentName,
        stats: {
          agent: agentName,
          role: agent?.role || '',
          totalPicks: picks,
          totalBans: bans,
          pickRate,
          banRate,
          firstPickRate: 0,
          teamWinRates: {},
          mapWinRates: {}
        }
      };
    });

  // Get top 5 banned agents with full stats
  const topBannedAgents = Object.entries(agentBans)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([agentName, bans]) => {
      const agent = getAgentData(agentName);
      const picks = agentPicks[agentName] || 0;
      const pickRate = (picks / (totalMatches * 10)) * 100;
      const banRate = (bans / (totalMatches * 5)) * 100;

      return {
        agent: agentName,
        stats: {
          agent: agentName,
          role: agent?.role || '',
          totalPicks: picks,
          totalBans: bans,
          pickRate,
          banRate,
          firstPickRate: 0,
          teamWinRates: {},
          mapWinRates: {}
        }
      };
    });

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
            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Most Picked Agent</h2>
              <div className="space-y-2">
                <AgentCard
                  agent={mostPickedAgent[0]}
                  stats={{
                    agent: mostPickedAgent[0],
                    role: getAgentData(mostPickedAgent[0])?.role || '',
                    totalPicks: mostPickedAgent[1],
                    totalBans: agentBans[mostPickedAgent[0]] || 0,
                    pickRate: (mostPickedAgent[1] / (totalMatches * 10)) * 100,
                    banRate: ((agentBans[mostPickedAgent[0]] || 0) / (totalMatches * 5)) * 100,
                    firstPickRate: 0,
                    teamWinRates: {},
                    mapWinRates: {}
                  }}
                  sortOption="picks-desc"
                />
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Most Banned Agent</h2>
              <div className="space-y-2">
                <AgentCard
                  agent={mostBannedAgent[0]}
                  stats={{
                    agent: mostBannedAgent[0],
                    role: getAgentData(mostBannedAgent[0])?.role || '',
                    totalPicks: agentPicks[mostBannedAgent[0]] || 0,
                    totalBans: mostBannedAgent[1],
                    pickRate: ((agentPicks[mostBannedAgent[0]] || 0) / (totalMatches * 10)) * 100,
                    banRate: (mostBannedAgent[1] / (totalMatches * 5)) * 100,
                    firstPickRate: 0,
                    teamWinRates: {},
                    mapWinRates: {}
                  }}
                  sortOption="bans-desc"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Top 5 Picked Agents</h2>
              <div className="space-y-2">
                {topPickedAgents.map(({ agent, stats }) => (
                  <AgentCard
                    key={agent}
                    agent={agent}
                    stats={stats}
                    sortOption="picks-desc"
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Top 5 Banned Agents</h2>
              <div className="space-y-2">
                {topBannedAgents.map(({ agent, stats }) => (
                  <AgentCard
                    key={agent}
                    agent={agent}
                    stats={stats}
                    sortOption="bans-desc"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Team Preferences for Top Picked Agents</h2>
              <div className="space-y-2">
                {topPickedAgents.map(({ agent, stats }) => (
                  <TeamPreferenceAgentCard
                    key={agent}
                    agent={agent}
                    stats={stats}
                    teamStats={teamStats}
                    type="picks"
                    sortOption="picks-desc"
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Team Preferences for Top Banned Agents</h2>
              <div className="space-y-2">
                {topBannedAgents.map(({ agent, stats }) => (
                  <TeamPreferenceAgentCard
                    key={agent}
                    agent={agent}
                    stats={stats}
                    teamStats={teamStats}
                    type="bans"
                    sortOption="bans-desc"
                  />
                ))}
              </div>
            </div>
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
