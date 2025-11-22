import { useLanguage } from '@/contexts/LanguageContext';

// 翻译钩子，简化组件中翻译文本的使用
export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}