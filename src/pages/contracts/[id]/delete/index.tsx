import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Delete = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contracts')
      .delete()
      .eq('id', router.query.id);

    if (error) {
      console.error('Error deleting contract:', error);
      setLoading(false);
      // 適切なエラー処理を追加
      return;
    }

    router.push('/contracts');
  };

  const handleCancel = () => {
    router.push('/contracts');
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">契約書を削除しますか？</h2>
            <div className="flex justify-end">
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                disabled={loading}
              >
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                削除
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Delete;
