import { MapStats } from "@/components/MapStats";
import { mockAgentStats } from "@/lib/mockData";
import { mockMaps } from "@/lib/mockData";
import { Map } from "@/types/valorant";

export default function MapsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Map Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockMaps.map((map: Map) => (
          <MapStats
            key={map.id}
            agentStats={mockAgentStats}
            mapName={map.name}
          />
        ))}
      </div>
    </div>
  );
} 