import React, { useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useTranslation } from '@/lib/translate';
import { useLanguage } from '@/contexts/LanguageContext';

// Form validation schema
const inquirySchema = z.object({
  name: z.string().min(2, 'errors.name.required').max(50, 'errors.name.max'),
  phone: z.string().regex(/^1[3-9]\d{9}$/, 'errors.phone.invalid'),
  email: z.string().email('errors.email.invalid').optional(),
  interestedProperty: z.string().min(1, 'errors.property.required'),
  message: z.string().min(10, 'errors.message.required').max(500, 'errors.message.max'),
  agreeTerms: z.boolean().refine(val => val === true, 'errors.agree.required')
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export default function InquiryForm() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    interestedProperty: '',
    message: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Property options for dropdown - multi-language support
  const propertyOptions = [
    { value: '', labelKey: 'contact.form.select.property' },
    { value: 'luxury-ocean-view', labelKey: 'property.features.luxury_apartment' },
    { value: 'garden-villa', labelKey: 'property.features.garden_house' },
    { value: 'penthouse-suite', labelKey: 'property.features.penthouse_suite' },
    { value: 'hilltop-villa', labelKey: 'property.features.hilltop_villa' },
    { value: 'beachfront-villa', labelKey: 'property.features.beachfront_villa' },
    { value: 'luxury-duplex', labelKey: 'property.features.luxury_duplex' },
    { value: 'other', labelKey: 'property.features.other' }
  ];
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Validate form data with translated error messages
  const validateForm = (): boolean => {
    try {
      inquirySchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = t(err.message);
        });
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store in localStorage as mock data storage
      const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
      inquiries.push({
        ...formData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        language // Store the language used when submitting
      });
      localStorage.setItem('inquiries', JSON.stringify(inquiries));
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        interestedProperty: '',
        message: '',
        agreeTerms: false
      });
      
      toast.success(t('success.inquiry.submitted'));
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{t('contact.title')}</h2>
          <p className="text-gray-600">{t('contact.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all`}
                    placeholder={t('contact.form.placeholder.name')}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all`}
                    placeholder={t('contact.form.placeholder.phone')}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all`}
                  placeholder={t('contact.form.placeholder.email')}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="interestedProperty" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.property')} <span className="text-red-500">*</span>
                </label>
                <select
                  id="interestedProperty"
                  name="interestedProperty"
                  value={formData.interestedProperty}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.interestedProperty ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all appearance-none bg-white`}
                >
                  {propertyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {t(option.labelKey)}
                    </option>
                  ))}
                </select>
                {errors.interestedProperty && <p className="mt-1 text-sm text-red-500">{errors.interestedProperty}</p>}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-all resize-none`}
                  placeholder={t('contact.form.placeholder.message')}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeTerms"
                    name="agreeTerms"
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className={`w-4 h-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded ${
                      errors.agreeTerms ? 'border-red-500' : ''
                    }`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeTerms" className="text-gray-600">
                    {t('contact.form.agree')} <span className="text-red-500">*</span>
                  </label>
                </div>
              </div>
              {errors.agreeTerms && <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    {t('contact.form.submitting')}
                  </>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </>
                )}
              </button>
            </form>
          </motion.div>
          
          {/* Contact Info - Updated to match Pacific Garden Puri website */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-blue-900 mb-6">{t('contact.info.title')}</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fa-solid fa-map-marker-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">{t('contact.info.address')}</h4>
                  <p className="text-gray-600">Jl. Pantai Mengiat, Nusa Dua, Bali 80363, Indonesia</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fa-solid fa-phone text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">{t('contact.info.phone')}</h4>
                  <p className="text-gray-600">+62 361 8480 888</p>
                  <p className="text-gray-500 text-sm">{language === 'zh' ? '周一至周日 9:00-20:00' : language === 'id' ? 'Senin-Minggu 9:00-20:00' : 'Monday-Sunday 9:00-20:00'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 text-blue-900 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fa-solid fa-envelope text-xl"></i>
                </div>
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">{t('contact.info.email')}</h4>
                  <p className="text-gray-600">info@pacificgardenbali.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl mb-8">
              <h4 className="font-medium text-blue-900 mb-4">{t('contact.info.hours')}</h4>
              <div className="space-y-2">
                {[
                  { dayKey: 'common.weekdays', time: '9:00 - 20:00' },
                  { dayKey: 'common.weekends', time: '9:00 - 18:00' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div className="text-gray-600">{t(item.dayKey)}</div>
                    <div className="font-medium text-blue-900">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-900 mb-4">{t('contact.info.follow')}</h4>
               <div className="flex space-x-4">
                 {[
                   { icon: 'fa-whatsapp', nameKey: 'common.whatsapp', color: '#07C160' },
                   { icon: 'fa-instagram', nameKey: 'common.instagram', color: '#E1306C' },
                   { icon: 'fa-facebook', nameKey: 'common.facebook', color: '#4267B2' },
                   { icon: 'fa-youtube', nameKey: 'common.youtube', color: '#FF0000' }
                 ].map((item, index) => (
                   <a
                     key={index}
                     href="#"
                     className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all transform hover:scale-110"
                     style={{ backgroundColor: item.color }}
                     title={t(item.nameKey)}
                   >
                     <i className={`fa-brands ${item.icon}`}></i>
                   </a>
                 ))}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}