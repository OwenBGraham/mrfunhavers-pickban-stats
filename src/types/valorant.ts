// Agent types
export type AgentName = 
  | 'Astra'
  | 'Breach'
  | 'Brimstone'
  | 'Chamber'
  | 'Clove'
  | 'Cypher'
  | 'Deadlock'
  | 'Fade'
  | 'Gekko'
  | 'Harbor'
  | 'Iso'
  | 'Jett'
  | 'KAY/O'
  | 'Killjoy'
  | 'Neon'
  | 'Omen'
  | 'Phoenix'
  | 'Raze'
  | 'Reyna'
  | 'Sage'
  | 'Skye'
  | 'Sova'
  | 'Tejo'
  | 'Viper'
  | 'Vyse'
  | 'Waylay'
  | 'Yoru';

export type AgentRole = 'Duelist' | 'Initiator' | 'Controller' | 'Sentinel';

export interface Agent {
  name: AgentName;
  role: AgentRole;
  pickRate?: number;
  winRate?: number;
}

// Team types
export interface Team {
  id: string;
  name: string;
  region: string;
  logoUrl?: string;
}

// Map types
export interface Map {
  id: string;
  name: string;
  imageUrl?: string;
}

// Match types
export interface MapPick {
  mapName: string;
  pickedBy: Team['id'];
}

export interface AgentPick {
  agent: AgentName;
  playerId: string;
  teamId: Team['id'];
  isFirstPick: boolean;
}

export interface Match {
  id: string;
  tournamentId: string;
  date: string;
  team1: Team['id'];
  team2: Team['id'];
  winner?: Team['id'];
  mapPicks: MapPick[];
  agentPicks: AgentPick[];
  vodUrl?: string;
}

// Tournament types
export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  region: string;
  prizePool?: number;
  teams: Team['id'][];
  matches: Match['id'][];
  status: 'upcoming' | 'ongoing' | 'completed';
}

// Statistics types
export interface AgentStatistics {
  agent: AgentName;
  totalPicks: number;
  totalBans: number;
  pickRate: number;
  firstPickRate: number;
  teamWinRates: Record<Team['id'], number>;
  mapWinRates?: Record<string, number>;
}

export interface TournamentStatistics {
  tournamentId: Tournament['id'];
  totalMatches: number;
  agentStats: Record<AgentName, AgentStatistics>;
  mostPickedAgents: AgentName[];
  highestWinRateAgents: AgentName[];
  teamAgentPreferences: Record<Team['id'], AgentName[]>;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} 