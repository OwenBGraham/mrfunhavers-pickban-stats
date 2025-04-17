import { getAgentData } from '@/services/agent';

interface TopAgentsListProps {
  title: string;
  agents: Array<[string, number]>;
  type: 'picks' | 'bans';
  peakData: Record<string, { position: number; count: number }>;
}

export const TopAgentsList = ({ title, agents, type, peakData }: TopAgentsListProps) => {
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-300 mb-2">{title}</h3>
      <div className="space-y-1">
        {agents.map(([agentName, count], index) => {
          const agent = getAgentData(agentName);
          if (!agent) return null;
          const peak = peakData[agentName];
          
          return (
            <div key={agentName}>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 w-4">{index + 1}.</span>
                  <span className="text-white">{agent.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-gray-300">{count} {type}</span>
                  {peak && (
                    <span className="text-xs text-gray-400">
                      Most common: {peak.position}{getOrdinalSuffix(peak.position)} {type === 'picks' ? 'pick' : 'ban'} ({peak.count}x)
                    </span>
                  )}
                </div>
              </div>
              {index < agents.length - 1 && (
                <div className="border-t border-gray-700/50 my-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

function getOrdinalSuffix(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
} 