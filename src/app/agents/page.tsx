'use client';

import { AgentCard } from '@/components/AgentCard';
import { BackButton } from '@/components/BackButton';
import { getAgentData } from '@/services/agent';
import { agentPicks, agentBans, mapStats } from '@/services/tournament/tournamentData';
import { AgentName, AgentRole } from '@/types/valorant';
import { useState } from 'react';

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

type SortOption = 'picks-desc' | 'picks-asc' | 'bans-desc' | 'bans-asc';
type RoleFilter = 'all' | 'Controller' | 'Duelist' | 'Initiator' | 'Sentinel';

export default function AgentsPage() {
  const [sortOption, setSortOption] = useState<SortOption>('picks-desc');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');

  // Calculate total matches from the map stats
  const totalMatches = Object.values(mapStats).reduce((sum, map) => sum + (map?.totalMatches || 0), 0);

  // Get all agents with their pick and ban counts
  let agentStats = Object.entries(agentData).map(([agentName, data]) => {
    const agent = getAgentData(agentName);
    if (!agent) return null;
    
    const picks = agentPicks[agentName] || 0;
    const bans = agentBans[agentName] || 0;
    
    // Calculate pick rate: (picks / (totalMatches * 10)) * 100
    // Each match has 10 agent picks (5 per team)
    const pickRate = totalMatches > 0 ? (picks / (totalMatches * 10)) * 100 : 0;
    
    // Calculate ban rate: (bans / (totalMatches * 5)) * 100
    // Each match has 5 agent bans (5 per team)
    const banRate = totalMatches > 0 ? (bans / (totalMatches * 5)) * 100 : 0;
    
    return {
      agent,
      stats: {
        agent: agentName as AgentName,
        role: data.role,
        totalPicks: picks,
        totalBans: bans,
        pickRate,
        banRate,
        firstPickRate: 0, // We don't have this data at the agent level
        teamWinRates: {},
        mapWinRates: {}
      }
    };
  })
  .filter((item): item is NonNullable<typeof item> => item !== null);

  // Apply role filter
  if (roleFilter !== 'all') {
    agentStats = agentStats.filter(({ agent }) => agent.role === roleFilter);
  }

  // Apply sorting
  agentStats.sort((a, b) => {
    switch (sortOption) {
      case 'picks-desc':
        return b.stats.totalPicks - a.stats.totalPicks;
      case 'picks-asc':
        return a.stats.totalPicks - b.stats.totalPicks;
      case 'bans-desc':
        return b.stats.totalBans - a.stats.totalBans;
      case 'bans-asc':
        return a.stats.totalBans - b.stats.totalBans;
      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton />
          </div>
          <h1 className="text-4xl font-bold mb-2">Agent Statistics</h1>
          <p className="text-gray-400">
            Detailed statistics for each agent across ALL maps in the tournaments.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Role Filter */}
          <div className="flex flex-wrap gap-2">
            {['all', 'Controller', 'Duelist', 'Initiator', 'Sentinel'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role as RoleFilter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors
                  ${roleFilter === role 
                    ? 'bg-[#00C3FF] text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                {role === 'all' ? 'All Roles' : role}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00C3FF]"
            >
              <option value="picks-desc">Most Picked</option>
              <option value="picks-asc">Least Picked</option>
              <option value="bans-desc">Most Banned</option>
              <option value="bans-asc">Least Banned</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agentStats.map(({ agent, stats }) => (
            <AgentCard
              key={agent.name}
              agent={agent.name}
              stats={stats}
              sortOption={sortOption}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 