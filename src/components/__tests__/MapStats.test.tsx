import { render, screen } from '@testing-library/react';
import { MapStats } from '../MapStats';
import { agentPicks } from '@/services/tournament';
import { AgentStats } from '@/types/agent';

describe('MapStats', () => {
  const mapName = 'Ascent';
  const mockAgentStats: Record<string, AgentStats> = {
    'Jett': {
      agent: 'Jett',
      totalPicks: 10,
      winRate: 50,
      pickRate: 20,
      firstPickRate: 30,
      teamWinRates: {},
      mapWinRates: { [mapName]: 60 }
    }
  };

  it('renders map statistics correctly', () => {
    render(<MapStats agentStats={mockAgentStats} mapName={mapName} />);
    expect(screen.getByText(`${mapName} Statistics`)).toBeInTheDocument();
    expect(screen.getByText('Total Map Picks')).toBeInTheDocument();
    expect(screen.getByText('Average Map Win Rate')).toBeInTheDocument();
    expect(screen.getByText('Agents Used')).toBeInTheDocument();
  });

  it('calculates and displays map-specific statistics correctly', () => {
    render(<MapStats agentStats={mockAgentStats} mapName={mapName} />);
    
    const mapStats = Object.entries(mockAgentStats).filter(([_, stats]) => 
      stats.mapWinRates?.[mapName] !== undefined
    );
    
    const expectedTotalPicks = mapStats.reduce((sum, [_, stats]) => sum + stats.totalPicks, 0);
    const expectedAverageWinRate = mapStats.length > 0
      ? mapStats.reduce((sum, [_, stats]) => sum + (stats.mapWinRates?.[mapName] || 0), 0) / mapStats.length
      : 0;
    
    const totalPicksSection = screen.getByText('Total Map Picks').closest('div');
    expect(totalPicksSection).toHaveTextContent(expectedTotalPicks.toString());
    
    const averageWinRateSection = screen.getByText('Average Map Win Rate').closest('div');
    expect(averageWinRateSection).toHaveTextContent(`${expectedAverageWinRate.toFixed(1)}%`);
    
    const agentsUsedSection = screen.getByText('Agents Used').closest('div');
    expect(agentsUsedSection).toHaveTextContent(mapStats.length.toString());
  });

  it('displays most picked agent for map correctly', () => {
    render(<MapStats agentStats={mockAgentStats} mapName={mapName} />);
    
    const mapStats = Object.entries(mockAgentStats).filter(([_, stats]) => 
      stats.mapWinRates?.[mapName] !== undefined
    );
    
    const mostPickedAgent = mapStats.reduce<{ name: string; stats: AgentStats }>(
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

  it('displays highest win rate agent for map correctly', () => {
    render(<MapStats agentStats={mockAgentStats} mapName={mapName} />);
    
    const mapStats = Object.entries(mockAgentStats).filter(([_, stats]) => 
      stats.mapWinRates?.[mapName] !== undefined
    );
    
    const highestWinRateAgent = mapStats.reduce<{ name: string; stats: AgentStats }>(
      (max, [name, stats]) => 
        (stats.mapWinRates?.[mapName] || 0) > (max.stats.mapWinRates?.[mapName] || 0)
          ? { name, stats }
          : max,
      { name: '', stats: { mapWinRates: {} } as AgentStats }
    );
    
    const highestWinRateSection = screen.getByText('Highest Win Rate').closest('div');
    if (highestWinRateAgent.name) {
      expect(highestWinRateSection).toHaveTextContent(highestWinRateAgent.name);
    }
    expect(highestWinRateSection).toHaveTextContent(
      `${(highestWinRateAgent.stats.mapWinRates?.[mapName] || 0).toFixed(1)}%`
    );
  });

  it('handles empty map stats correctly', () => {
    const emptyStats: Record<string, AgentStats> = {};
    render(<MapStats agentStats={emptyStats} mapName={mapName} />);
    
    const totalPicksSection = screen.getByText('Total Map Picks').closest('div');
    expect(totalPicksSection).toHaveTextContent('0');
    
    const averageWinRateSection = screen.getByText('Average Map Win Rate').closest('div');
    expect(averageWinRateSection).toHaveTextContent('0.0%');
    
    const agentsUsedSection = screen.getByText('Agents Used').closest('div');
    expect(agentsUsedSection).toHaveTextContent('0');
  });

  it('handles agents with missing map win rates', () => {
    const statsWithMissingRates: Record<string, AgentStats> = {
      'Jett': {
        agent: 'Jett',
        totalPicks: 10,
        winRate: 50,
        pickRate: 20,
        firstPickRate: 30,
        teamWinRates: {},
        mapWinRates: { [mapName]: 60 }
      },
      'Raze': {
        agent: 'Raze',
        totalPicks: 5,
        winRate: 40,
        pickRate: 15,
        firstPickRate: 20,
        teamWinRates: {},
        mapWinRates: {} // Missing map win rate
      }
    };

    render(<MapStats agentStats={statsWithMissingRates} mapName={mapName} />);
    
    // Only Jett should be counted in the statistics
    const totalPicksSection = screen.getByText('Total Map Picks').closest('div');
    expect(totalPicksSection).toHaveTextContent('10');
    
    const averageWinRateSection = screen.getByText('Average Map Win Rate').closest('div');
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
        teamWinRates: {},
        mapWinRates: { [mapName]: 60 }
      },
      'Raze': {
        agent: 'Raze',
        totalPicks: 5,
        winRate: 40,
        pickRate: 15,
        firstPickRate: 20,
        teamWinRates: {},
        mapWinRates: { [mapName]: 60 } // Same win rate as Jett
      }
    };

    render(<MapStats agentStats={statsWithEqualRates} mapName={mapName} />);
    
    // Both agents should be counted in the statistics
    const totalPicksSection = screen.getByText('Total Map Picks').closest('div');
    expect(totalPicksSection).toHaveTextContent('15');
    
    const averageWinRateSection = screen.getByText('Average Map Win Rate').closest('div');
    expect(averageWinRateSection).toHaveTextContent('60.0%');
    
    const agentsUsedSection = screen.getByText('Agents Used').closest('div');
    expect(agentsUsedSection).toHaveTextContent('2');
  });
}); 