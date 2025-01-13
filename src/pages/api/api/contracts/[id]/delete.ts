import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      // 契約書の存在確認
      const { data: contractData, error: contractError } = await supabase
        .from('contracts')
        .select()
        .eq('id', id);

      if (contractError) {
        console.error('契約書の存在確認エラー:', contractError);
        return res.status(500).json({ message: '契約書の削除に失敗しました' });
      }

      if (!contractData || contractData.length === 0) {
        return res.status(404).json({ message: '契約書が見つかりません' });
      }

      const { data, error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('契約書削除エラー:', error);
        return res.status(500).json({ message: '契約書の削除に失敗しました' });
      }

      return res.status(200).json({ message: '契約書を削除しました' });
    } catch (error) {
      console.error('予期せぬエラー:', error);
      return res.status(500).json({ message: '契約書の削除に失敗しました' });
    }
  } else {
    return res.status(405).json({ message: '許可されていないメソッドです' });
  }
};

export default handler;
