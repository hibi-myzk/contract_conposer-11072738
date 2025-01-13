{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/contracts/[id]/history';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

jest.mock('@/lib/supabaseClient', () => ({
  __esModule: true,
  default: () => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn(() => ({
            data: jest.fn(),
          })),
        })),
      })),
    })),
  }),
}));

describe('/api/contracts/[id]/history', () => {
  it('should return contract history data', async () => {
    const mockContractHistoryData = [
      { changed_at: '2024-08-01T10:00:00Z', content: '契約内容A' },
      { changed_at: '2024-08-02T10:00:00Z', content: '契約内容B' },
    ];
    const mockSupabaseClient = jest.mocked(require('@/lib/supabaseClient').default);
    mockSupabaseClient().from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            data: jest.fn().mockResolvedValue(mockContractHistoryData),
          }),
        }),
      }),
    });
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: { id: '1' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockContractHistoryData);
  });

  it('should handle errors', async () => {
    const mockError = new Error('Database error');
    const mockSupabaseClient = jest.mocked(require('@/lib/supabaseClient').default);
    mockSupabaseClient().from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockReturnValue({
            data: jest.fn().mockRejectedValue(mockError),
          }),
        }),
      }),
    });
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: { id: '1' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ error: 'データの取得に失敗しました。' });
  });

  it('should return 405 for unsupported methods', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      query: { id: '1' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Method Not Allowed' });
  });
});"}