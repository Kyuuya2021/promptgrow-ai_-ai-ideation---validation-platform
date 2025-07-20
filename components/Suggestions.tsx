import React from 'react';
import { useTranslation } from '../contexts';

interface SuggestionsProps {
  suggestions: string[];
  isLoading: boolean;
  onSuggestionClick: (suggestion: string) => void;
}

const LoadingBubble: React.FC = () => (
    <div className="flex items-center space-x-1">
        <div className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full animate-pulse"></div>
    </div>
);


const Suggestions: React.FC<SuggestionsProps> = ({ suggestions, isLoading, onSuggestionClick }) => {
  const { t } = useTranslation();
  const hasContent = isLoading || suggestions.length > 0;
  
  if (!hasContent) {
    return null;
  }
  
  return (
    <div className="mb-3 max-w-full">
        <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-2 px-2">{t('suggestions.title')}</h4>
        <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <div className="bg-[var(--bg-muted)] text-[var(--text-muted)] text-sm px-4 py-2 rounded-full">
            <LoadingBubble />
          </div>
        ) : (
          suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="bg-[var(--bg-muted)] text-[var(--text-muted)] text-sm px-4 py-2 rounded-full hover:bg-[var(--bg-hover)] hover:text-[var(--text-base)] transition-colors text-left transform active:scale-95"
            >
              {suggestion}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Suggestions;