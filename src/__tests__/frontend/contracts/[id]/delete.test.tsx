{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Delete from '@/pages/contracts/[id]/delete';

// モック
jest.mock('next/navigation');

// ヘッダーコンポーネント
const Header = () => <div>Header</div>;

// フッターコンポーネント
const Footer = () => <div>Footer</div>;

describe('契約書削除画面', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('コンポーネントが正しくレンダリングされる', () => {
    render(
      <Delete />
    );

    // 削除確認メッセージが表示される
    expect(screen.getByText('契約書を削除しますか？')).toBeInTheDocument();

    // 削除ボタンが表示される
    expect(screen.getByRole('button', { name: '削除' })).toBeInTheDocument();

    // キャンセルボタンが表示される
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument();

        // ヘッダーが表示される
    expect(screen.getByText('Header')).toBeInTheDocument();

    // フッターが表示される
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('削除ボタンクリックでAPI呼び出しと画面遷移', async () => {
    render(<Delete />);
    const 削除ボタン = screen.getByRole('button', { name: '削除' });
    fireEvent.click(削除ボタン);
    expect(mockRouterPush).toHaveBeenCalledWith('/contracts');

  });

  it('キャンセルボタンクリックで画面遷移', () => {
    render(<Delete />);
    const キャンセルボタン = screen.getByRole('button', { name: 'キャンセル' });
    fireEvent.click(キャンセルボタン);
    expect(mockRouterPush).toHaveBeenCalledWith('/contracts');
  });
});
"}