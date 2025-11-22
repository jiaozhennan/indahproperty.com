import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useLanguage, languageNames } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isPropertiesDropdownOpen, setIsPropertiesDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // 切换语言
  const changeLanguage = (lang: string) => {
    setLanguage(lang as 'zh' | 'en' | 'id');
    setIsLanguageOpen(false);
  };
  
  // 平滑滚动到指定元素
  const scrollToSection = (id: string, closeMenu: boolean = false) => {
    // 如果id为空，滚动到页面顶部
    if (id === '') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // 否则滚动到指定元素
      const element = document.getElementById(id);
      if (element) {
        // 计算滚动位置，考虑header高度
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    // 如果是移动菜单，点击后关闭菜单
    if (closeMenu) {
      setIsMenuOpen(false);
    }
  };
  
  // 跳转到特定的房产类型页面
  const navigateToPropertyType = (typeId: number) => {
    setIsPropertiesDropdownOpen(false);
    setIsMenuOpen(false);
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-blue-900 flex items-center"
            >
              <i className="fa-solid fa-palm-tree mr-2 text-amber-600"></i>
              <span>{language === 'zh' ? '巴厘岛太平洋花园' : language === 'id' ? 'Pacific Garden Bali' : 'Pacific Garden Bali'}</span>
            </Link>
          </div>
          
            {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <Link 
                to="/" 
                className="text-blue-900 hover:text-amber-600 font-medium transition-colors"
              >
                {t('common.home')}
              </Link>
              
              {/* Properties with Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center text-blue-900 hover:text-amber-600 font-medium transition-colors"
                  onClick={() => setIsPropertiesDropdownOpen(!isPropertiesDropdownOpen)}
                >
                  {t('common.properties')}
                  <i className={`fa-solid fa-chevron-down text-xs ml-1 transition-transform ${isPropertiesDropdownOpen ? 'transform rotate-180' : ''}`}></i>
                </button>
                
                {isPropertiesDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-10">
                    <Link
                      to="/projects"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      {language === 'zh' ? '所有房产项目' : language === 'id' ? 'Semua Properti' : 'All Properties'}
                    </Link>
                    <Link
                      to="/type8"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      {language === 'zh' ? 'Type 8 豪华复式公寓' : language === 'id' ? 'Tipe 8 Apartemen Duplex Mewah' : 'Type 8 Luxury Duplex'}
                    </Link>
                    <Link
                      to="/type6"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      {language === 'zh' ? 'Type 6 海滩别墅' : language === 'id' ? 'Tipe 6 Villa Dekat Pantai' : 'Type 6 Beachfront Villa'}
                    </Link>
                    <Link
                      to="/type5"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                    >
                      {language === 'zh' ? 'Type 5 山坡泳池别墅' : language === 'id' ? 'Tipe 5 Villa Kolam di Bukit' : 'Type 5 Hilltop Pool Villa'}
                    </Link>
                  </div>
                )}
              </div>
              
               <button 
  className="text-blue-900 hover:text-amber-600 font-medium transition-colors"
  onClick={() => scrollToSection('features')}
>
  {t('common.features')}
</button>
               <button 
  className="text-blue-900 hover:text-amber-600 font-medium transition-colors"
  onClick={() => scrollToSection('about')}
>
  {t('common.about')}
</button>
               <Link 
  to="/news" 
  className="text-blue-900 hover:text-amber-600 font-medium transition-colors"
>
  {language === 'zh' ? '最新资讯' : language === 'id' ? 'Berita Terbaru' : 'Latest News'}
</Link>
            </nav>
            
            {/* Language Selector */}
            <div className="relative ml-4">
              <button
                type="button"
                className="flex items-center text-gray-700 hover:text-amber-600 focus:outline-none"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <span className="mr-1">{languageNames[language as keyof typeof languageNames]}</span>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isLanguageOpen ? 'transform rotate-180' : ''}`}></i>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-10">
                  {Object.entries(languageNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => changeLanguage(code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === code 
                          ? 'bg-blue-100 text-blue-900' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Button */}
          <div className="hidden md:block">
            <button 
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              onClick={() => scrollToSection('contact')}
            >
              {t('common.consult_now')}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center text-gray-700 hover:text-amber-600 focus:outline-none"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <span className="mr-1 text-sm">{languageNames[language as keyof typeof languageNames]}</span>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isLanguageOpen ? 'transform rotate-180' : ''}`}></i>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-1 z-10 text-sm">
                  {Object.entries(languageNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => changeLanguage(code)}
                      className={`block w-full text-left px-4 py-2 ${
                        language === code 
                          ? 'bg-blue-100 text-blue-900' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              type="button"
              className="text-gray-600 hover:text-amber-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden bg-white border-t",
        isMenuOpen ? "block" : "hidden"
      )}>
        <div className="container mx-auto px-4 py-3 space-y-3">
          <Link 
            to="/" 
            className="block py-2 text-blue-900 font-medium w-full text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('common.home')}
          </Link>
          
           {/* Mobile Properties with Dropdown */}
            <div>
              <button 
                className="block py-2 text-blue-900 hover:text-amber-600 w-full text-left flex items-center justify-between"
                onClick={() => setIsPropertiesDropdownOpen(!isPropertiesDropdownOpen)}
              >
                <span>{t('common.properties')}</span>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform ${isPropertiesDropdownOpen ? 'transform rotate-180' : ''}`}></i>
              </button>
             
             {isPropertiesDropdownOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link
                    to="/projects"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-900"
                    onClick={() => {
                      setIsPropertiesDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    {language === 'zh' ? '所有房产项目' : language === 'id' ? 'Semua Properti' : 'All Properties'}
                  </Link>
                  <Link
                    to="/type8"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-900"
                    onClick={() => {
                      setIsPropertiesDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    {language === 'zh' ? 'Type 8 豪华复式公寓' : language === 'id' ? 'Tipe 8 Apartemen Duplex Mewah' : 'Type 8 Luxury Duplex'}
                  </Link>
                  <Link
                    to="/type6"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-900"
                    onClick={() => {
                      setIsPropertiesDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    {language === 'zh' ? 'Type 6 海滩别墅' : language === 'id' ? 'Tipe 6 Villa Dekat Pantai' : 'Type 6 Beachfront Villa'}
                  </Link>
                  <Link
                    to="/type5"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-blue-900"
                    onClick={() => {
                      setIsPropertiesDropdownOpen(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    {language === 'zh' ? 'Type 5 山坡泳池别墅' : language === 'id' ? 'Tipe 5 Villa Kolam di Bukit' : 'Type 5 Hilltop Pool Villa'}
                  </Link>
               </div>
             )}
           </div>
          
           <button 
  className="block py-2 text-blue-900 hover:text-amber-600 w-full text-left" 
  onClick={() => scrollToSection('features', true)}
>
  {t('common.features')}
</button>
           <button 
  className="block py-2 text-blue-900 hover:text-amber-600 w-full text-left" 
  onClick={() => scrollToSection('about', true)}
>
  {t('common.about')}
</button>
           <Link 
  to="/news" 
  className="block py-2 text-blue-900 hover:text-amber-600 w-full text-left"
  onClick={() => setIsMenuOpen(false)}
>
  {language === 'zh' ? '最新资讯' : language === 'id' ? 'Berita Terbaru' : 'Latest News'}
</Link>
          <button 
            className="block py-2 text-center bg-amber-600 text-white rounded-lg font-medium w-full mt-4"
            onClick={() => scrollToSection('contact', true)}
          >
            {t('common.consult_now')}
          </button>
        </div>
      </div>
    </header>
  );
}