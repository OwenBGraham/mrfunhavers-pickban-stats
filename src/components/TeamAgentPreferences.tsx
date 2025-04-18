interface TeamAgentPreferencesProps {
  title: string;
  agents: Array<[string, number]>;
  teamStats: Record<string, {
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  }>;
  type: 'picks' | 'bans';
}

export const TeamAgentPreferences = ({ title, agents, teamStats, type }: TeamAgentPreferencesProps) => {
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <h3 className="text-sm font-semibold text-gray-300 mb-4">{title}</h3>
      <div className="space-y-4">
        {agents.map(([agentName, totalCount]) => {
          // Get the top team that has picked/banned this agent
          const topTeam = Object.entries(teamStats)
            .map(([teamName, stats]) => ({
              teamName,
              count: type === 'picks' ? stats.agentPicks[agentName] || 0 : stats.agentBans[agentName] || 0
            }))
            .filter(data => data.count > 0)
            .sort((a, b) => b.count - a.count)[0]; // Get only the top team

          if (!topTeam) return null;

          return (
            <div key={agentName} className="space-y-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">{agentName}</span>
                <span className="text-gray-400 text-sm">Total: {totalCount}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Top Team:</span>
                  <span className="text-white">{topTeam.teamName}</span>
                </div>
                <span className="text-gray-300">{topTeam.count} {type}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 