import { AgentStats } from '@/types/agent';

export const maps = [
  { id: 'ascent', name: 'Ascent' },
  { id: 'bind', name: 'Bind' },
  { id: 'haven', name: 'Haven' },
  { id: 'split', name: 'Split' },
  { id: 'icebox', name: 'Icebox' },
  { id: 'breeze', name: 'Breeze' },
  { id: 'fracture', name: 'Fracture' },
  { id: 'pearl', name: 'Pearl' },
  { id: 'lotus', name: 'Lotus' }
];

export const agentStats: Record<string, AgentStats> = {
  'Jett': {
    agent: 'Jett',
    totalPicks: 100,
    winRate: 55,
    pickRate: 30,
    firstPickRate: 25,
    teamWinRates: {},
    mapWinRates: {
      'Ascent': 60,
      'Bind': 50,
      'Haven': 55
    }
  }
}; 