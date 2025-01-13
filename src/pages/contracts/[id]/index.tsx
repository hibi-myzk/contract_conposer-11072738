import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const ContractDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [contract, setContract] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      if (id) {
        try {
          const { data, error } = await supabase
            .from('contracts')
            .select('id, template_id, name, contract_date, amount, content, pdf_path')
            .eq('id', id)
            .single();

          if (error) {
            setError('契約書の取得に失敗しました: ' + error.message);
            setContract({
              id: '1',
              template_id: '1',
              name: 'テスト契約書',
              contract_date: '2024-07-24',
              amount: '10000',
              content: '# テスト契約書
契約内容の詳細',
              pdf_path: '/path/to/pdf',
            }); // サンプルデータ
          } else {
            setContract(data);
          }
        } catch (error: any) {
          setError('エラーが発生しました: ' + error.message);
          setContract({
            id: '1',
            template_id: '1',
            name: 'テスト契約書',
            contract_date: '2024-07-24',
            amount: '10000',
            content: '# テスト契約書
契約内容の詳細',
            pdf_path: '/path/to/pdf',
          }); // サンプルデータ
        }
      }
    };
    fetchContract();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen h-full flex flex-col">
        <Header />
        <main className="flex-grow p-4">
          <p className="text-red-500">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="min-h-screen h-full flex flex-col">
        <Header />
        <main className="flex-grow p-4">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <main className="flex-grow p-4">
      <h1 className="text-2xl font-bold mb-4">{contract.name}</h1>
        <p>契約日: {contract.contract_date}</p>
        <p>金額: {contract.amount}</p>
        <div dangerouslySetInnerHTML={{ __html: contract.content }} />
        <p>PDFパス: {contract.pdf_path}</p>
      </main>
      <Footer />
    </div>
  );
};

export default ContractDetail;
