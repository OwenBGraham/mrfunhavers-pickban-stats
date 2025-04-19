'use client';

import { notFound } from 'next/navigation';
import { getAgentData } from '@/services/agent/utils/agentUtils';
import { agentPicks, agentBans, mapStats } from '@/services/tournament/tournamentData';
import { AgentName } from '@/types/valorant';
import { BackButton } from '@/components/BackButton';

interface AgentPageProps {
  params: {
    agentName: string;
  };
}

export default function AgentPage({ params }: AgentPageProps) {
  const agent = getAgentData(params.agentName);
  if (!agent) {
    notFound();
  }

  // Get agent's total picks and bans
  const totalPicks = agentPicks[agent.name] || 0;
  const totalBans = agentBans[agent.name] || 0;

  // Calculate pick and ban rates across all matches
  const totalMatches = Object.values(mapStats).reduce((sum, stats) => sum + stats.totalMatches, 0);
  const pickRate = (totalPicks / (totalMatches * 10)) * 100; // 10 agents per match
  const banRate = (totalBans / (totalMatches * 5)) * 100; // 5 bans per match

  // Get map-specific statistics
  const mapStatistics = Object.entries(mapStats)
    .map(([mapName, stats]) => ({
      mapName,
      picks: stats.agentPicks[agent.name] || 0,
      bans: stats.agentBans[agent.name] || 0,
      pickRate: (stats.agentPicks[agent.name] || 0) / (stats.totalMatches * 10) * 100,
      banRate: (stats.agentBans[agent.name] || 0) / (stats.totalMatches * 5) * 100
    }))
    .sort((a, b) => b.picks - a.picks);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-4">
          <BackButton />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{agent.name}</h1>
        <p className="text-gray-300">{agent.role}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Overall Statistics */}
        <div className="bg-white/5 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Overall Statistics</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Picks</p>
              <p className="text-2xl font-bold text-white">{totalPicks}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Total Bans</p>
              <p className="text-2xl font-bold text-white">{totalBans}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Pick Rate</p>
              <p className="text-2xl font-bold text-white">{pickRate.toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Ban Rate</p>
              <p className="text-2xl font-bold text-white">{banRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Map Statistics */}
        <div className="bg-white/5 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Map Statistics</h2>
          <div className="space-y-4">
            {mapStatistics.map(({ mapName, picks, bans, pickRate, banRate }) => (
              <div key={mapName} className="bg-white/5 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {mapName.charAt(0).toUpperCase() + mapName.slice(1)}
                  </h3>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">Picks</p>
                      <p className="text-sm font-medium text-white">{picks}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-xs">Bans</p>
                      <p className="text-sm font-medium text-white">{bans}</p>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs">Pick Rate</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${pickRate}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-300 mt-1">{pickRate.toFixed(1)}%</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs">Ban Rate</p>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${banRate}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-300 mt-1">{banRate.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 