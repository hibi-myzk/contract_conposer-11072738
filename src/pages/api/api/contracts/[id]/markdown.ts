import { NextApiRequest, NextApiResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const id = req.url.split('/')[4]; // URLからIDを取得

      if (!id) {
        return res.status(400).json({ error: '契約書IDが必要です。' });
      }

      const { data, error } = await supabase
        .from('contracts')
        .select('content')
        .eq('id', id)
        .single();

      if (error) {
        console.error('契約書の取得に失敗しました:', error);
        return res.status(500).json({ error: '契約書の取得に失敗しました。' });
      }

      if (!data) {
        return res.status(404).json({ error: '契約書が見つかりません。' });
      }

      return res.status(200).json({ content: data.content });
    } catch (error) {
      console.error('エラーが発生しました:', error);
      return res.status(500).json({ error: 'エラーが発生しました。' });
    }
  } else {
    return res.status(405).json({ error: '許可されていないメソッドです。' });
  }
}