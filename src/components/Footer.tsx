import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/translate';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold flex items-center mb-6">
              <i className="fa-solid fa-palm-tree mr-2 text-amber-500"></i>
              <span>{language === 'zh' ? '巴厘岛太平洋花园' : language === 'id' ? 'Pacific Garden Bali' : 'Pacific Garden Bali'}</span>
            </div>
            <p className="text-blue-200 mb-6">
              {t('footer.slogan')}
            </p>
            <div className="flex space-x-4">
              {[
                { icon: 'fa-whatsapp', nameKey: 'common.whatsapp', color: '#07C160' },
                { icon: 'fa-instagram', nameKey: 'common.instagram', color: '#E1306C' },
                { icon: 'fa-facebook', nameKey: 'common.facebook', color: '#4267B2' },
                { icon: 'fa-youtube', nameKey: 'common.youtube', color: '#FF0000' }
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white hover:bg-amber-600 transition-colors"
                  title={t(item.nameKey)}
                  style={{ backgroundColor: item.color }}
                >
                  <i className={`fa-brands ${item.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">{t('footer.links.quick')}</h4>
            <ul className="space-y-3">
                {[
                 {nameKey: 'common.home', path: ''},
                 {nameKey: 'common.properties', path: '/projects'},
                 {nameKey: 'common.features', path: 'features'},
                 {nameKey: 'common.about', path: 'about'},
                 {nameKey: 'footer.links.faq', path: '/other'},
                 {nameKey: 'news.title', path: '/news'}
              ].map((item, index) => (
                <li key={index}>
                  {item.path.startsWith('/') ? (
                    <Link 
                      to={item.path} 
                      className="text-blue-200 hover:text-amber-500 transition-colors flex items-center"
                    >
                      <i className="fa-solid fa-angle-right mr-2 text-xs"></i>
                      {t(item.nameKey)}
                    </Link>
                  ) : (
                    <button 
                      onClick={() => {
                        const headerOffset = 80;
                        // 如果路径为空，滚动到顶部
                        if (item.path === '') {
                          window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                          });
                        } else {
                          const element = document.getElementById(item.path);
                          if (element) {
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }
                      }}
                      className="text-blue-200 hover:text-amber-500 transition-colors flex items-center w-full text-left"
                    >
                      <i className="fa-solid fa-angle-right mr-2 text-xs"></i>
                      {t(item.nameKey)}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Property Types */}
          <div>
            <h4 className="text-lg font-medium mb-6">{t('footer.links.types')}</h4>
            <ul className="space-y-3">
              {[
                {key: 'property.features.luxury_duplex', path: '/type8'},
                {key: 'property.features.beachfront_villa', path: '/type6'},
                {key: 'property.features.hilltop_villa', path: '/type5'}
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path} 
                    className="text-blue-200 hover:text-amber-500 transition-colors flex items-center"
                  >
                    <i className="fa-solid fa-angle-right mr-2 text-xs"></i>
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-6">{t('contact.info.title')}</h4>
            <ul className="space-y-3">
              {[
                { icon: 'fa-map-marker-alt', text: language === 'zh' ? '巴厘岛努沙杜瓦区Jl. Pantai Mengiat, 80363' : language === 'id' ? 'Jl. Pantai Mengiat, Nusa Dua, Bali 80363' : 'Jl. Pantai Mengiat, Nusa Dua, Bali 80363' },
                { icon: 'fa-phone', text: '+62 361 8480 888' },
                { icon: 'fa-envelope', text: 'info@pacificgardenbali.com' },
                { icon: 'fa-clock', text: language === 'zh' ? '9:00 - 20:00 (周一至周日)' : language === 'id' ? '9:00 - 20:00 (Senin-Minggu)' : '9:00 - 20:00 (Monday-Sunday)' }
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <i className={`fa-solid ${item.icon} text-amber-500 mt-1 mr-3 w-4 text-center`}></i>
                  <span className="text-blue-200">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-300 text-sm mb-4 md:mb-0">
              &copy; {currentYear} {language === 'zh' ? '巴厘岛太平洋花园' : 'Pacific Garden Bali'}. {t('footer.copyright')}
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-300 hover:text-amber-500 text-sm transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="text-blue-300 hover:text-amber-500 text-sm transition-colors">{t('footer.terms')}</a>
              <a href="#" className="text-blue-300 hover:text-amber-500 text-sm transition-colors">{t('footer.sitemap')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}