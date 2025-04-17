import { render, screen } from '@testing-library/react';
import AgentCard from '../AgentCard';
import { getAgentData } from '@/services/agent';
import { agentPicks } from '@/services/tournament/tournamentData';
import { AgentStatistics } from '@/types/valorant';

describe('AgentCard', () => {
  const agent = getAgentData('Jett')!;
  const stats: AgentStatistics = {
    agent: 'Jett',
    totalPicks: 1,
    winRate: 0.0,
    pickRate: 0.0,
    firstPickRate: 0.0,
    teamWinRates: {}
  };

  it('displays agent information', () => {
    render(<AgentCard agent={agent} stats={stats} />);
    expect(screen.getByText('Jett')).toBeInTheDocument();
    expect(screen.getByText('Duelist')).toBeInTheDocument();
  });

  it('displays correct statistics', () => {
    render(<AgentCard agent={agent} stats={stats} />);
    expect(screen.getByText(`Picks: ${stats.totalPicks}`)).toBeInTheDocument();
    expect(screen.getByText(`Win Rate: ${stats.winRate.toFixed(1)}%`)).toBeInTheDocument();
  });

  it('handles missing statistics gracefully', () => {
    const emptyStats: AgentStatistics = {
      agent: 'Jett',
      totalPicks: 0,
      winRate: 0.0,
      pickRate: 0.0,
      firstPickRate: 0.0,
      teamWinRates: {}
    };

    render(<AgentCard agent={agent} stats={emptyStats} />);
    expect(screen.getByText('Picks: 0')).toBeInTheDocument();
    expect(screen.getByText('Win Rate: 0.0%')).toBeInTheDocument();
  });
}); 