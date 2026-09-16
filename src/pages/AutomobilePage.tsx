import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { AUTOMOBILE_STEPS, AUTOMOBILE_CRUCIAL_NOTE, AUTOMOBILE_FAQS } from '../data/programData';
import { FAQAudioSection } from '../components/FAQAudioSection';
import { LearnerConfirmationModal } from '../components/LearnerConfirmationModal';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { speechService } from '../utils/speechSynthesis';
import {
  Car,
  RotateCw,
  Gauge,
  ShieldCheck,
  Timer,
  Box,
  Volume2,
  Wrench,
  CheckSquare,
  Square,
  ChevronRight,
  ChevronLeft,
  Award,
  Globe,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AutomobilePageProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const AutomobilePage: React.FC<AutomobilePageProps> = ({
  language,
  setLanguage,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [confirmedSteps, setConfirmedSteps] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const currentStep = AUTOMOBILE_STEPS[currentStepIndex];

  const toggleConfirmStep = (stepNumber: number) => {
    setConfirmedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const confirmedCount = Object.values(confirmedSteps).filter(Boolean).length;
  const progressPercent = Math.round((confirmedCount / AUTOMOBILE_STEPS.length) * 100);

  const handleListenCurrentStep = () => {
    const text = `Step ${currentStep.stepNumber}: ${currentStep.title}. ${currentStep.subtitle}. 
    Description: ${currentStep.description}. 
    Key actions: ${currentStep.keyActions.join('. ')}. 
    Safety and precision: ${currentStep.safetyTips.join('. ')}. 
    Verification: ${currentStep.verificationCheck}`;
    speechService.speak(text, `Automobile Assembly - ${currentStep.title}`, language);
  };

  const handleListenOverview = () => {
    const text = `Assembling a car engine is an exercise in extreme precision. While every specific engine model has its own unique tolerances and torque requirements, the foundational steps for building a standard internal combustion engine are mostly universal. Because the order of installation is critical, engines must be built from the inside out. 
    Core steps include: 1, Prepare the Engine Block; 2, Install the Crankshaft; 3, Insert the Pistons and Connecting Rods; 4, Mount the Cylinder Head; and 5, Install the Timing System.`;
    speechService.speak(text, 'Automobile Engine Assembly Guide', language);
  };

  const iconMap: Record<string, React.ElementType> = {
    Box,
    RotateCw,
    Gauge,
    ShieldCheck,
    Timer,
  };

  const StepIcon = iconMap[currentStep.iconName] || Car;

  return (
    <div id="automobile-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#F8F9FA]">
      {/* Top Banner with Language Selector & Audio Trigger */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white rounded-3xl p-6 sm:p-10 border border-[#B7E4C7]/30 shadow-xl mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7E4C7]/20 text-[#B7E4C7] border border-[#B7E4C7]/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Car className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Automotive Powertrain Experiential Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Outfit'] tracking-tight text-[#F8F9FA]">
              ASSEMBLING A CAR ENGINE — CORE ASSEMBLY PROCESS
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#F8F9FA]/80 max-w-2xl leading-relaxed">
              "Assembling a car engine is an exercise in extreme precision. Engines must be built from the inside out."
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

            {/* Audio Overview Button */}
            <button
              onClick={handleListenOverview}
              className="px-4 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.listenAudio}</span>
            </button>
          </div>
        </div>

        {/* Learner Progress & Sign-off Bar */}
        <div className="mt-8 pt-6 border-t border-[#B7E4C7]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7]">
              Learner Confirmation:
            </span>
            <span className="text-xs font-mono font-bold text-[#E07A5F]">
              {confirmedCount} of {AUTOMOBILE_STEPS.length} Assemblies Confirmed ({progressPercent}%)
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
              <span>Learner Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step Selector Tabs */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {AUTOMOBILE_STEPS.map((step, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isDone = !!confirmedSteps[step.stepNumber];
          return (
            <button
              key={step.stepNumber}
              id={`auto-step-tab-${step.stepNumber}`}
              onClick={() => setCurrentStepIndex(idx)}
              className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md ring-2 ring-[#B7E4C7]/40'
                  : isDone
                  ? 'bg-[#B7E4C7]/40 text-[#1B4332] border-[#B7E4C7]'
                  : 'bg-white text-[#1B4332]/80 hover:bg-[#B7E4C7]/20 border-[#B7E4C7]/50'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase">
                  Step 0{step.stepNumber}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#B7E4C7]" />
                )}
              </div>
              <div className="text-xs font-bold truncate">
                {step.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Engine Assembly Workstation */}
      <div className="bg-white rounded-3xl border border-[#B7E4C7]/60 shadow-md p-6 sm:p-8 lg:p-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Assembly Step Deep-Dive */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] text-xs font-extrabold uppercase tracking-wide border border-[#B7E4C7]">
                  Assembly Step {currentStep.stepNumber} of {AUTOMOBILE_STEPS.length}
                </span>
                {currentStep.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E07A5F]/20 text-[#E07A5F] border border-[#E07A5F]/40 text-[11px] font-bold">
                    {currentStep.badge}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#1B4332]">
                {currentStep.title}
              </h2>
              <h3 className="text-sm font-semibold text-[#E07A5F] mt-1">
                {currentStep.subtitle}
              </h3>

              <p className="mt-4 text-sm text-[#1B4332]/80 leading-relaxed font-normal">
                {currentStep.description}
              </p>

              {/* Action Directives */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-2">
                  Precision Engineering Steps:
                </h4>
                <ul className="space-y-2">
                  {currentStep.keyActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1B4332] bg-[#F8F9FA] p-3 rounded-xl border border-[#B7E4C7]/40">
                      <div className="w-5 h-5 rounded-full bg-[#1B4332] text-[#B7E4C7] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 font-mono">
                        {i + 1}
                      </div>
                      <span className="leading-snug">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Critical Safety Notice */}
              {currentStep.safetyTips.length > 0 && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#E07A5F]/10 border border-[#E07A5F]/40 text-xs text-[#1B4332]">
                  <span className="font-bold text-[#E07A5F] block mb-1">Critical Mechanical Warning:</span>
                  {currentStep.safetyTips.map((tip, idx) => (
                    <p key={idx} className="leading-relaxed">● {tip}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Stepper Navigation */}
            <div className="mt-8 pt-6 border-t border-[#B7E4C7]/30 flex items-center justify-between gap-3">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-xl border border-[#B7E4C7] text-[#1B4332] font-bold text-xs flex items-center gap-1.5 hover:bg-[#B7E4C7]/20 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleListenCurrentStep}
                className="px-4 py-2.5 rounded-xl bg-[#F8F9FA] hover:bg-[#B7E4C7]/20 text-[#1B4332] font-bold text-xs flex items-center gap-1.5 transition border border-[#B7E4C7] cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-[#E07A5F]" />
                <span>Listen ({currentLangObj?.nativeName})</span>
              </button>

              <button
                disabled={currentStepIndex === AUTOMOBILE_STEPS.length - 1}
                onClick={() => setCurrentStepIndex((prev) => Math.min(AUTOMOBILE_STEPS.length - 1, prev + 1))}
                className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4 text-[#B7E4C7]" />
              </button>
            </div>
          </div>

          {/* Right: Workstation Specs & Learner Confirmation */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8F9FA] rounded-2xl p-6 border border-[#B7E4C7]/60">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332]/70">
                  Engine Stand Tooling
                </span>
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-[#B7E4C7] flex items-center justify-center text-[#1B4332]">
                  <StepIcon className="w-5 h-5 text-[#E07A5F]" />
                </div>
              </div>

              {/* Tools Required */}
              <div className="mb-4">
                <span className="text-xs font-bold text-[#1B4332] block mb-1.5 flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-[#E07A5F]" />
                  Mandatory Workshop Tools:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentStep.toolsRequired.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-[#B7E4C7] text-[11px] font-semibold text-[#1B4332]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification Criterion */}
              <div className="p-3.5 rounded-xl bg-white border border-[#B7E4C7]/60 text-xs text-[#1B4332] mb-6">
                <span className="font-bold text-[#1B4332] block mb-1">
                  Learner Verification Spec:
                </span>
                <p className="text-[#1B4332]/80 leading-relaxed">
                  {currentStep.verificationCheck}
                </p>
              </div>
            </div>

            {/* Learner Confirmation Button for THIS Step */}
            <div className="pt-4 border-t border-[#B7E4C7]/40">
              <button
                id={`confirm-auto-step-${currentStep.stepNumber}-btn`}
                onClick={() => toggleConfirmStep(currentStep.stepNumber)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 transition shadow-sm cursor-pointer ${
                  confirmedSteps[currentStep.stepNumber]
                    ? 'bg-[#1B4332] text-white hover:bg-[#143326]'
                    : 'bg-white text-[#1B4332] border-2 border-[#B7E4C7] hover:border-[#E07A5F] hover:bg-[#B7E4C7]/20'
                }`}
              >
                {confirmedSteps[currentStep.stepNumber] ? (
                  <>
                    <CheckSquare className="w-5 h-5 text-[#B7E4C7]" />
                    <span>Step {currentStep.stepNumber} Verified & Logged</span>
                  </>
                ) : (
                  <>
                    <Square className="w-5 h-5 text-[#1B4332]/50" />
                    <span>{t.confirmStepAction}</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-[#1B4332]/60 text-center mt-2">
                Confirms physical torque specs and manual clearances met.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Crucial Note Box (Verbatim from document) */}
      <div className="mb-12 rounded-2xl bg-[#B7E4C7]/30 border border-[#B7E4C7] p-6 shadow-xs">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-[#1B4332] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-[#1B4332]">
              {AUTOMOBILE_CRUCIAL_NOTE.title}
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-[#1B4332]/80 leading-relaxed">
              {AUTOMOBILE_CRUCIAL_NOTE.description}
            </p>
          </div>
        </div>
      </div>

      {/* Voice-Enabled Automobile FAQs */}
      <FAQAudioSection
        faqs={AUTOMOBILE_FAQS}
        language={language}
        title="Automobile Engine Assembly FAQs"
        subtitle="Select any question to view mechanical explanations and listen via voice narration."
      />

      {/* Learner Confirmation Modal */}
      <LearnerConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programTitle="Automotive Engine Assembly - Precision Powertrain"
        totalSteps={AUTOMOBILE_STEPS.length}
        confirmedCount={confirmedCount}
        language={language}
      />
    </div>
  );
};
