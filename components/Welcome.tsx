import React from 'react';
import { Mode } from '../types';
import { MODE_CONFIG } from '../constants';
import { LogoIcon } from './Icons';
import { useTranslation } from '../contexts';

const Welcome: React.FC<{ mode: Mode }> = ({ mode }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 text-[var(--text-muted)] overflow-y-auto mobile-container">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-4 sm:mb-6 rounded-3xl flex items-center justify-center bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] shadow-lg">
        <LogoIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" />
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 text-[var(--text-base)] tracking-tight px-4 break-words">{t('welcome.title')}</h1>
      <p className="mb-6 sm:mb-8 md:mb-12 max-w-2xl text-sm sm:text-base md:text-lg px-4 break-words">{t('welcome.subtitle')}</p>
      
      <div className="w-full max-w-5xl text-left px-4 mobile-container">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[var(--text-base)] break-words">{t('welcome.modesOverview')}</h2>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {Object.values(Mode).map(m => {
            const config = MODE_CONFIG[m];
            const isCurrent = m === mode;
            return (
              <div 
                key={m} 
                className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-1 mobile-container ${
                  isCurrent 
                  ? 'border-[var(--primary)] bg-[var(--bg-muted)] shadow-2xl shadow-black/5' 
                  : 'border-[var(--border-base)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] hover:shadow-xl hover:shadow-black/5'
                }`}
              >
                <div className="flex items-start mb-3">
                  <div className={`w-10 h-10 flex-shrink-0 mr-3 rounded-xl flex items-center justify-center ${isCurrent ? 'bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] text-white' : 'bg-[var(--bg-muted)] text-[var(--text-muted)]'}`}>
                    <config.Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg text-[var(--text-base)] mb-2 break-words force-wrap">{t(`modes.${m}.name`)}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed break-words card-text force-wrap">{t(`modes.${m}.description`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Welcome;