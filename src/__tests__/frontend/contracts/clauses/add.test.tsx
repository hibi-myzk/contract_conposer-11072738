{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import Add from '@/pages/contracts/clauses/add';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Add Clause Screen', () => {
  it('renders without crashing', () => {
    render(
      <>
        <Header />
        <Add />
        <Footer />
      </>
    );

    expect(screen.getByRole('heading', { level: 1, name: /条項追加/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /条項内容/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /追加/i })).toBeInTheDocument();
  });

  it('updates the clause content on input change', async () => {
    render(
      <>
        <Header />
        <Add />
        <Footer />
      </>
    );
    const textbox = screen.getByRole('textbox', { name: /条項内容/i });
    fireEvent.change(textbox, { target: { value: '新しい条項' } });
    expect(textbox).toHaveValue('新しい条項');
  });

  it('calls the addClause function when the button is clicked', async () => {
    const mockAddClause = jest.fn();
    render(
      <>
        <Header />
        <Add addClause={mockAddClause} />
        <Footer />
      </>
    );
    const button = screen.getByRole('button', { name: /追加/i });
    fireEvent.click(button);
    expect(mockAddClause).toHaveBeenCalled();
  });

  it('navigates to the clause list page after adding a clause', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    render(
      <>
        <Header />
        <Add />
        <Footer />
      </>
    );

    const button = screen.getByRole('button', { name: /追加/i });
    fireEvent.click(button);
    expect(mockPush).toHaveBeenCalled();
  });
});
"}