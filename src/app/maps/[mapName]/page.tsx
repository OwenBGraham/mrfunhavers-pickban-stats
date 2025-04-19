'use client';

import { notFound } from 'next/navigation';
import { mapStats } from '@/services/tournament/tournamentData';
import { AgentCard } from '@/components/AgentCard';
import { getAgentData } from '@/services/agent';
import { AgentName } from '@/types/valorant';
import { useState } from 'react';
import { BackButton } from '@/components/BackButton';
import { AgentStatsGraph } from '@/components/AgentStatsGraph';

interface MapPageProps {
  params: {
    mapName: string;
  };
}

type SortOption = 'picks-desc' | 'picks-asc' | 'bans-desc' | 'bans-asc';
type RoleFilter = 'all' | 'Controller' | 'Duelist' | 'Initiator' | 'Sentinel';

export default function MapPage({ params }: MapPageProps) {
  const [sortOption, setSortOption] = useState<SortOption>('picks-desc');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all');

  const mapData = mapStats[params.mapName];

  if (!mapData) {
    notFound();
  }

  // Get all agents with their pick and ban counts
  let agentStats = Object.entries(mapData.agentPicks).map(([agentName, picks]) => {
    const bans = mapData.agentBans[agentName] || 0;
    const agent = getAgentData(agentName);
    if (!agent) return null;
    
    return {
      agent,
      stats: {
        agent: agentName as AgentName,
        totalPicks: picks as number,
        totalBans: bans as number,
        pickRate: (picks as number / (mapData.totalMatches * 10)) * 100,
        banRate: (bans as number / (mapData.totalMatches * 5)) * 100,
        firstPickRate: 0,
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

  // Prepare data for the graph
  const graphData = {
    agentPicks: mapData.agentPicks,
    agentBans: mapData.agentBans
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {params.mapName.charAt(0).toUpperCase() + params.mapName.slice(1)}
        </h1>
        <p className="text-gray-300 mb-6">
          Detailed statistics for {params.mapName} in the tournament
        </p>

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
      </div>

      {/* Add the graph component */}
      <div className="mb-8">
        <AgentStatsGraph
          agentPicks={graphData.agentPicks}
          agentBans={graphData.agentBans}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentStats.map(({ agent, stats }) => (
          <AgentCard
            key={agent.name}
            agent={agent.name}
            stats={{
              agent: agent.name,
              role: agent.role,
              totalPicks: stats.totalPicks,
              totalBans: stats.totalBans,
              pickRate: stats.pickRate,
              banRate: stats.banRate,
              firstPickRate: stats.firstPickRate,
              teamWinRates: stats.teamWinRates,
              mapWinRates: stats.mapWinRates
            }}
            sortOption={sortOption}
          />
        ))}
      </div>
    </div>
  );
} 