import React from 'react';
import { PageId, SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { Award, Globe, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  language,
  setLanguage,
}) => {
  return (
    <footer className="bg-[#143326] text-[#F8F9FA] border-t border-[#B7E4C7]/30 pt-16 pb-24 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#B7E4C7]/20">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1B4332] border border-[#B7E4C7]/40 flex items-center justify-center font-black text-[#B7E4C7] shadow-md relative">
                L
                <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#E07A5F]" />
              </div>
              <div>
                <span className="text-xl font-black font-['Outfit'] tracking-tight text-[#F8F9FA] block">
                  LEARNOVA SERVICES
                </span>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#B7E4C7] block -mt-1">
                  Learn & Innovate Mindsets & Ideas
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-[#F8F9FA]/75 leading-relaxed max-w-sm">
              We are corporate HR professionals with over a decade of experience in Learning & Development, Leadership Development, Competency & Skill Development, and Organizational Development.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332] border border-[#B7E4C7]/30 text-[11px] font-medium text-[#B7E4C7]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>AoN & Cambridge Accredited</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B4332] border border-[#B7E4C7]/30 text-[11px] font-medium text-[#B7E4C7]">
                <Award className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>3X ROI Accelerated Model</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7] block mb-4">
              Experiential Tracks
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('manufacturing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#F8F9FA]/80 hover:text-[#E07A5F] transition cursor-pointer"
                >
                  Server Motherboard Assembly
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('automobile');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#F8F9FA]/80 hover:text-[#E07A5F] transition cursor-pointer"
                >
                  Automotive Powertrain Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('general');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#F8F9FA]/80 hover:text-[#E07A5F] transition cursor-pointer"
                >
                  General Developmental Programs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('mandatory');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#F8F9FA]/80 hover:text-[#E07A5F] transition cursor-pointer"
                >
                  Mandatory & Compliance Training
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentPage('leadership-quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[#F8F9FA]/80 hover:text-[#E07A5F] transition cursor-pointer"
                >
                  105-Q Leadership Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Accreditations */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7] block mb-4">
              Certified Bodies
            </span>
            <ul className="space-y-2 text-xs text-[#F8F9FA]/75">
              <li>● AoN - Learning & Development</li>
              <li>● British Council - Train the Trainer</li>
              <li>● Univ. of Cambridge - TKT</li>
              <li>● Life Coach - Middle Earth HR</li>
              <li>● TESOL - Teachers Board Canada</li>
            </ul>
          </div>

          {/* Languages Supported */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7] block mb-4 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>9 Global Languages</span>
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLanguage(l.code);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-2 py-1 rounded-lg text-left transition text-[11px] cursor-pointer ${
                    language === l.code
                      ? 'bg-[#E07A5F] text-white font-bold'
                      : 'hover:bg-[#1B4332] text-[#F8F9FA]/70 hover:text-[#F8F9FA]'
                  }`}
                >
                  {l.flag} {l.nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B7E4C7]/60 gap-4">
          <p>© {new Date().getFullYear()} Learnova Services - Learn & Innovate Mindsets & Ideas. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[#F8F9FA]/60">
            <span>Corporate Experiential Excellence</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
