{"code": "import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import MarkdownView from '@/pages/contracts/[id]/markdown';

jest.mock('next/navigation');

// モックデータ
const markdownContent = '# 契約書タイトル\
## 第1条（目的）\
この契約書の目的は...';

// ヘッダーコンポーネント（モック）
const Header = () => <div>ヘッダー</div>;

// サイドメニューコンポーネント（モック）
const SideMenu = () => <div>サイドメニュー</div>;

describe('MarkdownView', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    // Axios のモック設定
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => ({ content: markdownContent }),
      ok: true,
    } as Response);
  });

  it('契約書のMarkdown内容が正しく表示される', async () => {
    render(
      <div>
        <Header />
        <SideMenu />
        <MarkdownView />
      </div>
    );

    // Markdownコンテントが画面に表示されるまで待機
    await act(async () => {
      expect(await screen.findByText('契約書タイトル')).toBeInTheDocument();
    });

    // 正しいMarkdown内容が表示されていることを確認
    expect(screen.getByRole('heading', { level: 1, name: '契約書タイトル' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('第1条（目的）');
    expect(screen.getByText('この契約書の目的は...')).toBeInTheDocument();
  });

  it('API取得エラー時の処理', async () => {
    // fetchをエラーにする
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('APIエラー'));

    render(
      <div>
        <Header />
        <SideMenu />
        <MarkdownView />
      </div>
    );

    // エラーメッセージが表示されるまで待機
    await act(async () => {
      // エラーメッセージが表示されることを期待する
      // 例: expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
    });

  });

  describe('idがない場合のテスト', () => {
    it('idがない場合、/contracts/ にリダイレクトされる', async () => {
      (useRouter as jest.Mock).mockReturnValue({
        push: jest.fn(),
      });

      render(
        <div>
          <Header />
          <SideMenu />
          <MarkdownView />
        </div>
      );
      await act(async () => {});
      expect(useRouter().push).toHaveBeenCalledWith('/contracts/');
    });
  });
});"}