import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ContractConfirm: React.FC = () => {
  const router = useRouter();
  const [contractData, setContractData] = useState<any>(null);

  const handleConfirm = async () => {
    try {
      if (!contractData) return;

      const { data, error } = await supabase
        .from('contracts')
        .insert([
          {
            template_id: contractData.template_id,
            name: contractData.name,
            contract_date: contractData.contract_date,
            amount: contractData.amount,
            content: contractData.content,
            pdf_path: contractData.pdf_path,
          },
        ]);

      if (error) {
        console.error('契約書登録エラー', error);
        // TODO: エラー処理
        return;
      }

      router.push('/contracts'); // 契約書一覧画面へ遷移
    } catch (error) {
      console.error('契約書登録エラー', error);
      // TODO: エラー処理
    }
  };

  const handlePdfDownload = async () => {
    try {
      // TODO: PDF出力処理
      console.log('PDF出力');
    } catch (error) {
      console.error('PDF出力エラー', error);
      // TODO: エラー処理
    }
  };

  // サンプルデータ（API取得失敗時などに表示）
  const sampleContractData = {
    template_id: 'sample-template-id',
    name: 'サンプル契約書',
    contract_date: '2024-05-01',
    amount: 10000,
    content: '契約内容...',
    pdf_path: '/path/to/pdf',
  };

  if (!contractData) {
    setContractData(sampleContractData);
  }

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow p-4">
        <div className="max-w-screen-lg mx-auto bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold mb-4">契約書確定画面</h2>
          <pre>{JSON.stringify(contractData, null, 2)}</pre>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleConfirm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              確定
            </button>
            <button
              onClick={handlePdfDownload}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              PDF出力
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContractConfirm;
