{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import History from '@/pages/contracts/[id]/history';

jest.mock('next/navigation');

// モックデータ
const mockHistoryData = [
  { changed_at: '2024-07-24 10:00:00', content: '契約内容Aを追加' },
  { changed_at: '2024-07-25 12:00:00', content: '契約期間を変更' },
];

// ヘッダーコンポーネントのモック
const Header = () => <div>Header</div>;

// サイドメニューコンポーネントのモック
const SideMenu = () => <div>SideMenu</div>;

describe('変更履歴画面', () => {
  beforeEach(() => {
    // fetch のモック設定
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockHistoryData),
        ok: true,
      })
    ) as jest.Mock;

    // useRouter のモック設定
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('変更履歴一覧テーブルが表示されること', async () => {
    render(
      <History
        params={{ id: '1' }}
        searchParams={{ id: '1' }}
      />,
      { wrapper: ({ children }) => <>{children}</>}
    );

    // HeaderとSideMenuが表示されていることを確認
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('SideMenu')).toBeInTheDocument();

    // 変更履歴が表示されていることを確認
    for (const history of mockHistoryData) {
      expect(screen.getByText(history.changed_at)).toBeInTheDocument();
      expect(screen.getByText(history.content)).toBeInTheDocument();
    }
  });

  it('データ取得エラー時にエラーメッセージが表示されること', async () => {
    // fetch のモック設定（エラー発生）
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('データ取得エラー'))
    ) as jest.Mock;

    render(
      <History
        params={{ id: '1' }}
        searchParams={{ id: '1' }}
      />,
      { wrapper: ({ children }) => <>{children}</>}
    );

    // エラーメッセージが表示されていることを確認
    expect(await screen.findByText('データ取得エラー')).toBeInTheDocument();
  });

});
"}