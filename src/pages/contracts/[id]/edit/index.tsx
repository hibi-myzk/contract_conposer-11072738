import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface Contract {
  id: string;
  template_id: string;
  name: string;
  contract_date: string;
  amount: number;
  content: string;
}

export default function ContractEdit({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const { data, error } = await supabase
          .from('contracts')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) {
          console.error('Error fetching contract:', error);
          setIsLoading(false);
          return;
        }

        if (data) {
          setContract(data);
        }
      } catch (error) {
        console.error('Error fetching contract:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContract();
  }, [params.id]);

  const handleSave = async () => {
    if (!contract) return;

    try {
      const { error } = await supabase
        .from('contracts')
        .update({
          name: contract.name,
          contract_date: contract.contract_date,
          amount: contract.amount,
          content: contract.content,
        })
        .eq('id', params.id);

      if (error) {
        console.error('Error updating contract:', error);
        return;
      }

      router.push('/contracts');
    } catch (error) {
      console.error('Error updating contract:', error);
    }
  };

  const handleInputChange = (key: keyof Contract, value: string | number) => {
    if (!contract) return;
    setContract({ ...contract, [key]: value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!contract) {
    return <div>Contract not found.</div>;
  }

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">契約書編集</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">契約名</label>
          <input
            type="text"
            id="name"
            value={contract.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        {/* other input fields */}
        <div className="flex justify-end space-x-4">
          <button onClick={() => router.push('/contracts')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            キャンセル
          </button>
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            保存
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
