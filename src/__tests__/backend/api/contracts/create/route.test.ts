{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createContract } from '@/pages/api/contracts/create'; // Correct import path

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        data: jest.fn(),
        error: jest.fn(),
      })),
    })),
  },
}));

jest.mock('@/utils/pdf', () => ({
  generatePdf: jest.fn(() => 'test/pdf/path'),
}));

describe('契約書作成 API', () => {
  it('契約書作成が成功する', async () => {
    const req = {
      method: 'POST',
      body: {
        templateId: '1',
        name: 'テスト契約書',
        contractDate: '2024-01-01',
        amount: 10000,
        content: '契約内容',
      },
    } as NextApiRequest;
    const res = {} as NextApiResponse;

    const mockStatus = jest.fn().mockReturnThis();
    const mockJson = jest.fn().mockReturnThis();
    res.status = mockStatus;
    res.json = mockJson;

    await createContract(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: '契約書作成成功', pdfPath: 'test/pdf/path' });
  });

  it('必要なパラメータが不足している場合、エラーを返す', async () => {
    const req = {
      method: 'POST',
      body: {
        templateId: '1',
        name: 'テスト契約書',
        contractDate: '2024-01-01',
        amount: 10000,
        // content is missing
      },
    } as NextApiRequest;
    const res = {} as NextApiResponse;

    const mockStatus = jest.fn().mockReturnThis();
    const mockJson = jest.fn().mockReturnThis();
    res.status = mockStatus;
    res.json = mockJson;

    await createContract(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: '必須パラメータが不足しています。' });
  });
});
"}