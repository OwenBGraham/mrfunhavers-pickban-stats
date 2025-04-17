import { MapStats } from "@/components/MapStats";
import { agentStats, maps } from "@/lib/tournamentData";

export default function MapsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Map Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {maps.map((map) => (
          <MapStats
            key={map.id}
            agentStats={agentStats}
            mapName={map.name}
          />
        ))}
      </div>
    </div>
  );
} 