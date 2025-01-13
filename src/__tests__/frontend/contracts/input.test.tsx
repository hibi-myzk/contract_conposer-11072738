{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import ContractInput from '@/pages/contracts/input';

describe('ContractInput Component Test', () => {
  test('renders contract input form', () => {
    render(<ContractInput />);
    expect(screen.getByRole('textbox', { name: /契約書名/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /契約日/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /金額/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /プレビュー/i })).toBeInTheDocument();
  });

  test('updates input fields', async () => {
    render(<ContractInput />);
    const nameInput = screen.getByRole('textbox', { name: /契約書名/i });
    const dateInput = screen.getByRole('textbox', { name: /契約日/i });
    const amountInput = screen.getByRole('textbox', { name: /金額/i });

    fireEvent.change(nameInput, { target: { value: 'テスト契約書' } });
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });
    fireEvent.change(amountInput, { target: { value: '10000' } });

    expect(nameInput.value).toBe('テスト契約書');
    expect(dateInput.value).toBe('2024-01-01');
    expect(amountInput.value).toBe('10000');
  });

  test('handles preview button click', async () => {
    render(<ContractInput />);
    const previewButton = screen.getByRole('button', { name: /プレビュー/i });
    fireEvent.click(previewButton);
    // プレビュー画面への遷移ロジックをテスト
    expect(mockRouter.push).toHaveBeenCalledWith('/contracts/preview');

  });
});
"}