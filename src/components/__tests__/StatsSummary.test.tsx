import { render, screen } from '@testing-library/react';
import { StatsSummary } from '../StatsSummary';
import { agentPicks } from '@/services/tournament/tournamentData';
import { AgentStats } from '@/types/agent';

describe('StatsSummary', () => {
  const mockAgentStats: Record<string, AgentStats> = {
    'Jett': {
      agent: 'Jett',
      totalPicks: 10,
      winRate: 50,
      pickRate: 20,
      firstPickRate: 30,
      teamWinRates: {},
      mapWinRates: {}
    }
  };

  it('renders overall statistics correctly', () => {
    render(<StatsSummary agentStats={mockAgentStats} />);
    expect(screen.getByText('Overall Statistics')).toBeInTheDocument();
    expect(screen.getByText('Total Picks')).toBeInTheDocument();
    expect(screen.getByText('Average Win Rate')).toBeInTheDocument();
    expect(screen.getByText('Average Pick Rate')).toBeInTheDocument();
    expect(screen.getByText('Average First Pick Rate')).toBeInTheDocument();
  });

  it('calculates and displays total picks correctly', () => {
    render(<StatsSummary agentStats={mockAgentStats} />);
    
    const expectedTotalPicks = Object.values(mockAgentStats).reduce(
      (sum, stats) => sum + stats.totalPicks,
      0
    );
    
    expect(screen.getByText(expectedTotalPicks.toString())).toBeInTheDocument();
  });

  it('displays most picked agent correctly', () => {
    render(<StatsSummary agentStats={mockAgentStats} />);
    
    const mostPickedAgent = Object.entries(mockAgentStats).reduce<{ name: string; stats: AgentStats }>(
      (max, [name, stats]) => 
        stats.totalPicks > max.stats.totalPicks ? { name, stats } : max,
      { name: '', stats: { totalPicks: 0 } as AgentStats }
    );
    
    const mostPickedSection = screen.getByText('Most Picked Agent').closest('div');
    expect(mostPickedSection).toHaveTextContent(mostPickedAgent.name);
    expect(mostPickedSection).toHaveTextContent(`${mostPickedAgent.stats.totalPicks} picks`);
  });

  it('displays highest win rate agent correctly', () => {
    render(<StatsSummary agentStats={mockAgentStats} />);
    
    const highestWinRateAgent = Object.entries(mockAgentStats).reduce<{ name: string; stats: AgentStats }>(
      (max, [name, stats]) => 
        stats.winRate > max.stats.winRate ? { name, stats } : max,
      { name: '', stats: { winRate: 0 } as AgentStats }
    );
    
    const highestWinRateSection = screen.getByText('Highest Win Rate').closest('div');
    expect(highestWinRateSection).toHaveTextContent(highestWinRateAgent.name);
    expect(highestWinRateSection).toHaveTextContent(`${highestWinRateAgent.stats.winRate.toFixed(1)}%`);
  });
}); 