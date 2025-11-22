import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/translate';

// 新闻数据模型
interface NewsItem {
  id: number;
  title: {
    zh: string;
    en: string;
    id: string;
  };
  date: string;
  summary: {
    zh: string;
    en: string;
    id: string;
  };
  image: string;
  category: string;
}

export default function FeaturesSection() {
  const { t, language } = useTranslation();
  
  const features = [
    {
      icon: 'fa-map-marker-alt',
      titleKey: 'features.location.title',
      descriptionKey: 'features.location.desc'
    },
    {
      icon: 'fa-home',
      titleKey: 'features.quality.title',
      descriptionKey: 'features.quality.desc'
    },
    {
      icon: 'fa-concierge-bell',
      titleKey: 'features.service.title',
      descriptionKey: 'features.service.desc'
    },
    {
      icon: 'fa-chart-line',
      titleKey: 'features.investment.title',
      descriptionKey: 'features.investment.desc'
    }
  ];
  
  // 新闻数据
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: {
        zh: "巴厘岛房地产市场2025年展望：持续增长趋势",
        en: "Bali Real Estate Market Outlook 2025: Sustained Growth Trend",
        id: "Pemandangan Pasar Real Estate Bali 2025: Tren Pertumbuhan Berkelanjutan"
      },
      date: "2025-10-15",
      summary: {
        zh: "随着旅游业复苏，巴厘岛房地产市场呈现出强劲的增长势头。太平洋花园项目所在的努沙杜瓦区域尤其受到国际投资者的青睐...",
        en: "With the recovery of tourism, Bali's real estate market shows strong growth momentum. The Nusa Dua area where Pacific Garden is located is particularly favored by international investors...",
        id: "Dengan pemulihan pariwisata, pasar real estate Bali menunjukkan momentum pertumbuhan yang kuat. Wilayah Nusa Dua tempat Proyek Pacific Garden terletak sangat disukai oleh investor internasional..."
      },
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Real%20estate%20market%20analysis%20with%20growth%20charts%2C%20property%20investment%2C%20Bali%20tourism%20recovery&sign=70b1ba3b1f8518fafb4d206733d2d00e",
      category: "市场动态"
    },
    {
      id: 2,
      title: {
        zh: "太平洋花园新一期Type 8豪华复式公寓即将推出",
        en: "Pacific Garden's New Type 8 Luxury Duplex Apartments Coming Soon",
        id: "Apartemen Duplex Mewah Tipe 8 Baru Pacific Garden Akan Segera Diluncurkan"
      },
      date: "2025-10-08",
      summary: {
        zh: "我们很高兴地宣布，太平洋花园的全新Type 8豪华复式公寓将于11月正式推出。这一项目融合了现代设计与传统巴厘岛元素，为住户提供独特的居住体验...",
        en: "We are excited to announce that Pacific Garden's brand new Type 8 Luxury Duplex Apartments will be officially launched in November. This project combines modern design with traditional Balinese elements, providing residents with a unique living experience...",
        id: "Kami dengan senang hati mengumumkan bahwa Apartemen Duplex Mewah Tipe 8 baru Pacific Garden akan diluncurkan secara resmi pada bulan November. Proyek ini menggabungkan desain modern dengan elemen tradisional Bali, memberikan pengalaman tinggal yang unik bagi penghuninya..."
      },
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Modern%20luxury%20apartment%20interior%20with%20high%20ceiling%2C%20large%20windows%2C%20tropical%20design%2C%20Bali&sign=d70bb0fecdae5e525aeca73004d31b1f",
      category: "项目更新"
    },
    {
      id: 3,
      title: {
        zh: "巴厘岛政府推出新政策，简化外国人房产购买流程",
        en: "Bali Government Introduces New Policy to Simplify Property Purchase Process for Foreigners",
        id: "Pemerintah Bali memperkenalkan kebijakan baru untuk menyederhanakan proses pembelian properti bagi orang asing"
      },
      date: "2025-09-28",
      summary: {
        zh: "巴厘岛省政府最近宣布了一项新政策，旨在简化外国人在巴厘岛购买房产的程序。这一举措预计将进一步促进巴厘岛高端房地产市场的发展...",
        en: "The Bali provincial government recently announced a new policy aimed at simplifying the process for foreigners to purchase property in Bali. This move is expected to further boost the development of Bali's high-end real estate market...",
        id: "Pemerintah provinsi Bali baru-baru ini mengumumkan kebijakan baru yang bertujuan untuk menyederhanakan proses pembelian properti di Bali bagi orang asing. Langkah ini diharapkan akan semakin mendorong perkembangan pasar real estate kelas atas Bali..."
      },
      image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Property%20law%20and%20policy%20documentation%2C%20real%20estate%20investment%20regulations%2C%20Bali%20government%20office&sign=fe1032790a0e3a1933d6a892cbcfeccd",
      category: "政策法规"
    }
  ];
  
   // 获取多语言新闻标题和摘要
  const getNewsContent = (item: NewsItem, field: 'title' | 'summary') => {
    const content = item[field];
    return content[language] || content['en'];
  };
  
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{t('features.title')}</h2>
          <p className="text-gray-600">{t('features.subtitle')}</p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <i className={`fa-solid ${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{t(feature.titleKey)}</h3>
              <p className="text-gray-600">{t(feature.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
        
        {/* News Section */}
        <div className="mt-24">
          <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-8 text-center">
            {language === 'zh' ? '最新资讯' : language === 'id' ? 'Berita Terbaru' : 'Latest News'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={getNewsContent(item, 'title')} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-gray-500 text-sm mb-2">{item.date}</div>
                  <h4 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {getNewsContent(item, 'title')}
                  </h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {getNewsContent(item, 'summary')}
                  </p>
                   <a 
                     href={`/news/${item.id}`} 
                     className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors"
                   >
                     {language === 'zh' ? '阅读更多' : language === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                     <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                   </a>
                </div>
              </motion.div>
            ))}
          </div>
          
             {/* View All News Button */}
          <div className="text-center mt-12">
             <a 
               href="/news" 
               className="inline-flex items-center justify-center bg-white border border-blue-900 text-blue-900 px-8 py-3 rounded-full font-medium transition-all hover:bg-blue-900 hover:text-white shadow-md"
             >
               {language === 'zh' ? '查看所有资讯' : language === 'id' ? 'Lihat Semua Berita' : 'View All News'}
               <i className="fa-solid fa-arrow-right ml-2"></i>
             </a>
          </div>
        </div>
        
        {/* CTA - Updated to Pacific Garden Puri style */}
        <div className="mt-20 bg-gradient-to-r from-blue-900 to-blue-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('features.cta.ready')}</h3>
              <p className="text-blue-100 mb-8">
                {t('features.cta.desc')}
              </p>
               <button 
                onClick={() => {
                  const headerOffset = 80;
                  const element = document.getElementById('contact');
                  if (element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium inline-block w-fit transition-all transform hover:scale-105 shadow-lg"
              >
                {t('features.cta.contact')}
              </button>
            </div>
            <div className="h-64 lg:h-auto relative hidden lg:block">
              <img 
                src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20tropical%20resort%20pool%20with%20infinity%20edge%2C%20palm%20trees%2C%20sun%20loungers%2C%20clear%20blue%20water%2C%20Bali%20style&sign=c0633d633e97d49c04906d71b1791f88" 
                alt={t('features.cta.ready')} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}