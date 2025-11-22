import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/translate';

export default function AboutSection() {
  const { t, language } = useTranslation();
  
  // 获取多语言地址
  const address = language === 'zh' 
    ? '巴厘岛努沙杜瓦区Jl. Pantai Mengiat, 80363' 
    : 'Jl. Pantai Mengiat, Nusa Dua, Bali 80363';
  
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 上部内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image - Updated to Pacific Garden Puri style */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Professional%20real%20estate%20team%20in%20tropical%20resort%20setting%2C%20showing%20property%20models%2C%20smiling%20and%20confident&sign=7738ecf291fcf226a6d4ea0583ac95b3" 
                  alt={t('about.title')} 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Stats Card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-lg max-w-xs">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-4">
                    <i className="fa-solid fa-trophy text-xl"></i>
                  </div>
                  <div>
                    <div className="font-bold text-blue-900">{t('about.stats.leading')}</div>
                    <div className="text-sm text-gray-500">{t('about.stats.experience')}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-900">98%</div>
                    <div className="text-xs text-gray-500">{t('about.stats.satisfaction')}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-900">500+</div>
                    <div className="text-xs text-gray-500">{t('about.stats.transactions')}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">{t('about.title')}</h2>
            
            <p className="text-gray-600 mb-6">
              {t('about.desc1')}
            </p>
            
            <p className="text-gray-600 mb-8">
              {t('about.desc2')}
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                t('about.advantages.team'),
                t('about.advantages.projects'),
                t('about.advantages.service'),
                t('about.advantages.integrity')
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1 mr-3 text-amber-600">
                    <i className="fa-solid fa-check-circle"></i>
                  </div>
                  <div className="text-gray-600">{item}</div>
                </div>
              ))}
            </div>
            
             <div className="flex flex-wrap gap-4">
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
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-md"
              >
                {t('about.cta.learn_more')}
              </button>
              <button 
                onClick={() => {
                  const headerOffset = 80;
                  const element = document.getElementById('properties');
                  if (element) {
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="bg-white border border-gray-300 hover:border-blue-900 text-gray-700 px-8 py-3 rounded-full font-medium transition-all"
              >
                {t('about.cta.view_projects')}
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* 谷歌地图部分 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            {t('contact.info.address')}
          </h3>
          
          <div className="bg-gray-100 p-4 flex flex-col items-center">
            {/* 嵌入谷歌地图 - 使用Pacific Garden Puri的地址 */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.9879440697325!2d115.15066631544223!3d-8.749896993827219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2458e06f8d557%3A0x372fa77781e8b24c!2sJl.%20Pantai%20Mengiat%2C%20Nusa%20Dua%2C%20Badung%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1635703112427!5m2!1sen!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={t('about.title')}
              className="rounded-xl shadow-lg"
            ></iframe>
            
            {/* 地址信息 */}
            <div className="mt-6 flex items-center bg-white px-6 py-4 rounded-full shadow-md">
              <div className="text-amber-600 mr-3">
                <i className="fa-solid fa-map-marker-alt text-xl"></i>
              </div>
              <p className="text-gray-700 font-medium">{address}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}