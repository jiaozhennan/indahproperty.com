import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/translate';

// 幻灯片数据类型
interface Slide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  image: string;
  ctaTextKey: string;
  ctaLink: string;
}

export default function Hero() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 定义多张幻灯片数据
  const slides: Slide[] = [
    {
      id: 1,
      titleKey: 'hero.title',
      subtitleKey: 'hero.subtitle',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Tropical%20luxury%20resort%20with%20infinity%20pool%2C%20palm%20trees%2C%20ocean%20view%2C%20sunset%2C%20modern%20architecture%2C%20Bali%20inspired&sign=b97de185451693ceff512e194d5462d0',
      ctaTextKey: 'hero.browse_properties',
      ctaLink: 'properties'
    },
    {
      id: 2,
      titleKey: 'hero.slide2.title',
      subtitleKey: 'hero.slide2.subtitle',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Luxury%20beachfront%20villa%20with%20private%20pool%2C%20tropical%20garden%2C%20modern%20architecture%2C%20Bali&sign=fba2b8df6866aaaff1461756f72e9b0c',
      ctaTextKey: 'hero.slide2.cta',
      ctaLink: 'properties'
    },
    {
      id: 3,
      titleKey: 'hero.slide3.title',
      subtitleKey: 'hero.slide3.subtitle',
      image: 'https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Modern%20luxury%20apartment%20interior%20with%20high%20ceiling%2C%20large%20windows%2C%20tropical%20design%2C%20Bali&sign=d70bb0fecdae5e525aeca73004d31b1f',
      ctaTextKey: 'hero.slide3.cta',
      ctaLink: 'contact'
    }
  ];
  
  // 自动轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5秒切换一次
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  // 平滑滚动到指定元素
  const scrollToSection = (id: string) => {
    // 计算滚动位置，考虑header高度
    const headerOffset = 80;
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  // 切换到上一张幻灯片
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  // 切换到下一张幻灯片
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  // 直接切换到指定幻灯片
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* 多张幻灯片容器 */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={t(slide.titleKey)} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40"></div>
          </div>
        ))}
      </div>
      
      {/* Hero Content - 为当前幻灯片显示对应的内容 */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <motion.div 
          key={currentSlide} // 添加key以触发动画重新开始
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t(slides[currentSlide].titleKey) }}
          />
          
          <p 
            className="text-lg md:text-xl mb-8 text-blue-100"
          >
            {t(slides[currentSlide].subtitleKey)}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => scrollToSection(slides[currentSlide].ctaLink)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-medium text-center transition-all transform hover:scale-105 shadow-lg"
            >
              {t(slides[currentSlide].ctaTextKey)}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/40 px-8 py-3 rounded-full font-medium text-center transition-all"
            >
              {t('hero.contact_us')}
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm text-blue-100 mt-1">{t('hero.stats.projects')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-sm text-blue-100 mt-1">{t('hero.stats.customers')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15</div>
              <div className="text-sm text-blue-100 mt-1">{t('hero.stats.experience')}</div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* 幻灯片导航箭头 */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      
      {/* 幻灯片指示器 */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center z-30"
        onClick={() => scrollToSection('properties')}
      >
        <i className="fa-solid fa-chevron-down cursor-pointer"></i>
        <div className="text-sm mt-2 cursor-pointer">{t('common.scroll_down')}</div>
      </motion.div>
    </section>
  );
}