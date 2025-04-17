export interface AgentStats {
  agent: string;
  totalPicks: number;
  winRate: number;
  pickRate: number;
  firstPickRate: number;
  teamWinRates: Record<string, number>;
  mapWinRates: Record<string, number>;
} 