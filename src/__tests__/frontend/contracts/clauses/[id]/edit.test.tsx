{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { jest } from '@jest/globals';
import ClauseEdit from '@/pages/contracts/clauses/[id]/edit';

// モック
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/components/Header', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <header>Header{children}</header>,
}));

jest.mock('@/components/Footer', () => ({
  __esModule: true,
  default: () => <footer>Footer</footer>,
}));

describe('ClauseEdit Component', () => {
  it('renders without crashing', () => {
    render(<ClauseEdit />); 
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('updates clause content on input change', async () => {
    render(<ClauseEdit />);
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '新しい条項内容' } });
    expect(inputElement.value).toBe('新しい条項内容');
  });

  // 保存ボタンのテスト
  it('calls onSave function when save button is clicked', async () => {
    const onSaveMock = jest.fn();
    render(<ClauseEdit onSave={onSaveMock} />);
    const saveButton = screen.getByRole('button', { name: /保存/i });
    fireEvent.click(saveButton);
    expect(onSaveMock).toHaveBeenCalled();
  });
});"}