import Link from 'next/link';
import { AgentStats } from '@/types/agent';

interface MapStatsProps {
  mapName: string;
  stats: {
    totalMatches: number;
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  };
}

export const MapStats = ({ mapName, stats }: MapStatsProps) => {
  // Find most picked agent
  const mostPickedAgent = Object.entries(stats.agentPicks)
    .sort(([, a], [, b]) => b - a)[0] || ['', 0];

  // Find most banned agent
  const mostBannedAgent = Object.entries(stats.agentBans)
    .sort(([, a], [, b]) => b - a)[0] || ['', 0];

  // Capitalize the map name
  const capitalizedMapName = mapName.charAt(0).toUpperCase() + mapName.slice(1);

  return (
    <Link href={`/maps/${mapName}`} className="block">
      <div className="bg-white/5 rounded-lg p-2 hover:bg-white/10 transition-colors">
        <h2 className="text-lg font-bold text-white mb-2">{capitalizedMapName}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Total Matches */}
          <div className="bg-white/5 p-2 rounded-lg">
            <h3 className="text-gray-300 text-xs mb-0.5">Total Matches</h3>
            <p className="text-lg font-bold text-white">{stats.totalMatches}</p>
          </div>

          {/* Most Picked Agent */}
          <div className="bg-white/5 p-2 rounded-lg">
            <h3 className="text-gray-300 text-xs mb-0.5">Most Picked</h3>
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-white">{mostPickedAgent[0] || 'N/A'}</p>
              <p className="text-xs text-gray-300">{mostPickedAgent[1]} picks</p>
            </div>
          </div>

          {/* Most Banned Agent */}
          <div className="bg-white/5 p-2 rounded-lg">
            <h3 className="text-gray-300 text-xs mb-0.5">Most Banned</h3>
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-white">{mostBannedAgent[0] || 'N/A'}</p>
              <p className="text-xs text-gray-300">{mostBannedAgent[1]} bans</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}; 