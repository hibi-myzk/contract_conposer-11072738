{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/contracts/[id]/delete';
import { supabase } from '@/lib/supabaseClient';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: null, error: null }),
  },
}));

describe('契約書削除API', () => {
  it('契約書を削除できる', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'DELETE',
      query: { id: '1' },
    });

    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockResolvedValue({ data: [], error: null }),
      eq: jest.fn().mockReturnThis(),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ message: '契約書を削除しました' });
  });

  it('契約書が存在しない場合、404エラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'DELETE',
      query: { id: '2' },
    });

    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockResolvedValue({ data: [], error: null }),
      eq: jest.fn().mockReturnThis(),
    });
    (supabase.from as jest.Mock).mockReturnValue({
      select: jest.fn().mockResolvedValue({ data: [], error: null }),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(res._getData())).toEqual({ message: '契約書が見つかりません' });

  });

  it('削除中にエラーが発生した場合、500エラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'DELETE',
      query: { id: '1' },
    });

    (supabase.from as jest.Mock).mockReturnValue({
      delete: jest.fn().mockRejectedValue(new Error('エラーメッセージ')),
      eq: jest.fn().mockReturnThis(),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ message: '契約書の削除に失敗しました' });
  });
});
"}