{"code": "import { createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import handlePDF from '@/pages/api/contracts/[id]/pdf';
import { jest } from '@jest/globals';

jest.mock('@/utils/supabase');

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

describe('契約書PDF生成APIのテスト', () => {
  it('契約書IDが存在する場合、PDF生成関数が呼び出される', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: { id: '1' },
    });

    const mockGetContractById = jest.fn().mockResolvedValue({
      data: { pdf_path: '/path/to/pdf.pdf' },
      error: null,
    });

    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: mockGetContractById,
        }),
      }),
    });

    await handlePDF(req, res);

    expect(mockGetContractById).toHaveBeenCalledWith();
    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toBe('/path/to/pdf.pdf');
  });

  it('契約書IDが存在しない場合、404エラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: { id: '2' },
    });

    const mockGetContractById = jest.fn().mockResolvedValue({
      data: null,
      error: { message: 'Not found' },
    });

    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: mockGetContractById,
        }),
      }),
    });

    await handlePDF(req, res);

    expect(mockGetContractById).toHaveBeenCalledWith();
    expect(res._getStatusCode()).toBe(404);
    expect(res._getData()).toBe('Not Found');
  });

    it('予期しないエラーが発生した場合、500エラーを返す', async () => {
        const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
          method: 'GET',
          query: { id: '3' },
        });
    
        const mockGetContractById = jest.fn().mockRejectedValue(new Error('予期しないエラー'));
    
        supabase.from.mockReturnValue({
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: mockGetContractById,
            }),
          }),
        });
    
        await handlePDF(req, res);
    
        expect(mockGetContractById).toHaveBeenCalledWith();
        expect(res._getStatusCode()).toBe(500);
        expect(res._getData()).toBe('Internal Server Error');
      });
});"}