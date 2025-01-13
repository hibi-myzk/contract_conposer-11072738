{"code": "import { render, screen, act } from '@testing-library/react';
import ContractList from '@/pages/contracts/index';
import { jest } from '@jest/globals';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockRouter = {
  push: jest.fn(),
};
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

describe('契約書一覧画面', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('契約書一覧が表示される', async () => {
    // モックデータ
    const contracts = [
      { id: '1', name: '契約書1', contract_date: '2024-01-01', updated_at: '2024-01-01' },
      { id: '2', name: '契約書2', contract_date: '2024-01-02', updated_at: '2024-01-02' },
    ];

    mockedAxios.get.mockResolvedValue({ data: contracts });

    render(<ContractList />);

    // 契約書名が表示されることを確認
    await act(async() => { await expect(screen.findByText('契約書1')).resolves.toBeVisible(); });
    await act(async() => { await expect(screen.findByText('契約書2')).resolves.toBeVisible(); });
    
  });

  it('契約書登録ボタンがクリックできる', async () => {
    render(<ContractList />);
    // ボタンをクリック
    await act(async() => { await screen.getByRole('button', { name: '契約書登録' }).click();});
    // ページ遷移
    expect(mockRouter.push).toHaveBeenCalledWith('/contracts/new');
  });

});
"}