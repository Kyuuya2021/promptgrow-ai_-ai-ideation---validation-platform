import React, { createContext, useState, useContext, useEffect } from 'react';
import { Language } from './types';
import { dictionary } from './config/i18n';

type LanguageContextType = {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const getInitialLanguage = (): Language => {
    const savedLang = localStorage.getItem('promptGrow-language');
    if (savedLang === 'en' || savedLang === 'ja') {
        return savedLang;
    }
    const browserLang = navigator.language.split(/[-_]/)[0];
    return browserLang === 'ja' ? 'ja' : 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('promptGrow-language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    
    const { language, setLanguage } = context;

    const t = (key: string): any => {
        const getNested = (obj: any, path: string): any => 
            path.split('.').reduce((acc, part) => acc && acc[part], obj);

        const text = getNested(dictionary[language], key);
        return text ?? getNested(dictionary.en, key) ?? key;
    };

    return { t, language, setLanguage };
};