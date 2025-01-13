import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

const Result = () => {
  const router = useRouter();
  const [contracts, setContracts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const { data, error } = await supabase
          .from('contracts')
          .select('id, name, contract_date');
        if (error) {
          throw error;
        }
        setContracts(data);
      } catch (error: any) {
        setError(error.message);
        // サンプルデータ
        setContracts([
          { id: '1', name: '契約書1', contract_date: '2024-01-01' },
          { id: '2', name: '契約書2', contract_date: '2024-02-01' },
        ]);
      }
    };
    fetchContracts();
  }, []);

  const handleDetailClick = (id: string) => {
    router.push(`/contracts/${id}`);
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
      <Header />
        <div className="p-4">
          {error && <p className="text-red-500">{error}</p>}
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">契約名</th>
                <th className="border border-gray-300 px-4 py-2">契約日</th>
                <th className="border border-gray-300 px-4 py-2">詳細</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id}>
                  <td className="border border-gray-300 px-4 py-2">{contract.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{contract.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{contract.contract_date}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button onClick={() => handleDetailClick(contract.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      詳細
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
