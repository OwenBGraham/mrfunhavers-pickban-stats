import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders the site title', () => {
    render(<Header />);
    expect(screen.getByText('ValStats')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
    expect(screen.getByText('Maps')).toBeInTheDocument();
    expect(screen.getByText('Teams')).toBeInTheDocument();
  });

  it('highlights the active navigation link', () => {
    (usePathname as jest.Mock).mockReturnValue('/agents');
    render(<Header />);
    
    const activeLink = screen.getByText('Agents');
    expect(activeLink).toHaveClass('text-blue-400');
  });

  it('renders mobile menu button', () => {
    render(<Header />);
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });
}); 