import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/translate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

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
  author?: {
    zh: string;
    en: string;
    id: string;
  };
  readTime?: number; // 阅读时间(分钟)
  featured?: boolean; // 是否为特色新闻
}

export default function NewsList() {
  const { t, language } = useTranslation();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  // 模拟获取新闻数据
  useEffect(() => {
    // 性能优化：使用骨架屏先显示，然后再加载数据
    // 模拟网络请求延迟
    const timer = setTimeout(() => {
      const data: NewsItem[] = [
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
          category: "市场动态",
          author: {
            zh: "市场分析团队",
            en: "Market Analysis Team",
            id: "Tim Analisis Pasar"
          },
          readTime: 6,
          featured: true
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
          category: "项目更新",
          author: {
            zh: "项目管理团队",
            en: "Project Management Team",
            id: "Tim Manajemen Proyek"
          },
          readTime: 5,
          featured: true
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
          category: "政策法规",
          author: {
            zh: "政策研究中心",
            en: "Policy Research Center",
            id: "Pusat Riset Kebijakan"
          },
          readTime: 4
        },
        {
          id: 4,
          title: {
            zh: "巴厘岛旅游旺季即将来临，房地产投资热度攀升",
            en: "Bali's Tourism High Season Approaches, Real Estate Investment Heats Up",
            id: "Musim Punya Pariwisata Bali Akan Datang, Minat Investasi Real Estate Meningkat"
          },
          date: "2025-09-15",
          summary: {
            zh: "随着巴厘岛旅游旺季的临近，房地产市场投资热度持续攀升。尤其是努沙杜瓦和金巴兰等热门地区的高端度假房产，受到了来自全球投资者的热烈追捧...",
            en: "With the approach of Bali's tourism high season, the real estate market investment continues to heat up. Especially high-end vacation properties in popular areas such as Nusa Dua and Jimbaran are being enthusiastically sought after by global investors...",
            id: "Dengan mendekatinya musim punca pariwisata Bali, investasi pasar real estate terus meningkat. Terutama properti liburan kelas atas di area populer seperti Nusa Dua dan Jimbaran sangat dicari oleh investor global..."
          },
          image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Tourism%20growth%20chart%2C%20Bali%20travel%20destination%2C%20real%20estate%20investment%20trend&sign=b1f3567be50817503ddd1cd567015056",
          category: "市场动态",
          author: {
            zh: "旅游经济分析",
            en: "Tourism Economic Analysis",
            id: "Analisis Ekonomi Pariwisata"
          },
          readTime: 5
        },
        {
          id: 5,
          title: {
            zh: "Pacific Garden Puri荣获\"巴厘岛最佳豪华开发商\"大奖",
            en: "Pacific Garden Puri Wins 'Bali's Best Luxury Developer' Award",
            id: "Pacific Garden Puri Memenangkan Penghargaan 'Pengembang Mewah Terbaik di Bali'"
          },
          date: "2025-09-05",
          summary: {
            zh: "我们荣幸地宣布，Pacific Garden Puri在2025年巴厘岛房地产大奖中荣获\"最佳豪华开发商\"称号。这一殊荣是对我们多年来致力于打造高品质豪华房产的肯定...",
            en: "We are honored to announce that Pacific Garden Puri has won the title of 'Best Luxury Developer' at the 2025 Bali Real Estate Awards. This honor is recognition of our多年 commitment to creating high-quality luxury properties...",
            id: "Kami dengan bangga mengumumkan bahwa Pacific Garden Puri telah memenangkan gelar 'Pengembang Mewah Terbaik' di Ajang Penghargaan Real Estate Bali 2025. Kehormatan ini adalah pengakuan atas komitmen kami selama bertahun-tahun untuk menciptakan properti mewah berkualitas tinggi..."
          },
          image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Real%20estate%20award%20ceremony%2C%20luxury%20property%20development%2C%20Bali%20real%20estate%20industry&sign=bf3de470c94c5f6eceda1f36d1ff9891",
          category: "公司新闻",
          author: {
            zh: "品牌管理团队",
            en: "Brand Management Team",
            id: "Tim Manajemen Merek"
          },
          readTime: 3
        },
        {
          id: 6,
          title: {
            zh: "探索巴厘岛文化体验：在您的新家周边",
            en: "Exploring Balinese Cultural Experiences: Around Your New Home",
            id: "Menjelajahi Pengalaman Budaya Bali: Di Sekitar Rumah Baru Anda"
          },
          date: "2025-08-28",
          summary: {
            zh: "除了美丽的海滩和豪华的住宿，巴厘岛还拥有丰富的文化遗产等待您去探索。从传统舞蹈表演到神圣的寺庙，了解如何融入当地文化生活...",
            en: "Beyond beautiful beaches and luxury accommodations, Bali offers rich cultural heritage waiting for you to explore. From traditional dance performances to sacred temples, learn how to immerse yourself in local cultural life...",
            id: "Selain pantai indah dan akomodasi mewah, Bali juga menawarkan warisan budaya yang kaya untuk Anda jelajahi. Dari pertunjukan tari tradisional hingga kuil-kuil suci, pelajari cara untuk meresapi kehidupan budaya lokal..."
          },
          image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Balinese%20traditional%20dance%20performance%2C%20culture%2C%20temple%2C%20ceremony&sign=3a34296f4f00bd116b90e54f93507b2c",
          category: "生活方式",
          author: {
            zh: "文化体验顾问",
            en: "Cultural Experience Consultant",
            id: "Konsultan Pengalaman Budaya"
          },
          readTime: 7
        },
        {
          id: 7,
          title: {
            zh: "巴厘岛豪华房产投资：为什么现在是最佳时机？",
            en: "Bali Luxury Property Investment: Why Now is the Perfect Time?",
            id: "Investasi Properti Mewah di Bali: Mengapa Sekarang Waktu yang Tepat?"
          },
          date: "2025-08-15",
          summary: {
            zh: "随着全球旅行限制的全面解除，巴厘岛的房地产市场正迎来新一轮的投资热潮。本文深入分析当前市场状况，为潜在投资者提供专业建议...",
            en: "With the full lifting of global travel restrictions, Bali's real estate market is experiencing a new wave of investment boom. This article provides an in-depth analysis of the current market situation and professional advice for potential investors...",
            id: "Dengan pelepasan penuh pembatasan perjalanan global, pasar real estate Bali sedang mengalami gelombang baru ledakan investasi. Artikel ini memberikan analisis mendalam tentang situasi pasar saat ini dan saran profesional bagi calon investor..."
          },
          image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Real%20estate%20investment%20analysis%2C%20property%20market%20growth%2C%20finance%20chart&sign=39bc69381c9c2fd00ff4efafe5c86b57",
          category: "投资指南",
          author: {
            zh: "投资顾问团队",
            en: "Investment Advisory Team",
            id: "Tim Konsultan Investasi"
          },
          readTime: 8
        },
        {
          id: 8,
          title: {
            zh: "太平洋花园Puri的可持续发展承诺",
            en: "Pacific Garden Puri's Commitment to Sustainable Development",
            id: "Komitmen Pacific Garden Puri terhadap Pembangunan Berkelanjutan"
          },
          date: "2025-08-05",
          summary: {
            zh: "作为巴厘岛领先的豪华开发商，我们致力于将可持续发展理念融入每一个项目中。从环保材料的使用到能源效率的提升，了解我们如何为地球和社区做出贡献...",
            en: "As a leading luxury developer in Bali, we are committed to integrating sustainable development concepts into every project. From the use of environmentally friendly materials to improving energy efficiency, learn how we contribute to the planet and community...",
            id: "Sebagai pengembang mewah terkemuka di Bali, kami berkomitmen untuk mengintegrasikan konsep pembangunan berkelanjutan ke dalam setiap proyek. Dari penggunaan bahan ramah lingkungan hingga peningkatan efisiensi energi, pelajari bagaimana kami berkontribusi bagi planet dan komunitas..."
          },
          image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Sustainable%20architecture%2C%20eco-friendly%20building%2C%20green%20energy%2C%20tropical%20garden&sign=655cae76f782dc7f1712d2f3f2f7b093",
          category: "公司新闻",
          author: {
            zh: "可持续发展部门",
            en: "Sustainable Development Department",
            id: "Departemen Pembangunan Berkelanjutan"
          },
          readTime: 6
        }
      ];
      
      setNewsItems(data);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 获取多语言新闻标题和摘要
  const getNewsContent = (item: NewsItem, field: 'title' | 'summary' | 'author') => {
    const content = item[field];
    return content && typeof content === 'object' && content[language] 
      ? content[language] 
      : content;
  };
  
  // 筛选和排序新闻
  const filteredAndSortedNews = React.useMemo(() => {
    let results = newsItems;
    
    // 按分类筛选
    if (selectedCategory !== 'all') {
      results = results.filter(item => item.category === selectedCategory);
    }
    
    // 按搜索词筛选
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      results = results.filter(item => 
        getNewsContent(item, 'title').toLowerCase().includes(lowerCaseSearchTerm) ||
        getNewsContent(item, 'summary').toLowerCase().includes(lowerCaseSearchTerm) ||
        item.category.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    
    // 排序
    results.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return results;
  }, [newsItems, selectedCategory, searchTerm, sortOrder, language]);
  
  // 分页逻辑
  const totalPages = Math.ceil(filteredAndSortedNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNewsItems = filteredAndSortedNews.slice(startIndex, startIndex + itemsPerPage);
  
  // 获取所有分类
  const categories = React.useMemo(() => {
    return ['all', ...Array.from(new Set(newsItems.map(item => item.category)))];
  }, [newsItems]);
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // 处理搜索提交
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // 重置到第一页
  };
  
  // 处理订阅提交
  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
    
    if (emailInput && emailInput.value) {
      // 简单的邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value)) {
        toast.success(language === 'zh' ? '订阅成功！您将及时收到我们的最新资讯。' : language === 'id' ? 'Berlangganan berhasil! Anda akan menerima berita terbaru kami secara tepat waktu.' : 'Subscription successful! You will receive our latest news in a timely manner.');
        emailInput.value = '';
      } else {
        toast.error(language === 'zh' ? '请输入有效的邮箱地址。' : language === 'id' ? 'Silakan masukkan alamat email yang valid.' : 'Please enter a valid email address.');
      }
    } else {
      toast.error(language === 'zh' ? '请输入邮箱地址。' : language === 'id' ? 'Silakan masukkan alamat email.' : 'Please enter an email address.');
    }
  };
  
  // 获取特色新闻
  const featuredNews = newsItems.filter(item => item.featured).slice(0, 2);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900 mb-4"></div>
            <h2 className="text-xl font-medium text-blue-900">{t('common.loading') || 'Loading...'}</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* 页面标题区域 */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20 relative overflow-hidden">
          {/* 装饰元素 */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {language === 'zh' ? '最新资讯' : language === 'id' ? 'Berita Terbaru' : 'Latest News'}
              </h1>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                {language === 'zh' 
                  ? '了解巴厘岛房地产市场最新动态、Pacific Garden Puri项目更新和相关政策法规信息。' 
                  : language === 'id' 
                    ? 'Dapatkan informasi terbaru tentang pasar real estate Bali, pembaruan proyek Pacific Garden Puri, dan regulasi terkait.' 
                    : 'Stay updated with the latest news about Bali\'s real estate market, Pacific Garden Puri project updates, and related regulations.'
                }
              </p>
              
              {/* 搜索框 */}
              <div className="mt-8 max-w-2xl mx-auto">
                <motion.form 
                  onSubmit={handleSearchSubmit} 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="text"
                    placeholder={language === 'zh' ? '搜索新闻...' : language === 'id' ? 'Cari berita...' : 'Search news...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-4 pr-16 rounded-full bg-white/10 border border-white/20 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 backdrop-blur-sm transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
                  >
                    <i className="fa-solid fa-search"></i>
                  </button>
                </motion.form>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* 特色新闻区域 */}
        {featuredNews.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-900 inline-block border-b-4 border-amber-600 pb-1">
                  {language === 'zh' ? '特色资讯' : language === 'id' ? 'Berita Utama' : 'Featured News'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredNews.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
                  >
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={getNewsContent(item, 'title')} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {language === 'zh' ? '精选' : language === 'id' ? 'Unggulan' : 'Featured'}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span>{formatDate(item.date)}</span>
                        <div className="flex items-center">
                          {getNewsContent(item, 'author') && (
                            <span className="mr-3">{getNewsContent(item, 'author')}</span>
                          )}
                          {item.readTime && (
                            <span className="flex items-center">
                              <i className="fa-solid fa-clock mr-1"></i> {item.readTime} {language === 'zh' ? '分钟' : language === 'id' ? 'menit' : 'min'}
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {getNewsContent(item, 'title')}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {getNewsContent(item, 'summary')}
                      </p>
                      <Link 
                        to={`/news/${item.id}`} 
                        className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors group"
                      >
                        {language === 'zh' ? '阅读更多' : language === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                        <i className="fa-solid fa-arrow-right ml-2 text-sm group-hover:translate-x-1 transition-transform"></i>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* 新闻列表区域 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* 筛选和排序工具栏 */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* 分类筛选 */}
              <div className="overflow-x-auto scrollbar-hide w-full md:w-auto">
                <div className="flex space-x-3 pb-2">
                  {categories.map((category, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1); // 重置到第一页
                      }}
                      className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                        selectedCategory === category
                          ? 'bg-blue-900 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category === 'all' 
                        ? (language === 'zh' ? '全部' : language === 'id' ? 'Semua' : 'All') 
                        : category}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* 排序选项 */}
              <div className="flex items-center w-full md:w-auto justify-between md:justify-end">
                <span className="text-sm font-medium text-gray-600 mr-3">{language === 'zh' ? '排序：' : language === 'id' ? 'Urutkan：' : 'Sort by：'}</span>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value as 'newest' | 'oldest');
                    setCurrentPage(1); // 重置到第一页
                  }}
                  className="bg-gray-100 text-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 shadow-sm cursor-pointer transition-all"
                >
                  <option value="newest">{language === 'zh' ? '最新' : language === 'id' ? 'Terbaru' : 'Newest'}</option>
                  <option value="oldest">{language === 'zh' ? '最早' : language === 'id' ? 'Terlama' : 'Oldest'}</option>
                </select>
              </div>
            </div>
            
            {/* 新闻列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentNewsItems.length > 0 ? (
                currentNewsItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div className="relative h-52 overflow-hidden">
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
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>{formatDate(item.date)}</span>
                        {item.readTime && (
                          <span className="flex items-center">
                            <i className="fa-solid fa-clock mr-1"></i> {item.readTime} {language === 'zh' ? '分钟' : language === 'id' ? 'menit' : 'min'}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-blue-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
                        {getNewsContent(item, 'title')}
                      </h3>
                      <p className="text-gray-600 mb-5 line-clamp-3">
                        {getNewsContent(item, 'summary')}
                      </p>
                      <div className="flex items-center justify-between">
                        <Link 
                          to={`/news/${item.id}`} 
                          className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700 transition-colors group"
                        >
                          {language === 'zh' ? '阅读更多' : language === 'id' ? 'Baca Selengkapnya' : 'Read More'}
                          <i className="fa-solid fa-arrow-right ml-2 text-sm group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                        <button className="text-gray-400 hover:text-blue-900 transition-colors">
                          <i className="fa-regular fa-bookmark"></i>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 text-blue-900 mb-6">
                    <i className="fa-solid fa-newspaper text-4xl"></i>
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                    {language === 'zh' ? '暂无相关资讯' : language === 'id' ? 'Tidak ada berita terkait' : 'No related news'}
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    {language === 'zh' ? '当前分类下暂无资讯，请尝试选择其他分类或稍后再来查看。' : language === 'id' ? 'Tidak ada berita dalam kategori ini, silakan coba kategori lain atau cek kembali nanti.' : 'No news in this category, please try another category or check back later.'}
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                      setCurrentPage(1);
                    }}
                    className="mt-6 bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-md"
                  >
                    {language === 'zh' ? '查看所有资讯' : language === 'id' ? 'Lihat semua berita' : 'View all news'}
                  </button>
                </div>
              )}
            </div>
            
            {/* 分页控件 */}
            {totalPages > 1 && currentNewsItems.length > 0 && (
              <div className="mt-16 flex justify-center">
                <nav className="bg-white p-2 rounded-xl shadow-sm">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2.5 rounded-lg text-blue-900 font-medium transition-all flex items-center ${
                        currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50 shadow-sm hover:shadow-md'
                      }`}
                    >
                      <i className="fa-solid fa-chevron-left mr-2"></i>
                      {language === 'zh' ? '上一页' : language === 'id' ? 'Halaman Sebelumnya' : 'Previous'}
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                          currentPage === page 
                            ? 'bg-blue-900 text-white shadow-md' 
                            : 'bg-white text-blue-900 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2.5 rounded-lg text-blue-900 font-medium transition-all flex items-center ${
                        currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {language === 'zh' ? '下一页' : language === 'id' ? 'Halaman Berikutnya' : 'Next'}
                      <i className="fa-solid fa-chevron-right ml-2"></i>
                    </button>
                  </div>
                </nav>
              </div>
            )}
          </div>
        </section>
        
        {/* 订阅区域 */}
        <section className="py-20 bg-blue-900 relative overflow-hidden">
          {/* 装饰元素 */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {language === 'zh' ? '订阅我们的新闻资讯' : language === 'id' ? 'Berlangganan Berita Kami' : 'Subscribe to Our News'}
                  </h3>
                  <p className="text-blue-100 max-w-2xl mx-auto">
                    {language === 'zh' ? '获取最新的巴厘岛房地产市场动态、项目更新和独家优惠信息，直接发送到您的邮箱。' : language === 'id' ? 'Dapatkan informasi terbaru tentang pasar real estate Bali, pembaruan proyek, dan penawaran eksklusif langsung ke email Anda.' : 'Get the latest Bali real estate market updates, project news, and exclusive offers delivered directly to your inbox.'}
                  </p>
                </div>
                
                <motion.form 
                  onSubmit={handleSubscribeSubmit} 
                  className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <input
                    type="email"
                    placeholder={language === 'zh' ? '请输入您的邮箱地址' : language === 'id' ? 'Masukkan alamat email Anda' : 'Enter your email address'}
                    className="flex-grow px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white/90 shadow-md"
                    required
                  />
                  <button 
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg whitespace-nowrap"
                  >
                    {language === 'zh' ? '立即订阅' : language === 'id' ? 'Berlangganan Sekarang' : 'Subscribe Now'}
                  </button>
                </motion.form>
                
                <p className="text-blue-200 text-sm text-center mt-4">
                  {language === 'zh' ? '我们尊重您的隐私，不会向第三方分享您的信息。' : language === 'id' ? 'Kami menghargai privasi Anda dan tidak akan membagikan informasi Anda ke pihak ketiga.' : 'We respect your privacy and will not share your information with third parties.'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}