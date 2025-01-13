import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('contracts')
        .select('id, name, contract_date, updated_at')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('契約書一覧取得エラー', error);
        return res.status(500).json({ error: '契約書一覧の取得に失敗しました。' });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('契約書一覧取得エラー', error);
      return res.status(500).json({ error: '契約書一覧の取得に失敗しました。' });
    }
  }

  return res.status(405).end();
};

export default handler;