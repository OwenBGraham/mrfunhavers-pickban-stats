import { AgentName, AgentRole, Agent, Team, Match, Tournament, AgentStatistics, TournamentStatistics } from '@/types/valorant';

// Mock agents data
export const mockAgents: Agent[] = [
  { name: 'Jett', role: 'Duelist' },
  { name: 'Raze', role: 'Duelist' },
  { name: 'Sova', role: 'Initiator' },
  { name: 'Viper', role: 'Controller' },
  { name: 'Killjoy', role: 'Sentinel' },
  { name: 'Omen', role: 'Controller' },
  { name: 'Skye', role: 'Initiator' },
  { name: 'Cypher', role: 'Sentinel' },
  { name: 'Brimstone', role: 'Controller' },
  { name: 'Sage', role: 'Sentinel' },
];

// Mock teams data
export const mockTeams: Team[] = [
  { id: 'team1', name: 'Team A', region: 'NA', logoUrl: '/team-a-logo.png' },
  { id: 'team2', name: 'Team B', region: 'EMEA', logoUrl: '/team-b-logo.png' },
  { id: 'team3', name: 'Team C', region: 'APAC', logoUrl: '/team-c-logo.png' },
  { id: 'team4', name: 'Team D', region: 'NA', logoUrl: '/team-d-logo.png' },
];

// Mock tournament data
export const mockTournament: Tournament = {
  id: 'tournament1',
  name: 'VALORANT Champions 2024',
  startDate: '2024-03-01',
  endDate: '2024-03-15',
  region: 'Global',
  prizePool: 1000000,
  teams: ['team1', 'team2', 'team3', 'team4'],
  matches: ['match1', 'match2', 'match3'],
  status: 'completed',
};

// Helper function to create default agent stats
const createDefaultAgentStats = (agentName: AgentName): AgentStatistics => ({
  agent: agentName,
  totalPicks: 0,
  winRate: 0,
  pickRate: 0,
  firstPickRate: 0,
  teamWinRates: {},
});

// Mock agent statistics
export const mockAgentStats: Record<AgentName, AgentStatistics> = {
  'Jett': {
    agent: 'Jett',
    totalPicks: 45,
    winRate: 55.5,
    pickRate: 75,
    firstPickRate: 30,
    teamWinRates: {
      'team1': 60,
      'team2': 50,
      'team3': 55,
      'team4': 57,
    },
  },
  'Raze': {
    agent: 'Raze',
    totalPicks: 35,
    winRate: 52.5,
    pickRate: 58.3,
    firstPickRate: 25,
    teamWinRates: {
      'team1': 55,
      'team2': 48,
      'team3': 52,
      'team4': 55,
    },
  },
  'Sova': {
    agent: 'Sova',
    totalPicks: 40,
    winRate: 53.2,
    pickRate: 66.7,
    firstPickRate: 20,
    teamWinRates: {
      'team1': 58,
      'team2': 45,
      'team3': 50,
      'team4': 60,
    },
  },
  // Add default stats for all other agents
  'Astra': createDefaultAgentStats('Astra'),
  'Breach': createDefaultAgentStats('Breach'),
  'Brimstone': createDefaultAgentStats('Brimstone'),
  'Chamber': createDefaultAgentStats('Chamber'),
  'Cypher': createDefaultAgentStats('Cypher'),
  'Deadlock': createDefaultAgentStats('Deadlock'),
  'Fade': createDefaultAgentStats('Fade'),
  'Gekko': createDefaultAgentStats('Gekko'),
  'Harbor': createDefaultAgentStats('Harbor'),
  'Iso': createDefaultAgentStats('Iso'),
  'KAY/O': createDefaultAgentStats('KAY/O'),
  'Killjoy': createDefaultAgentStats('Killjoy'),
  'Neon': createDefaultAgentStats('Neon'),
  'Omen': createDefaultAgentStats('Omen'),
  'Phoenix': createDefaultAgentStats('Phoenix'),
  'Reyna': createDefaultAgentStats('Reyna'),
  'Sage': createDefaultAgentStats('Sage'),
  'Skye': createDefaultAgentStats('Skye'),
  'Viper': createDefaultAgentStats('Viper'),
  'Yoru': createDefaultAgentStats('Yoru'),
};

// Mock tournament statistics
export const mockTournamentStats: TournamentStatistics = {
  tournamentId: 'tournament1',
  totalMatches: 15,
  agentStats: mockAgentStats,
  mostPickedAgents: ['Jett', 'Sova', 'Raze'],
  highestWinRateAgents: ['Jett', 'Sova', 'Raze'],
  teamAgentPreferences: {
    'team1': ['Jett', 'Sova', 'Viper'],
    'team2': ['Raze', 'Sova', 'Killjoy'],
    'team3': ['Jett', 'Omen', 'Skye'],
    'team4': ['Jett', 'Sova', 'Cypher'],
  },
}; 