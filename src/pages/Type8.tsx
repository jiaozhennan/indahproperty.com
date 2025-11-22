import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/translate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

// Type8 房产数据
const type8Property = {
  id: 8,
  title: {
    zh: "豪华复式公寓 (Type 8)",
    en: "Luxury Duplex Apartment (Type 8)",
    id: "Apartemen Duplex Mewah (Tipe 8)"
  },
  location: {
    zh: "巴厘岛努沙杜瓦",
    en: "Nusa Dua, Bali",
    id: "Nusa Dua, Bali"
  },
  price: {
    zh: "¥1,980万起",
    en: "From ¥19.8M",
    id: "Dari ¥19.8M"
  },
  area: "260-320㎡",
  bedrooms: 4,
  bathrooms: 3,
  image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20duplex%20apartment%20with%20high%20ceiling%2C%20modern%20interior%2C%20private%20terrace%2C%20tropical%20design%2C%20Bali&sign=5fa755144e22019a78ef53aadd75fca7",
  featured: true,
  description: {
    zh: "Type 8豪华复式公寓是我们最新推出的旗舰产品，位于努沙杜瓦核心地带，俯瞰印度洋美景。每个单元都拥有挑高客厅、落地窗和私人阳台，提供宽敞明亮的生活空间。内部装修采用了高端环保材料，并配备了智能家居系统，为住户打造舒适、便捷、健康的生活环境。",
    en: "Type 8 Luxury Duplex Apartment is our newest flagship product, located in the heart of Nusa Dua with stunning Indian Ocean views. Each unit features high ceilings, floor-to-ceiling windows and private balconies, providing spacious and bright living spaces. The interior decoration uses high-end environmentally friendly materials and is equipped with smart home systems to create a comfortable, convenient and healthy living environment for residents.",
    id: "Apartemen Duplex Mewah Tipe 8 adalah produk旗舰 terbaru kami, terletak di jantung Nusa Dua dengan pemandangan menakjubkan Samudra Hindia. Setiap unit dilengkapi dengan langit-langit tinggi, jendela dari lantai ke langit-langit dan balkon pribadi, menyediakan ruang hidup yang luas dan cerah. Dekorasi interior menggunakan bahan ramah lingkungan kelas atas dan dilengkapi dengan sistem rumah pintar untuk menciptakan lingkungan hidup yang nyaman, praktis dan sehat bagi penghuni."
  },
  features: ["4间卧室", "3间浴室", "私人阳台", "智能家居系统", "顶层露台", "海景"],
  gallery: [
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20duplex%20apartment%20living%20room%20with%20high%20ceiling%2C%20large%20windows%2C%20tropical%20design&sign=cd87291bc58e3eed28831fbbdec0518c",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20kitchen%20with%20modern%20appliances%2C%20granite%20countertops%2C%20wood%20cabinets&sign=ebb67b96c34035fbc430812c327ac33a",
    "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20bedroom%20with%20king%20size%20bed%2C%20ocean%20view%2C%20modern%20furniture&sign=df4b49f0e8c058f719fe56925063636c"
  ]
};

// 项目设施数据
const amenities = [
  {
    icon: "fa-swimming-pool",
    name: {
      zh: "无边泳池",
      en: "Infinity Pool",
      id: "Kolam Infinity"
    }
  },
  {
    icon: "fa-utensils",
    name: {
      zh: "高级餐厅",
      en: "Fine Dining",
      id: "Restoran Mewah"
    }
  },
  {
    icon: "fa-dumbbell",
    name: {
      zh: "健身中心",
      en: "Fitness Center",
      id: "Pusat Kebugaran"
    }
  },
  {
    icon: "fa-spa",
    name: {
      zh: "SPA中心",
      en: "SPA Center",
      id: "Pusat SPA"
    }
  },
  {
    icon: "fa-child",
    name: {
      zh: "儿童乐园",
      en: "Kids' Club",
      id: "Klub Anak"
    }
  },
  {
    icon: "fa-shield-alt",
    name: {
      zh: "24小时安保",
      en: "24/7 Security",
      id: "Keamanan 24/7"
    }
  },
  {
    icon: "fa-concierge-bell",
    name: {
      zh: "礼宾服务",
      en: "Concierge Service",
      id: "Layanan Koncierge"
    }
  },
  {
    icon: "fa-parking",
    name: {
      zh: "私人停车位",
      en: "Private Parking",
      id: "Parkir Pribadi"
    }
  }
];

export default function Type8() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  
  // 获取多语言属性值
  const getPropertyValue = (property: any, field: string) => {
    const value = property[field];
    return typeof value === 'object' && value !== null && value[language] 
      ? value[language] 
      : value;
  };

  // 打开图片查看器
  const openImageModal = (image: string) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // 关闭图片查看器
  const closeImageModal = () => {
    setIsImageModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // 平滑滚动到联系区域
  const scrollToContact = () => {
    navigate('/');
    setTimeout(() => {
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
    }, 300);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* 页面标题区域 */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{getPropertyValue(type8Property, 'title')}</h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                {language === 'zh' 
                  ? '位于努沙杜瓦核心地带的豪华复式公寓，俯瞰印度洋美景，融合现代设计与热带风情。' 
                  : language === 'id' 
                    ? 'Apartemen duplex mewah di jantung Nusa Dua dengan pemandangan menakjubkan Samudra Hindia, menggabungkan desain modern dengan nuansa tropis.' 
                    : 'Luxury duplex apartment in the heart of Nusa Dua with stunning Indian Ocean views, combining modern design with tropical charm.'
                }
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* 项目详情区域 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* 项目主图片 */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 cursor-pointer" onClick={() => openImageModal(type8Property.image)}>
                <img 
                  src={type8Property.image} 
                  alt={getPropertyValue(type8Property, 'title')} 
                  className="w-full h-[500px] object-cover"
                />
                {type8Property.featured && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {t('property.featured')}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                  <span className="bg-white bg-opacity-0 hover:bg-opacity-90 text-white hover:text-blue-900 rounded-full p-3 transition-all opacity-0 hover:opacity-100">
                    <i className="fa-solid fa-search-plus"></i>
                  </span>
                </div>
              </div>
              
              {/* 项目标题和基本信息 */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2 md:mb-0">
                    {getPropertyValue(type8Property, 'title')}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <i className="fa-solid fa-map-marker-alt mr-2 text-amber-600"></i>
                    {getPropertyValue(type8Property, 'location')}
                  </div>
                </div>
                
                <div className="text-3xl font-bold text-amber-600 mb-6">
                  {getPropertyValue(type8Property, 'price')}
                </div>
                
                {/* 基本规格 */}
                <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <i className="fa-solid fa-ruler-combined text-blue-900 text-xl mb-2"></i>
                    <div className="font-medium">{type8Property.area}</div>
                    <div className="text-xs text-gray-500">{t('property.area')}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <i className="fa-solid fa-bed text-blue-900 text-xl mb-2"></i>
                    <div className="font-medium">{type8Property.bedrooms}</div>
                    <div className="text-xs text-gray-500">{t('property.bedrooms')}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <i className="fa-solid fa-bath text-blue-900 text-xl mb-2"></i>
                    <div className="font-medium">{type8Property.bathrooms}</div>
                    <div className="text-xs text-gray-500">{t('property.bathrooms')}</div>
                  </div>
                </div>
                
                {/* 预约看房按钮 */}
                <button 
                  onClick={scrollToContact}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium text-center transition-all transform hover:scale-105 shadow-md hover:shadow-lg mb-8"
                >
                  {t('property.cta.viewing')}
                </button>
              </div>
              
              {/* 标签页导航 */}
              <div className="border-b border-gray-200 mb-8">
                <nav className="flex -mb-px space-x-8">
                  {[
                    { id: 'overview', label: language === 'zh' ? '项目概述' : language === 'id' ? 'Ringkasan Proyek' : 'Overview' },
                    { id: 'features', label: language === 'zh' ? '项目特色' : language === 'id' ? 'Fitur Proyek' : 'Features' },
                    { id: 'gallery', label: language === 'zh' ? '图片展示' : language === 'id' ? 'Galeri Gambar' : 'Gallery' },
                    { id: 'location', label: language === 'zh' ? '位置与交通' : language === 'id' ? 'Lokasi dan Transportasi' : 'Location' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-900 text-blue-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* 标签页内容 */}
              <div className="mb-12">
                {/* 项目概述 */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {getPropertyValue(type8Property, 'description')}
                    </p>
                    
                    <div className="bg-blue-50 p-6 rounded-xl mb-8">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">
                        {language === 'zh' ? '为什么选择这个项目' : language === 'id' ? 'Mengapa Memilih Proyek Ini' : 'Why Choose This Project'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { icon: 'fa-check-circle', text: language === 'zh' ? '黄金地段，便利的生活圈' : language === 'id' ? 'Lokasi prime, lingkungan hidup yang nyaman' : 'Prime location with convenient living environment' },
                          { icon: 'fa-check-circle', text: language === 'zh' ? '高品质建筑材料和精湛工艺' : language === 'id' ? 'Bahan bangunan berkualitas tinggi dan工艺 yang luar biasa' : 'High-quality building materials and exquisite craftsmanship' },
                          { icon: 'fa-check-circle', text: language === 'zh' ? '完善的配套设施和服务' : language === 'id' ? 'Fasilitas dan layanan yang lengkap' : 'Complete supporting facilities and services' },
                          { icon: 'fa-check-circle', text: language === 'zh' ? '专业的物业管理团队' : language === 'id' ? 'Tim manajemen properti yang profesional' : 'Professional property management team' },
                          { icon: 'fa-check-circle', text: language === 'zh' ? '良好的投资回报潜力' : language === 'id' ? 'Potensi pengembalian investasi yang baik' : 'Good investment return potential' },
                          { icon: 'fa-check-circle', text: language === 'zh' ? '独特的设计风格和居住体验' : language === 'id' ? 'Gaya desain yang unik dan pengalaman tinggal' : 'Unique design style and living experience' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <i className={`fa-solid ${item.icon} text-amber-600 mr-3`}></i>
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* 项目特色 */}
                {activeTab === 'features' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {type8Property.features.map((feature, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-4 rounded-xl">
                          <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mr-4">
                            <i className="fa-solid fa-plus"></i>
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">
                      {language === 'zh' ? '项目公共设施' : language === 'id' ? 'Fasilitas Umum Proyek' : 'Project Public Facilities'}
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="text-center p-4 bg-gray-50 rounded-xl">
                          <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i className={`fa-solid ${amenity.icon}`}></i>
                          </div>
                          <div className="text-sm text-gray-700">{getPropertyValue(amenity, 'name')}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* 图片展示 */}
                {activeTab === 'gallery' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* 主图片 */}
                      <div className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-video" onClick={() => openImageModal(type8Property.image)}>
                        <img 
                          src={type8Property.image} 
                          alt={getPropertyValue(type8Property, 'title')} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                          <span className="bg-white bg-opacity-0 hover:bg-opacity-90 text-white hover:text-blue-900 rounded-full p-3 transition-all opacity-0 hover:opacity-100">
                            <i className="fa-solid fa-search-plus"></i>
                          </span>
                        </div>
                      </div>
                      
                      {/* 其他图片 */}
                      {type8Property.gallery.map((image, index) => (
                        <div key={index} className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-video" onClick={() => openImageModal(image)}>
                          <img 
                            src={image} 
                            alt={`${getPropertyValue(type8Property, 'title')} - Image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                            <span className="bg-white bg-opacity-0 hover:bg-opacity-90 text-white hover:text-blue-900 rounded-full p-3 transition-all opacity-0 hover:opacity-100">
                              <i className="fa-solid fa-search-plus"></i>
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* 位置与交通 */}
                {activeTab === 'location' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">
                        {language === 'zh' ? '项目位置' : language === 'id' ? 'Lokasi Proyek' : 'Project Location'}
                      </h3>
                      <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
                        {/* 嵌入谷歌地图 */}
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.9879440697325!2d115.15066631544223!3d-8.749896993827219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2458e06f8d557%3A0x372fa77781e8b24c!2sJl.%20Pantai%20Mengiat%2C%20Nusa%20Dua%2C%20Badung%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1635703112427!5m2!1sen!2sid"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          title="Project Location"
                        ></iframe>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">
                        {language === 'zh' ? '周边设施' : language === 'id' ? 'Fasilitas Sekitar' : 'Nearby Facilities'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { icon: 'fa-umbrella-beach', title: language === 'zh' ? '海滩' : language === 'id' ? 'Pantai' : 'Beach', distance: language === 'zh' ? '步行5分钟' : language === 'id' ? '5 menit jalan kaki' : '5 min walk' },
                          { icon: 'fa-utensils', title: language === 'zh' ? '餐厅' : language === 'id' ? 'Restoran' : 'Restaurants', distance: language === 'zh' ? '步行10分钟' : language === 'id' ? '10 menit jalan kaki' : '10 min walk' },
                          { icon: 'fa-shopping-bag', title: language === 'zh' ? '购物中心' : language === 'id' ? 'Pusat Perbelanjaan' : 'Shopping Center', distance: language === 'zh' ? '车程15分钟' : language === 'id' ? '15 menit berkendara' : '15 min drive' },
                          { icon: 'fa-hospital', title: language === 'zh' ? '医院' : language === 'id' ? 'Rumah Sakit' : 'Hospital', distance: language === 'zh' ? '车程20分钟' : language === 'id' ? '20 menit berkendara' : '20 min drive' },
                          { icon: 'fa-plane', title: language === 'zh' ? '机场' : language === 'id' ? 'Bandara' : 'Airport', distance: language === 'zh' ? '车程35分钟' : language === 'id' ? '35 menit berkendara' : '35 min drive' },
                          { icon: 'fa-school', title: language === 'zh' ? '国际学校' : language === 'id' ? 'Sekolah Internasional' : 'International School', distance: language === 'zh' ? '车程25分钟' : language === 'id' ? '25 menit berkendara' : '25 min drive' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center p-4 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mr-4">
                              <i className={`fa-solid ${item.icon}`}></i>
                            </div>
                            <div className="flex-grow">
                              <div className="font-medium text-gray-700">{item.title}</div>
                              <div className="text-sm text-gray-500">{item.distance}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* 项目优势区域 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                {language === 'zh' ? 'Pacific Garden Puri 项目优势' : language === 'id' ? 'Keunggulan Proyek Pacific Garden Puri' : 'Pacific Garden Puri Project Advantages'}
              </h2>
              <p className="text-gray-600">
                {language === 'zh' ? '我们的项目融合了独特的设计理念、优质的建筑质量和完善的配套服务，为您打造理想的巴厘岛家园。' : language === 'id' ? 'Proyek kami menggabungkan filosofi desain yang unik, kualitas konstruksi yang unggul, dan layanan pendukung yang lengkap untuk menciptakan rumah impian Anda di Bali.' : 'Our project combines unique design philosophy, high-quality construction, and complete supporting services to create your ideal home in Bali.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: 'fa-map-marker-alt', title: language === 'zh' ? '黄金地段' : language === 'id' ? 'Lokasi Prime' : 'Prime Location', desc: language === 'zh' ? '位于巴厘岛最受欢迎的旅游区，便捷前往海滩、餐厅和购物中心。' : language === 'id' ? 'Terletak di kawasan pariwisata paling populer di Bali, dengan akses mudah ke pantai, restoran, dan pusat perbelanjaan.' : 'Located in Bali\'s most popular tourist area, with easy access to beaches, restaurants, and shopping centers.' },
                { icon: 'fa-home', title: language === 'zh' ? '卓越设计' : language === 'id' ? 'Desain Unggul' : 'Excellent Design', desc: language === 'zh' ? '融合传统巴厘岛元素与现代设计，创造独特而舒适的居住空间。' : language === 'id' ? 'Menggabungkan elemen tradisional Bali dengan desain modern untuk menciptakan ruang hunian yang unik dan nyaman.' : 'Combining traditional Balinese elements with modern design to create unique and comfortable living spaces.' },
                { icon: 'fa-tools', title: language === 'zh' ? '优质建筑' : language === 'id' ? 'Konstruksi Berkualitas' : 'Quality Construction', desc: language === 'zh' ? '使用高端材料和先进技术，确保建筑质量和耐久性。' : language === 'id' ? 'Menggunakan bahan berkualitas tinggi dan teknologi canggih untuk memastikan kualitas dan daya tahan bangunan.' : 'Using high-end materials and advanced technology to ensure construction quality and durability.' },
                { icon: 'fa-concierge-bell', title: language === 'zh' ? '专属服务' : language === 'id' ? 'Layanan Eksklusif' : 'Exclusive Service', desc: language === 'zh' ? '提供24小时安保、管家服务和定期维护，确保您的舒适生活。' : language === 'id' ? 'Menyediakan keamanan 24 jam, layanan butler, dan pemeliharaan berkala untuk memastikan kenyamanan hidup Anda.' : 'Providing 24-hour security, butler service, and regular maintenance to ensure your comfortable living.' }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6">
                    <i className={`fa-solid ${feature.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
            
            {/* 预约咨询CTA */}
            <div className="mt-16 text-center">
              <button 
                onClick={scrollToContact}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium text-center transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                {t('property.cta.viewing')}
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* 图片查看器模态框 */}
      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" onClick={closeImageModal}>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white hover:text-amber-500 transition-colors"
              onClick={closeImageModal}
            >
              <i className="fa-solid fa-times text-2xl"></i>
            </button>
            <img 
              src={selectedImage} 
              alt="Property view" 
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}