import React from 'react';
import { Message as MessageType } from '../types';
import { UserIcon, BotIcon, LinkIcon } from './Icons';

interface MessageProps {
  message: MessageType;
}

const LoadingDots: React.FC = () => (
  <div className="flex items-center space-x-1.5">
    <div className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-current rounded-full animate-pulse [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
  </div>
);

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isLoading = message.id === 'loading' || (message.role === 'model' && !message.text);

  return (
    <div className={`flex items-start gap-3 sm:gap-4 ${isUser ? 'flex-row-reverse' : ''} animate-subtle-fade-in`}>
      <div
        className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shadow-sm ${
          isUser ? 'bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]' : 'bg-[var(--accent)]'
        }`}
      >
        {isUser ? <UserIcon className="w-4 h-4 sm:w-6 sm:h-6" /> : <BotIcon className="w-4 h-4 sm:w-6 sm:h-6" />}
      </div>
      <div className={`flex flex-col w-full max-w-[85%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 sm:px-5 sm:py-3 rounded-2xl shadow-md ${
            isUser 
              ? 'bg-gradient-to-br from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] text-white rounded-br-none' 
              : 'bg-[var(--bg-muted)] text-[var(--text-base)] rounded-bl-none'
          }`}
        >
          {message.image && (
            <img 
              src={message.image} 
              alt="User upload" 
              className="max-w-full h-auto rounded-lg mb-2 border border-[var(--border-base)]" 
            />
          )}
          {isLoading ? (
            <LoadingDots />
          ) : (
            message.text && <div className="prose prose-sm prose-p:text-current prose-li:text-current prose-headings:text-current prose-strong:text-current max-w-none whitespace-pre-wrap">{message.text}</div>
          )}
        </div>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 w-full">
            <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-2">Sources:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {message.sources.map((source, index) => (
                <a
                  key={index}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[var(--bg-muted)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-base)] p-2 rounded-lg text-xs transition-colors border border-[var(--border-base)]"
                >
                  <LinkIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{source.title || source.uri}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;