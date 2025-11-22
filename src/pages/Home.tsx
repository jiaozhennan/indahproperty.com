import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PropertyShowcase from '@/components/PropertyShowcase';
import FeaturesSection from '@/components/FeaturesSection';
import AboutSection from '@/components/AboutSection';
import InquiryForm from '@/components/InquiryForm';
import Footer from '@/components/Footer';

// 优化性能：使用React.memo包装Home组件，避免不必要的重渲染
const Home = React.memo(() => {
  // 添加内联样式确保页面至少占满屏幕高度
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ minHeight: '100vh' }}>
      <Header />
      <main className="flex-grow">
        <Hero />
        <PropertyShowcase />
        <FeaturesSection />
        <AboutSection />
        <InquiryForm />
      </main>
      <Footer />
    </div>
  );
});

export default Home;