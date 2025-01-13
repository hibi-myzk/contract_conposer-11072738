{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// モックレスポンス
interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

const createMockRequest = (params: { id: string }): NextApiRequest => ({
  query: params,
  method: 'GET',
} as unknown as NextApiRequest);

const createMockResponse = (): MockResponse => ({
  _getStatusCode: jest.fn(),
  _getData: jest.fn(),
  status: jest.fn(() => ({
    json: jest.fn(),
  })),
  json: jest.fn(),
} as unknown as MockResponse);

// テスト対象のAPIハンドラをインポート
import handler from '@/pages/api/contracts/[id]';

describe('/api/contracts/[id]', () => {
  it('契約書詳細を取得できる', async () => {
    const contractData = {
      id: '1',
      template_id: '1',
      name: 'テスト契約書',
      contract_date: '2024-07-24',
      amount: '10000',
      content: '# テスト契約書\\
契約内容の詳細',
      pdf_path: '/path/to/pdf',
    };

    mockedAxios.get.mockResolvedValue({ data: contractData });

    const req = createMockRequest({ id: '1' });
    const res = createMockResponse();

    await handler(req, res);

    expect(mockedAxios.get).toHaveBeenCalledWith(process.env.NEXT_PUBLIC_SUPABASE_URL + '/contracts/1', {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(contractData);
  });

  it('データ取得エラー時にはエラーメッセージが返される', async () => {
    const errorMessage = 'エラーメッセージ';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const req = createMockRequest({ id: '1' });
    const res = createMockResponse();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});"}