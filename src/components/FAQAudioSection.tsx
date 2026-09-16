import React, { useState } from 'react';
import { FAQItem, SupportedLanguage } from '../types';
import { ChevronDown, Volume2, HelpCircle, CheckCircle2 } from 'lucide-react';
import { speechService } from '../utils/speechSynthesis';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';

interface FAQAudioSectionProps {
  faqs: FAQItem[];
  language: SupportedLanguage;
  title?: string;
  subtitle?: string;
}

export const FAQAudioSection: React.FC<FAQAudioSectionProps> = ({
  faqs,
  language,
  title,
  subtitle,
}) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const handleListenFAQ = (faq: FAQItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const speechText = `Question: ${faq.question}. Answer: ${faq.answer}`;
    speechService.speak(speechText, `FAQ: ${faq.question}`, language);
  };

  return (
    <section id="faq-audio-section" className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] border border-[#B7E4C7] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Voice-Enabled Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] tracking-tight font-['Outfit']">
            {title || t.faqsHeading}
          </h2>
          <p className="text-[#1B4332]/70 text-sm mt-1 max-w-xl mx-auto">
            {subtitle || t.faqsSubheading}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#E07A5F] bg-white shadow-md'
                    : 'border-[#B7E4C7]/60 bg-white hover:border-[#1B4332]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 select-none cursor-pointer"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-[#B7E4C7]/40 text-[#1B4332] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#1B4332] leading-snug">
                      {faq.question}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Audio Listen for this individual FAQ */}
                    <button
                      type="button"
                      onClick={(e) => handleListenFAQ(faq, e)}
                      className="p-2 rounded-xl bg-[#F8F9FA] hover:bg-[#B7E4C7]/30 text-[#1B4332] border border-[#B7E4C7]/50 transition text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      title={`Listen in ${currentLangObj?.nativeName || 'selected language'}`}
                    >
                      <Volume2 className="w-4 h-4 text-[#E07A5F]" />
                      <span className="hidden sm:inline text-xs">{currentLangObj?.flag} Audio</span>
                    </button>

                    <div
                      className={`p-1 rounded-lg text-[#1B4332]/60 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1B4332]' : ''
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#1B4332]/80 border-t border-[#B7E4C7]/30 bg-[#F8F9FA]/70">
                    <div className="flex items-start gap-2 pt-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0 mt-0.5" />
                      <div className="leading-relaxed font-normal">{faq.answer}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
