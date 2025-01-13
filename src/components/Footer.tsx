import { FC } from 'react';
import { TbBrandNextjs } from 'react-icons/tb';
import { SiSupabase } from 'react-icons/si';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-8" role="contentinfo">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
          <p className="text-sm">
            © {currentYear} Your Company. All rights reserved.
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-4 justify-center md:justify-end">
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
            <TbBrandNextjs size={24} />
          </a>
          <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors duration-300">
            <SiSupabase size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;