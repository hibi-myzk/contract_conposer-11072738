import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const Add: React.FC = () => {
  const router = useRouter();
  const [clauseContent, setClauseContent] = useState('');

  const addClause = async () => {
    // 実際にはSupabaseを使ってデータベースに保存する処理を追加
    console.log('条項が追加されました:', clauseContent);
    router.push('/contracts'); // 追加後に契約書一覧画面に遷移
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-4">条項追加</h1>
        <div className="mb-4">
          <label htmlFor="clauseContent" className="block text-gray-700 font-bold mb-2">条項内容</label>
          <textarea
            id="clauseContent"
            name="clauseContent"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={5}
            value={clauseContent}
            onChange={(e) => setClauseContent(e.target.value)}
          ></textarea>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={addClause}
        >
          追加
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Add;
