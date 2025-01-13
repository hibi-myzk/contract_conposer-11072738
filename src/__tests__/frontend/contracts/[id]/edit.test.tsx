{"code": "import { render, screen, fireEvent, act } from '@testing-library/react';
import ContractEdit from '@/pages/contracts/[id]/edit';
import { jest } from '@jest/globals';

// モック
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => mockRouter),
}));

const mockRouter = {
  push: jest.fn(),
};

jest.mock('axios');

// ヘッダーコンポーネント（モック）
jest.mock('@/components/Header', () => () => <div>ヘッダー</div>);

// フッターコンポーネント（モック）
jest.mock('@/components/Footer', () => () => <div>フッター</div>);

describe('ContractEdit Component Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('契約書編集画面のレンダリング', async () => {
    render(<ContractEdit params={{ id: '1' }} />); // params を渡す
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('フッター')).toBeInTheDocument();
    // 必要な要素の有無を確認
    expect(screen.getByRole('textbox', { name: /契約名/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /契約日/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /金額/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /内容/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /保存/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /キャンセル/i })).toBeInTheDocument();
  });

  it('入力値の変更', async () => {
    render(<ContractEdit params={{ id: '1' }} />);

    const nameInput = screen.getByRole('textbox', { name: /契約名/i });
    const dateInput = screen.getByRole('textbox', { name: /契約日/i });
    const amountInput = screen.getByRole('textbox', { name: /金額/i });
    const contentInput = screen.getByRole('textbox', { name: /内容/i });

    fireEvent.change(nameInput, { target: { value: 'テスト契約' } });
    fireEvent.change(dateInput, { target: { value: '2024-01-01' } });
    fireEvent.change(amountInput, { target: { value: '10000' } });
    fireEvent.change(contentInput, { target: { value: 'テスト内容' } });

    expect(nameInput.value).toBe('テスト契約');
    expect(dateInput.value).toBe('2024-01-01');
    expect(amountInput.value).toBe('10000');
    expect(contentInput.value).toBe('テスト内容');
  });

  it('保存ボタンのクリック', async () => {
    render(<ContractEdit params={{ id: '1' }} />);
    const saveButton = screen.getByRole('button', { name: /保存/i });
    fireEvent.click(saveButton);

    // 保存処理の確認
  });

  it('キャンセルボタンのクリック', async () => {
    render(<ContractEdit params={{ id: '1' }} />);
    const cancelButton = screen.getByRole('button', { name: /キャンセル/i });
    fireEvent.click(cancelButton);

    expect(mockRouter.push).toHaveBeenCalledWith('/contracts');
  });
});
"}