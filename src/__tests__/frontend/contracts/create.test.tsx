{"code": "import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Create from '@/pages/contracts/create';
import { jest } from '@jest/globals';

describe('契約書作成画面 コンポーネントテスト', () => {
  // モック
  const mockPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    // モック関数をクリア
    mockPush.mockClear();
    mockReplace.mockClear();

    // モック関数を設定
    global.mockNextRouter = {
        push: mockPush,
        replace: mockReplace,
        back: jest.fn(),
        forward: jest.fn(),
        refresh: jest.fn(),
        prefetch: jest.fn(),
      };
  });

  it('契約書作成画面の初期表示', async () => {
    render(<Create />);
    expect(await screen.findByText('契約書作成画面')).toBeInTheDocument();
  });

  it('契約書テンプレート選択フォームが表示される', async () => {
    render(<Create />);
    expect(await screen.findByRole('combobox', { name: /契約書テンプレートを選択/i })).toBeInTheDocument();
  });

  it('契約書情報入力フォームが表示される', async () => {
    render(<Create />);    
    expect(await screen.findByRole('textbox', { name: /契約書名/i })).toBeInTheDocument();
    expect(await screen.findByLabelText('契約日')).toBeInTheDocument();
    expect(await screen.findByRole('spinbutton', { name: /金額/i })).toBeInTheDocument();
  });

  it('条項一覧が表示される', async () => {
    render(<Create />);
    expect(await screen.findByText('条項一覧')).toBeInTheDocument();
  });

  it('プレビューボタンが表示される', async () => {
    render(<Create />);
    expect(await screen.findByRole('button', { name: /プレビュー/i })).toBeInTheDocument();
  });

  it('保存ボタンが表示される', async () => {
    render(<Create />);
    expect(await screen.findByRole('button', { name: /保存/i })).toBeInTheDocument();
  });

  describe('API 呼び出し', () => {
    it('getData が正しく呼び出される', async () => {
      global.fetch = jest.fn(() =>
          Promise.resolve({
              json: () => Promise.resolve([{id:1, name: 'test'}]),
              ok: true
          })
      ) as jest.Mock;

      render(<Create />);      

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/contract_templates', {method: 'GET'});
      });
    });

    it('postData が正しく呼び出される', async () => {
      global.fetch = jest.fn(() =>
          Promise.resolve({
              json: () => Promise.resolve({}),
              ok: true
          })
      ) as jest.Mock;

      render(<Create />);

      fireEvent.change(screen.getByRole('textbox', { name: /契約書名/i }), {target: {value: 'テスト契約書'}});
      fireEvent.change(screen.getByLabelText('契約日'), {target: {value: '2024-07-24'}});
      fireEvent.change(screen.getByRole('spinbutton', { name: /金額/i }), {target: {value: '10000'}});
      fireEvent.click(screen.getByRole('button', { name: /保存/i }));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/contracts', {
          method: 'POST',
          body: expect.any(String)
        });
      });
    });
  });

  it('共通コンポーネントが表示される', async () => {
    render(<Create />);    
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('navigation')).toBeInTheDocument(); // SideMenu
  });
});
"}