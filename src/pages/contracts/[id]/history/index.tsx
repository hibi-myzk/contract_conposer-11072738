import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

// common components
const Header = () => <header className="bg-gray-100 p-4 border-b border-gray-300">Header</header>;
const SideMenu = () => <aside className="bg-gray-200 w-60 p-4 border-r border-gray-300">SideMenu</aside>;

export default function History({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('contract_histories')
          .select('changed_at, content')
          .eq('contract_id', params.id);

        if (error) {
          throw error;
        }

        setHistoryData(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching contract history:', err);
        // Sample data for error case
        setHistoryData([
          { changed_at: '2024-08-01 10:00:00', content: '契約内容Aを追加（サンプル）' },
          { changed_at: '2024-08-02 12:00:00', content: '契約期間を変更（サンプル）' },
        ]);
      }
    };

    fetchHistory();
  }, [params.id]);

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow p-4">
        <Header />
        <h1 className="text-2xl font-bold mb-4">変更履歴</h1>
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-300">
              <th className="border border-gray-400 p-2">変更日時</th>
              <th className="border border-gray-400 p-2">変更内容</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((history) => (
              <tr key={history.changed_at} className="hover:bg-gray-100">
                <td className="border border-gray-400 p-2">{history.changed_at}</td>
                <td className="border border-gray-400 p-2">{history.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
