{"code": "import { render, screen } from '@testing-library/react';
import Footer from '@/components/common/Footer';

describe('Footer Component Test', () => {
  it('should render without errors', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('should display the correct copyright text', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Your Company`)).toBeInTheDocument();
  });
});"}