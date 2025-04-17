import { render, screen } from '@testing-library/react';
import { StatsSummary } from '../StatsSummary';
import { mockAgentStats } from '@/lib/mockData';

describe('StatsSummary', () => {
  it('renders overall statistics correctly', () => {
    render(<StatsSummary agentStats={mockAgentStats} />);

    // Check if all statistics are displayed
    expect(screen.getByText('Overall Statistics')).toBeInTheDocument();
    expect(screen.getByText('Total Picks')).toBeInTheDocument();
    expect(screen.getByText('Average Win Rate')).toBeInTheDocument();
    expect(screen.getByText('Average Pick Rate')).toBeInTheDocument();
    expect(screen.getByText('Average First Pick Rate')).toBeInTheDocument();
  });

  it('calculates and displays total picks correctly', () => {
    render(<StatsSummary agentStats={mockAgentStats} />);
    
    // Calculate expected total picks
    const expectedTotalPicks = Object.values(mockAgentStats).reduce(
      (sum, stats) => sum + stats.totalPicks,
      0
    );
    
    expect(screen.getByText(expectedTotalPicks.toString())).toBeInTheDocument();
  });

  it('displays most picked agent correctly', () => {
    render(<StatsSummary agentStats={mockAgentStats} />);
    
    // Find the agent with highest totalPicks
    const mostPickedAgent = Object.entries(mockAgentStats).reduce(
      (max, [name, stats]) => 
        stats.totalPicks > max.stats.totalPicks ? { name, stats } : max,
      { name: '', stats: { totalPicks: 0 } }
    );
    
    // Find the agent name within the "Most Picked Agent" section
    const mostPickedSection = screen.getByText('Most Picked Agent').closest('div');
    expect(mostPickedSection).toHaveTextContent(mostPickedAgent.name);
    expect(mostPickedSection).toHaveTextContent(`${mostPickedAgent.stats.totalPicks} picks`);
  });

  it('displays highest win rate agent correctly', () => {
    render(<StatsSummary agentStats={mockAgentStats} />);
    
    // Find the agent with highest winRate
    const highestWinRateAgent = Object.entries(mockAgentStats).reduce(
      (max, [name, stats]) => 
        stats.winRate > max.stats.winRate ? { name, stats } : max,
      { name: '', stats: { winRate: 0 } }
    );
    
    // Find the agent name within the "Highest Win Rate" section
    const highestWinRateSection = screen.getByText('Highest Win Rate').closest('div');
    expect(highestWinRateSection).toHaveTextContent(highestWinRateAgent.name);
    expect(highestWinRateSection).toHaveTextContent(`${highestWinRateAgent.stats.winRate.toFixed(1)}%`);
  });
}); 