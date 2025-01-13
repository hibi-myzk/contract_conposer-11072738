import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const Regist = () => {
  const router = useRouter();
  const [templateName, setTemplateName] = useState('');
  const [content, setContent] = useState('');

  const handleRegist = async () => {
    try {
      const res = await axios.post('/api/contract-templates/create', { name: templateName, content });
      if (res.status === 200) {
        router.push('/contracts');
      }
    } catch (error) {
      console.error(error);
      // エラーハンドリング
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">テンプレート登録</h1>
        <div className="mb-4">
          <label htmlFor="templateName" className="block text-gray-700 font-bold mb-2">テンプレート名</label>
          <input
            type="text"
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">内容</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={10}
          />
        </div>
        <button
          onClick={handleRegist}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          登録
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default Regist;
