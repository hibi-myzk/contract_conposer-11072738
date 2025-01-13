{"code": "import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contracts from '@/pages/contracts/[id]';

// モック
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// ヘッダーコンポーネント（モック）
const Header = () => <div>ヘッダー</div>;
// フッターコンポーネント（モック）
const Footer = () => <div>フッター</div>;

describe('契約書詳細画面', () => {
  const contractData = {
    id: '1',
    template_id: '1',
    name: 'テスト契約書',
    contract_date: '2024-07-24',
    amount: '10000',
    content: '# テスト契約書\
契約内容の詳細',
    pdf_path: '/path/to/pdf',
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: contractData });
  });

  it('契約書情報が正しく表示される', async () => {
    render(<Contracts params={{ id: '1' }} />); // params を渡す
    await act(() => Promise.resolve()); // 非同期処理を待つ

    expect(screen.getByText('テスト契約書')).toBeInTheDocument();
    expect(screen.getByText('2024-07-24')).toBeInTheDocument();
    expect(screen.getByText('10000')).toBeInTheDocument();
    expect(screen.getByText('# テスト契約書\
契約内容の詳細')).toBeInTheDocument(); // Markdown形式
    expect(screen.getByRole('heading', { level: 1, name: 'テスト契約書' })).toBeVisible();
  });

  it('ヘッダーとフッターが表示される', async () => {
    render(<Contracts params={{ id: '1' }} />);
    await act(() => Promise.resolve());

    expect(screen.getByText('ヘッダー')).toBeInTheDocument();
    expect(screen.getByText('フッター')).toBeInTheDocument();
  });

  it('データ取得エラー時にエラーメッセージが表示される', async () => {
    mockedAxios.get.mockRejectedValue(new Error('エラーメッセージ'));
    render(<Contracts params={{ id: '1' }} />);
    await act(() => Promise.resolve());

    expect(screen.getByText('エラーが発生しました: エラーメッセージ')).toBeInTheDocument();
  });
});"}