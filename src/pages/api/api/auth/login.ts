import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: 'ユーザーIDとパスワードを入力してください。' });
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userId,
        password,
      });

      if (error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(200).json({ message: 'ログイン成功' });
    } catch (err) {
      return res.status(500).json({ message: 'ログインに失敗しました。' });
    }
  } else {
    return res.status(405).json({ message: '許可されていないメソッドです。' });
  }
};

export default handler;
