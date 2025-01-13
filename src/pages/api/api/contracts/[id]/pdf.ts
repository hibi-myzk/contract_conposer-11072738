import { createMocks } from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

const handlePDF = async (req: NextApiRequest, res: MockResponse) => {
  try {
    const { id } = req.query;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid contract ID' });
    }

    const { data, error } = await supabase
      .from('contracts')
      .select('pdf_path')
      .eq('id', id)
      .single();

    if (error) {
      console.error(error);
      return res.status(404).send('Not Found');
    }

    if (!data) {
      return res.status(404).send('Not Found');
    }

    res.status(200).send(data.pdf_path);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export default handlePDF;