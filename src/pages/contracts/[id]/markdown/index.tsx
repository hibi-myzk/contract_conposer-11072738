import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { supabase } from '@/supabase';

// ヘッダーコンポーネント
const Header = () => <div className="bg-gray-100 p-4">ヘッダー</div>;

// サイドメニューコンポーネント
const SideMenu = () => <div className="bg-gray-200 p-4">サイドメニュー</div>;

const MarkdownView: React.FC = () => {
  const router = useRouter();
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = router.query.id;
        if (!id || typeof id !== 'string') {
          router.push('/contracts/');
          return;
        }

        const { data, error } = await supabase
          .from('contracts')
          .select('content')
          .eq('id', id)
          .single();

        if (error) {
          setError('契約書の取得に失敗しました。');
          setIsLoading(false);
          return;
        }

        setMarkdownContent(data.content || '');
        setIsLoading(false);
      } catch (error) {
        setError('エラーが発生しました。');
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router.query.id, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen h-full flex">
        <SideMenu />
        <div className="flex-1 p-4">
          <Header />
          <p>読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen h-full flex">
        <SideMenu />
        <div className="flex-1 p-4">
          <Header />
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-1 p-4">
        <Header />
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownView;
