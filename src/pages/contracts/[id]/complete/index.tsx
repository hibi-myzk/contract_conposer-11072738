import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

interface CompleteProps {
  id?: number
}

const Complete: React.FC<CompleteProps> = ({ id }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">PDF出力完了</h2>
          <p className="text-lg mb-6">PDFの出力が完了しました。</p>
          <div className="flex justify-between">
            <button
              onClick={() => router.push('/contracts')}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              契約書一覧へ
            </button>
            {id && (
              <button
                onClick={() => router.push(`/contracts/${id}`)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                契約書詳細へ
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Complete;