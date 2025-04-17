import { render, screen } from '@testing-library/react';
import { AgentCard } from '../AgentCard';
import { mockAgents, mockAgentStats } from '@/lib/mockData';

describe('AgentCard', () => {
  it('renders agent name and role correctly', () => {
    const agent = mockAgents[0]; // Jett
    const stats = mockAgentStats[agent.name];

    render(<AgentCard agent={agent} stats={stats} />);

    expect(screen.getByText('Jett')).toBeInTheDocument();
    expect(screen.getByText('Duelist')).toBeInTheDocument();
  });

  it('displays correct statistics', () => {
    const agent = mockAgents[0]; // Jett
    const stats = mockAgentStats[agent.name];

    render(<AgentCard agent={agent} stats={stats} />);

    expect(screen.getByText('75.0%')).toBeInTheDocument(); // Pick Rate
    expect(screen.getByText('55.5%')).toBeInTheDocument(); // Win Rate
    expect(screen.getByText('45')).toBeInTheDocument(); // Total Picks
    expect(screen.getByText('30.0%')).toBeInTheDocument(); // First Pick Rate
  });

  it('handles missing statistics gracefully', () => {
    const agent = mockAgents[0]; // Jett
    const emptyStats = {
      agent: agent.name,
      totalPicks: 0,
      winRate: 0,
      pickRate: 0,
      firstPickRate: 0,
      teamWinRates: {},
    };

    render(<AgentCard agent={agent} stats={emptyStats} />);

    // Check that there are exactly 3 elements with '0.0%' (Pick Rate, Win Rate, First Pick Rate)
    expect(screen.getAllByText('0.0%')).toHaveLength(3);
    expect(screen.getByText('0')).toBeInTheDocument(); // Total Picks
  });
}); 