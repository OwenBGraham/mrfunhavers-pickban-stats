import { TournamentMatch } from '@/types/tournament';
import draftData from '@/data/mad-science-draft-3.vetos.json';

// Process the tournament data
const processTournamentData = (matches: TournamentMatch[]) => {
  const agentPicks: Record<string, number> = {};
  const agentBans: Record<string, number> = {};
  const teamStats: Record<string, {
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  }> = {};
  const mapStats: Record<string, {
    totalMatches: number;
    agentPicks: Record<string, number>;
    agentBans: Record<string, number>;
  }> = {};

  matches.forEach(match => {
    if (match.status !== 'COMPLETED') return;

    const { team_a, team_b, state } = match.draft_data;
    const teamNames = { A: team_a, B: team_b };

    // Initialize team stats if not exists
    [team_a, team_b].forEach(team => {
      if (!teamStats[team]) {
        teamStats[team] = {
          agentPicks: {},
          agentBans: {}
        };
      }
    });

    // Process each phase of the draft
    state.forEach(phase => {
      phase.forEach(action => {
        const team = teamNames[action.team as 'A' | 'B'];
        const agent = action.agent;

        if (action.action === 'PICK') {
          // Update agent picks
          agentPicks[agent] = (agentPicks[agent] || 0) + 1;
          teamStats[team].agentPicks[agent] = (teamStats[team].agentPicks[agent] || 0) + 1;
          
          // Update map stats if map is available
          if (match.map) {
            if (!mapStats[match.map]) {
              mapStats[match.map] = {
                totalMatches: 0,
                agentPicks: {},
                agentBans: {}
              };
            }
            mapStats[match.map].agentPicks[agent] = (mapStats[match.map].agentPicks[agent] || 0) + 1;
          }
        } else if (action.action === 'BAN') {
          // Update agent bans
          agentBans[agent] = (agentBans[agent] || 0) + 1;
          teamStats[team].agentBans[agent] = (teamStats[team].agentBans[agent] || 0) + 1;
          
          // Update map stats if map is available
          if (match.map) {
            if (!mapStats[match.map]) {
              mapStats[match.map] = {
                totalMatches: 0,
                agentPicks: {},
                agentBans: {}
              };
            }
            mapStats[match.map].agentBans[agent] = (mapStats[match.map].agentBans[agent] || 0) + 1;
          }
        }
      });
    });

    // Update map total matches
    if (match.map) {
      if (!mapStats[match.map]) {
        mapStats[match.map] = {
          totalMatches: 0,
          agentPicks: {},
          agentBans: {}
        };
      }
      mapStats[match.map].totalMatches++;
    }
  });

  return { agentPicks, agentBans, teamStats, mapStats };
};

// Process the data
const { agentPicks, agentBans, teamStats, mapStats } = processTournamentData(draftData);

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

// Initialize pick and ban order data
const pickOrderData: Record<string, Record<number, number>> = {};
const banOrderData: Record<string, Record<number, number>> = {};

// Process pick and ban order data from the matches
draftData.forEach(match => {
  if (match.status !== 'COMPLETED') return;

  match.draft_data.state.forEach(phase => {
    phase.forEach(action => {
      const agent = action.agent;
      const phaseNumber = action.phase;

      if (action.action === 'PICK') {
        if (!pickOrderData[agent]) {
          pickOrderData[agent] = {};
        }
        pickOrderData[agent][phaseNumber] = (pickOrderData[agent][phaseNumber] || 0) + 1;
      } else if (action.action === 'BAN') {
        if (!banOrderData[agent]) {
          banOrderData[agent] = {};
        }
        banOrderData[agent][phaseNumber] = (banOrderData[agent][phaseNumber] || 0) + 1;
      }
    });
  });
});

// Calculate peak positions
const calculatePeakData = (orderData: Record<string, Record<number, number>>) => {
  const peakData: Record<string, { position: number; count: number }> = {};
  
  Object.entries(orderData).forEach(([agent, positions]) => {
    let maxCount = 0;
    let peakPosition = 0;
    
    Object.entries(positions).forEach(([phase, count]) => {
      const phaseNum = parseInt(phase);
      // If this phase has more picks/bans than current max, or equal picks/bans but earlier phase
      if (count > maxCount || (count === maxCount && phaseNum < peakPosition)) {
        maxCount = count;
        peakPosition = phaseNum;
      }
    });
    
    if (maxCount > 0) {
      // Add 1 to make it 1-based instead of 0-based
      peakData[agent] = {
        position: peakPosition + 1,
        count: maxCount
      };
    }
  });
  
  return peakData;
};

const pickPeakData = calculatePeakData(pickOrderData);
const banPeakData = calculatePeakData(banOrderData);

console.log('Pick Order Data:', JSON.stringify(pickOrderData, null, 2));
console.log('Pick Peak Data:', JSON.stringify(pickPeakData, null, 2));

export { agentPicks, agentBans, teamStats, mapStats, teams, maps, pickOrderData, banOrderData, pickPeakData, banPeakData }; 