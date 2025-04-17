import { render, screen } from '@testing-library/react';
import { TeamStats } from '../TeamStats';
import { agentPicks } from '@/services/tournament';
import { AgentStats } from '@/types/agent';

describe('TeamStats', () => {
  const teamName = 'Team A';
  const mockAgentStats: Record<string, AgentStats> = {
    'Jett': {
      agent: 'Jett',
      totalPicks: 10,
      winRate: 50,
      pickRate: 20,
      firstPickRate: 30,
      teamWinRates: { [teamName]: 60 },
      mapWinRates: {}
    }
  };

  it('renders team statistics correctly', () => {
    render(<TeamStats agentStats={mockAgentStats} teamName={teamName} />);
    expect(screen.getByText(`${teamName} Statistics`)).toBeInTheDocument();
    expect(screen.getByText('Total Team Picks')).toBeInTheDocument();
    expect(screen.getByText('Average Team Win Rate')).toBeInTheDocument();
    expect(screen.getByText('Agents Used')).toBeInTheDocument();
  });

  it('calculates and displays team-specific statistics correctly', () => {
    render(<TeamStats agentStats={mockAgentStats} teamName={teamName} />);
    
    const teamStats = Object.entries(mockAgentStats).filter(([_, stats]) => 
      stats.teamWinRates[teamName] !== undefined
    );
    
    const expectedTotalPicks = teamStats.reduce((sum, [_, stats]) => sum + stats.totalPicks, 0);
    const expectedAverageWinRate = teamStats.length > 0
      ? teamStats.reduce((sum, [_, stats]) => sum + (stats.teamWinRates[teamName] || 0), 0) / teamStats.length
      : 0;
    
    const totalPicksSection = screen.getByText('Total Team Picks').closest('div');
    expect(totalPicksSection).toHaveTextContent(expectedTotalPicks.toString());
    
    const averageWinRateSection = screen.getByText('Average Team Win Rate').closest('div');
    expect(averageWinRateSection).toHaveTextContent(`${expectedAverageWinRate.toFixed(1)}%`);
    
    const agentsUsedSection = screen.getByText('Agents Used').closest('div');
    expect(agentsUsedSection).toHaveTextContent(teamStats.length.toString());
  });

  it('displays most picked agent for team correctly', () => {
    render(<TeamStats agentStats={mockAgentStats} teamName={teamName} />);
    
    const teamStats = Object.entries(mockAgentStats).filter(([_, stats]) => 
      stats.teamWinRates[teamName] !== undefined
    );
    
    const mostPickedAgent = teamStats.reduce<{ name: string; stats: AgentStats }>(
      (max, [name, stats]) => 
        stats.totalPicks > max.stats.totalPicks ? { name, stats } : max,
      { name: '', stats: { totalPicks: 0 } as AgentStats }
    );
    
    const mostPickedSection = screen.getByText('Most Picked Agent').closest('div');
    if (mostPickedAgent.name) {
      expect(mostPickedSection).toHaveTextContent(mostPickedAgent.name);
    }
    expect(mostPickedSection).toHaveTextContent(`${mostPickedAgent.stats.totalPicks} picks`);
  });

  it('displays highest win rate agent for team correctly', () => {
    render(<TeamStats agentStats={mockAgentStats} teamName={teamName} />);
    
    const teamStats = Object.entries(mockAgentStats).filter(([_, stats]) => 
      stats.teamWinRates[teamName] !== undefined
    );
    
    const highestWinRateAgent = teamStats.reduce<{ name: string; stats: AgentStats }>(
      (max, [name, stats]) => 
        (stats.teamWinRates[teamName] || 0) > (max.stats.teamWinRates[teamName] || 0)
          ? { name, stats }
          : max,
      { name: '', stats: { teamWinRates: {} } as AgentStats }
    );
    
    const highestWinRateSection = screen.getByText('Highest Win Rate').closest('div');
    if (highestWinRateAgent.name) {
      expect(highestWinRateSection).toHaveTextContent(highestWinRateAgent.name);
    }
    expect(highestWinRateSection).toHaveTextContent(
      `${(highestWinRateAgent.stats.teamWinRates[teamName] || 0).toFixed(1)}%`
    );
  });

  it('handles empty team stats correctly', () => {
    const emptyStats: Record<string, AgentStats> = {};
    render(<TeamStats agentStats={emptyStats} teamName={teamName} />);
    
    const totalPicksSection = screen.getByText('Total Team Picks').closest('div');
    expect(totalPicksSection).toHaveTextContent('0');
    
    const averageWinRateSection = screen.getByText('Average Team Win Rate').closest('div');
    expect(averageWinRateSection).toHaveTextContent('0.0%');
    
    const agentsUsedSection = screen.getByText('Agents Used').closest('div');
    expect(agentsUsedSection).toHaveTextContent('0');
  });

  it('handles agents with missing team win rates', () => {
    const statsWithMissingRates: Record<string, AgentStats> = {
      'Jett': {
        agent: 'Jett',
        totalPicks: 10,
        winRate: 50,
        pickRate: 20,
        firstPickRate: 30,
        teamWinRates: { [teamName]: 60 },
        mapWinRates: {}
      },
      'Raze': {
        agent: 'Raze',
        totalPicks: 5,
        winRate: 40,
        pickRate: 15,
        firstPickRate: 20,
        teamWinRates: {}, // Missing team win rate
        mapWinRates: {}
      }
    };

    render(<TeamStats agentStats={statsWithMissingRates} teamName={teamName} />);
    
    // Only Jett should be counted in the statistics
    const totalPicksSection = screen.getByText('Total Team Picks').closest('div');
    expect(totalPicksSection).toHaveTextContent('10');
    
    const averageWinRateSection = screen.getByText('Average Team Win Rate').closest('div');
    expect(averageWinRateSection).toHaveTextContent('60.0%');
    
    const agentsUsedSection = screen.getByText('Agents Used').closest('div');
    expect(agentsUsedSection).toHaveTextContent('1');
  });

  it('handles multiple agents with the same win rate', () => {
    const statsWithEqualRates: Record<string, AgentStats> = {
      'Jett': {
        agent: 'Jett',
        totalPicks: 10,
        winRate: 50,
        pickRate: 20,
        firstPickRate: 30,
        teamWinRates: { [teamName]: 60 },
        mapWinRates: {}
      },
      'Raze': {
        agent: 'Raze',
        totalPicks: 5,
        winRate: 40,
        pickRate: 15,
        firstPickRate: 20,
        teamWinRates: { [teamName]: 60 }, // Same win rate as Jett
        mapWinRates: {}
      }
    };

    render(<TeamStats agentStats={statsWithEqualRates} teamName={teamName} />);
    
    // Both agents should be counted in the statistics
    const totalPicksSection = screen.getByText('Total Team Picks').closest('div');
    expect(totalPicksSection).toHaveTextContent('15');
    
    const averageWinRateSection = screen.getByText('Average Team Win Rate').closest('div');
    expect(averageWinRateSection).toHaveTextContent('60.0%');
    
    const agentsUsedSection = screen.getByText('Agents Used').closest('div');
    expect(agentsUsedSection).toHaveTextContent('2');
  });
}); 