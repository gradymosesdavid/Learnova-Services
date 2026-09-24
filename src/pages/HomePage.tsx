import React, { useState } from 'react';
import { PageId, SupportedLanguage, IndustryType } from '../types';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { RoiAcceleratorDiagram } from '../components/RoiAcceleratorDiagram';
import {
  Factory,
  Car,
  Cpu,
  Coffee,
  ShoppingBag,
  Briefcase,
  Layers,
  ArrowRight,
  Award,
  Sparkles,
  Volume2,
  CheckCircle,
  Clock,
  Shield,
  Globe,
  Users,
} from 'lucide-react';
import { speechService } from '../utils/speechSynthesis';

interface HomePageProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  setCurrentPage: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  setLanguage,
  setCurrentPage,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>('manufacturing');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  const industries = [
    {
      id: 'manufacturing' as IndustryType,
      name: 'Manufacturing',
      badge: 'Hardware & Line Assembly',
      icon: Factory,
      color: 'from-[#1B4332] to-[#143326]',
      accentColor: '#B7E4C7',
      description: 'Hands-on server motherboard assembly, component identification, ESD safety protocols, and BIOS validation.',
      metrics: '12 Step Precision Guide • 0% Defect Target',
      targetPage: 'manufacturing' as PageId,
      previewGraphic: 'Server Motherboard & Cleanroom Line',
    },
    {
      id: 'automobile' as IndustryType,
      name: 'Automobile',
      badge: 'Powertrain & Mechanical',
      icon: Car,
      color: 'from-[#1B4332] to-[#255d46]',
      accentColor: '#E07A5F',
      description: 'Crankshaft torquing, piston ring gap compression, cylinder head spiral tightening, and timing belt synchronization.',
      metrics: '5 Core Assemblies • Strict Torque Specs',
      targetPage: 'automobile' as PageId,
      previewGraphic: 'Combustion Engine & Crankshaft Workbench',
    },
    {
      id: 'it-ites' as IndustryType,
      name: 'IT & ITES',
      badge: 'Software & Cloud Delivery',
      icon: Cpu,
      color: 'from-[#143326] to-[#1B4332]',
      accentColor: '#B7E4C7',
      description: 'Cross-cultural global team communication, cognitive sprint flexibility, ISO 27001 cybersecurity, and GDPR data privacy.',
      metrics: 'Async Collaboration • AI Integration',
      targetPage: 'general' as PageId,
      previewGraphic: 'Distributed Cloud Engineering Sprint',
    },
    {
      id: 'hospitality' as IndustryType,
      name: 'Hospitality',
      badge: 'Guest Experience & Service',
      icon: Coffee,
      color: 'from-[#255d46] to-[#1B4332]',
      accentColor: '#E07A5F',
      description: 'Frontline emotional intelligence, conflict de-escalation, HACCP food safety hygiene, and crisis management.',
      metrics: 'High Frontline Retention • Guest NPS',
      targetPage: 'general' as PageId,
      previewGraphic: 'Guest Escalation & Dining Simulation',
    },
    {
      id: 'fmcg' as IndustryType,
      name: 'FMCG (Consumer Goods)',
      badge: 'High-Velocity Supply Chain',
      icon: Layers,
      color: 'from-[#1B4332] to-[#143326]',
      accentColor: '#B7E4C7',
      description: 'Cold-chain storage compliance, rapid shelf replenishment, trade compliance, and Kaizen floor efficiency.',
      metrics: 'Zero Stockout • Speed to Market',
      targetPage: 'general' as PageId,
      previewGraphic: 'High-Speed Distribution Fulfillment',
    },
    {
      id: 'retail' as IndustryType,
      name: 'Retail',
      badge: 'Omnichannel & Customer Care',
      icon: ShoppingBag,
      color: 'from-[#255d46] to-[#143326]',
      accentColor: '#E07A5F',
      description: 'Floor leadership, transparent consumer rights fair-trade compliance, fire life-safety drills, and cashier coaching.',
      metrics: 'Store Level NPS • Team Retention',
      targetPage: 'general' as PageId,
      previewGraphic: 'Retail Floor & Point-of-Sale Coaching',
    },
    {
      id: 'services' as IndustryType,
      name: 'Service Industry',
      badge: 'Consulting & Banking',
      icon: Briefcase,
      color: 'from-[#143326] to-[#255d46]',
      accentColor: '#B7E4C7',
      description: 'Stakeholder persuasion, AML/KYC regulatory compliance, insider trading prevention, and ethical board governance.',
      metrics: 'C-Suite Alignment • Regulatory Audits',
      targetPage: 'mandatory' as PageId,
      previewGraphic: 'Executive Advisory Boardroom',
    },
  ];

  const currentIndObj = industries.find((ind) => ind.id === selectedIndustry) || industries[0];

  const handleReadIntro = () => {
    const text = `Welcome to LearnEnlight. Learn and Innovate Mindsets and Ideas. 
    ${t.aboutSnippetText} 
    Explore our experiential industry tracks in ${currentLangObj?.name}.`;
    speechService.speak(text, 'LearnEnlight Introduction', language);
  };

  return (
    <div id="learnenlight-home-page" className="min-w-0 bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#B7E4C7]/20 via-[#F8F9FA] to-[#F8F9FA] py-16 sm:py-20 border-b border-[#B7E4C7]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Multilingual Selector Pill Bar */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#1B4332]/70 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Globe className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>Available in 9 Languages:</span>
              </span>
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                    language === l.code
                      ? 'bg-[#E07A5F] text-white font-bold shadow-xs scale-105'
                      : 'bg-white text-[#1B4332] hover:bg-[#B7E4C7]/30 border border-[#B7E4C7]'
                  }`}
                  title={`Switch to ${l.name}`}
                >
                  <span>{l.flag}</span>
                  <span>{l.nativeName}</span>
                </button>
              ))}
            </div>

            {/* Main Headline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] text-xs font-bold uppercase tracking-wide mb-4 border border-[#B7E4C7]">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Executive Learning & Organizational Development</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Outfit'] text-[#1B4332] tracking-tight leading-[1.1]">
              Learn & Innovate{' '}
              <span className="text-[#E07A5F]">
                Mindsets & Ideas.
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#1B4332]/80 leading-relaxed font-normal">
              {t.aboutSnippetText}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentPage('about')}
                className="px-6 py-3.5 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white font-bold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
              >
                <span>{t.readMoreAbout}</span>
                <ArrowRight className="w-4 h-4 text-[#B7E4C7]" />
              </button>

              <button
                onClick={handleReadIntro}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#B7E4C7]/20 text-[#1B4332] font-bold text-sm border border-[#B7E4C7] shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-[#E07A5F]" />
                <span>Listen ({currentLangObj?.nativeName})</span>
              </button>

              <button
                onClick={() => setCurrentPage('leadership-quiz')}
                className="px-5 py-3.5 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white font-extrabold text-sm shadow-sm transition flex items-center gap-2 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Take 105-Q Leadership Assessment</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Us Preview Box Reflecting in Selected Language */}
        <section className="mb-12 bg-white rounded-3xl p-6 sm:p-8 border border-[#B7E4C7]/60 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E07A5F] mb-1">
                <Users className="w-4 h-4" />
                <span>{t.aboutSnippetHeading}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[#1B4332]">
                Corporate HR Veterans with Over a Decade of Proven Impact
              </h3>
              <p className="mt-2 text-sm text-[#1B4332]/75 leading-relaxed">
                {t.aboutSnippetText}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#B7E4C7]/60 text-center">
                <span className="text-xl font-bold text-[#1B4332] block font-['Outfit']">10+ Yrs</span>
                <span className="text-[11px] text-[#1B4332]/70 font-medium">L&D Mastery</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#B7E4C7]/60 text-center">
                <span className="text-xl font-bold text-[#1B4332] block font-['Outfit']">5 Certs</span>
                <span className="text-[11px] text-[#1B4332]/70 font-medium">Global Bodies</span>
              </div>
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#B7E4C7]/60 text-center col-span-2 sm:col-span-1">
                <span className="text-xl font-bold text-[#E07A5F] block font-['Outfit']">3X ROI</span>
                <span className="text-[11px] text-[#1B4332]/70 font-medium">Accelerated Gains</span>
              </div>
            </div>
          </div>
        </section>

        {/* HOME PAGE GRAPHICS: SIMPLIFIED L&D RoI ACCELERATOR MODEL: 3X ROI AND RAPID DEPLOYMENT */}
        <RoiAcceleratorDiagram language={language} />

        {/* Dynamic Industries Experiential Showcase */}
        <section id="industries-showcase" className="mt-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] border border-[#B7E4C7] text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Experiential Learning Across Sectors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Outfit'] text-[#1B4332] tracking-tight">
              {t.industriesHeading}
            </h2>
            <p className="text-[#1B4332]/70 text-sm sm:text-base mt-2">
              {t.industriesSubheading}
            </p>
          </div>

          {/* Industry Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {industries.map((ind) => {
              const Icon = ind.icon;
              const isSelected = selectedIndustry === ind.id;
              return (
                <button
                  key={ind.id}
                  id={`industry-tab-${ind.id}`}
                  onClick={() => setSelectedIndustry(ind.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B4332] text-white shadow-md scale-105 border border-[#1B4332]'
                      : 'bg-white text-[#1B4332] hover:bg-[#B7E4C7]/20 border border-[#B7E4C7]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#B7E4C7]' : 'text-[#1B4332]/60'}`} />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Interactive Spotlight Card */}
          <div className="bg-white rounded-3xl border border-[#B7E4C7]/60 shadow-md p-6 sm:p-8 lg:p-10 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] border border-[#B7E4C7] text-xs font-bold uppercase tracking-wide mb-3">
                  <currentIndObj.icon className="w-4 h-4 text-[#E07A5F]" />
                  <span>{currentIndObj.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#1B4332]">
                  {currentIndObj.name} Experiential Learning Lab
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#1B4332]/80 leading-relaxed">
                  {currentIndObj.description}
                </p>

                <div className="mt-6 p-4 rounded-2xl bg-[#F8F9FA] border border-[#B7E4C7]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span className="text-xs font-semibold text-[#1B4332]">
                      Standardized KPI Focus:
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#E07A5F]">
                    {currentIndObj.metrics}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setCurrentPage(currentIndObj.targetPage)}
                    className="px-6 py-3 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white font-extrabold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t.exploreExperience}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      speechService.speak(
                        `${currentIndObj.name} track. ${currentIndObj.description}. Metrics: ${currentIndObj.metrics}`,
                        `${currentIndObj.name} Overview`,
                        language
                      );
                    }}
                    className="px-4 py-3 rounded-xl bg-[#F8F9FA] hover:bg-[#B7E4C7]/20 text-[#1B4332] font-bold text-xs flex items-center gap-1.5 transition border border-[#B7E4C7] cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-[#E07A5F]" />
                    <span>Audio Narration</span>
                  </button>
                </div>
              </div>

              {/* Graphical Visualizer for the Industry */}
              <div className="lg:col-span-5">
                <div className={`rounded-2xl p-6 bg-gradient-to-br ${currentIndObj.color} text-white shadow-xl flex flex-col justify-between min-h-[280px] relative overflow-hidden border border-[#B7E4C7]/30`}>
                  <div className="absolute -right-8 -bottom-8 opacity-15">
                    <currentIndObj.icon className="w-48 h-48" />
                  </div>

                  <div>
                    <span className="text-xs uppercase font-mono tracking-widest text-[#B7E4C7]">
                      Live Simulation State
                    </span>
                    <h4 className="text-xl font-bold font-['Outfit'] mt-1 text-[#F8F9FA]">
                      {currentIndObj.previewGraphic}
                    </h4>
                  </div>

                  <div className="my-6 space-y-2 text-xs text-[#F8F9FA]/90">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#B7E4C7]" />
                      <span>Step-by-step interactive simulator loaded</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[#E07A5F]" />
                      <span>Individual learner verification sign-off ready</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-[#B7E4C7]" />
                      <span>Multi-language speech synthesis enabled ({currentLangObj?.name})</span>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => setCurrentPage(currentIndObj.targetPage)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#E07A5F] text-white font-bold text-xs hover:bg-[#C9664D] transition shadow-sm text-center block cursor-pointer"
                    >
                      Open {currentIndObj.name} Lab
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
