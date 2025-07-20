import React, { useState } from 'react';
import { useTranslation } from '../contexts';
import {
  UserIcon, MapPinIcon, GraduationCapIcon, ChevronDownIcon,
  FacebookIcon, NotionIcon, NoteIcon, RocketIcon, GoogleIcon,
  CheckCircleIcon
} from './Icons';

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const portfolioLinks = [
    { id: 'facebook', icon: FacebookIcon, href: 'https://www.facebook.com/profile.php?id=100093034111137&ref=_ig_profile_ac' },
    { id: 'notion', icon: NotionIcon, href: 'https://ringed-green-83c.notion.site/1c2e84e0549580878c0bf1619c8debe1' },
    { id: 'note', icon: NoteIcon, href: 'https://note.com/yuku_1230' },
    { id: 'studyBooster', icon: RocketIcon, href: 'https://study-booster.glide.page/' },
  ];

  const searchabilityItems: string[] = t('portfolio.searchabilityItems');
  const trustItems: string[] = t('portfolio.trustItems');
  const notePreviewItems: {title: string, meta: string}[] = t('portfolio.notePreviewItems');

  return (
    <div className="px-4 py-2 border-t border-[var(--border-base)] flex-shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 text-sm font-semibold text-[var(--text-base)] hover:text-[var(--primary)] transition-colors"
        aria-expanded={isOpen}
      >
        <span>{t('portfolio.title')}</span>
        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="pt-2 pb-4 space-y-6">
          
          {/* Creator Info */}
          <div className="space-y-2 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
              <span>{t('portfolio.name')}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
              <span>{t('portfolio.location')}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCapIcon className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
              <span>{t('portfolio.specialty')}</span>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-4 gap-2">
            {portfolioLinks.map(({ id, icon: Icon, href }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={t(`portfolio.links.${id}`)}
                className="flex items-center justify-center p-2 bg-[var(--bg-muted)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--primary)] rounded-lg transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          {/* Searchability */}
          <div className="p-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)]">
            <div className="flex items-center gap-2 mb-2">
              <GoogleIcon className="w-4 h-4 text-blue-500" />
              <h4 className="text-xs font-semibold text-[var(--text-muted)]">{t('portfolio.searchabilityTitle')}</h4>
            </div>
            <ul className="space-y-1 text-xs text-[var(--text-base)] list-disc list-inside">
                {Array.isArray(searchabilityItems) && searchabilityItems.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
             <a href="https://www.google.com/search?q=%E5%B7%9D%E6%9F%93%E6%9C%89%E5%93%89" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--primary)] hover:underline mt-2 block">
                {t('portfolio.searchabilityAction')}
            </a>
          </div>

          {/* Note Preview */}
          <div>
            <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-2">{t('portfolio.notePreviewTitle')}</h4>
            <div className="space-y-2">
              {Array.isArray(notePreviewItems) && notePreviewItems.slice(0, 2).map((item, index) => (
                <div key={index} className="p-2 rounded-lg bg-[var(--bg-muted)]">
                  <p className="text-xs font-semibold text-[var(--text-base)] truncate">{item.title}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.meta}</p>
                </div>
              ))}
            </div>
             <a href="https://note.com/yuku_1230" target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--primary)] hover:underline mt-2 block">
                {t('portfolio.notePreviewAction')}
            </a>
          </div>

          {/* Trust Indicators */}
           <div>
            <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-2">{t('portfolio.trustTitle')}</h4>
            <ul className="space-y-1.5">
                {Array.isArray(trustItems) && trustItems.map((item, index) => (
                     <li key={index} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Portfolio;