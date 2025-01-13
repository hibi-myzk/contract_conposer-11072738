import { useState } from 'react';
import { useRouter } from 'next/router';

const ContractInput: React.FC = () => {
  const router = useRouter();
  const [contractName, setContractName] = useState('');
  const [contractDate, setContractDate] = useState('');
  const [amount, setAmount] = useState('');

  const handlePreviewClick = () => {
    // プレビュー画面への遷移処理
    router.push('/contracts/preview');
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">契約書情報入力</h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractName">
              契約書名
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contractName"
              type="text"
              placeholder="契約書名を入力してください"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contractDate">
              契約日
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contractDate"
              type="date"
              placeholder="契約日を入力してください"
              value={contractDate}
              onChange={(e) => setContractDate(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              金額
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="amount"
              type="number"
              placeholder="金額を入力してください"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handlePreviewClick}
            >
              プレビュー
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInput;
