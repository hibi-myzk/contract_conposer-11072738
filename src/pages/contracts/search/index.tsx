import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const ContractSearch = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [searchResults, setSearchResults] = useState([]);

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/contracts/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();

      setSearchResults(result);

    } catch (error) {
      console.error('Error fetching data:', error);
      // サンプルデータをセット
      setSearchResults([
        { id: 1, contractName: 'サンプル契約書1', startDate: '2024-01-15' },
        { id: 2, contractName: 'サンプル契約書2', startDate: '2024-02-20' },
      ]);
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">契約書検索画面</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="contractName" className="block text-gray-700 text-sm font-bold mb-2">
              契約書名
            </label>
            <input
              type="text"
              id="contractName"
              {...register('contractName')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
              開始日
            </label>
            <input
              type="date"
              id="startDate"
              {...register('startDate')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            >
              <BsSearch className="mr-2" /> 検索
            </button>
          </div>
        </form>

        {searchResults && searchResults.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">検索結果</h2>
            <ul>
              {searchResults.map((result) => (
                <li key={result.id} className="border-b border-gray-200 py-2">
                  <p>契約書名: {result.contractName}</p>
                  <p>開始日: {result.startDate}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
};

export default ContractSearch;
