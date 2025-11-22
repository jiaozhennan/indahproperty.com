import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/translate";

// 优化后的Empty组件
export function Empty() {
  const { t } = useTranslation();
  
  return (
    <div 
      className={cn("flex h-full items-center justify-center flex-col p-4 text-center cursor-pointer")} 
      onClick={() => toast(t('common.loading') || 'Coming soon')}
    >
      <div className="w-20 h-20 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mb-4">
        <i className="fa-solid fa-box-open text-3xl"></i>
      </div>
      <h3 className="text-xl font-semibold text-blue-900 mb-2">{t('common.loading') || 'Coming soon'}</h3>
      <p className="text-gray-600 max-w-md">{t('errors.news.not_exist') || 'This content is currently being prepared and will be available soon.'}</p>
    </div>
  );
}