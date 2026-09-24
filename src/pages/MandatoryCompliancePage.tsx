import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { MANDATORY_COMPLIANCE_DATA } from '../data/programData';
import { FAQAudioSection } from '../components/FAQAudioSection';
import { LearnerConfirmationModal } from '../components/LearnerConfirmationModal';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { speechService } from '../utils/speechSynthesis';
import {
  ShieldCheck,
  HardHat,
  ShoppingBag,
  Scale,
  Lock,
  Award,
  Volume2,
  Globe,
  CheckSquare,
  Square,
} from 'lucide-react';

interface MandatoryCompliancePageProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const MandatoryCompliancePage: React.FC<MandatoryCompliancePageProps> = ({
  language,
  setLanguage,
}) => {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [confirmedModules, setConfirmedModules] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const currentPillar = MANDATORY_COMPLIANCE_DATA[activePillarIndex];

  const totalModulesCount = MANDATORY_COMPLIANCE_DATA.reduce(
    (acc, curr) => acc + curr.modules.length,
    0
  );

  const toggleConfirmModule = (moduleTitle: string) => {
    setConfirmedModules((prev) => ({
      ...prev,
      [moduleTitle]: !prev[moduleTitle],
    }));
  };

  const confirmedCount = Object.values(confirmedModules).filter(Boolean).length;
  const progressPercent = Math.round((confirmedCount / totalModulesCount) * 100);

  const complianceFaqs = [
    {
      id: 'comp-faq-1',
      question: 'How do statutory compliance certificates reduce corporate liability?',
      answer:
        'Regulatory bodies and courts heavily scrutinize whether employees received verifiable, periodic, and comprehended training. LearnEnlight produces cryptographically timestamped learner logs and comprehension checks adhering to OSHA, ISO 27001, GDPR, and FSSAI evidentiary standards.',
    },
    {
      id: 'comp-faq-2',
      question: 'What is the LOTO (Lockout/Tagout) protocol in the manufacturing track?',
      answer:
        'Lockout/Tagout ensures hazardous energy sources (electrical, hydraulic, pneumatic, gravitational) are isolated and locked with physical padlocks before maintenance or tooling changes begin, preventing accidental machine activation.',
    },
    {
      id: 'comp-faq-3',
      question: 'Are data privacy modules compliant with India’s Digital Personal Data Protection (DPDP) Act and GDPR?',
      answer:
        'Yes. Our modules provide strict operational guidance on consent frameworks, data minimization, right to erasure, purpose limitation, and cross-border transfer requirements under both the EU GDPR and India DPDP Act.',
    },
  ];

  const handleListenPillar = () => {
    const text = `Mandatory and Compliance Training for ${currentPillar.pillar}. 
    Modules include: ${currentPillar.modules.map((m) => `${m.title}: ${m.content}`).join('. ')}`;
    speechService.speak(text, currentPillar.pillar, language);
  };

  const iconMap: Record<string, React.ElementType> = {
    HardHat,
    ShieldCheck,
    ShoppingBag,
    Scale,
  };

  const PillarIcon = iconMap[currentPillar.icon] || ShieldCheck;

  return (
    <div id="mandatory-compliance-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#F8F9FA]">
      {/* Top Banner with Language Selector */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white rounded-3xl p-6 sm:p-10 border border-[#B7E4C7]/30 shadow-xl mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7E4C7]/20 text-[#B7E4C7] border border-[#B7E4C7]/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Lock className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Statutory & Regulatory Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Outfit'] tracking-tight text-[#F8F9FA]">
              MANDATORY & COMPLIANCE CERTIFICATION
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#F8F9FA]/80 max-w-2xl leading-relaxed">
              Zero-tolerance regulatory compliance training across Manufacturing, IT/ITES, Retail/Hospitality, and Financial Services.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1.5 bg-[#143326] px-3 py-2 rounded-xl border border-[#B7E4C7]/40">
              <Globe className="w-4 h-4 text-[#E07A5F]" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
                className="bg-transparent text-xs font-semibold text-[#F8F9FA] focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} className="bg-[#143326] text-white">
                    {l.flag} {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleListenPillar}
              className="px-4 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.listenAudio}</span>
            </button>
          </div>
        </div>

        {/* Learner Progress Bar */}
        <div className="mt-8 pt-6 border-t border-[#B7E4C7]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7]">
              Compliance Attestation:
            </span>
            <span className="text-xs font-mono font-bold text-[#E07A5F]">
              {confirmedCount} of {totalModulesCount} Mandatory Modules Signed ({progressPercent}%)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-40 sm:w-56 h-2.5 bg-[#143326] rounded-full overflow-hidden border border-[#B7E4C7]/30">
              <div
                className="h-full bg-gradient-to-r from-[#B7E4C7] to-[#E07A5F] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold flex items-center gap-1 transition shadow-2xs cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Compliance Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pillar Selection Tabs */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MANDATORY_COMPLIANCE_DATA.map((pillar, idx) => {
          const isSelected = idx === activePillarIndex;
          const Icon = iconMap[pillar.icon] || ShieldCheck;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillarIndex(idx)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md ring-2 ring-[#B7E4C7]/40'
                  : 'bg-white hover:bg-[#B7E4C7]/20 border-[#B7E4C7]/60 text-[#1B4332]'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#E07A5F] text-white' : 'bg-[#F8F9FA] text-[#1B4332] border border-[#B7E4C7]'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">
                  {pillar.pillar}
                </div>
                <span className={`text-[11px] ${isSelected ? 'text-[#B7E4C7]' : 'text-[#1B4332]/60'}`}>
                  {pillar.modules.length} Mandatory Modules
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modules List for Selected Pillar */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PillarIcon className="w-5 h-5 text-[#E07A5F]" />
            <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#1B4332]">
              {currentPillar.pillar} Standards
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-[#1B4332]/70">
            {currentPillar.modules.length} Critical Checkpoints
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentPillar.modules.map((mod, idx) => {
            const isConfirmed = !!confirmedModules[mod.title];
            return (
              <div
                key={idx}
                id={`comp-module-${idx}`}
                className="bg-white rounded-3xl border border-[#B7E4C7]/60 p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#B7E4C7]/30 text-[#1B4332] text-[11px] font-bold border border-[#B7E4C7]/50">
                      Module {idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E07A5F]/20 text-[#E07A5F] border border-[#E07A5F]/40 text-[10px] font-extrabold uppercase tracking-wider">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#1B4332] font-['Outfit'] mb-2">
                    {mod.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#1B4332]/75 leading-relaxed font-normal">
                    {mod.content}
                  </p>

                  <div className="mt-4 p-3 bg-[#F8F9FA] rounded-xl border border-[#B7E4C7]/40 text-xs text-[#1B4332]">
                    <span className="font-bold text-[#1B4332] block mb-0.5">
                      Hands-on Compliance Check:
                    </span>
                    {mod.interactiveCheck}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#B7E4C7]/30 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      speechService.speak(
                        `${mod.title}. Standard: ${mod.badge}. ${mod.content}. Compliance check: ${mod.interactiveCheck}`,
                        mod.title,
                        language
                      );
                    }}
                    className="text-xs font-bold text-[#1B4332] hover:text-[#E07A5F] flex items-center gap-1 transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-[#E07A5F]" />
                    <span>Audio ({currentLangObj?.nativeName})</span>
                  </button>

                  <button
                    onClick={() => toggleConfirmModule(mod.title)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                      isConfirmed
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-[#F8F9FA] hover:bg-[#B7E4C7]/30 text-[#1B4332] border border-[#B7E4C7]'
                    }`}
                  >
                    {isConfirmed ? (
                      <>
                        <CheckSquare className="w-4 h-4 text-[#B7E4C7]" />
                        <span>Attested</span>
                      </>
                    ) : (
                      <>
                        <Square className="w-4 h-4 text-[#1B4332]/50" />
                        <span>Sign Attestation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice-Enabled Compliance FAQs */}
      <FAQAudioSection
        faqs={complianceFaqs}
        language={language}
        title="Mandatory & Compliance FAQs"
        subtitle="Listen to explanations regarding OSHA, ISO 27001, HACCP, and AML statutory audits."
      />

      {/* Confirmation & Certificate Modal */}
      <LearnerConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programTitle="Mandatory Statutory & Corporate Compliance"
        totalSteps={totalModulesCount}
        confirmedCount={confirmedCount}
        language={language}
      />
    </div>
  );
};
