import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Clauses: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow p-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">条項一覧</h2>
          {/* 条項一覧テーブル */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">条項名</th>
                  <th className="border border-gray-300 px-4 py-2">内容</th>
                  <th className="border border-gray-300 px-4 py-2">操作</th>
                </tr>
              </thead>
              <tbody>
                {/* TODO: API から取得した条項データを表示 */}
                <tr>
                  <td className="border border-gray-300 px-4 py-2">サンプル条項1</td>
                  <td className="border border-gray-300 px-4 py-2">サンプル内容1</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">編集</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">削除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">追加</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Clauses;
