import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

// Components
const Header = ({ children }: { children: React.ReactNode }) => <header className="bg-gray-100 p-4">Header{children}</header>;
const Footer = () => <footer className="bg-gray-100 p-4 mt-8">Footer</footer>;

// Mock Supabase functions (replace with actual Supabase calls)
const mockGetClause = async (id: string) => {
  return {
    data: {
      content: '既存の条項内容',
    },
    error: null,
  };
};

const mockUpdateClause = async (id: string, content: string) => {
  return {
    data: {
      content,
    },
    error: null,
  };
};

const ClauseEdit: React.FC = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [clauseContent, setClauseContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const clauseId = router.query.id as string;

  const fetchClause = async () => {
    const { data, error } = await mockGetClause(clauseId);
    if (data) {
      setClauseContent(data.content);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    const { error } = await mockUpdateClause(clauseId, clauseContent);
    if (!error) {
      router.push('/contracts');
    }
  };

  if (isLoading) {
    fetchClause();
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>ログインしてください</div>;
  }

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header>
        {/* Add navigation links if needed */}
      </Header>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">条項編集</h1>
        <textarea
          className="w-full h-64 p-2 border border-gray-300 rounded"
          value={clauseContent}
          onChange={(e) => setClauseContent(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleSave}
        >
          保存
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default ClauseEdit;
