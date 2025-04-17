import { render, screen } from '@testing-library/react';
import { AgentRoleSection } from '../AgentRoleSection';
import { getAgentData } from '@/services/agent';
import { agentPicks } from '@/services/tournament/tournamentData';

describe('AgentRoleSection', () => {
  const agents = Object.keys(agentPicks)
    .map(name => getAgentData(name))
    .filter((agent): agent is NonNullable<typeof agent> => agent !== null);
  const duelistCount = agents.filter(agent => agent.role === 'Duelist').length;
  const initiatorCount = agents.filter(agent => agent.role === 'Initiator').length;
  const sentinelCount = agents.filter(agent => agent.role === 'Sentinel').length;

  it('renders all agent roles as section headers', () => {
    render(<AgentRoleSection agents={agents} agentStats={agentPicks} />);
    expect(screen.getAllByText('Duelist').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Initiator').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sentinel').length).toBeGreaterThan(0);
  });

  it('renders correct number of agents per role', () => {
    render(<AgentRoleSection agents={agents} agentStats={agentPicks} />);
    expect(screen.getAllByText('Duelist').length).toBe(duelistCount + 1);
    expect(screen.getAllByText('Initiator').length).toBe(initiatorCount + 1);
    expect(screen.getAllByText('Sentinel').length).toBe(sentinelCount + 1);
  });

  it('displays correct agent statistics', () => {
    render(<AgentRoleSection agents={agents} agentStats={agentPicks} />);
    const firstAgent = agents[0];
    const agentCard = screen.getByText(firstAgent.name).closest('.bg-white');
    expect(agentCard).toBeInTheDocument();
    expect(agentCard).toHaveTextContent(`Picks: ${agentPicks[firstAgent.name]}`);
  });
}); 