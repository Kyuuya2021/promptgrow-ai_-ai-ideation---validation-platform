import React, { useEffect, useRef } from 'react';
import { Mode, Message as MessageType } from '../types';
import Message from './Message';
import ChatInput from './ChatInput';
import Welcome from './Welcome';
import Suggestions from './Suggestions';

interface ChatPanelProps {
  mode: Mode;
  messages: MessageType[];
  isLoading: boolean;
  isImproving: boolean;
  input: string;
  setInput: (input: string) => void;
  onSend: () => void;
  onImprove: () => void;
  suggestions: string[];
  isGeneratingSuggestions: boolean;
  onSendSuggestion: (suggestion: string) => void;
  imagePreview: string | null;
  onFileChange: (file: File | null) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  mode,
  messages,
  isLoading,
  isImproving,
  input,
  setInput,
  onSend,
  onImprove,
  suggestions,
  isGeneratingSuggestions,
  onSendSuggestion,
  imagePreview,
  onFileChange,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const showWelcome = messages.length === 0 && !isLoading;

  return (
    <div className="flex-1 flex flex-col bg-[var(--bg-surface)] overflow-hidden relative">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 sm:space-y-6" style={{ scrollbarColor: "var(--scrollbar-thumb) var(--scrollbar-track)", scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {showWelcome ? (
          <Welcome mode={mode} />
        ) : (
          messages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))
        )}
        {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'model' && !messages[messages.length - 1].text && (
          <Message key="loading" message={{ id: 'loading', role: 'model', text: '' }} />
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex-grow-0 flex-shrink-0 p-3 pt-2 bg-gradient-to-t from-[var(--bg-surface)] to-transparent">
        <div className="max-w-4xl mx-auto">
          <Suggestions
              suggestions={suggestions}
              isLoading={isGeneratingSuggestions}
              onSuggestionClick={onSendSuggestion}
          />
          <ChatInput
            mode={mode}
            input={input}
            setInput={setInput}
            onSend={onSend}
            onImprove={onImprove}
            isLoading={isLoading}
            isImproving={isImproving}
            imagePreview={imagePreview}
            onFileChange={onFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;