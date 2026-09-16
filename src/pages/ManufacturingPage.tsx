import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { MANUFACTURING_STEPS, MANUFACTURING_FAQS } from '../data/programData';
import { FAQAudioSection } from '../components/FAQAudioSection';
import { LearnerConfirmationModal } from '../components/LearnerConfirmationModal';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { speechService } from '../utils/speechSynthesis';
import {
  ShieldAlert,
  Cpu,
  Server,
  Layers,
  Unlock,
  ThermometerSnowflake,
  HardDrive,
  Zap,
  CheckCircle2,
  Tv,
  Volume2,
  AlertTriangle,
  Award,
  ChevronRight,
  ChevronLeft,
  CheckSquare,
  Square,
  Wrench,
  Globe,
} from 'lucide-react';

interface ManufacturingPageProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const ManufacturingPage: React.FC<ManufacturingPageProps> = ({
  language,
  setLanguage,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [confirmedSteps, setConfirmedSteps] = useState<Record<number, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const currentStep = MANUFACTURING_STEPS[currentStepIndex];

  const toggleConfirmStep = (stepNumber: number) => {
    setConfirmedSteps((prev) => ({
      ...prev,
      [stepNumber]: !prev[stepNumber],
    }));
  };

  const confirmedCount = Object.values(confirmedSteps).filter(Boolean).length;
  const progressPercent = Math.round((confirmedCount / MANUFACTURING_STEPS.length) * 100);

  const handleListenCurrentStep = () => {
    const text = `Step ${currentStep.stepNumber}: ${currentStep.title}. ${currentStep.subtitle}. 
    Description: ${currentStep.description}. 
    Key actions: ${currentStep.keyActions.join('. ')}. 
    Safety check: ${currentStep.safetyTips.join('. ')}. 
    Verification: ${currentStep.verificationCheck}`;
    speechService.speak(text, `Step ${currentStep.stepNumber}: ${currentStep.title}`, language);
  };

  const handleListenAllSteps = () => {
    const text = `Server Motherboard Assembly Hands-On Learner Guide. 
    Step by step guide to assemble a server motherboard with chipset, CPU, memory, and key components. 
    There are 12 steps: ESD Safety, Identify Components, Prepare Chassis and Standoffs, Mount Motherboard, Open CPU Socket, Install CPU, Install Heatsink, Install ECC Memory, Install Riser and Storage, Connect Power and Fans, Final Inspection, and First Power-On POST.`;
    speechService.speak(text, 'Server Motherboard Assembly Overview', language);
  };

  const iconMap: Record<string, React.ElementType> = {
    ShieldAlert,
    Cpu,
    Server,
    Layers,
    Unlock,
    ThermometerSnowflake,
    HardDrive,
    Zap,
    CheckCircle2,
    Tv,
  };

  const StepIcon = iconMap[currentStep.iconName] || Cpu;

  return (
    <div id="manufacturing-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#F8F9FA]">
      {/* Top Banner with Language Selector & Audio Trigger */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white rounded-3xl p-6 sm:p-10 border border-[#B7E4C7]/30 shadow-xl mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7E4C7]/20 text-[#B7E4C7] border border-[#B7E4C7]/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Server className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Hands-On Engineering Simulator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Outfit'] tracking-tight text-[#F8F9FA]">
              SERVER MOTHERBOARD ASSEMBLY — LEARNER GUIDE
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#F8F9FA]/80 max-w-2xl leading-relaxed">
              Step-by-step experiential guide to assemble an enterprise server motherboard with chipset, CPU, ECC memory, and key peripherals.
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

            {/* Listen Audio */}
            <button
              onClick={handleListenAllSteps}
              className="px-4 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.listenAudio}</span>
            </button>
          </div>
        </div>

        {/* Learner Sign-Off Progress Bar */}
        <div className="mt-8 pt-6 border-t border-[#B7E4C7]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7]">
              Learner Confirmation:
            </span>
            <span className="text-xs font-mono font-bold text-[#E07A5F]">
              {confirmedCount} of {MANUFACTURING_STEPS.length} Completed ({progressPercent}%)
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
              <span>Sign-Off & Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* STOP Safety Warning Box (Exact representation of document banner) */}
      <div className="mb-8 rounded-2xl bg-[#E07A5F]/10 border-2 border-[#E07A5F]/40 p-4 sm:p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center shrink-0 font-black shadow-sm">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="text-xs sm:text-sm text-[#1B4332]">
          <div className="font-extrabold text-[#E07A5F] uppercase tracking-wide flex items-center gap-2">
            <span>STOP: Follow exact motherboard / server service manual</span>
            <span className="px-2 py-0.5 rounded-full bg-[#E07A5F] text-white text-[10px] font-bold">Mandatory</span>
          </div>
          <p className="mt-1 text-[#1B4332]/80">
            Procedures, pin layouts, socket retention latches, and connector locations vary by model and manufacturer. This guide is for educational purposes and suitable for supervised learner lab practice. 
            <span className="font-bold text-[#1B4332] ml-1">Safety + Accuracy = Success.</span>
          </p>
        </div>
      </div>

      {/* Interactive Step Navigator */}
      <div className="mb-6 flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {MANUFACTURING_STEPS.map((step, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isDone = !!confirmedSteps[step.stepNumber];
          return (
            <button
              key={step.stepNumber}
              id={`mfg-step-tab-${step.stepNumber}`}
              onClick={() => setCurrentStepIndex(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isCurrent
                  ? 'bg-[#1B4332] text-white shadow-md'
                  : isDone
                  ? 'bg-[#B7E4C7]/40 text-[#1B4332] border border-[#B7E4C7]'
                  : 'bg-white text-[#1B4332]/80 hover:bg-[#B7E4C7]/20 border border-[#B7E4C7]/50'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-[#B7E4C7]/50 text-[#1B4332] text-[10px] flex items-center justify-center font-mono">
                  {step.stepNumber}
                </span>
              )}
              <span>{step.title.split(' ')[0]} {step.title.split(' ')[1] || ''}</span>
            </button>
          );
        })}
      </div>

      {/* Main Experiential Workstation Card */}
      <div className="bg-white rounded-3xl border border-[#B7E4C7]/60 shadow-md p-6 sm:p-8 lg:p-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Step Details & Key Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] text-xs font-extrabold uppercase tracking-wide border border-[#B7E4C7]">
                  Step {currentStep.stepNumber} of {MANUFACTURING_STEPS.length}
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

              {/* Action Checklist */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-2">
                  Key Assembly Directives:
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

              {/* Safety Alerts */}
              {currentStep.safetyTips.length > 0 && (
                <div className="mt-4 p-3.5 rounded-xl bg-[#E07A5F]/10 border border-[#E07A5F]/40 text-xs text-[#1B4332]">
                  <span className="font-bold text-[#E07A5F] block mb-1">Safety & Quality Alert:</span>
                  {currentStep.safetyTips.map((tip, idx) => (
                    <p key={idx} className="leading-relaxed">● {tip}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Step Navigation Controls */}
            <div className="mt-8 pt-6 border-t border-[#B7E4C7]/30 flex items-center justify-between gap-3">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2.5 rounded-xl border border-[#B7E4C7] text-[#1B4332] font-bold text-xs flex items-center gap-1.5 hover:bg-[#B7E4C7]/20 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                onClick={handleListenCurrentStep}
                className="px-4 py-2.5 rounded-xl bg-[#F8F9FA] hover:bg-[#B7E4C7]/20 text-[#1B4332] font-bold text-xs flex items-center gap-1.5 transition border border-[#B7E4C7] cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-[#E07A5F]" />
                <span>Listen ({currentLangObj?.nativeName})</span>
              </button>

              <button
                disabled={currentStepIndex === MANUFACTURING_STEPS.length - 1}
                onClick={() => setCurrentStepIndex((prev) => Math.min(MANUFACTURING_STEPS.length - 1, prev + 1))}
                className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4 text-[#B7E4C7]" />
              </button>
            </div>
          </div>

          {/* Right: Interactive Hardware Verification & Learner Confirmation */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#F8F9FA] rounded-2xl p-6 border border-[#B7E4C7]/60">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332]/70">
                  Assembly Tooling & Specs
                </span>
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-[#B7E4C7] flex items-center justify-center text-[#1B4332]">
                  <StepIcon className="w-5 h-5 text-[#E07A5F]" />
                </div>
              </div>

              {/* Tools Required */}
              <div className="mb-4">
                <span className="text-xs font-bold text-[#1B4332] block mb-1.5 flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-[#E07A5F]" />
                  Required Lab Equipment:
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
                  Learner Verification Check:
                </span>
                <p className="text-[#1B4332]/80 leading-relaxed">
                  {currentStep.verificationCheck}
                </p>
              </div>
            </div>

            {/* Learner Confirmation Button for THIS Step */}
            <div className="pt-4 border-t border-[#B7E4C7]/40">
              <button
                id={`confirm-step-${currentStep.stepNumber}-btn`}
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
                    <span>Step {currentStep.stepNumber} Confirmed & Verified</span>
                  </>
                ) : (
                  <>
                    <Square className="w-5 h-5 text-[#1B4332]/50" />
                    <span>{t.confirmStepAction}</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-[#1B4332]/60 text-center mt-2">
                Clicking marks this physical procedure completed in your learner record.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Voice-Enabled Manufacturing FAQs */}
      <FAQAudioSection
        faqs={MANUFACTURING_FAQS}
        language={language}
        title="Manufacturing & Server Motherboard Assembly FAQs"
        subtitle="Listen to voice explanations for each technical and ESD question in your selected language."
      />

      {/* Learner Confirmation Modal */}
      <LearnerConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programTitle="Server Motherboard Assembly - Precision Engineering"
        totalSteps={MANUFACTURING_STEPS.length}
        confirmedCount={confirmedCount}
        language={language}
      />
    </div>
  );
};
