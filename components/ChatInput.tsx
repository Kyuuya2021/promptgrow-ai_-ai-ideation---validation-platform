import React, { useRef, useEffect } from 'react';
import { Mode } from '../types';
import { SendIcon, SparkleIcon, PaperclipIcon, XIcon } from './Icons';
import { useTranslation } from '../contexts';

interface ChatInputProps {
  mode: Mode;
  input: string;
  setInput: (input: string) => void;
  onSend: () => void;
  onImprove: () => void;
  isLoading: boolean;
  isImproving: boolean;
  imagePreview: string | null;
  onFileChange: (file: File | null) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  mode,
  input,
  setInput,
  onSend,
  onImprove,
  isLoading,
  isImproving,
  imagePreview,
  onFileChange,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, 200)}px`;
    }
  }, [input]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
    // Reset file input to allow selecting the same file again
    e.target.value = '';
  };

  const handleRemoveImage = () => {
    onFileChange(null);
  };

  const canSend = !isLoading && !isImproving && (!!input.trim() || !!imagePreview);

  return (
    <div className="relative bg-[var(--bg-surface-translucent)] backdrop-blur-xl border border-[var(--border-base)] rounded-xl sm:rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/20">
      {imagePreview && (
        <div className="p-2 pl-3 sm:pl-4">
          <div className="relative inline-block">
            <img src={imagePreview} alt="Image preview" className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-lg" />
            <button
              onClick={handleRemoveImage}
              className="absolute -top-1 -right-1 bg-gray-700 text-white rounded-full p-0.5 hover:bg-gray-800 transition-colors touch-manipulation"
              aria-label={t('chatInput.removeImage')}
            >
              <XIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
      <div className="flex items-start">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t(`modes.${mode}.placeholder`)}
          rows={1}
          className="w-full bg-transparent text-[var(--text-base)] placeholder:text-[var(--text-muted)] rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 sm:pl-14 pr-20 sm:pr-28 resize-none focus:ring-0 focus:outline-none transition-all text-sm sm:text-base"
          style={{ maxHeight: '200px' }}
          disabled={isLoading || isImproving}
          aria-label={t('chatInput.ariaLabel')}
        />
      </div>
      <div className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 flex items-center">
         <button
          onClick={handleFileButtonClick}
          disabled={isLoading || isImproving}
          className="p-2 sm:p-2.5 rounded-full text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--bg-hover)] disabled:text-[var(--text-disabled)] disabled:bg-transparent disabled:cursor-not-allowed transition-all touch-manipulation"
          title={t('chatInput.attachImage')}
          aria-label={t('chatInput.attachImage')}
        >
          <PaperclipIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileSelected} accept="image/png, image/jpeg, image/webp" className="hidden" />
      </div>
      <div className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={onImprove}
          disabled={isLoading || isImproving || !input}
          className="p-2 sm:p-2.5 rounded-full text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--bg-hover)] disabled:text-[var(--text-disabled)] disabled:bg-transparent disabled:cursor-not-allowed transition-all touch-manipulation"
          title={t('chatInput.improvePrompt')}
          aria-label={t('chatInput.improvePrompt')}
        >
          {isImproving ? (
            <SparkleIcon className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            <SparkleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
        <button
          onClick={onSend}
          disabled={!canSend}
          className="p-2 sm:p-2.5 rounded-full bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 touch-manipulation"
          title={t('chatInput.sendMessage')}
          aria-label={t('chatInput.sendMessage')}
        >
          <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;