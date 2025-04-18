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
  return (
    <Link href={`/maps/${mapName.toLowerCase()}`}>
      <div className="w-full h-28 relative group mb-8">
        {/* Map background image */}
        <img 
          className="w-full h-full absolute rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] group-hover:blur-[1.50px] transition-all duration-300 object-cover" 
          src={mapImage} 
          alt={`${mapName} map background`}
        />
        
        {/* Stats overlays */}
        <div className="w-96 h-14 left-[11px] top-[46px] absolute opacity-70 bg-black rounded-tl-2xl rounded-tr-[20px] rounded-bl-2xl rounded-br-[20px]" />
        <div className="w-96 h-14 left-[434px] top-[46px] absolute opacity-70 bg-black rounded-tl-2xl rounded-tr-[20px] rounded-bl-2xl rounded-br-[20px]" />
        <div className="w-96 h-14 left-[857px] top-[46px] absolute opacity-70 bg-black rounded-tl-2xl rounded-tr-[20px] rounded-bl-2xl rounded-br-[20px]" />
        
        {/* Map name */}
        <div className="w-24 h-4 left-[11px] top-[12px] absolute text-stone-50 text-xl font-extrabold uppercase">
          {mapName}
        </div>
        
        {/* Total matches */}
        <div className="w-28 h-3.5 left-[20px] top-[51px] absolute text-white text-base font-extrabold">
          Total Matches
        </div>
        <div className="w-7 h-6 left-[28px] top-[73px] absolute text-white text-base font-extrabold">
          {totalMatches}
        </div>
        
        {/* Most picked */}
        <div className="w-24 h-3.5 left-[443px] top-[50px] absolute text-white text-base font-extrabold">
          Most Picked
        </div>
        <img 
          className="w-6 h-6 left-[440px] top-[72px] absolute rounded" 
          src={getAgentImage(mostPicked.agent)} 
          alt={`${mostPicked.agent} portrait`}
        />
        <div className="w-11 h-4 left-[476px] top-[74px] absolute text-white text-base font-bold">
          {mostPicked.agent}
        </div>
        <div className="w-14 h-4 left-[740px] top-[74px] absolute text-white text-sm font-bold">
          {mostPicked.count} picks
        </div>
        
        {/* Most banned */}
        <div className="w-28 h-3.5 left-[868px] top-[51px] absolute text-white text-base font-extrabold">
          Most Banned
        </div>
        <img 
          className="w-6 h-6 left-[865px] top-[73px] absolute rounded" 
          src={getAgentImage(mostBanned.agent)} 
          alt={`${mostBanned.agent} portrait`}
        />
        <div className="w-11 h-4 left-[901px] top-[74px] absolute text-white text-base font-bold">
          {mostBanned.agent}
        </div>
        <div className="w-14 h-4 left-[1167px] top-[74px] absolute text-white text-sm font-bold">
          {mostBanned.count} bans
        </div>
      </div>
    </Link>
  );
} 