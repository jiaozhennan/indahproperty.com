import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/translate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

// 房产数据类型
interface Property {
  id: number;
  title: {
    zh: string;
    en: string;
    id: string;
  };
  location: {
    zh: string;
    en: string;
    id: string;
  };
  price: {
    zh: string;
    en: string;
    id: string;
  };
  area: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  featured: boolean;
  description: {
    zh: string;
    en: string;
    id: string;
  };
  features: string[];
  gallery: string[];
}

// 房产项目数据
const properties: Property[] = [
  {
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
  },
  {
    id: 6,
    title: {
      zh: "海滩别墅 (Type 6)",
      en: "Beachfront Villa (Type 6)",
      id: "Villa Dekat Pantai (Tipe 6)"
    },
    location: {
      zh: "巴厘岛努沙杜瓦",
      en: "Nusa Dua, Bali",
      id: "Nusa Dua, Bali"
    },
    price: {
      zh: "¥5,680万起",
      en: "From ¥56.8M",
      id: "Dari ¥56.8M"
    },
    area: "580-680㎡",
    bedrooms: 6,
    bathrooms: 6,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20beachfront%20villa%20with%20private%20beach%2C%20infinity%20pool%2C%20tropical%20architecture%2C%20direct%20ocean%20access%2C%20Bali&sign=7312a1907d760c83b5040ae7fec26319",
    featured: true,
    description: {
      zh: "Type 6海滩别墅是我们最奢华的产品之一，直接面向私人海滩，拥有独立的私人泳池和热带花园。别墅采用传统巴厘岛建筑风格与现代设计相结合，内部空间宽敞，装饰精美。每间卧室都配有独立浴室，主卧更是拥有步入式衣帽间和海景浴缸。",
      en: "Type 6 Beachfront Villa is one of our most luxurious products, directly facing a private beach with its own private pool and tropical garden. The villa combines traditional Balinese architectural style with modern design, featuring spacious interior spaces and exquisite decoration. Each bedroom is equipped with an en-suite bathroom, and the master bedroom even has a walk-in closet and ocean-view bathtub.",
      id: "Villa Dekat Pantai Tipe 6 adalah salah satu produk paling mewah kami, langsung menghadap pantai pribadi dengan kolam renang pribadi dan taman tropisnya sendiri. Villa ini menggabungkan gaya arsitektur tradisional Bali dengan desain modern, menampilkan ruang interior yang luas dan dekorasi yang indah. Setiap kamar tidur dilengkapi dengan kamar mandi pribadi, dan kamar tidur utama bahkan memiliki lemari pakaian berjalan dan bak mandi dengan pemandangan laut."
    },
    features: ["6间卧室", "6间浴室", "私人泳池", "私人海滩", "热带花园", "佣人房"],
    gallery: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Beachfront%20villa%20infinity%20pool%20with%20ocean%20view%2C%20tropical%20garden&sign=7d547f7aa23ed228e6862f341e1ae951",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20villa%20living%20room%20with%20traditional%20Balinese%20decoration%2C%20high%20ceilings&sign=e8dd592f0aa9b3fa705df738481417ca",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Master%20bedroom%20with%20ocean%20view%2C%20four-poster%20bed%2C%20luxury%20furniture&sign=3f54c68ab9ebef82f8cc23508c228983"
    ]
  },
  {
    id: 5,
    title: {
      zh: "山坡泳池别墅 (Type 5)",
      en: "Hilltop Pool Villa (Type 5)",
      id: "Villa Kolam di Bukit (Tipe 5)"
    },
    location: {
      zh: "巴厘岛金巴兰",
      en: "Jimbaran, Bali",
      id: "Jimbaran, Bali"
    },
    price: {
      zh: "¥3,880万起",
      en: "From ¥38.8M",
      id: "Dari ¥38.8M"
    },
    area: "450-550㎡",
    bedrooms: 5,
    bathrooms: 5,
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20hilltop%20villa%20with%20infinity%20pool%2C%20panoramic%20ocean%20view%2C%20tropical%20garden%2C%20modern%20architecture%2C%20Bali&sign=1352f725c3202ac1e5a6cbe66e5d81b0",
    featured: true,
    description: {
      zh: "Type 5山坡泳池别墅位于金巴兰的山坡上，俯瞰整个印度洋和巴厘岛的壮丽日落。别墅拥有无边泳池、热带花园和私人停车位。内部设计现代简约，同时融入了巴厘岛的文化元素，为住户提供独特的居住体验。",
      en: "Type 5 Hilltop Pool Villa is located on a hillside in Jimbaran, overlooking the entire Indian Ocean and Bali's magnificent sunsets. The villa features an infinity pool, tropical garden, and private parking. The interior design is modern and minimalist, while incorporating Balinese cultural elements to provide residents with a unique living experience.",
      id: "Villa Kolam di Bukit Tipe 5 terletak di lereng bukit di Jimbaran, dengan pemandangan seluruh Samudra Hindia dan matahari terbenam yang indah di Bali. Villa ini memiliki kolam renang infinity, taman tropis, dan parkir pribadi. Desain interiornya modern dan minimalis, sambil memasukkan elemen budaya Bali untuk memberikan pengalaman tinggal yang unik bagi penghuni."
    },
    features: ["5间卧室", "5间浴室", "无边泳池", "海景", "热带花园", "私人停车位"],
    gallery: [
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Hilltop%20villa%20infinity%20pool%20with%20panoramic%20ocean%20view%2C%20sunset&sign=bc67adc2d327b9f2a18de74bea394930",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Modern%20villa%20kitchen%20with%20island%2C%20stainless%20steel%20appliances%2C%20ocean%20view&sign=c33631f9174a560279ae47d994bce50f",
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Outdoor%20dining%20area%20with%20ocean%20view%2C%20tropical%20garden%2C%20luxury%20furniture&sign=bf36ac04ad31fc33c2abfbd0101ab5f4"
    ]
  }
];

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

export default function Projects() {
  const [activeProperty, setActiveProperty] = useState<Property>(properties[0]);
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
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('common.properties')}</h1>
              <p className="text-blue-100 text-lg max-w-2xl">
                {language === 'zh' 
                  ? '探索Pacific Garden Puri的豪华房产项目，每一处都融合了巴厘岛的自然美景与现代奢华生活。' 
                  : language === 'id' 
                    ? 'Jelajahi proyek properti mewah Pacific Garden Puri, di mana setiap properti menggabungkan keindahan alami Bali dengan kehidupan mewah modern.' 
                    : 'Explore Pacific Garden Puri\'s luxury property projects, where each property combines Bali\'s natural beauty with modern luxurious living.'
                }
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* 项目列表和详情区域 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* 项目列表 - 在桌面视图中固定在左侧 */}
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-24 space-y-4">
                  <h2 className="text-xl font-bold text-blue-900 mb-6">
                    {language === 'zh' ? '项目类型' : language === 'id' ? 'Tipe Proyek' : 'Project Types'}
                  </h2>
                  
                  {properties.map((property) => (
                       <motion.button
                        key={property.id}
                        data-property-id={property.id}
                        onClick={() => setActiveProperty(property)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                          activeProperty.id === property.id
                            ? 'bg-blue-900 text-white shadow-lg'
                            : 'bg-gray-50 text-gray-700 hover:bg-blue-50'
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium mb-1">{getPropertyValue(property, 'title')}</div>
                        <div className="text-sm text-gray-500">{getPropertyValue(property, 'location')}</div>
                        <div className="mt-2 text-amber-600 font-bold">{getPropertyValue(property, 'price')}</div>
                      </motion.button>
                  ))}
                </div>
              </div>
              
              {/* 项目详情 - 在桌面视图中显示在右侧 */}
              <div className="lg:col-span-9">
                <motion.div
                  key={activeProperty.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* 项目主图片 */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 cursor-pointer" onClick={() => openImageModal(activeProperty.image)}>
                    <img 
                      src={activeProperty.image} 
                      alt={getPropertyValue(activeProperty, 'title')} 
                      className="w-full h-[500px] object-cover"
                    />
                    {activeProperty.featured && (
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
                        {getPropertyValue(activeProperty, 'title')}
                      </h2>
                      <div className="flex items-center text-gray-600">
                        <i className="fa-solid fa-map-marker-alt mr-2 text-amber-600"></i>
                        {getPropertyValue(activeProperty, 'location')}
                      </div>
                    </div>
                    
                    <div className="text-3xl font-bold text-amber-600 mb-6">
                      {getPropertyValue(activeProperty, 'price')}
                    </div>
                    
                    {/* 基本规格 */}
                    <div className="grid grid-cols-3 gap-4 mb-8 text-center">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <i className="fa-solid fa-ruler-combined text-blue-900 text-xl mb-2"></i>
                        <div className="font-medium">{activeProperty.area}</div>
                        <div className="text-xs text-gray-500">{t('property.area')}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <i className="fa-solid fa-bed text-blue-900 text-xl mb-2"></i>
                        <div className="font-medium">{activeProperty.bedrooms}</div>
                        <div className="text-xs text-gray-500">{t('property.bedrooms')}</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <i className="fa-solid fa-bath text-blue-900 text-xl mb-2"></i>
                        <div className="font-medium">{activeProperty.bathrooms}</div>
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
                          {getPropertyValue(activeProperty, 'description')}
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
                          {activeProperty.features.map((feature, index) => (
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
                          <div className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-video" onClick={() => openImageModal(activeProperty.image)}>
                            <img 
                              src={activeProperty.image} 
                              alt={getPropertyValue(activeProperty, 'title')} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center">
                              <span className="bg-white bg-opacity-0 hover:bg-opacity-90 text-white hover:text-blue-900 rounded-full p-3 transition-all opacity-0 hover:opacity-100">
                                <i className="fa-solid fa-search-plus"></i>
                              </span>
                            </div>
                          </div>
                          
                          {/* 其他图片 */}
                          {activeProperty.gallery.map((image, index) => (
                            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer aspect-video" onClick={() => openImageModal(image)}>
                              <img 
                                src={image} 
                                alt={`${getPropertyValue(activeProperty, 'title')} - Image ${index + 1}`} 
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
            </div>
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