import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { generatePdf } from '@/utils/pdf';

export default async function createContract(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    templateId,
    name,
    contractDate,
    amount,
    content,
  } = req.body;

  // Check if required parameters are provided
  if (!templateId || !name || !contractDate || !amount || !content) {
    return res.status(400).json({ message: '必須パラメータが不足しています。' });
  }

  try {
    const { data, error } = await supabase
      .from('contracts')
      .insert({
        template_id: templateId,
        name,
        contract_date: contractDate,
        amount,
        content,
      });

    if (error) {
      console.error('Error creating contract:', error);
      return res.status(500).json({ message: '契約書作成エラー' });
    }

    const pdfPath = await generatePdf(content);

    if (!pdfPath) {
      return res.status(500).json({ message: 'PDF生成エラー' });
    }

    // Update the contract with the PDF path
    const { error: updateError } = await supabase
      .from('contracts')
      .update({ pdf_path: pdfPath })
      .eq('id', data[0].id);

    if (updateError) {
      console.error('Error updating contract with PDF path:', updateError);
      return res.status(500).json({ message: '契約書更新エラー' });
    }

    return res.status(200).json({ message: '契約書作成成功', pdfPath });
  } catch (error) {
    console.error('Unexpected error creating contract:', error);
    return res.status(500).json({ message: '契約書作成エラー' });
  }
}