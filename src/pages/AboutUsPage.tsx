import React from 'react';
import { SupportedLanguage } from '../types';
import { TRANSLATIONS, CERTIFICATIONS_LIST, SUPPORTED_LANGUAGES } from '../data/translations';
import { FAQAudioSection } from '../components/FAQAudioSection';
import {
  Award,
  CheckCircle2,
  Compass,
  Sparkles,
  Volume2,
  ShieldCheck,
  GraduationCap,
  Target,
  Workflow,
  Globe2,
} from 'lucide-react';
import { speechService } from '../utils/speechSynthesis';

interface AboutUsPageProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ language }) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  const corePillars = [
    {
      title: 'Learning & Development (L&D)',
      description: 'Architecting scalable corporate academies, experiential curriculums, and micro-learning ecosystems that bridge knowledge to shop-floor action.',
      icon: GraduationCap,
      color: 'bg-[#B7E4C7]/30 text-[#1B4332] border-[#B7E4C7]',
    },
    {
      title: 'Leadership Development',
      description: 'Cultivating frontline, mid-level, and C-suite transformational leaders through reflective coaching, emotional intelligence, and situational decision-making.',
      icon: Target,
      color: 'bg-[#B7E4C7]/30 text-[#1B4332] border-[#B7E4C7]',
    },
    {
      title: 'Competency & Skill Development',
      description: 'Designing role-specific behavioral rubrics, technical diagnostics, and hands-on simulation labs to eliminate competency gaps.',
      icon: Compass,
      color: 'bg-[#B7E4C7]/30 text-[#1B4332] border-[#B7E4C7]',
    },
    {
      title: 'Organizational Development',
      description: 'Driving systemic culture transformations, cross-functional alignment, change management, and Kaizen continuous improvement.',
      icon: Workflow,
      color: 'bg-[#B7E4C7]/30 text-[#1B4332] border-[#B7E4C7]',
    },
  ];

  const experientialCycle = [
    {
      stage: '1. Concrete Experience',
      desc: 'Active immersion in realistic workplace simulations, technical assembly drills, or crisis roleplays.',
    },
    {
      stage: '2. Reflective Observation',
      desc: 'Step-by-step review, guided debriefs, and analyzing cognitive or mechanical decision points.',
    },
    {
      stage: '3. Abstract Conceptualization',
      desc: 'Integrating frameworks, safety standards (OSHA/ISO), and leadership models into core mental models.',
    },
    {
      stage: '4. Active Experimentation',
      desc: 'Applying learned competencies to novel real-world challenges with immediate feedback loops.',
    },
  ];

  const aboutFaqs = [
    {
      id: 'about-faq-1',
      question: 'What sets Learnova Services apart from traditional lecture-based training providers?',
      answer:
        'Learnova Services replaces passive slide presentations with tactile experiential learning. Whether it is hands-on server motherboard assembly or automotive engine torquing, learners physically perform, verify, and reflect upon standard operating procedures, ensuring lasting retention and measurable 3X ROI.',
    },
    {
      id: 'about-faq-2',
      question: 'Which international bodies certify Learnova Services behavioural trainers?',
      answer:
        'Our trainers hold globally prestigious credentials: AoN Hewitt for Learning & Development, British Council for Train the Trainer, University of Cambridge for Teaching Knowledge Test, Middle Earth HR for Certified Life Coach, and TESOL Canada / Ministry of Human Resources Canada.',
    },
    {
      id: 'about-faq-3',
      question: 'How does Learnova Services adapt its training to diverse multilingual shifts?',
      answer:
        'We support complete multilingual delivery across 9 major global and regional languages: English, Korean, Japanese, German, Tamil, Hindi, Malayalam, Kannada, and Telugu, complete with native audio narration and cultural nuance tuning.',
    },
  ];

  const handleReadPage = () => {
    const speechText = `About Learnova Services. Learn and Innovate Mindsets and Ideas. 
    We are corporate HR professionals with over a decade of experience in Learning and Development, Leadership Development, Competency and Skill Development, and Organizational Development. 
    We are certified Behavioural Trainers, certified by: 
    AoN Learning and Development, 
    British Council Train the Trainer, 
    University of Cambridge Teaching Knowledge Test, 
    Life Coach from Middle Earth HR, 
    and TESOL Teachers Board of Canada and Ministry of Human Resources Canada.`;
    speechService.speak(speechText, 'About Learnova Services & Global Certifications', language);
  };

  return (
    <div id="learnova-about-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#F8F9FA]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] rounded-3xl text-white p-8 sm:p-12 shadow-xl border border-[#B7E4C7]/30 relative overflow-hidden mb-12">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7E4C7]/20 text-[#B7E4C7] border border-[#B7E4C7]/40 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Certified Behavioural Excellence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-['Outfit'] tracking-tight text-[#F8F9FA]">
            Learn & Innovate Mindsets & Ideas
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#F8F9FA]/85 leading-relaxed font-normal">
            "We are corporate HR professionals with over a decade of experience in Learning & Development,
            Leadership Development, Competency & Skill Development and Organizational Development."
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleReadPage}
              className="px-5 py-3 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-white" />
              <span>Listen to About Us ({currentLangObj?.nativeName})</span>
            </button>

            <div className="px-4 py-2.5 rounded-xl bg-[#143326] border border-[#B7E4C7]/30 text-xs text-[#B7E4C7] flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-[#E07A5F]" />
              <span>9 Languages Supported</span>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <section id="certifications-grid" className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] border border-[#B7E4C7] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Accreditations & Credentials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#1B4332] tracking-tight">
            We are Certified Behavioural Trainers, Certified by:
          </h2>
          <p className="text-[#1B4332]/70 text-sm mt-2">
            Recognized by globally benchmarked institutions for pedagogical and behavioral mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS_LIST.map((cert, idx) => (
            <div
              key={cert.code}
              id={`cert-card-${cert.code}`}
              className="bg-white rounded-2xl border border-[#B7E4C7]/60 p-6 shadow-xs hover:shadow-md hover:border-[#1B4332]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-[#B7E4C7]/40 text-[#1B4332] font-bold text-xs flex items-center justify-center border border-[#B7E4C7]">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-[#1B4332] bg-[#B7E4C7]/40 px-2 py-0.5 rounded-full border border-[#B7E4C7]">
                    Verified
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1B4332] font-['Outfit'] mb-1">
                  ● {cert.title}
                </h3>

                <span className="text-xs font-semibold text-[#E07A5F] block mb-3">
                  {cert.issuer}
                </span>

                <p className="text-xs text-[#1B4332]/75 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#B7E4C7]/30 flex items-center justify-between">
                <button
                  onClick={() => {
                    speechService.speak(
                      `Certified by ${cert.title}. Issued by ${cert.issuer}. ${cert.description}`,
                      cert.title,
                      language
                    );
                  }}
                  className="text-xs font-bold text-[#1B4332]/80 hover:text-[#E07A5F] flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>Listen</span>
                </button>
                <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
              </div>
            </div>
          ))}

          {/* Decadal Experience Card */}
          <div className="bg-gradient-to-br from-[#1B4332] to-[#255d46] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between border border-[#B7E4C7]/40">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#B7E4C7] block mb-2">
                Learnova Services Hallmark
              </span>
              <h3 className="text-2xl font-black font-['Outfit'] leading-tight text-[#F8F9FA]">
                10+ Years of Behavioral Transformation
              </h3>
              <p className="text-xs font-medium text-[#F8F9FA]/80 mt-3 leading-relaxed">
                Empowering frontline engineers, shift leads, store managers, and executives to unlock peak operational agility through structured experiential simulations.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#B7E4C7]/30 text-xs font-bold flex items-center justify-between text-[#B7E4C7]">
              <span>Over 50,000+ Learners Trained</span>
              <Sparkles className="w-4 h-4 text-[#E07A5F]" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Competency Pillars */}
      <section className="mb-16 bg-[#F8F9FA] rounded-3xl p-8 sm:p-10 border border-[#B7E4C7]/60">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] block mb-1">
            Our 4 Core Expertise Domains
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#1B4332]">
            Comprehensive Corporate Capability Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {corePillars.map((pil, i) => {
            const Icon = pil.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#B7E4C7]/60 shadow-2xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl border ${pil.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1B4332] font-['Outfit']">
                    {pil.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#1B4332]/75 leading-relaxed">
                  {pil.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Experiential Methodology Diagram (Kolb's Experiential Cycle) */}
      <section className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] block mb-1">
            Our Learning Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-[#1B4332]">
            The Experiential Transformation Cycle
          </h2>
          <p className="text-xs sm:text-sm text-[#1B4332]/70 mt-2">
            Why lecture slides fail and hands-on simulation achieves permanent behavioral change.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experientialCycle.map((cycle, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#B7E4C7]/60 p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <span className="w-7 h-7 rounded-lg bg-[#1B4332] text-[#B7E4C7] font-mono font-bold text-xs flex items-center justify-center mb-3">
                  {i + 1}
                </span>
                <h3 className="text-sm font-bold text-[#1B4332] mb-2">
                  {cycle.stage}
                </h3>
                <p className="text-xs text-[#1B4332]/75 leading-relaxed">
                  {cycle.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#B7E4C7]/30 flex items-center justify-end text-[#E07A5F]">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Voice-Enabled FAQs */}
      <FAQAudioSection
        faqs={aboutFaqs}
        language={language}
        title="About Us & Certifications FAQs"
        subtitle="Click to read detailed credentials and listen in your selected language."
      />
    </div>
  );
};
