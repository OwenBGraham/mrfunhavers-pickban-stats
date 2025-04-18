import { Agent, AgentName, AgentRole, AgentStatistics } from '@/types/valorant';

const agentData: Record<AgentName, { role: AgentRole }> = {
  'Astra': { role: 'Controller' },
  'Breach': { role: 'Initiator' },
  'Brimstone': { role: 'Controller' },
  'Chamber': { role: 'Sentinel' },
  'Clove': { role: 'Controller' },
  'Cypher': { role: 'Sentinel' },
  'Deadlock': { role: 'Sentinel' },
  'Fade': { role: 'Initiator' },
  'Gekko': { role: 'Initiator' },
  'Harbor': { role: 'Controller' },
  'Iso': { role: 'Duelist' },
  'Jett': { role: 'Duelist' },
  'KAY/O': { role: 'Initiator' },
  'Killjoy': { role: 'Sentinel' },
  'Neon': { role: 'Duelist' },
  'Omen': { role: 'Controller' },
  'Phoenix': { role: 'Duelist' },
  'Raze': { role: 'Duelist' },
  'Reyna': { role: 'Duelist' },
  'Sage': { role: 'Sentinel' },
  'Skye': { role: 'Initiator' },
  'Sova': { role: 'Initiator' },
  'Tejo': { role: 'Initiator' },
  'Viper': { role: 'Controller' },
  'Vyse': { role: 'Sentinel' },
  'Waylay': { role: 'Duelist' },
  'Yoru': { role: 'Duelist' }
};

export function getAgentData(name: string): Agent | null {
  const normalizedName = name.toLowerCase();
  const agentName = Object.keys(agentData).find(
    key => key.toLowerCase() === normalizedName
  ) as AgentName | undefined;
  
  if (agentName) {
    return {
      name: agentName,
      role: agentData[agentName].role
    };
  }
  return null;
}

/**
 * Groups agents by their role
 * @param agents Array of agents to group
 * @returns Object with roles as keys and arrays of agents as values
 * 
 * Example usage:
 * const agents = [
 *   { name: 'Jett', role: 'Duelist' },
 *   { name: 'Sova', role: 'Initiator' }
 * ];
 * const grouped = groupAgentsByRole(agents);
 * // Returns: { Duelist: [{ name: 'Jett', role: 'Duelist' }], Initiator: [{ name: 'Sova', role: 'Initiator' }] }
 */
export function groupAgentsByRole(agents: Agent[]): Record<AgentRole, Agent[]> {
  return agents.reduce((acc, agent) => {
    if (!acc[agent.role]) {
      acc[agent.role] = [];
    }
    acc[agent.role].push(agent);
    return acc;
  }, {} as Record<AgentRole, Agent[]>);
}

/**
 * Calculates pick rate for an agent
 * @param agentName Name of the agent
 * @param totalPicks Total number of agent picks in the dataset
 * @param agentStats Statistics object containing pick information
 * @returns Pick rate as a percentage (0-100)
 * 
 * Example usage:
 * const pickRate = calculatePickRate('Jett', 100, { totalPicks: 25 });
 * // Returns: 25 (meaning Jett was picked 25% of the time)
 */
export function calculatePickRate(
  agentName: AgentName,
  totalPicks: number,
  agentStats: AgentStatistics
): number {
  if (totalPicks === 0) return 0;
  return (agentStats.totalPicks / totalPicks) * 100;
}

/**
 * Sorts agents by a specific statistic
 * @param agents Array of agents with statistics
 * @param statKey Key of the statistic to sort by (e.g., 'pickRate', 'winRate')
 * @param order 'asc' for ascending, 'desc' for descending
 * @returns Sorted array of agents
 * 
 * Example usage:
 * const sortedByWinRate = sortAgentsByStat(agents, 'winRate', 'desc');
 * // Returns agents sorted by win rate in descending order
 */
export function sortAgentsByStat(
  agents: Agent[],
  statKey: keyof Pick<Agent, 'pickRate' | 'winRate'>,
  order: 'asc' | 'desc' = 'desc'
): Agent[] {
  return [...agents].sort((a, b) => {
    const aValue = a[statKey] || 0;
    const bValue = b[statKey] || 0;
    return order === 'desc' ? bValue - aValue : aValue - bValue;
  });
}

/**
 * Filters agents by role
 * @param agents Array of agents to filter
 * @param role Role to filter by
 * @returns Array of agents matching the specified role
 * 
 * Example usage:
 * const duelists = filterAgentsByRole(agents, 'Duelist');
 * // Returns only agents with role 'Duelist'
 */
export function filterAgentsByRole(agents: Agent[], role: AgentRole): Agent[] {
  return agents.filter(agent => agent.role === role);
}

/**
 * Gets the most picked agent from a list of agent statistics
 * @param agentStats Record of agent statistics
 * @returns The agent name with the highest pick rate
 * 
 * Example usage:
 * const mostPicked = getMostPickedAgent(agentStats);
 * // Returns the name of the most picked agent
 */
export function getMostPickedAgent(
  agentStats: Record<AgentName, AgentStatistics>
): AgentName {
  return Object.entries(agentStats)
    .reduce((mostPicked, [agentName, stats]) => {
      return stats.totalPicks > (agentStats[mostPicked]?.totalPicks || 0)
        ? agentName as AgentName
        : mostPicked;
    }, Object.keys(agentStats)[0] as AgentName);
}

/**
 * Calculates the average win rate for an agent across all teams
 * @param agentStats Statistics for a specific agent
 * @returns Average win rate as a percentage (0-100)
 * 
 * Example usage:
 * const avgWinRate = calculateAverageWinRate(agentStats);
 * // Returns the average win rate across all teams
 */
export function calculateAverageWinRate(agentStats: AgentStatistics): number {
  const teamWinRates = Object.values(agentStats.teamWinRates);
  if (teamWinRates.length === 0) return 0;
  
  const sum = teamWinRates.reduce((acc, rate) => acc + rate, 0);
  return sum / teamWinRates.length;
}

export function getAgentRoleColor(role: AgentRole): string {
  const colors = {
    'Controller': 'bg-purple-500',
    'Duelist': 'bg-red-500',
    'Initiator': 'bg-blue-500',
    'Sentinel': 'bg-yellow-500'
  };
  return colors[role] || 'bg-gray-500';
} 