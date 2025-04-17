import { TournamentMatch, TournamentStats } from '@/types/tournament';

interface Match {
  team1: string;
  team2: string;
  winner: string;
  map: string;
  agents: {
    team1: Record<string, number>;
    team2: Record<string, number>;
  };
}

interface ProcessedData {
  agentPicks: Record<string, number>;
  agentBans: Record<string, number>;
  teamStats: Record<string, {
    wins: number;
    losses: number;
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  }>;
  mapStats: Record<string, {
    totalPicks: number;
    winRate: number;
    agents: Record<string, number>;
  }>;
}

export function processTournamentData(matches: Match[]): ProcessedData {
  const agentPicks: Record<string, number> = {};
  const agentBans: Record<string, number> = {};
  const teamStats: Record<string, {
    wins: number;
    losses: number;
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  }> = {};
  const mapStats: Record<string, {
    totalPicks: number;
    winRate: number;
    agents: Record<string, number>;
  }> = {};

  matches.forEach(match => {
    // Process team stats
    [match.team1, match.team2].forEach(team => {
      if (!teamStats[team]) {
        teamStats[team] = {
          wins: 0,
          losses: 0,
          agentPicks: {},
          agentBans: {}
        };
      }
      if (team === match.winner) {
        teamStats[team].wins++;
      } else {
        teamStats[team].losses++;
      }
    });

    // Process map stats
    if (!mapStats[match.map]) {
      mapStats[match.map] = {
        totalPicks: 0,
        winRate: 0,
        agents: {}
      };
    }
    mapStats[match.map].totalPicks++;

    // Process agent picks and bans
    Object.entries(match.agents.team1).forEach(([agent, count]) => {
      agentPicks[agent] = (agentPicks[agent] || 0) + count;
      teamStats[match.team1].agentPicks[agent] = (teamStats[match.team1].agentPicks[agent] || 0) + count;
      mapStats[match.map].agents[agent] = (mapStats[match.map].agents[agent] || 0) + count;
    });

    Object.entries(match.agents.team2).forEach(([agent, count]) => {
      agentPicks[agent] = (agentPicks[agent] || 0) + count;
      teamStats[match.team2].agentPicks[agent] = (teamStats[match.team2].agentPicks[agent] || 0) + count;
      mapStats[match.map].agents[agent] = (mapStats[match.map].agents[agent] || 0) + count;
    });
  });

  return { agentPicks, agentBans, teamStats, mapStats };
} 