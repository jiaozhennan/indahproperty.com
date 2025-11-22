import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from '@/contexts/LanguageContext';
import zh from '@/locales/zh';
import en from '@/locales/en';
import id from '@/locales/id';

// 性能优化：懒加载CSS
import { lazyLoadCSS } from './lib/utils';

// 整合所有语言资源
const resources = {
  zh,
  en,
  id
};

// 优化性能：页面加载后执行非关键任务
document.addEventListener('DOMContentLoaded', () => {
  // 懒加载字体或其他非关键CSS
  lazyLoadCSS();
  
  // 优化用户体验：预加载下一个可能访问的页面资源
  const preloadLinks = [
    { href: '/projects', as: 'document' },
    { href: '/news', as: 'document' }
  ];
  
  preloadLinks.forEach(link => {
    const linkEl = document.createElement('link');
    linkEl.rel = 'prefetch';
    linkEl.href = link.href;
    if (link.as) linkEl.as = link.as;
    document.head.appendChild(linkEl);
  });
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     {/* 对于GitHub Pages部署，使用HashRouter替代BrowserRouter以避免404问题 */}
     {/* 使用自定义域名bagusnya.com时，basename直接设置为根路径 */}
    <HashRouter basename="/">
      <LanguageProvider resources={resources}>
        <App />
        <Toaster position="top-right" />
      </LanguageProvider>
    </HashRouter>
  </StrictMode>
);