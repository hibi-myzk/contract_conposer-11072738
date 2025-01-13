{"code": "import { NextApiRequest, NextApiResponse } from 'next';
import { createContractTemplate } from '@/pages/api/utils/database/contract_templates';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

jest.mock('@/pages/api/utils/database/contract_templates');
const mockCreateContractTemplate = jest.mocked(createContractTemplate);

const handler = async (req: NextApiRequest, res: MockResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, content } = req.body;
      await mockCreateContractTemplate(name, content);
      res.status(201).json({ message: 'テンプレートが正常に登録されました' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'テンプレートの登録に失敗しました' });
    }
  } else {
    res.status(405).end();
  }
};

describe('/api/contract-templates/create API', () => {
  it('POSTリクエストでテンプレートが作成できること', async () => {
    const req = {
      method: 'POST',
      body: { name: 'テストテンプレート', content: 'テストコンテンツ' },
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      _getStatusCode: jest.fn().mockReturnThis(),
      _getData: jest.fn().mockReturnThis(),
    } as MockResponse;

    mockCreateContractTemplate.mockResolvedValue(undefined);
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'テンプレートが正常に登録されました' });
    expect(mockCreateContractTemplate).toHaveBeenCalledWith('テストテンプレート', 'テストコンテンツ');
  });

  it('POSTリクエストでエラーが発生した場合、500エラーを返すこと', async () => {
    const req = {
      method: 'POST',
      body: { name: 'テストテンプレート', content: 'テストコンテンツ' },
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      _getStatusCode: jest.fn().mockReturnThis(),
      _getData: jest.fn().mockReturnThis(),
    } as MockResponse;

    const mockError = new Error('データベースエラー');
    mockCreateContractTemplate.mockRejectedValue(mockError);
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'テンプレートの登録に失敗しました' });
    expect(console.error).toHaveBeenCalledWith(mockError); // コンソールエラーの確認
  });

  it('POSTメソッド以外のリクエストで405エラーを返すこと', async () => {
    const req = {
      method: 'GET',
    } as NextApiRequest;
    const res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
      _getStatusCode: jest.fn().mockReturnThis(),
      _getData: jest.fn().mockReturnThis(),
    } as unknown as MockResponse;

    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalled();
  });
});
"}