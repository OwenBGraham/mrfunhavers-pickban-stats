import { render, screen } from '@testing-library/react';
import { AgentRoleSection } from '../AgentRoleSection';
import { mockAgents, mockAgentStats } from '@/lib/mockData';

describe('AgentRoleSection', () => {
  it('renders all agent roles as section headers', () => {
    render(<AgentRoleSection agents={mockAgents} agentStats={mockAgentStats} />);

    // Use getAllByText since there are multiple elements with these texts
    expect(screen.getAllByText('Duelist').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Initiator').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Controller').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Sentinel').length).toBeGreaterThan(0);
  });

  it('renders correct number of agents per role', () => {
    render(<AgentRoleSection agents={mockAgents} agentStats={mockAgentStats} />);

    // Count agents per role
    const duelistCount = mockAgents.filter(a => a.role === 'Duelist').length;
    const initiatorCount = mockAgents.filter(a => a.role === 'Initiator').length;
    const controllerCount = mockAgents.filter(a => a.role === 'Controller').length;
    const sentinelCount = mockAgents.filter(a => a.role === 'Sentinel').length;

    expect(screen.getAllByText('Duelist').length).toBe(duelistCount + 1); // +1 for the header
    expect(screen.getAllByText('Initiator').length).toBe(initiatorCount + 1);
    expect(screen.getAllByText('Controller').length).toBe(controllerCount + 1);
    expect(screen.getAllByText('Sentinel').length).toBe(sentinelCount + 1);
  });

  it('displays correct agent statistics', () => {
    render(<AgentRoleSection agents={mockAgents} agentStats={mockAgentStats} />);

    // Check Jett's statistics
    expect(screen.getByText('Jett')).toBeInTheDocument();
    expect(screen.getByText('75.0%')).toBeInTheDocument(); // Pick Rate
    expect(screen.getByText('45')).toBeInTheDocument(); // Total Picks
  });
}); 