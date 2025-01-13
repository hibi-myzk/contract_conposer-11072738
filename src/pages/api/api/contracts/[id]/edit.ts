import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    return res.status(400).json({ message: '不正なリクエストメソッドです' });
  }

  const contractId = req.query.id;

  if (!contractId) {
    return res.status(400).json({ message: '契約書IDが必要です' });
  }

  const { name, contract_date, amount, content } = req.body;

  try {
    const { data, error } = await supabase
      .from('contracts')
      .update({ name, contract_date, amount, content })
      .where('id', contractId as string);

    if (error) {
      console.error('契約書の更新に失敗しました', error);
      return res.status(500).json({ message: '契約書の更新に失敗しました' });
    }

    return res.status(200).json({ message: '契約書を更新しました' });
  } catch (error) {
    console.error('契約書の更新に失敗しました', error);
    return res.status(500).json({ message: '契約書の更新に失敗しました' });
  }
};

export default handler;