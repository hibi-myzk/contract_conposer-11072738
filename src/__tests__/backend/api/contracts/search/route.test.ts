{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/contracts/search';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        like: jest.fn(() => ({
          or: jest.fn(() => ({
            gte: jest.fn(() => ({
              lte: jest.fn().mockResolvedValue({ data: [], error: null }),
            })),
          })),
        })),
      })),
    })),
  },
}));

describe('/api/contracts/search API Endpoint Test', () => {
  it('契約書検索APIの正常系テスト', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: {
        contractName: 'テスト契約書',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ contracts: [] });
  });

  it('契約書検索APIの異常系テスト：Supabaseエラー', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: {
        contractName: 'テスト契約書',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    });
    const mockSupabase = jest.mocked(supabase);
    mockSupabase.from.mockReturnValue({
      select: jest.fn().mockResolvedValue({ error: 'エラーメッセージ' }),
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ error: 'エラーメッセージ' });

  });

    it('契約書検索API パラメータなし', async () => {
      const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
        method: 'GET',
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        contracts: [],
      });
    });
});
"}