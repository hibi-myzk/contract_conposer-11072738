import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ContractPreview: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <div className="bg-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">契約書プレビュー画面</h1>
      </div>

      <div className="p-4">
        <div className="bg-white p-4 shadow-md">
          <p className="text-lg mb-4">契約書プレビュー表示領域</p>
          {/* 契約書の内容を表示するコンポーネントをここに配置 */}
          <div>
            {/* サンプルデータ */}
            <p>契約書の内容が表示されます。</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => router.push('/contracts/clauseList')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            条項一覧ボタン
          </button>
          <button
            onClick={() => router.push('/contracts/final')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            確定ボタン
          </button>
        </div>
      </div>

      <div className="mt-auto">
      <footer className="bg-gray-200 p-4">
       <p>Footer</p>
    </footer>
      </div>

    </div>
  );
};

export default ContractPreview;