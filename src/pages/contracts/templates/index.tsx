import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const Templates = () => {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get('/api/contract-templates');
        setTemplates(res.data);
      } catch (err) {
        setError('テンプレートの取得に失敗しました。');
        console.error(err);
        setTemplates([
          { id: '1', name: 'テンプレート1' },
          { id: '2', name: 'テンプレート2' },
        ]); // サンプルデータ
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateClick = (templateId: string) => {
    router.push(`/contracts/new?templateId=${templateId}`);
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">テンプレート選択</h1>
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {templates.map((template: { id: string; name: string }) => (
            <li key={template.id} className="cursor-pointer" onClick={() => handleTemplateClick(template.id)}>
              {template.name}
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;