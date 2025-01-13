import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { FiPlus } from 'react-icons/fi';

const ContractList: React.FC = () => {
  const router = useRouter();
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const { data, error } = await supabase
          .from('contracts')
          .select('id, name, contract_date, updated_at');
        if (error) {
          console.error('Error fetching contracts:', error);
          // サンプルデータをセット
          setContracts([
            { id: '1', name: '契約書1', contract_date: '2024-01-01', updated_at: '2024-01-01' },
            { id: '2', name: '契約書2', contract_date: '2024-01-02', updated_at: '2024-01-02' },
          ]);
        } else {
          setContracts(data);
        }
      } catch (error) {
        console.error('Error fetching contracts:', error);
        // サンプルデータをセット
        setContracts([
          { id: '1', name: '契約書1', contract_date: '2024-01-01', updated_at: '2024-01-01' },
          { id: '2', name: '契約書2', contract_date: '2024-01-02', updated_at: '2024-01-02' },
        ]);
      }
    };

    fetchContracts();
  }, []);

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">契約書一覧</h1>
        <button
          onClick={() => router.push('/contracts/new')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center"
        >
          <FiPlus className="mr-2" /> 契約書登録
        </button>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">契約書名</th>
              <th className="border border-gray-400 px-4 py-2">契約日</th>
              <th className="border border-gray-400 px-4 py-2">更新日</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2">{contract.id}</td>
                <td className="border border-gray-400 px-4 py-2">{contract.name}</td>
                <td className="border border-gray-400 px-4 py-2">{contract.contract_date}</td>
                <td className="border border-gray-400 px-4 py-2">{contract.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContractList;
