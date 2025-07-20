import React, { createContext, useContext, useState, useEffect } from 'react';

interface TutorialContextType {
  isFirstTime: boolean;
  isTutorialOpen: boolean;
  openTutorial: () => void;
  closeTutorial: () => void;
  markTutorialComplete: () => void;
}

const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context) {
    throw new Error('useTutorial must be used within a TutorialProvider');
  }
  return context;
};

interface TutorialProviderProps {
  children: React.ReactNode;
}

export const TutorialProvider: React.FC<TutorialProviderProps> = ({ children }) => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  useEffect(() => {
    // ローカルストレージからチュートリアル完了状態を確認
    const tutorialCompleted = localStorage.getItem('tutorialCompleted');
    if (tutorialCompleted === 'true') {
      setIsFirstTime(false);
    } else {
      // 初回ユーザーの場合は自動的にチュートリアルを開く
      setIsTutorialOpen(true);
    }
  }, []);

  const openTutorial = () => {
    setIsTutorialOpen(true);
  };

  const closeTutorial = () => {
    setIsTutorialOpen(false);
  };

  const markTutorialComplete = () => {
    localStorage.setItem('tutorialCompleted', 'true');
    setIsFirstTime(false);
    setIsTutorialOpen(false);
  };

  const value: TutorialContextType = {
    isFirstTime,
    isTutorialOpen,
    openTutorial,
    closeTutorial,
    markTutorialComplete,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
}; 