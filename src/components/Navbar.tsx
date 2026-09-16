import React, { useState } from 'react';
import { PageId, SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { Volume2, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { speechService } from '../utils/speechSynthesis';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  onTriggerPageAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  language,
  setLanguage,
  onTriggerPageAudio,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  const navLinks: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: t.navHome },
    { id: 'about', label: t.navAbout },
    { id: 'manufacturing', label: t.navManufacturing },
    { id: 'automobile', label: t.navAutomobile },
    { id: 'general', label: t.navGeneral },
    { id: 'mandatory', label: t.navMandatory },
    { id: 'leadership-quiz', label: t.navQuiz, badge: '105 Qs' },
  ];

  const handleNavClick = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F9FA]/95 backdrop-blur-md border-b border-[#B7E4C7]/50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div
            id="brand-logo-container"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#1B4332] to-[#255d46] flex items-center justify-center text-[#B7E4C7] shadow-md shadow-[#1B4332]/20 group-hover:scale-105 transition-transform duration-200 border border-[#B7E4C7]/40 relative overflow-hidden">
              <span className="font-extrabold text-xl font-['Outfit'] tracking-tight">L</span>
              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#E07A5F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-['Outfit'] text-[#1B4332] tracking-tight">
                  Learnova Services
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-[#B7E4C7]/40 text-[#1B4332] rounded-full border border-[#B7E4C7]">
                  L&D Consultancy
                </span>
              </div>
              <p className="text-xs font-medium text-[#1B4332]/70 line-clamp-1">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#1B4332] bg-[#B7E4C7]/40 font-bold shadow-2xs'
                      : 'text-[#1B4332]/75 hover:text-[#1B4332] hover:bg-[#B7E4C7]/20'
                  }`}
                >
                  {link.label}
                  {link.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-md bg-[#E07A5F] text-white shadow-2xs">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E07A5F] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools: Language Selector + Audio Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                id="language-dropdown-toggle"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-[#B7E4C7] bg-white text-[#1B4332] hover:bg-[#B7E4C7]/20 transition shadow-2xs"
                title="Select Platform Language"
              >
                <span className="text-base">{currentLangObj?.flag}</span>
                <span className="hidden sm:inline font-medium">{currentLangObj?.nativeName}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#1B4332]/60" />
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-[#B7E4C7] py-2 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#1B4332]/70 uppercase tracking-wider border-b border-[#B7E4C7]/30 flex items-center justify-between">
                      <span>{t.selectLanguage}</span>
                      <Globe className="w-3.5 h-3.5 text-[#E07A5F]" />
                    </div>
                    <div className="max-h-80 overflow-y-auto py-1">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = lang.code === language;
                        return (
                          <button
                            key={lang.code}
                            id={`lang-select-${lang.code}`}
                            onClick={() => {
                              setLanguage(lang.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between transition-colors ${
                              isSelected
                                ? 'bg-[#B7E4C7]/30 text-[#1B4332] font-bold'
                                : 'text-[#1B4332]/80 hover:bg-[#F8F9FA]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">{lang.flag}</span>
                              <div>
                                <div className="leading-snug">{lang.nativeName}</div>
                                <div className="text-xs text-[#1B4332]/50">{lang.name}</div>
                              </div>
                            </div>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-[#E07A5F]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Listen Audio Narration Button */}
            <button
              id="header-listen-audio-btn"
              onClick={onTriggerPageAudio}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white font-bold shadow-xs transition hover:scale-102 active:scale-98 cursor-pointer"
              title={`Listen to this page in ${currentLangObj?.name}`}
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden md:inline">{t.listenAudio}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#1B4332] hover:bg-[#B7E4C7]/30"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#B7E4C7] px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-[#B7E4C7]/30 text-[#1B4332] font-bold'
                    : 'text-[#1B4332]/80 hover:bg-[#F8F9FA]'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#E07A5F] text-white">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
