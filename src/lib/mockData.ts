import { AgentName, AgentRole, Agent, Team, Match, Tournament, AgentStatistics, TournamentStatistics, Map } from '@/types/valorant';

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

// Mock maps data
export const mockMaps: Map[] = [
  { id: 'map1', name: 'Ascent', imageUrl: '/maps/ascent.jpg' },
  { id: 'map2', name: 'Bind', imageUrl: '/maps/bind.jpg' },
  { id: 'map3', name: 'Haven', imageUrl: '/maps/haven.jpg' },
  { id: 'map4', name: 'Split', imageUrl: '/maps/split.jpg' },
  { id: 'map5', name: 'Icebox', imageUrl: '/maps/icebox.jpg' },
  { id: 'map6', name: 'Breeze', imageUrl: '/maps/breeze.jpg' },
  { id: 'map7', name: 'Fracture', imageUrl: '/maps/fracture.jpg' },
  { id: 'map8', name: 'Pearl', imageUrl: '/maps/pearl.jpg' },
  { id: 'map9', name: 'Lotus', imageUrl: '/maps/lotus.jpg' },
  { id: 'map10', name: 'Sunset', imageUrl: '/maps/sunset.jpg' },
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
    mapWinRates: {
      'Ascent': 60,
      'Bind': 55,
      'Haven': 58,
      'Split': 52,
      'Icebox': 50,
      'Breeze': 45,
      'Fracture': 48,
      'Pearl': 53,
      'Lotus': 56,
      'Sunset': 54,
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
    mapWinRates: {
      'Ascent': 55,
      'Bind': 58,
      'Haven': 52,
      'Split': 60,
      'Icebox': 45,
      'Breeze': 50,
      'Fracture': 53,
      'Pearl': 48,
      'Lotus': 51,
      'Sunset': 49,
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
    mapWinRates: {
      'Ascent': 58,
      'Bind': 52,
      'Haven': 60,
      'Split': 55,
      'Icebox': 48,
      'Breeze': 53,
      'Fracture': 50,
      'Pearl': 56,
      'Lotus': 49,
      'Sunset': 51,
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