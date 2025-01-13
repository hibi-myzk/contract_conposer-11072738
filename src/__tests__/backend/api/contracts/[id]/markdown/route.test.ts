{"code": "import { NextApiRequest, NextApiResponse } from 'next/server';
import { jest } from '@jest/globals';

// モック
global.fetch = jest.fn() as jest.Mock;

describe('/api/contracts/[id]/markdown.ts', () => {
  it('契約書のMarkdownを取得できる', async () => {
    // モックデータを用意
    const markdownContent = '# 契約書タイトル\
## 第1条（目的）\
この契約書の目的は...';
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        content: markdownContent,
      }),
    });
    const req = {
      method: 'GET',
      url: '/api/contracts/1/markdown',
    } as unknown as NextApiRequest
    // APIハンドラーを実行
    // @ts-ignore
    const res = await fetch(req);


    // レスポンスステータスを確認
    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);

    // レスポンスボディを確認
    const data = await res.json();
    expect(data.content).toEqual(markdownContent);
  });

  it('API取得エラー時の処理', async () => {
    // fetchをエラーにする
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('APIエラー'));

    const req = {
      method: 'GET',
      url: '/api/contracts/1/markdown',
    } as unknown as NextApiRequest

    // APIハンドラーを実行
    // @ts-ignore
     const res = await fetch(req);
    expect(res.ok).toBe(false);
    // // エラーメッセージが表示されることを期待する
    // // 例: expect(await screen.findByText('エラーが発生しました')).toBeInTheDocument();
  });


  describe('idがない場合のテスト', () => {
    it('idがない場合、400エラーが返される', async () => {
      const req = {
        method: 'GET',
        url: '/api/contracts//markdown',
      } as unknown as NextApiRequest

      // APIハンドラーを実行
        // @ts-ignore
      const res = await fetch(req);

      expect(res.ok).toBe(false);
      expect(res.status).toBe(400);
    });
  });
});
"}