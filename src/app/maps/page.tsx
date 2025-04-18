import { MapStats } from "@/components/MapStats";
import { mapStats } from "@/services/tournament/tournamentData";

export default function MapsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Map Statistics</h1>
          <p className="text-gray-400">
            Detailed statistics for each map played in the tournament
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {Object.entries(mapStats).map(([mapName, stats]) => (
            <MapStats
              key={mapName}
              mapName={mapName}
              stats={stats}
            />
          ))}
        </div>
      </div>
    </main>
  );
} 