{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';

import handler from '@/pages/api/contracts/index';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          data: jest.fn(() => ([
            { id: '1', name: '契約書1', contract_date: '2024-01-01', updated_at: '2024-01-01T00:00:00Z' },
            { id: '2', name: '契約書2', contract_date: '2024-01-02', updated_at: '2024-01-02T00:00:00Z' },
          ])),
        })),
      })),
    })),
  },
}));

describe('/api/contracts/index', () => {
  it('契約書一覧を取得できる', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual([
      { id: '1', name: '契約書1', contract_date: '2024-01-01', updated_at: '2024-01-01T00:00:00Z' },
      { id: '2', name: '契約書2', contract_date: '2024-01-02', updated_at: '2024-01-02T00:00:00Z' },
    ]);
  });
});
"}