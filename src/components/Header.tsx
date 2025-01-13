import { useState } from 'react';
import Topbar from '@/components/Topbar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-100 shadow-md sticky top-0 z-50" role="banner">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold text-gray-800">契約書作成システム</div>
          <Topbar />

      </div>
    </header>
  );
};

export default Header;