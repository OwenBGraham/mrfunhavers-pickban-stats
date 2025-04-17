import { processTournamentData } from './utils/processTournamentData';

// Sample match data
const allMatches = [
  {
    team1: 'Team A',
    team2: 'Team B',
    winner: 'Team A',
    map: 'Ascent',
    agents: {
      team1: { 'Jett': 1, 'Sova': 1 },
      team2: { 'Raze': 1, 'Cypher': 1 }
    }
  }
];

// Process the data
const { agentPicks, agentBans, teamStats, mapStats } = processTournamentData(allMatches);

// Get unique teams
const teams = Object.keys(teamStats).map(teamName => ({
  name: teamName,
  stats: teamStats[teamName]
}));

// Get unique maps
const maps = Object.keys(mapStats).map(mapName => ({
  name: mapName,
  stats: mapStats[mapName]
}));

export { agentPicks, agentBans, teamStats, mapStats, teams, maps }; 