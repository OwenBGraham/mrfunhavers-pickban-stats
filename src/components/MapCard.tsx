import Link from 'next/link';
import { getAgentImage } from '@/services/agent/utils/agentUtils';

interface MapCardProps {
  mapName: string;
  totalMatches: number;
  mostPicked: {
    agent: string;
    count: number;
  };
  mostBanned: {
    agent: string;
    count: number;
  };
  mapImage: string;
}

export function MapCard({ mapName, totalMatches, mostPicked, mostBanned, mapImage }: MapCardProps) {
  // Calculate pick and ban rates
  const pickRate = (mostPicked.count / (totalMatches * 10)) * 100; // 10 agents per match
  const banRate = (mostBanned.count / (totalMatches * 5)) * 100; // 5 bans per match

  return (
    <Link href={`/maps/${mapName.toLowerCase()}`}>
      <div className="w-full h-28 relative group mb-8 overflow-hidden rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        {/* Map background image */}
        <img 
          className="w-full h-full absolute object-cover group-hover:blur-[1.50px] transition-all duration-300" 
          src={mapImage} 
          alt={`${mapName} map background`}
        />
        
        {/* Content container */}
        <div className="relative h-full flex items-center px-4">
          {/* Map name */}
          <div className="absolute top-2 left-4 text-stone-50 text-xl font-extrabold uppercase">
            {mapName}
          </div>

          {/* Desktop Stats container */}
          <div className="hidden md:flex w-full justify-between items-center mt-3">
            {/* Total matches */}
            <div className="flex flex-col items-center min-w-[100px]">
              <span className="text-white text-base font-extrabold">Total Matches</span>
              <span className="text-white text-base font-extrabold">{totalMatches}</span>
            </div>

            {/* Most picked */}
            <div className="flex flex-col items-center min-w-[200px] relative">
              <div className="absolute inset-0 opacity-70 bg-black rounded-tl-2xl rounded-tr-[20px] rounded-bl-2xl rounded-br-[20px]" />
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-white text-base font-extrabold">Most Picked</span>
                <div className="flex items-center gap-2">
                  <img 
                    className="w-6 h-6 rounded" 
                    src={getAgentImage(mostPicked.agent)} 
                    alt={`${mostPicked.agent} portrait`}
                  />
                  <span className="text-white text-base font-bold">{mostPicked.agent}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-blue-400 text-sm font-bold">{pickRate.toFixed(1)}%</span>
                  <span className="text-white text-sm font-bold">{mostPicked.count} picks</span>
                </div>
              </div>
            </div>

            {/* Most banned */}
            <div className="flex flex-col items-center min-w-[200px] relative">
              <div className="absolute inset-0 opacity-70 bg-black rounded-tl-2xl rounded-tr-[20px] rounded-bl-2xl rounded-br-[20px]" />
              <div className="relative z-10 flex flex-col items-center">
                <span className="text-white text-base font-extrabold">Most Banned</span>
                <div className="flex items-center gap-2">
                  <img 
                    className="w-6 h-6 rounded" 
                    src={getAgentImage(mostBanned.agent)} 
                    alt={`${mostBanned.agent} portrait`}
                  />
                  <span className="text-white text-base font-bold">{mostBanned.agent}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-red-400 text-sm font-bold">{banRate.toFixed(1)}%</span>
                  <span className="text-white text-sm font-bold">{mostBanned.count} bans</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Stats container */}
          <div className="md:hidden w-full flex flex-col items-center mt-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex flex-col items-center">
                <span className="text-white text-sm font-extrabold">Total Matches</span>
                <span className="text-white text-sm font-extrabold">{totalMatches}</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {/* Most picked */}
              <div className="flex flex-col items-center relative">
                <div className="absolute inset-0 opacity-70 bg-black rounded-tl-2xl rounded-tr-[20px] rounded-bl-2xl rounded-br-[20px]" />
                <div className="relative z-10 flex flex-col items-center p-1.5">
                  <span className="text-white text-xs font-extrabold">Most Picked</span>
                  <div className="flex items-center gap-1">
                    <img 
                      className="w-4 h-4 rounded" 
                      src={getAgentImage(mostPicked.agent)} 
                      alt={`${mostPicked.agent} portrait`}
                    />
                    <span className="text-white text-xs font-bold">{mostPicked.agent}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-blue-400 text-xs font-bold">{pickRate.toFixed(1)}%</span>
                    <span className="text-white text-xs font-bold">{mostPicked.count} picks</span>
                  </div>
                </div>
              </div>

              {/* Most banned */}
              <div className="flex flex-col items-center relative">
                <div className="absolute inset-0 opacity-70 bg-black rounded-tl-2xl rounded-tr-[20px] rounded-bl-2xl rounded-br-[20px]" />
                <div className="relative z-10 flex flex-col items-center p-1.5">
                  <span className="text-white text-xs font-extrabold">Most Banned</span>
                  <div className="flex items-center gap-1">
                    <img 
                      className="w-4 h-4 rounded" 
                      src={getAgentImage(mostBanned.agent)} 
                      alt={`${mostBanned.agent} portrait`}
                    />
                    <span className="text-white text-xs font-bold">{mostBanned.agent}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-red-400 text-xs font-bold">{banRate.toFixed(1)}%</span>
                    <span className="text-white text-xs font-bold">{mostBanned.count} bans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 