import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    const { data, error } = await supabase
      .from('contract_histories')
      .select('*')
      .eq('contract_id', id)
      .order('changed_at', { ascending: true });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'データの取得に失敗しました。' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'データの取得に失敗しました。' });
  }
};

export default handler;