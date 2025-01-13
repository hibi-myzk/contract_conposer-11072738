import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { format } from 'date-fns';

const Create = () => {
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [contractName, setContractName] = useState('');
  const [contractDate, setContractDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase
        .from('contract_templates')
        .select('id, name');
      if (error) {
        console.error('Error fetching templates:', error);
        // サンプルデータをセット
        setTemplates([{ id: 1, name: 'サンプルテンプレート1' }, { id: 2, name: 'サンプルテンプレート2' }]);
      } else {
        setTemplates(data);
      }
    };
    fetchTemplates();
  }, []);

  const handleSave = async () => {
    const { data, error } = await supabase
      .from('contracts')
      .insert([{ template_id: templates[0]?.id, name: contractName, contract_date: contractDate, amount: amount, content: '' }]);
    if (error) {
      console.error('Error saving contract:', error);
      // エラー処理
    } else {
      // 保存成功時の処理
      router.push('/contracts'); // 保存後に契約書一覧画面に遷移
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <aside className="w-64 bg-gray-200 p-4">
          {/* サイドメニュー */}
          <ul>
              <li><a href="/contracts" className="text-blue-500 hover:underline">契約書一覧</a></li>
          </ul>
      </aside>

      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">契約書作成画面</h1>
        <div>
          <label htmlFor="templateSelect">契約書テンプレートを選択</label>
          <select id="templateSelect" className="border rounded p-2">
            {templates.map((template) => (
              <option key={template.id} value={template.id}>{template.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contractName">契約書名</label>
          <input
            type="text"
            id="contractName"
            className="border rounded p-2"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contractDate">契約日</label>
          <input
            type="date"
            id="contractDate"
            className="border rounded p-2"
            value={contractDate}
            onChange={(e) => setContractDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">金額</label>
          <input
            type="number"
            id="amount"
            className="border rounded p-2"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <h2>条項一覧</h2>
          {/* 条項一覧を表示するコンポーネントをここに追加 */}
        </div>
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          保存
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
          プレビュー
        </button>
      </main>
    </div>
  );
};

export default Create;
