
import React, { useCallback, useEffect } from 'react';
import { ChatHistory, ColorMode, Theme } from '../types';
import { PlusIcon, SunIcon, MoonIcon, LogoIcon, GlobeIcon, CheckIcon, XIcon } from './Icons';
import { useTranslation } from '../contexts';
import { colorPalettes } from '../config/themes';
import Portfolio from './Portfolio';

interface HistoryPanelProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  histories: ChatHistory[];
  currentChatIndex: number;
  onSelectChat: (index: number) => void;
  onNewChat: () => void;
  colorMode: ColorMode;
  toggleColorMode: () => void;
  activeThemeId: Theme;
  setActiveThemeId: (id: Theme) => void;
  sidebarWidth: number;
  setSidebarWidth: (width: number) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  histories,
  currentChatIndex,
  onSelectChat,
  onNewChat,
  colorMode,
  toggleColorMode,
  activeThemeId,
  setActiveThemeId,
  sidebarWidth,
  setSidebarWidth,
}) => {
  const { t, language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'ja' : 'en');
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(260, Math.min(e.clientX, 500));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [setSidebarWidth]);

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 bg-[var(--bg-base)] transition-transform duration-300 ease-in-out md:relative md:flex-shrink-0 md:border-r md:border-[var(--border-base)] ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
      style={{
        width: `${sidebarWidth}px`,
      }}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 pb-4 border-b border-[var(--border-base)] flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">
              <LogoIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-[var(--text-base)] tracking-tight">{t('historyPanel.title')}</h1>
          </div>
          <div className='flex items-center'>
            <button 
              onClick={onNewChat} 
              className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-base)] transition-colors"
              aria-label={t('historyPanel.newChat')}
              title={t('historyPanel.newChat')}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-base)] transition-colors"
                aria-label={t('historyPanel.closeSidebar')}
                title={t('historyPanel.closeSidebar')}
            >
                <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4" style={{ scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)" }}>
          <nav className="flex flex-col space-y-1 py-4">
            {histories.map((chat, index) => {
              const firstUserMessage = chat.find(m => m.role === 'user');
              const title = firstUserMessage ? firstUserMessage.text || t('chatInput.imageMessage') : t('historyPanel.newChat');
              const isActive = index === currentChatIndex;
              return (
                <button
                  key={index}
                  onClick={() => onSelectChat(index)}
                  className={`relative w-full text-left px-3 py-2 text-sm font-medium rounded-lg truncate transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-base)]'
                  }`}
                  aria-current={isActive}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]"></span>
                  )}
                  <span className="relative z-10">{title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <Portfolio />

        <div className="p-4 pt-4 border-t border-[var(--border-base)] space-y-4 flex-shrink-0">
          <div>
            <div className="text-xs font-semibold text-[var(--text-muted)] mb-2 px-1">{t('settings.theme')}</div>
            <div className="flex items-center gap-3">
              {colorPalettes.map(palette => (
                <button
                  key={palette.id}
                  onClick={() => setActiveThemeId(palette.id)}
                  className="w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all"
                  style={{
                    background: `linear-gradient(to right, ${palette.colors.light['--primary-gradient-start']}, ${palette.colors.light['--primary-gradient-end']})`,
                    borderColor: activeThemeId === palette.id ? palette.colors.dark['--primary'] : 'transparent'
                  }}
                  title={palette.name}
                  aria-label={`${t('settings.setTheme')} ${palette.name}`}
                >
                  {activeThemeId === palette.id && <CheckIcon className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center bg-[var(--bg-muted)] rounded-lg p-1">
            <button
              onClick={toggleLanguage}
              className="p-2 w-1/2 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-base)] flex items-center justify-center gap-2 text-sm transition-colors"
              aria-label={t('settings.switchLanguage')}
              title={t('settings.switchLanguage')}
            >
              <GlobeIcon className="w-5 h-5" />
              <span>{language.toUpperCase()}</span>
            </button>
            <button
              onClick={toggleColorMode}
              className="p-2 w-1/2 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-base)] flex items-center justify-center gap-2 text-sm transition-colors"
              aria-label={t(`settings.switchTo${colorMode === 'light' ? 'Dark' : 'Light'}`)}
              title={t(`settings.switchTo${colorMode === 'light' ? 'Dark' : 'Light'}`)}
            >
              {colorMode === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      <div 
        onMouseDown={handleMouseDown}
        className="absolute top-0 right-0 h-full w-2 cursor-col-resize hidden md:block group"
      >
        <div className="h-full w-px bg-transparent group-hover:bg-[var(--border-hover)] transition-colors duration-200"></div>
      </div>
    </aside>
  );
};

export default HistoryPanel;
