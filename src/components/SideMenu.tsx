import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Topbar from '@/components/Topbar';
import { MdOutlineMenu } from 'react-icons/md';

const SideMenu = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setLoggedInUser(user);
    };
    fetchLoggedInUser();
  }, []);

  const menuItems = [
    { name: '契約書一覧', path: '/contracts', roles: ['契約担当者', '法務担当者'] },
    { name: 'テンプレート選択', path: '/contracts/templates', roles: ['契約担当者'] },
    { name: 'テンプレート登録', path: '/contracts/templates/regist', roles: ['契約担当者'] },
    { name: '契約書作成', path: '/contracts/create', roles: ['契約担当者'] },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  const filteredMenuItems = loggedInUser ? menuItems.filter(item => item.roles.includes(loggedInUser?.user_metadata?.role)) : [];

  return (
    <div className="min-h-screen h-full flex">
      {/* サイドメニュー */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-200 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} >
        <div className="p-4">
        {filteredMenuItems.map((item, index) => (
          <div key={index} className="bg-white p-2 rounded mb-2 cursor-pointer hover:bg-gray-100" onClick={() => handleNavigation(item.path)}>
            {item.name}
          </div>
        ))}
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1">
        <Topbar />
          <button className="fixed top-4 left-4 z-50 bg-gray-300 p-2 rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MdOutlineMenu size={24} />
        </button>
        <div className="p-4">
          {/* コンテンツはここに配置 */}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
