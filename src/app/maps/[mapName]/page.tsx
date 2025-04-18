import { notFound } from 'next/navigation';
import { mapStats } from '@/services/tournament/tournamentData';
import AgentCard from '@/components/AgentCard';
import { getAgentData } from '@/services/agent';
import { AgentName } from '@/types/valorant';

interface MapPageProps {
  params: {
    mapName: string;
  };
}

export default function MapPage({ params }: MapPageProps) {
  const mapData = mapStats[params.mapName];

  if (!mapData) {
    notFound();
  }

  // Get all agents with their pick and ban counts
  const agentStats = Object.entries(mapData.agentPicks).map(([agentName, picks]) => {
    const bans = mapData.agentBans[agentName] || 0;
    const agent = getAgentData(agentName);
    if (!agent) return null;
    
    return {
      agent,
      stats: {
        agent: agentName as AgentName,
        totalPicks: picks as number,
        totalBans: bans as number,
        pickRate: (picks as number / (mapData.totalMatches * 10)) * 100, // 10 agents per match
        banRate: (bans as number / (mapData.totalMatches * 5)) * 100, // 5 bans per match
        firstPickRate: 0, // Not available in current data
        teamWinRates: {}, // Not available in current data
        mapWinRates: {} // Not available in current data
      }
    };
  })
  .filter((item): item is NonNullable<typeof item> => item !== null)
  .sort((a, b) => b.stats.totalPicks - a.stats.totalPicks);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {params.mapName.charAt(0).toUpperCase() + params.mapName.slice(1)}
        </h1>
        <p className="text-gray-300">
          Detailed statistics for {params.mapName} in the tournament
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agentStats.map(({ agent, stats }) => (
          <AgentCard
            key={agent.name}
            agent={agent}
            stats={stats}
          />
        ))}
      </div>
    </div>
  );
} 