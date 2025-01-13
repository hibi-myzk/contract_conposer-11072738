import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

interface Contract {
  id: string;
  name: string;
  contract_date: string | null;
  amount: number | null;
  content: string;
  created_at: string;
  updated_at: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { contractName, startDate, endDate } = req.query;

      let query = supabase.from('contracts').select('*');

      if (contractName) {
        query = query.like('name', `%${contractName}%`);
      }

      if (startDate && endDate) {
        query = query.gte('contract_date', startDate).lte('contract_date', endDate);
      } else if (startDate) {
        query = query.gte('contract_date', startDate);
      } else if (endDate) {
        query = query.lte('contract_date', endDate);
      }

      const { data: contracts, error } = await query;

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json({ contracts: contracts || [] });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: 'エラーが発生しました。' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default handler;