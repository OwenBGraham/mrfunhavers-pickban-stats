import { mapStats } from "@/services/tournament/tournamentData";
import { MapCard } from "@/components/MapCard";
import { BackButton } from "@/components/BackButton";

export default function MapsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="mb-4">
            <BackButton />
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white">Map Statistics</h1>
          <p className="text-gray-400">
            Detailed statistics for each map played in the tournament
          </p>
        </div>

        <div className="space-y-16">
          {Object.entries(mapStats).map(([mapName, stats]) => {
            // Find most picked agent
            const mostPicked = Object.entries(stats.agentPicks)
              .sort(([, a], [, b]) => b - a)[0];

            // Find most banned agent
            const mostBanned = Object.entries(stats.agentBans)
              .sort(([, a], [, b]) => b - a)[0];

            return (
              <MapCard
                key={mapName}
                mapName={mapName}
                totalMatches={stats.totalMatches}
                mostPicked={{
                  agent: mostPicked[0],
                  count: mostPicked[1]
                }}
                mostBanned={{
                  agent: mostBanned[0],
                  count: mostBanned[1]
                }}
                mapImage={`/images/maps/${mapName.toLowerCase()}.webp`}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
} 