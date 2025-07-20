
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Mode, ChatHistory, ColorMode, Theme, Language, Message } from './types';
import ModeTabs from './components/ModeTabs';
import ChatPanel from './components/ChatPanel';
import HistoryPanel from './components/HistoryPanel';
import { improvePrompt, streamChat, generateSuggestions } from './services/geminiService';
import { colorPalettes } from './config/themes';
import { LanguageProvider, useTranslation } from './contexts';
import { MenuIcon } from './components/Icons';

const initialHistories = Object.values(Mode).reduce((acc, mode) => {
  acc[mode] = [[]];
  return acc;
}, {} as Record<Mode, ChatHistory[]>);

const initialChatIndices = Object.values(Mode).reduce((acc, mode) => {
  acc[mode] = 0;
  return acc;
}, {} as Record<Mode, number>);

const getInitialState = <T,>(key: string, fallback: T): T => {
  try {
    const item = window.localStorage.getItem(key);
    if (item) {
        if (key === 'promptGrow-histories') {
            const parsed = JSON.parse(item);
            if (typeof parsed === 'object' && !Array.isArray(parsed) && parsed !== null) {
                const allModesExist = Object.values(Mode).every(m => m in parsed);
                if (allModesExist) return parsed;
            }
        } else {
           return JSON.parse(item);
        }
    }
    return fallback;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return fallback;
  }
};

const getInitialColorMode = (): ColorMode => {
  const savedTheme = localStorage.getItem('promptGrow-colorMode');
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
};

const getInitialThemeId = (): Theme => {
    const savedThemeId = localStorage.getItem('promptGrow-themeId');
    return savedThemeId || colorPalettes[0].id;
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const AppContent: React.FC = () => {
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialColorMode);
  const [activeThemeId, setActiveThemeId] = useState<Theme>(getInitialThemeId);
  const { t, language } = useTranslation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => getInitialState('promptGrow-sidebarWidth', 288));

  const toggleSidebar = useCallback(() => setIsSidebarOpen(prev => !prev), []);

  const [mode, setMode] = useState<Mode>(Mode.Normal);
  const [histories, setHistories] = useState<Record<Mode, ChatHistory[]>>(() => getInitialState('promptGrow-histories', initialHistories));
  const [currentChatIndices, setCurrentChatIndices] = useState<Record<Mode, number>>(() => getInitialState('promptGrow-chatIndices', initialChatIndices));
  
  const [input, setInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(colorMode);
    localStorage.setItem('promptGrow-colorMode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    localStorage.setItem('promptGrow-themeId', activeThemeId);
    
    const activeTheme = colorPalettes.find(p => p.id === activeThemeId) || colorPalettes[0];
    const themeColors = activeTheme.colors[colorMode];
    
    let css = ':root {\n';
    for(const [key, value] of Object.entries(themeColors)) {
        css += `  ${key}: ${value};\n`;
    }
    css += '}';
    
    let styleTag = document.getElementById('app-theme');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'app-theme';
        document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = css;

  }, [activeThemeId, colorMode]);

  useEffect(() => {
    try {
      localStorage.setItem('promptGrow-histories', JSON.stringify(histories));
    } catch (error) {
      console.error('Error saving histories to localStorage:', error);
    }
  }, [histories]);

  useEffect(() => {
    try {
      localStorage.setItem('promptGrow-chatIndices', JSON.stringify(currentChatIndices));
    } catch (error) {
      console.error('Error saving chat indices to localStorage:', error);
    }
  }, [currentChatIndices]);

  useEffect(() => {
    try {
      localStorage.setItem('promptGrow-sidebarWidth', JSON.stringify(sidebarWidth));
    } catch (error) {
      console.error('Error saving sidebar width to localStorage:', error);
    }
  }, [sidebarWidth]);

  const currentChatIndex = useMemo(() => currentChatIndices[mode] ?? 0, [currentChatIndices, mode]);
  const currentHistory = useMemo(() => histories[mode]?.[currentChatIndex] || [], [histories, mode, currentChatIndex]);
  
  const handleModeChange = useCallback((newMode: Mode) => {
    setMode(newMode);
    setSuggestions([]);
  }, []);
  
  const toggleColorMode = useCallback(() => {
    setColorMode(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const handleSelectChat = useCallback((index: number) => {
    setCurrentChatIndices(prev => ({ ...prev, [mode]: index }));
    setSuggestions([]);
  }, [mode]);

  const handleNewChat = useCallback(() => {
    const newChatIndex = (histories[mode] || []).length;
    setHistories(prev => {
        const currentModeHistories = prev[mode] || [];
        const newHistoriesForMode = [...currentModeHistories, []];
        return { ...prev, [mode]: newHistoriesForMode };
    });
    setCurrentChatIndices(prev => ({ ...prev, [mode]: newChatIndex }));
    setSuggestions([]);
  }, [mode, histories]);
  
  const handleSendMessage = useCallback(async (messageText: string, image: File | null) => {
    if (!messageText.trim() && !image) return;

    setIsLoading(true);
    setSuggestions([]);
    setIsGeneratingSuggestions(false);
    
    let userMessage: Message = { id: `user-${Date.now()}`, role: 'user' as const, text: messageText };

    if (image) {
      const imageDataUrl = await fileToBase64(image);
      userMessage = { ...userMessage, image: imageDataUrl, mimeType: image.type };
    }

    const newHistoryWithUser = [...currentHistory, userMessage];
    const modelMessagePlaceholder = { id: `model-${Date.now()}`, role: 'model' as const, text: '' };
    const newHistoryWithPlaceholder = [...newHistoryWithUser, modelMessagePlaceholder];

    setHistories(prev => {
      const newHistoriesForMode = [...(prev[mode] || [])];
      newHistoriesForMode[currentChatIndex] = newHistoryWithPlaceholder;
      return { ...prev, [mode]: newHistoriesForMode };
    });
    
    await streamChat(
      mode,
      newHistoryWithUser,
      (chunkText) => {
        setHistories(prev => {
          const newHistoriesForMode = [...(prev[mode] || [])];
          const chatToUpdate = [...(newHistoriesForMode[currentChatIndex] || [])];
          if(chatToUpdate.length > 0) {
            const lastMessage = { ...chatToUpdate[chatToUpdate.length - 1], text: chunkText };
            chatToUpdate[chatToUpdate.length - 1] = lastMessage;
            newHistoriesForMode[currentChatIndex] = chatToUpdate;
            return { ...prev, [mode]: newHistoriesForMode };
          }
          return prev;
        });
      },
      (sources) => {
         setHistories(prev => {
          const newHistoriesForMode = [...(prev[mode] || [])];
          const chatToUpdate = [...(newHistoriesForMode[currentChatIndex] || [])];
           if(chatToUpdate.length > 0) {
            const lastMessage = { ...chatToUpdate[chatToUpdate.length - 1], sources: sources };
            chatToUpdate[chatToUpdate.length - 1] = lastMessage;
            newHistoriesForMode[currentChatIndex] = chatToUpdate;
            return { ...prev, [mode]: newHistoriesForMode };
          }
          return prev;
        });
      },
      (finalText, finalSources) => {
        setIsLoading(false);
        const finalModelMessage: Message = { 
          ...modelMessagePlaceholder, 
          text: finalText, 
          sources: finalSources 
        };
        const historyForSuggestions = [...newHistoryWithUser, finalModelMessage];

        setIsGeneratingSuggestions(true);
        generateSuggestions(historyForSuggestions, mode, language)
          .then(setSuggestions)
          .catch(console.error)
          .finally(() => setIsGeneratingSuggestions(false));
      }
    );
  }, [isLoading, currentHistory, mode, currentChatIndex, histories, language]);

  const onSendFromInput = useCallback(() => {
    if (input.trim() || imageFile) {
      handleSendMessage(input, imageFile);
      setInput('');
      setImageFile(null);
      setImagePreview(null);
    }
  }, [input, imageFile, handleSendMessage]);

  const handleImprovePrompt = useCallback(async () => {
    if (!input.trim() || isImproving) return;
    setIsImproving(true);
    try {
      const improved = await improvePrompt(input, mode, language);
      setInput(improved);
    } catch (error) {
      console.error(error);
      alert((error as Error).message);
    } finally {
      setIsImproving(false);
    }
  }, [input, isImproving, mode, language]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
    if (value && suggestions.length > 0) {
      setSuggestions([]);
    }
  }, [suggestions]);

  const handleFileChange = useCallback(async (file: File | null) => {
    setImageFile(file);
    if (file) {
      const dataUrl = await fileToBase64(file);
      setImagePreview(dataUrl);
    } else {
      setImagePreview(null);
    }
  }, []);

  return (
    <div className="relative h-screen w-screen flex overflow-hidden">
      {isSidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/60 z-20 md:hidden" />}
      <HistoryPanel
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        histories={histories[mode] || []}
        currentChatIndex={currentChatIndex}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        activeThemeId={activeThemeId}
        setActiveThemeId={setActiveThemeId}
        sidebarWidth={sidebarWidth}
        setSidebarWidth={setSidebarWidth}
      />
      <main className="flex-1 flex flex-col h-full bg-[var(--bg-surface)] transition-all duration-300">
        <div className="flex-shrink-0 flex items-center bg-[var(--bg-surface-translucent)] backdrop-blur-lg border-b border-[var(--border-base)] z-10 min-h-[44px]">
          <button
            onClick={toggleSidebar}
            className="p-3 text-[var(--text-muted)] hover:text-[var(--text-base)] transition-colors md:hidden touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={t('historyPanel.openSidebar')}
            title={t('historyPanel.openSidebar')}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 min-w-0">
            <ModeTabs currentMode={mode} onModeChange={handleModeChange} />
          </div>
        </div>
        <ChatPanel
          mode={mode}
          messages={currentHistory}
          isLoading={isLoading}
          isImproving={isImproving}
          input={input}
          setInput={handleInputChange}
          onSend={onSendFromInput}
          onImprove={handleImprovePrompt}
          suggestions={suggestions}
          isGeneratingSuggestions={isGeneratingSuggestions}
          onSendSuggestion={(suggestion) => handleSendMessage(suggestion, null)}
          imagePreview={imagePreview}
          onFileChange={handleFileChange}
        />
      </main>
    </div>
  );
};

export default function App() {
    return (
        <LanguageProvider>
            <AppContent />
        </LanguageProvider>
    );
}
