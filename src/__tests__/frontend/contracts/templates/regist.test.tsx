{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import Regist from '@/pages/contracts/templates/regist';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('テンプレート登録画面', () => {
  it('HeaderとFooterが表示されること', () => {
    render(<Regist />);
    expect(screen.getByRole('banner')).toBeTruthy(); // Headerのテスト
    expect(screen.getByRole('contentinfo')).toBeTruthy(); // Footerのテスト
  });

  it('テンプレート名と内容を入力し、登録ボタンをクリックするとAPIがコールされること', async () => {
    const mockAxios = jest.mocked(axios);
    mockAxios.post.mockResolvedValue({ status: 200 });

    render(<Regist />);

    const nameInput = screen.getByLabelText('テンプレート名');
    const contentInput = screen.getByLabelText('内容');
    const registButton = screen.getByRole('button', { name: '登録' });

    fireEvent.change(nameInput, { target: { value: 'テストテンプレート' } });
    fireEvent.change(contentInput, { target: { value: 'テスト内容' } });
    fireEvent.click(registButton);

    expect(mockAxios.post).toHaveBeenCalledWith('/api/contract-templates/create', {
      name: 'テストテンプレート',
      content: 'テスト内容',
    });
  });


  it('APIコールが成功した場合、契約書一覧画面に遷移すること', async () => {
    const mockAxios = jest.mocked(axios);
    mockAxios.post.mockResolvedValue({ status: 200 });
    const mockRouterPush = jest.fn();
    jest.mocked(useRouter).mockReturnValue({
        push: mockRouterPush
    })

    render(<Regist />);

    const nameInput = screen.getByLabelText('テンプレート名');
    const contentInput = screen.getByLabelText('内容');
    const registButton = screen.getByRole('button', { name: '登録' });

    fireEvent.change(nameInput, { target: { value: 'テストテンプレート' } });
    fireEvent.change(contentInput, { target: { value: 'テスト内容' } });
    fireEvent.click(registButton);

    await new Promise((resolve) => setTimeout(resolve, 0)); // 非同期処理の完了を待つ

    expect(mockRouterPush).toHaveBeenCalledWith('/contracts');
  });
});
"}