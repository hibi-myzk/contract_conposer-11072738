import { NextApiRequest, NextApiResponse } from 'next';
import { createContractTemplate } from '@/pages/api/utils/database/contract_templates';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, content } = req.body;
      await createContractTemplate(name, content);
      res.status(201).json({ message: 'テンプレートが正常に登録されました' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'テンプレートの登録に失敗しました' });
    }
  } else {
    res.status(405).end();
  }
};

export default handler;
