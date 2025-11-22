import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '@/lib/translate';
import { formatDate } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  content: {
    zh: string[];
    en: string[];
    id: string[];
  };
  image: string;
  category: string;
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 获取多语言新闻标题和摘要
  const getNewsContent = (item: NewsItem, field: 'title' | 'summary') => {
    const content = item[field];
    return content[language] || content['en'];
  };

  // 获取多语言新闻内容段落
  const getNewsContentParagraphs = (item: NewsItem) => {
    const content = item.content;
    return content[language] || content['en'];
  };

  // 模拟获取新闻详情数据
  useEffect(() => {
    // 模拟网络请求延迟
    const timer = setTimeout(() => {
      // 新闻详情数据
      const newsData: NewsItem[] = [
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
          content: {
            zh: [
              "随着全球旅游业的全面复苏，巴厘岛房地产市场正经历新一轮的增长热潮。根据最新市场报告，2025年上半年巴厘岛豪华房产价格指数上涨了8.5%，创近五年新高。",
              "太平洋花园项目所在的努沙杜瓦区域表现尤为亮眼，成为国际投资者关注的焦点。该区域凭借其黄金海岸线位置、完善的基础设施和高端度假氛围，吸引了来自中国、俄罗斯、澳大利亚和欧洲的众多买家。",
              "市场专家分析指出，巴厘岛房地产市场的增长主要受三个因素驱动：一是全球高净值人士对度假房产的需求增加；二是印尼政府对外国投资者的政策友好；三是巴厘岛旅游业的强劲复苏，尤其是高端旅游市场的快速增长。",
              "太平洋花园Puri作为努沙杜瓦区域的标志性项目，其独特的设计理念、优质的建筑质量和完善的配套服务，使其在竞争激烈的市场中脱颖而出。项目中的Type 8豪华复式公寓更是受到市场的热烈追捧，目前已售出85%。",
              "展望未来，业内人士普遍认为巴厘岛房地产市场将继续保持增长势头，尤其是像太平洋花园这样位于黄金地段的优质项目，将具有更高的投资价值和升值潜力。"
            ],
            en: [
              "With the full recovery of global tourism, Bali's real estate market is experiencing a new wave of growth. According to the latest market report, the Bali luxury property price index rose by 8.5% in the first half of 2025, reaching a five-year high.",
              "The Nusa Dua area, where the Pacific Garden project is located, has performed particularly well and has become the focus of international investors. This area has attracted many buyers from China, Russia, Australia, and Europe with its prime coastline location, complete infrastructure, and high-end resort atmosphere.",
              "Market experts analyze that the growth of Bali's real estate market is mainly driven by three factors: first, the increased demand for vacation properties from high-net-worth individuals worldwide; second, the Indonesian government's friendly policies towards foreign investors; third, the strong recovery of Bali's tourism industry, especially the rapid growth of the high-end tourism market.",
              "As a landmark project in the Nusa Dua area, Pacific Garden Puri stands out in the highly competitive market with its unique design philosophy, high-quality construction, and complete supporting services. The Type 8 luxury duplex apartments in the project have been particularly well-received by the market, with 85% already sold.",
              "Looking ahead, industry insiders generally believe that Bali's real estate market will continue to maintain growth momentum, especially for high-quality projects like Pacific Garden located in prime locations, which will have higher investment value and appreciation potential."
            ],
            id: [
              "Dengan pemulihan penuh pariwisata global, pasar real estate Bali sedang mengalami gelombang pertumbuhan baru. Menurut laporan pasar terbaru, indeks harga properti mewah Bali meningkat sebesar 8,5% pada paruh pertama tahun 2025, mencapai tinggi selama lima tahun terakhir.",
              "Wilayah Nusa Dua, di mana proyek Pacific Garden terletak, telah berkinerja sangat baik dan menjadi fokus investor internasional. Wilayah ini telah menarik banyak pembeli dari China, Rusia, Australia, dan Eropa dengan lokasi garis pantai prime, infrastruktur lengkap, dan suasana resor kelas atas.",
              "Para ahli pasar menganalisis bahwa pertumbuhan pasar real estate Bali terutama didorong oleh tiga faktor: pertama, peningkatan permintaan akan properti liburan dari individu berharta tinggi di seluruh dunia; kedua, kebijakan pemerintah Indonesia yang ramah terhadap investor asing; ketiga, pemulihan yang kuat dari industri pariwisata Bali, terutama pertumbuhan cepat pasar pariwisata kelas atas.",
              "Sebagai proyek landmark di wilayah Nusa Dua, Pacific Garden Puri menonjol di pasar yang sangat kompetitif dengan filosofi desainnya yang unik, konstruksi berkualitas tinggi, dan layanan pendukung yang lengkap. Apartemen duplex mewah Tipe 8 dalam proyek ini sangat diterima oleh pasar, dengan 85% sudah terjual.",
              "Melihat ke depan, para pelaku industri umumnya percaya bahwa pasar real estate Bali akan terus mempertahankan momentum pertumbuhan, terutama untuk proyek berkualitas seperti Pacific Garden yang terletak di lokasi prime, yang akan memiliki nilai investasi dan potensi apresiasi yang lebih tinggi."
            ]
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
          content: {
            zh: [
              "太平洋花园Puri项目组自豪地宣布，备受期待的Type 8豪华复式公寓将于2025年11月正式推出。这一系列公寓是我们团队经过两年精心设计和规划的杰作，旨在为追求高品质生活的客户提供独特的居住体验。",
              "Type 8豪华复式公寓的设计理念融合了现代建筑美学与传统巴厘岛元素，创造出既时尚又富有文化底蕴的居住空间。每一套公寓都拥有挑高客厅、大面积落地窗和私人阳台，让住户能够充分欣赏巴厘岛的自然美景。",
              "该系列公寓的面积从260平方米到320平方米不等，提供3到4间卧室的多种选择，满足不同家庭的需求。内部装修采用了高端环保材料，并配备了智能家居系统，为住户营造舒适、便捷、健康的生活环境。",
              "作为太平洋花园Puri项目的一部分，Type 8豪华复式公寓的住户将能够享受项目的全部配套设施，包括无边泳池、私人海滩、健身中心、SPA、儿童乐园等。此外，我们还提供24小时安保和贴心的管家服务，确保住户的安全和舒适。",
              "为了回馈客户的支持与厚爱，我们特别推出了开盘优惠活动。即日起至11月30日，预订Type 8豪华复式公寓的客户将享受95折优惠，并获得价值10万元的家具套装。有意向的客户可通过我们的官方网站或前往销售中心预约看房。"
            ],
            en: [
              "The Pacific Garden Puri project team is proud to announce that the highly anticipated Type 8 Luxury Duplex Apartments will be officially launched in November 2025. This series of apartments is a masterpiece carefully designed and planned by our team over two years, aiming to provide a unique living experience for customers pursuing high-quality life.",
              "The design concept of Type 8 Luxury Duplex Apartments combines modern architectural aesthetics with traditional Balinese elements, creating living spaces that are both stylish and culturally rich. Each apartment features high ceilings, large floor-to-ceiling windows, and private balconies, allowing residents to fully enjoy Bali's natural beauty.",
              "The area of this series of apartments ranges from 260 square meters to 320 square meters, providing multiple options of 3 to 4 bedrooms to meet the needs of different families. The interior decoration uses high-end environmentally friendly materials and is equipped with smart home systems to create a comfortable, convenient, and healthy living environment for residents.",
              "As part of the Pacific Garden Puri project, residents of Type 8 Luxury Duplex Apartments will be able to enjoy all the supporting facilities of the project, including infinity pools, private beaches, fitness centers, spas, children's playgrounds, etc. In addition, we also provide 24-hour security and attentive butler services to ensure the safety and comfort of residents.",
              "To reciprocate customers' support and love, we have specially launched an opening promotion. From now until November 30, customers who book Type 8 Luxury Duplex Apartments will enjoy a 5% discount and receive a furniture set worth 100,000 yuan. Interested customers can make appointments for viewing through our official website or by visiting the sales center."
            ],
            id: [
              "Tim proyek Pacific Garden Puri dengan bangga mengumumkan bahwa Apartemen Duplex Mewah Tipe 8 yang sangat dinanti akan diluncurkan secara resmi pada November 2025. Seri apartemen ini adalah mahakarya yang dirancang dan direncanakan dengan cermat oleh tim kami selama dua tahun, bertujuan untuk memberikan pengalaman tinggal yang unik bagi pelanggan yang mengejar kualitas hidup tinggi.",
              "Konsep desain Apartemen Duplex Mewah Tipe 8 menggabungkan estetika arsitektur modern dengan elemen tradisional Bali, menciptakan ruang hunian yang bergaya dan kaya budaya. Setiap apartemen dilengkapi dengan langit-langit tinggi, jendela dari lantai ke langit-langit, dan balkon pribadi, memungkinkan penghuni untuk sepenuhnya menikmati keindahan alam Bali.",
              "Luas seri apartemen ini berkisar dari 260 meter persegi hingga 320 meter persegi, menyediakan berbagai pilihan 3 hingga 4 kamar tidur untuk memenuhi kebutuhan keluarga yang berbeda. Dekorasi interior menggunakan bahan ramah lingkungan kelas atas dan dilengkapi dengan sistem rumah pintar untuk menciptakan lingkungan hidup yang nyaman, praktis, dan sehat bagi penghuni.",
              "Sebagai bagian dari proyek Pacific Garden Puri, penghuni Apartemen Duplex Mewah Tipe 8 akan dapat menikmati semua fasilitas pendukung proyek, termasuk kolam renang infinity, pantai pribadi, pusat kebugaran, spa, taman bermain anak, dll. Selain itu, kami juga menyediakan keamanan 24 jam dan layanan butler yang attention untuk memastikan keamanan dan kenyamanan penghuni.",
              "Untuk membalas dukungan dan cinta pelanggan, kami khusus meluncurkan promosi pembukaan. Mulai sekarang hingga 30 November, pelanggan yang memesan Apartemen Duplex Mewah Tipe 8 akan mendapatkan diskon 5% dan menerima set furnitur senilai 100.000 yuan. Pelanggan yang tertarik dapat membuat janji untuk melihat melalui situs web resmi kami atau dengan mengunjungi pusat penjualan."
            ]
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
          content: {
            zh: [
              "巴厘岛省政府于9月28日正式宣布了一项新政策，旨在简化外国人在巴厘岛购买房产的程序。这一政策的出台被视为印尼政府吸引外国投资、促进旅游业和房地产业发展的重要举措。",
              "根据新政策，外国人在巴厘岛购买房产的流程将大大简化，主要包括以下几个方面：首先，申请许可证的时间将从原来的3-4个月缩短至1-2个月；其次，所需提交的文件数量减少了30%；最后，政府将设立专门的服务窗口，为外国投资者提供一站式服务。",
              "此外，新政策还放宽了对外国人购买房产的一些限制。例如，外国人现在可以在某些指定区域购买永久产权的房产，而不仅仅是使用权。同时，购买房产的最低价格要求也有所降低，这使得更多的外国投资者能够参与到巴厘岛的房地产市场中来。",
              "这一政策的出台受到了房地产开发商和投资者的广泛欢迎。太平洋花园Puri项目的总经理表示：'新政策的实施将极大地促进巴厘岛高端房地产市场的发展，为像我们这样的开发商提供更多的机会。我们相信，随着政策的落地，将会有更多的外国投资者前来巴厘岛投资置业。'",
              "业内专家分析认为，这一政策的出台将对巴厘岛的房地产市场产生积极影响。预计未来1-2年内，巴厘岛的高端房产价格将上涨10%-15%，销售量也将增加20%以上。对于有意向在巴厘岛投资置业的外国投资者来说，现在是一个难得的机遇。"
            ],
            en: [
              "The Bali provincial government officially announced a new policy on September 28 aimed at simplifying the process for foreigners to purchase property in Bali. The introduction of this policy is seen as an important measure by the Indonesian government to attract foreign investment and promote the development of tourism and real estate industries.",
              "According to the new policy, the process for foreigners to purchase property in Bali will be greatly simplified, mainly including the following aspects: First, the time to apply for a license will be shortened from 3-4 months to 1-2 months; second, the number of documents required will be reduced by 30%; finally, the government will set up special service windows to provide one-stop services for foreign investors.",
              "In addition, the new policy also relaxes some restrictions on foreigners buying property. For example, foreigners can now buy freehold property in certain designated areas, not just usufruct rights. At the same time, the minimum price requirement for purchasing property has also been reduced, allowing more foreign investors to participate in Bali's real estate market.",
              "The introduction of this policy has been widely welcomed by real estate developers and investors. The general manager of the Pacific Garden Puri project said: 'The implementation of the new policy will greatly promote the development of Bali's high-end real estate market and provide more opportunities for developers like us. We believe that with the implementation of the policy, more foreign investors will come to Bali to invest in property.'",
              "Industry experts analyze that the introduction of this policy will have a positive impact on Bali's real estate market. It is expected that in the next 1-2 years, the price of high-end properties in Bali will increase by 10%-15%, and sales volume will also increase by more than 20%. For foreign investors who intend to invest in property in Bali, now is a rare opportunity."
            ],
            id: [
              "Pemerintah provinsi Bali secara resmi mengumumkan kebijakan baru pada 28 September yang bertujuan untuk menyederhanakan proses pembelian properti di Bali bagi orang asing. Pengenalan kebijakan ini dipandang sebagai langkah penting oleh pemerintah Indonesia untuk menarik investasi asing dan mempromosikan perkembangan industri pariwisata dan real estate.",
              "Menurut kebijakan baru, proses pembelian properti di Bali bagi orang asing akan sangat disederhanakan, terutama meliputi aspek-aspek berikut: Pertama, waktu untuk mengajukan lisensi akan diperpendek dari 3-4 bulan menjadi 1-2 bulan; kedua, jumlah dokumen yang diperlukan akan dikurangi 30%; akhirnya, pemerintah akan membangun jendela layanan khusus untuk memberikan layanan satu atap bagi investor asing.",
              "Selain itu, kebijakan baru juga melonggarkan beberapa batasan terhadap pembelian properti oleh orang asing. Misalnya, orang asing sekarang dapat membeli properti hak milik di beberapa daerah yang ditunjuk, tidak hanya hak guna. Pada saat yang sama, persyaratan harga minimum untuk membeli properti juga telah dikurangi, memungkinkan lebih banyak investor asing untuk berpartisipasi dalam pasar real estate Bali.",
              "Pengenalan kebijakan ini telah dipersembahkan dengan hangat oleh pengembang real estate dan investor. Manajer umum proyek Pacific Garden Puri mengatakan: 'Implementasi kebijakan baru akan sangat mendorong perkembangan pasar real estate kelas atas Bali dan memberikan lebih banyak peluang bagi pengembang seperti kami. Kami percaya bahwa dengan implementasi kebijakan, lebih banyak investor asing akan datang ke Bali untuk berinvestasi dalam properti.'",
              "Para ahli industri menganalisis bahwa pengenalan kebijakan ini akan memiliki dampak positif terhadap pasar real estate Bali. Diperkirakan bahwa dalam 1-2 tahun ke depan, harga properti kelas atas di Bali akan meningkat sebesar 10%-15%, dan volume penjualan juga akan meningkat lebih dari 20%. Bagi investor asing yang berminat untuk berinvestasi dalam properti di Bali, sekarang adalah kesempatan langka."
            ]
          },
          image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Property%20law%20and%20policy%20documentation%2C%20real%20estate%20investment%20regulations%2C%20Bali%20government%20office&sign=fe1032790a0e3a1933d6a892cbcfeccd",
          category: "政策法规"
        }
      ];

      // 查找匹配的新闻项
      const selectedNews = newsData.find(item => item.id === parseInt(id || '0'));
      
      if (selectedNews) {
        setNewsItem(selectedNews);
      } else {
        // 如果没有找到匹配的新闻，重定向到首页
        navigate('/');
      }
      
      setIsLoading(false);
    }, 500); // 500ms延迟模拟网络请求

    // 清除定时器
    return () => clearTimeout(timer);
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
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

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-2">{t('errors.news.not_found') || 'News Not Found'}</h2>
            <p className="text-gray-600 mb-4">{t('errors.news.not_exist') || 'The requested news does not exist.'}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              {t('common.back_to_home') || 'Back to Home'}
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* 返回按钮 */}
          <div className="mb-6">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-blue-900 hover:text-amber-600 transition-colors"
            >
              <i className="fa-solid fa-arrow-left mr-2"></i>
              {t('common.back') || 'Back'}
            </button>
          </div>

          {/* 新闻详情 */}
          <div className="max-w-3xl mx-auto">
            {/* 新闻分类和日期 */}
            <div className="flex items-center justify-between mb-4">
              <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                {newsItem.category}
              </span>
              <span className="text-gray-500 text-sm">
                {formatDate(newsItem.date)}
              </span>
            </div>

            {/* 新闻标题 */}
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
              {getNewsContent(newsItem, 'title')}
            </h1>

            {/* 新闻图片 */}
            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src={newsItem.image}
                alt={getNewsContent(newsItem, 'title')}
                className="w-full h-auto"
              />
            </div>

            {/* 新闻摘要 */}
            <div className="bg-blue-50 p-6 rounded-xl mb-8">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                {t('news.summary') || 'Summary'}
              </h2>
              <p className="text-gray-700">
                {getNewsContent(newsItem, 'summary')}
              </p>
            </div>

            {/* 新闻内容 */}
            <div className="prose prose-lg max-w-none text-gray-700">
              {getNewsContentParagraphs(newsItem).map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* 相关新闻推荐 - 暂时只显示一个返回首页的按钮 */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-blue-900">
                  {t('news.related') || 'Related News'}
                </h2>
                <Link
                  to="/"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  {t('common.view_all') || 'View All'}
                </Link>
              </div>
              
              <div className="flex justify-center">
                <Link
                  to="/"
                  className="bg-white border border-gray-300 hover:border-blue-900 text-gray-700 px-6 py-2 rounded-full font-medium transition-colors flex items-center"
                >
                  <i className="fa-solid fa-home mr-2"></i>
                  {t('common.back_to_home') || 'Back to Home'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}