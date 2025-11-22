import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 性能优化：懒加载CSS
export function lazyLoadCSS() {
  const fonts = [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      rel: 'stylesheet'
    }
  ];

  fonts.forEach(font => {
    const link = document.createElement('link');
    link.href = font.href;
    link.rel = font.rel;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  });
}

// 存储咨询信息到本地存储
export function saveInquiry(data: any) {
  try {
    const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
    inquiries.push({
      ...data,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    return true;
  } catch (error) {
    console.error('Failed to save inquiry:', error);
    return false;
  }
}

// 获取所有咨询信息
export function getInquiries() {
  try {
    return JSON.parse(localStorage.getItem('inquiries') || '[]');
  } catch (error) {
    console.error('Failed to get inquiries:', error);
    return [];
  }
}

// 性能优化：节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 性能优化：防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function(this: any, ...args: Parameters<T>) {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// 错误处理：安全的JSON解析
export function safeJSONParse<T>(str: string, defaultValue: T): T {
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    return defaultValue;
  }
}

// 辅助函数：格式化日期
export function formatDate(dateString: string, locale: string = 'zh-CN'): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (e) {
    console.error('Failed to format date:', e);
    return dateString;
  }
}
