{"code": "import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/pages/login';
import { jest } from '@jest/globals';

describe('Login Component Test', () => {
  // モック
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // next/router のモックを設定
    global.mockNextRouter.push = mockPush;

    // axios のモックを設定
    global.axios.post.mockResolvedValue({ status: 200, data: { message: 'ログイン成功' } });
  });

  it('ログインフォームが表示されること', () => {
    render(<Login />);
    expect(screen.getByLabelText('ユーザーID')).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });

  it('ログインボタンがクリックされた際にaxios.postが呼び出されること', async () => {
    render(<Login />);
    const userIdInput = screen.getByLabelText('ユーザーID');
    const passwordInput = screen.getByLabelText('パスワード');
    const loginButton = screen.getByRole('button', { name: 'ログイン' });

    fireEvent.change(userIdInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    expect(global.axios.post).toHaveBeenCalledWith('/api/auth/login', { userId: 'testuser', password: 'password' });
  });


  it('ログイン成功時に指定のページに遷移すること', async () => {
    render(<Login />);
    const userIdInput = screen.getByLabelText('ユーザーID');
    const passwordInput = screen.getByLabelText('パスワード');
    const loginButton = screen.getByRole('button', { name: 'ログイン' });

    fireEvent.change(userIdInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value:: 'password' } });
    fireEvent.click(loginButton);

    await global.axios.post;
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

});
"}