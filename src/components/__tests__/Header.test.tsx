import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />);
    expect(screen.getByText('VALORANT Stats')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('Maps')).toBeInTheDocument();
  });

  it('highlights the active navigation link', () => {
    render(<Header activeLink="/agents" />);
    const activeLink = screen.getByText('Agents');
    expect(activeLink).toHaveClass('text-white');
  });
}); 