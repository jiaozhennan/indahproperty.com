import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/translate';

  // 房产数据 - 只保留Type8、Type6和Type5，按要求顺序排列，并基于Pacific Garden Puri网站数据更新
  const properties = [
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
      featured: true
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
      featured: true
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
      featured: true
    }
  ];

export default function PropertyShowcase() {
  // 默认显示第一个房产（Type 8）
  const [activeProperty, setActiveProperty] = useState(properties[0]);
  const { t, language } = useTranslation();
  
  // 获取多语言属性值
  const getPropertyValue = (property: any, field: string) => {
    const value = property[field];
    return typeof value === 'object' && value !== null && value[language] 
      ? value[language] 
      : value;
  };
  
  return (
    <section id="properties" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{t('property.showcase.title')}</h2>
          <p className="text-gray-600">{t('property.showcase.subtitle')}</p>
        </div>
        
        {/* Property Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Property Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl group">
            <img 
              src={activeProperty.image} 
              alt={getPropertyValue(activeProperty, 'title')} 
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {activeProperty.featured && (
              <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full">{t('property.featured')}</div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h3 className="text-2xl font-bold text-white">{getPropertyValue(activeProperty, 'title')}</h3>
              <p className="text-gray-200 flex items-center mt-1">
                <i className="fa-solid fa-map-marker-alt mr-2"></i> {getPropertyValue(activeProperty, 'location')}
              </p>
            </div>
          </div>
          
            {/* Property Details */}
          <div>
           <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
              {properties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => setActiveProperty(property)}
                  className={`flex-shrink-0 px-6 py-3 rounded-full transition-all ${
                    activeProperty.id === property.id
                      ? 'bg-blue-900 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {getPropertyValue(property, 'title')}
                </button>
              ))}
            </div>
            
            <div className="mb-8">
              <div className="text-3xl font-bold text-blue-900 mb-2">{getPropertyValue(activeProperty, 'price')}</div>
              <div className="text-gray-600">{t('property.price.from')}</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-gray-50 p-4 rounded-xl">
                <i className="fa-solid fa-ruler-combined text-amber-600 text-xl mb-2"></i>
                <div className="font-medium">{activeProperty.area}</div>
                <div className="text-xs text-gray-500">{t('property.area')}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <i className="fa-solid fa-bed text-amber-600 text-xl mb-2"></i>
                <div className="font-medium">{activeProperty.bedrooms}</div>
                <div className="text-xs text-gray-500">{t('property.bedrooms')}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <i className="fa-solid fa-bath text-amber-600 text-xl mb-2"></i>
                <div className="font-medium">{activeProperty.bathrooms}</div>
                <div className="text-xs text-gray-500">{t('property.bathrooms')}</div>
              </div>
            </div>
            
            <p className="text-gray-600 mb-8">
              {t('property.description', { 
                location: getPropertyValue(activeProperty, 'location') 
              })}
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                t('property.features.smart_home'),
                t('property.features.security'),
                t('property.features.gym'),
                t('property.features.pool'),
                t('property.features.playground'),
                t('property.features.metro')
              ].map((feature, index) => (
                <span key={index} className="inline-flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <i className="fa-solid fa-check-circle mr-1 text-amber-600"></i>
                  {feature}
                </span>
              ))}
            </div>
            
             <div className="flex flex-col sm:flex-row gap-4">
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
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium text-center transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                {t('property.cta.viewing')}
              </button>
              <button className="bg-white border border-gray-300 hover:border-blue-900 text-gray-700 px-8 py-3 rounded-full font-medium text-center transition-all flex items-center justify-center">
                <i className="fa-solid fa-share-alt mr-2"></i> {t('common.share')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}