import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';

const PdfPreview: React.FC<{
  params: {
    id: string;
  };
}> = ({ params }) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();
  const [pdfUrl, setPdfUrl] = useState('');

  const fetchPdf = async () => {
    if (!session) {
      return;
    }
    try {
      const { data, error } = await supabase.storage
        .from('contracts')
        .download(params.id + '.pdf');

      if (error) {
        console.error('Error downloading PDF:', error);
        // setPdfUrl('https://placehold.co/600x400/png'); // Placeholder
        setPdfUrl('');
        return;
      }

      const url = URL.createObjectURL(data);
      setPdfUrl(url);
    } catch (error) {
      console.error('Error fetching PDF:', error);
      // setPdfUrl('https://placehold.co/600x400/png'); // Placeholder
      setPdfUrl('');
    }
  };

  useState(() => {
    fetchPdf();
  }, [params.id, session]);

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <div className="bg-white p-4 shadow-md">
        <h2 className="text-xl font-semibold">PDFプレビュー</h2>
      </div>
      <div className="flex-grow p-4">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            width="100%"
            height="800px"
            className="border-2 border-gray-300"
          />
        ) : (
          <div className="text-center text-gray-500">PDFを読み込んでいます...</div>
        )}
      </div>
      <div className="p-4">
        <button
          onClick={() => router.push(`/contracts/${params.id}`)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default PdfPreview;
