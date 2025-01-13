{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/contracts/[id]/edit';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

jest.mock('@/utils/supabase-admin', () => ({
  supabase: () => ({
    from: () => ({
      update: jest.fn().mockResolvedValue({ data: [], error: null }),
    }),
  }),
}));

describe('/api/contracts/[id]/edit', () => {
  it('契約書を更新できる', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'PUT',
      query: { id: '1' },
      body: {
        name: '更新された契約書名',
        contract_date: '2024-07-29',
        amount: 20000,
        content: '更新された契約内容',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ message: '契約書を更新しました' });
  });

  it('不正なリクエストメソッドでエラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      query: { id: '1' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({ message: '不正なリクエストメソッドです' });
  });

  it('契約書IDがない場合エラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'PUT',
      body: { name: '更新された契約書名' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({ message: '契約書IDが必要です' });
  });

  it('更新に失敗した場合エラーを返す', async () => {
    jest.mocked(supabase).from('contracts').update.mockRejectedValue(new Error('更新エラー'));

    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'PUT',
      query: { id: '1' },
      body: {
        name: '更新された契約書名',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ message: '契約書の更新に失敗しました' });
  });
});
"}