import { getAgentData } from '@/services/agent';

interface StatCardProps {
  title: string;
  agentName: string;
  value: number;
}

export const StatCard = ({ title, agentName, value }: StatCardProps) => {
  const agent = getAgentData(agentName);
  if (!agent) return null;

  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-300 mb-1">{title}</h3>
      <div className="flex items-center gap-1">
        <span className="text-xl font-bold text-white">{agent.name}:</span>
        <span className="text-base text-gray-300 mt-0.5">{value} {title.includes('Picked') ? 'picks' : 'bans'}</span>
      </div>
    </div>
  );
}; 