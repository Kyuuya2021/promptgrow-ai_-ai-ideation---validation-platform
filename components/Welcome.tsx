import React from 'react';
import { Mode } from '../types';
import { MODE_CONFIG } from '../constants';
import { LogoIcon } from './Icons';
import { useTranslation } from '../contexts';

const Welcome: React.FC<{ mode: Mode }> = ({ mode }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-8 text-[var(--text-muted)]">
      <div className="w-24 h-24 sm:w-28 sm:h-28 mb-6 rounded-3xl flex items-center justify-center bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] shadow-lg">
        <LogoIcon className="w-12 h-12 sm:w-14 sm:h-14 text-white" />
      </div>
      <h1 className="text-3xl sm:text-5xl font-bold mb-3 text-[var(--text-base)] tracking-tight">{t('welcome.title')}</h1>
      <p className="mb-8 md:mb-12 max-w-2xl text-base sm:text-lg">{t('welcome.subtitle')}</p>
      
      <div className="w-full max-w-5xl text-left">
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-base)] px-2">{t('welcome.modesOverview')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(Mode).map(m => {
            const config = MODE_CONFIG[m];
            const isCurrent = m === mode;
            return (
              <div 
                key={m} 
                className={`p-5 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                  isCurrent 
                  ? 'border-[var(--primary)] bg-[var(--bg-muted)] shadow-2xl shadow-black/5' 
                  : 'border-[var(--border-base)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] hover:shadow-xl hover:shadow-black/5'
                }`}
              >
                <div className="flex items-center mb-3">
                  <div className={`w-10 h-10 flex-shrink-0 mr-4 rounded-xl flex items-center justify-center ${isCurrent ? 'bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
                    <config.Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--text-base)]">{t(`modes.${m}.name`)}</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t(`modes.${m}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Welcome;