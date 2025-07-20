import React from 'react';
import { Mode } from '../types';
import { MODE_CONFIG } from '../constants';
import { useTranslation } from '../contexts';

interface ModeTabsProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const ModeTabs: React.FC<ModeTabsProps> = ({ currentMode, onModeChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex-shrink-0 z-10">
      <div className="flex space-x-2 p-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {Object.values(Mode).map((mode) => {
          const config = MODE_CONFIG[mode];
          const isActive = currentMode === mode;
          return (
            <button
              key={mode}
              onClick={() => onModeChange(mode)}
              className={`relative flex items-center space-x-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-[var(--bg-surface)] ring-[var(--primary)] touch-manipulation min-h-[44px] ${
                isActive
                  ? 'text-white'
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-base)]'
              }`}
              aria-pressed={isActive}
            >
              {isActive && (
                <span 
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] shadow-lg"
                  style={{ filter: 'drop-shadow(0 4px 6px hsla(0, 0%, 0%, 0.1))' }}
                ></span>
              )}
              <span className="relative z-10 flex items-center gap-2">
                <config.Icon className="w-5 h-5" />
                <span className="hidden sm:inline">{t(`modes.${mode}.name`)}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeTabs;