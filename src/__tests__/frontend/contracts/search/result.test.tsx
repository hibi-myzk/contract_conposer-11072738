{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Result from '@/pages/contracts/search/result';

jest.mock('next/navigation');
jest.mock('axios');

// モックデータ
const mockContracts = [
  { id: '1', name: '契約書1', contract_date: '2024-01-01' },
  { id: '2', name: '契約書2', contract_date: '2024-02-01' },
];

// ヘッダーコンポーネント
const Header = () => <header>ヘッダー</header>;

// サイドメニューコンポーネント
const SideMenu = () => <aside>サイドメニュー</aside>;

describe('Result Component', () => {
  beforeEach(() => {
    // Axios モックの設定
    (axios as jest.Mocked<typeof axios>).get.mockResolvedValue({ data: { data: mockContracts } });
    // Router モックの設定
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('契約書一覧が表示されること', async () => {
    render(<Result />);
    // HeaderとSideMenuが表示されていることを確認
    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('サイドメニュー')).toBeInTheDocument();
    // 非同期処理が完了するのを待つ
    await screen.findAllByRole('cell');
    // 契約書名が表示されていることを確認
    expect(screen.getByText('契約書1')).toBeInTheDocument();
    expect(screen.getByText('契約書2')).toBeInTheDocument();
  });

  it('詳細画面への遷移ボタンが機能すること', async () => {
    render(<Result />);
    await screen.findAllByRole('cell');
    const button = screen.getByRole('button', { name: /詳細/i, hidden: true }); // 最初の行のボタンを取得
    // clickイベントを発火
    fireEvent.click(button);
    // 詳細画面への遷移が呼び出されたことを確認
    expect((useRouter as jest.Mock).mock.results[0].value.push).toHaveBeenCalledWith('/contracts/1'); // 正しいIDが渡されているか確認
  });

  it('データ取得に失敗した場合、エラーメッセージが表示されること', async () => {
    (axios as jest.Mocked<typeof axios>).get.mockRejectedValue(new Error('エラーメッセージ'));
    render(<Result />);
    // エラーメッセージが表示されていることを確認
    // 非同期処理が完了するのを待つ
    const errorMessage = await screen.findByText('エラーメッセージ');
    expect(errorMessage).toBeVisible();
  });
});"}