import React, { useState } from 'react';
import { SupportedLanguage } from '../types';
import { GENERAL_PROGRAMS_DATA } from '../data/programData';
import { FAQAudioSection } from '../components/FAQAudioSection';
import { LearnerConfirmationModal } from '../components/LearnerConfirmationModal';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { speechService } from '../utils/speechSynthesis';
import {
  Factory,
  Laptop,
  Coffee,
  Briefcase,
  CheckCircle2,
  Users,
  Award,
  Volume2,
  Globe,
  Sparkles,
  Square,
  CheckSquare,
  BookOpen,
} from 'lucide-react';

interface GeneralProgramsPageProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const GeneralProgramsPage: React.FC<GeneralProgramsPageProps> = ({
  language,
  setLanguage,
}) => {
  const [activeClusterId, setActiveClusterId] = useState<string>(GENERAL_PROGRAMS_DATA[0].id);
  const [confirmedClusters, setConfirmedClusters] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'softSkills' | 'transformational' | 'simulation'>('softSkills');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const currentCluster = GENERAL_PROGRAMS_DATA.find((c) => c.id === activeClusterId) || GENERAL_PROGRAMS_DATA[0];

  const generalFaqs = [
    {
      id: 'gen-faq-1',
      question: 'How do you measure behavioral transformation in soft skills training?',
      answer:
        'LearnEnlight utilizes pre- and post-intervention 360-degree behavioral rubric assessments, observable shift-floor indicators (e.g., grievance count, safety incident reporting rates, sprint velocity), and follow-up coaching at Day 30 and Day 60 to verify sustained behavioral persistence.',
    },
    {
      id: 'gen-faq-2',
      question: 'Why are programs separated by industry clusters?',
      answer:
        'Because a lean Kaizen manufacturing floor faces completely different operational realities than an agile global software sprint or a luxury hotel reception. Generic soft-skills training fails; contextualized experiential simulation tailored to operational realities succeeds.',
    },
    {
      id: 'gen-faq-3',
      question: 'Can these programs be conducted in local regional languages for frontline workers?',
      answer:
        'Yes. LearnEnlight facilitates programs natively in Tamil, Hindi, Malayalam, Kannada, Telugu, English, German, Japanese, and Korean to guarantee every shift worker comprehends and internalizes behavioral expectations.',
    },
  ];

  const toggleConfirmCluster = (id: string) => {
    setConfirmedClusters((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const confirmedCount = Object.values(confirmedClusters).filter(Boolean).length;
  const progressPercent = Math.round((confirmedCount / GENERAL_PROGRAMS_DATA.length) * 100);

  const handleListenCluster = () => {
    const speechText = `${currentCluster.title}. ${currentCluster.subtitle}. ${currentCluster.description}. 
    Core Soft Skills include: ${currentCluster.coreSoftSkills.map((s) => s.name).join(', ')}. 
    Transformational Leadership topics include: ${currentCluster.transformationalTopics.map((t) => t.name).join(', ')}.`;
    speechService.speak(speechText, currentCluster.title, language);
  };

  const iconMap: Record<string, React.ElementType> = {
    Factory,
    Laptop,
    Coffee,
    Briefcase,
  };

  const ClusterIcon = iconMap[currentCluster.icon] || Users;

  return (
    <div id="general-programs-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#F8F9FA]">
      {/* Top Banner with Language Selector */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white rounded-3xl p-6 sm:p-10 border border-[#B7E4C7]/30 shadow-xl mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7E4C7]/20 text-[#B7E4C7] border border-[#B7E4C7]/30 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Executive & Frontline Competency Framework</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Outfit'] tracking-tight text-[#F8F9FA]">
              GENERAL DEVELOPMENTAL PROGRAMS
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#F8F9FA]/80 max-w-2xl leading-relaxed">
              Comprehensive breakdown of soft skills and transformational leadership training topics grouped by industry clusters to highlight operational realities.
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
              onClick={handleListenCluster}
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
              Cluster Confirmation:
            </span>
            <span className="text-xs font-mono font-bold text-[#E07A5F]">
              {confirmedCount} of {GENERAL_PROGRAMS_DATA.length} Sectors Verified ({progressPercent}%)
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
              <span>Issue Program Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Cluster Navigation Pills */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {GENERAL_PROGRAMS_DATA.map((cluster) => {
          const isSelected = cluster.id === activeClusterId;
          const isDone = !!confirmedClusters[cluster.id];
          const Icon = iconMap[cluster.icon] || Users;
          return (
            <button
              key={cluster.id}
              onClick={() => setActiveClusterId(cluster.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#1B4332] shadow-md ring-2 ring-[#B7E4C7]/40'
                  : isDone
                  ? 'bg-[#B7E4C7]/40 border-[#B7E4C7] text-[#1B4332]'
                  : 'bg-white hover:bg-[#B7E4C7]/20 border-[#B7E4C7]/60 text-[#1B4332]'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#1B4332] text-white' : 'bg-[#F8F9FA] text-[#1B4332] border border-[#B7E4C7]'} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate text-[#1B4332]">
                    {cluster.title.split('(')[0]}
                  </div>
                  <span className="text-[11px] text-[#1B4332]/70 line-clamp-1">
                    {cluster.subtitle}
                  </span>
                </div>
              </div>

              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-[#1B4332] shrink-0" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#B7E4C7] shrink-0 mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Active Cluster Deep-Dive */}
      <div className="bg-white rounded-3xl border border-[#B7E4C7]/60 shadow-md p-6 sm:p-8 lg:p-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#B7E4C7]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#B7E4C7]/40 text-[#1B4332] flex items-center justify-center font-bold border border-[#B7E4C7]">
              <ClusterIcon className="w-6 h-6 text-[#E07A5F]" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
                Industry Cluster Spotlight
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#1B4332]">
                {currentCluster.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => toggleConfirmCluster(currentCluster.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-xs cursor-pointer ${
              confirmedClusters[currentCluster.id]
                ? 'bg-[#1B4332] text-white'
                : 'bg-white border-2 border-[#B7E4C7] text-[#1B4332] hover:border-[#E07A5F] hover:bg-[#B7E4C7]/20'
            }`}
          >
            {confirmedClusters[currentCluster.id] ? (
              <>
                <CheckSquare className="w-4 h-4 text-[#B7E4C7]" />
                <span>Cluster Confirmed</span>
              </>
            ) : (
              <>
                <Square className="w-4 h-4 text-[#1B4332]/50" />
                <span>Sign Off Competency</span>
              </>
            )}
          </button>
        </div>

        <p className="mt-4 text-sm sm:text-base text-[#1B4332]/80 leading-relaxed max-w-3xl">
          {currentCluster.description}
        </p>

        {/* Sub-Tabs: Core Soft Skills vs Transformational Topics vs Experiential Workshop */}
        <div className="mt-8 flex items-center gap-2 border-b border-[#B7E4C7]/40 pb-2">
          <button
            onClick={() => setActiveTab('softSkills')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
              activeTab === 'softSkills'
                ? 'bg-[#1B4332] text-white'
                : 'text-[#1B4332] hover:bg-[#B7E4C7]/20'
            }`}
          >
            Core Soft Skills ({currentCluster.coreSoftSkills.length})
          </button>
          <button
            onClick={() => setActiveTab('transformational')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
              activeTab === 'transformational'
                ? 'bg-[#1B4332] text-white'
                : 'text-[#1B4332] hover:bg-[#B7E4C7]/20'
            }`}
          >
            Transformational Leadership ({currentCluster.transformationalTopics.length})
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
              activeTab === 'simulation'
                ? 'bg-[#1B4332] text-white'
                : 'text-[#1B4332] hover:bg-[#B7E4C7]/20'
            }`}
          >
            Experiential Workshop Simulation
          </button>
        </div>

        {/* Content of selected tab */}
        <div className="mt-6">
          {activeTab === 'softSkills' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentCluster.coreSoftSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B7E4C7]/60 flex flex-col justify-between"
                >
                  <div>
                    <span className="w-6 h-6 rounded-md bg-[#B7E4C7]/50 text-[#1B4332] text-xs font-mono font-bold flex items-center justify-center mb-3">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-[#1B4332] font-['Outfit'] mb-2">
                      ● {skill.name}
                    </h3>
                    <p className="text-xs text-[#1B4332]/75 leading-relaxed">
                      {skill.details}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#B7E4C7]/40 flex items-center justify-between">
                    <button
                      onClick={() => {
                        speechService.speak(
                          `${skill.name}: ${skill.details}`,
                          skill.name,
                          language
                        );
                      }}
                      className="text-xs font-bold text-[#1B4332] hover:text-[#E07A5F] flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#E07A5F]" />
                      <span>Audio</span>
                    </button>
                    <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'transformational' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentCluster.transformationalTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-[#B7E4C7]/60 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <span className="w-6 h-6 rounded-md bg-[#E07A5F]/20 text-[#E07A5F] text-xs font-mono font-bold flex items-center justify-center mb-3 border border-[#E07A5F]/40">
                      T{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-[#1B4332] font-['Outfit'] mb-2">
                      ● {topic.name}
                    </h3>
                    <p className="text-xs text-[#1B4332]/75 leading-relaxed">
                      {topic.details}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#B7E4C7]/40 flex items-center justify-between">
                    <button
                      onClick={() => {
                        speechService.speak(
                          `${topic.name}: ${topic.details}`,
                          topic.name,
                          language
                        );
                      }}
                      className="text-xs font-bold text-[#1B4332] hover:text-[#E07A5F] flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#E07A5F]" />
                      <span>Audio</span>
                    </button>
                    <Sparkles className="w-4 h-4 text-[#E07A5F]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'simulation' && (
            <div className="p-8 rounded-2xl bg-[#B7E4C7]/20 border border-[#B7E4C7]">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] block mb-1">
                  Experiential Roleplay & Decision Matrix
                </span>
                <h3 className="text-xl font-bold font-['Outfit'] text-[#1B4332] mb-3">
                  {currentCluster.experientialWorkshop}
                </h3>
                <p className="text-xs sm:text-sm text-[#1B4332]/80 leading-relaxed mb-6">
                  Learners are placed into timed pressure-cooker operational scenarios where decisions have live consequences on throughput, morale, and compliance.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      speechService.speak(
                        `Experiential workshop simulation for ${currentCluster.title}: ${currentCluster.experientialWorkshop}`,
                        'Workshop Simulation Brief',
                        language
                      );
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#1B4332] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#143326] transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-[#B7E4C7]" />
                    <span>Listen to Simulation Brief</span>
                  </button>

                  <button
                    onClick={() => toggleConfirmCluster(currentCluster.id)}
                    className="px-4 py-2.5 rounded-xl bg-[#E07A5F] text-white text-xs font-bold hover:bg-[#C9664D] transition cursor-pointer"
                  >
                    Mark Simulation Completed
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* General Programs FAQs with Audio */}
      <FAQAudioSection
        faqs={generalFaqs}
        language={language}
        title="General Developmental Programs FAQs"
        subtitle="Listen to audio explanations on soft skills rubrics and industry clustering."
      />

      {/* Confirmation Modal */}
      <LearnerConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programTitle="General Developmental Programs - Cross-Industry Competency"
        totalSteps={GENERAL_PROGRAMS_DATA.length}
        confirmedCount={confirmedCount}
        language={language}
      />
    </div>
  );
};
