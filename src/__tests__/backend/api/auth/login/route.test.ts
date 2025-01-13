{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/auth/login';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

const mockSupabaseClient = {
  auth: {
    signInWithPassword: jest.fn(),
  },
} as any;

describe('/api/auth/login API Endpoint Test', () => {
  it('ログイン成功時のレスポンスが正しいこと', async () => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
      method: 'POST',
      body: { userId: 'testuser', password: 'password' },
    });

    mockSupabaseClient.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ message: 'ログイン成功' });
  });

  it('ログイン失敗時のレスポンスが正しいこと', async () => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
      method: 'POST',
      body: { userId: 'testuser', password: 'incorrect' },
    });

    mockSupabaseClient.auth.signInWithPassword.mockResolvedValueOnce({
      data: null,
      error: { message: '認証に失敗しました' },
    });

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body)).toEqual({ message: '認証に失敗しました' });
  });

  it('リクエストボディがない場合のレスポンスが正しいこと', async () => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
      method: 'POST',
    });

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body)).toEqual({ message: 'ユーザーIDとパスワードを入力してください。' });
  });


});
"}