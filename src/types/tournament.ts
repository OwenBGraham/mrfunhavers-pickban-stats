export type DraftAction = 'PICK' | 'BAN';

export interface DraftPhase {
  phase: number;
  agent: string;
  team: 'A' | 'B';
  action: DraftAction;
}

export interface DraftData {
  team_a: string;
  team_b: string;
  state: DraftPhase[][];
}

export interface TournamentMatch {
  _id: string;
  status: 'COMPLETED' | 'UPCOMING' | 'ONGOING';
  draft_data: DraftData;
  map?: string;
  winner?: 'A' | 'B';
  score?: {
    team_a: number;
    team_b: number;
  };
}

export interface TournamentStats {
  totalMatches: number;
  agentPicks: Record<string, number>;
  agentBans: Record<string, number>;
  teamStats: Record<string, {
    wins: number;
    losses: number;
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  }>;
  mapStats: Record<string, {
    totalMatches: number;
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  }>;
}

export interface TeamStatistics {
  totalMatches: number;
  winRate: number;
  mostPlayedAgents: Array<{
    name: string;
    picks: number;
  }>;
} 