import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 定义支持的语言类型
type Language = 'zh' | 'en' | 'id';

// 定义翻译资源类型
interface TranslationResources {
  [key: string]: {
    [key: string]: string;
  };
}

// 定义上下文类型
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// 创建上下文
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 语言名称映射
export const languageNames = {
  zh: '中文',
  en: 'English',
  id: 'Bahasa Indonesia'
};

// 语言选择器组件
interface LanguageProviderProps {
  children: ReactNode;
  resources: TranslationResources;
}

// 语言提供者组件
export function LanguageProvider({ children, resources }: LanguageProviderProps) {
  // 从localStorage获取保存的语言，默认为中文
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('preferred_language') as Language;
    return savedLang || 'zh';
  });

  // 当语言变化时保存到localStorage
  useEffect(() => {
    localStorage.setItem('preferred_language', language);
  }, [language]);

  // 翻译函数
  const t = (key: string): string => {
    return resources[language]?.[key] || resources['zh'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 自定义hook方便使用语言上下文
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}