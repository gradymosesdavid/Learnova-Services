import React, { useState } from 'react';
import {
  Clock,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle,
  Calendar,
  DollarSign,
  Users,
  Bot,
  Volume2,
  ShieldCheck,
  BarChart3,
  Flame,
  Send,
} from 'lucide-react';
import { speechService } from '../utils/speechSynthesis';
import { SupportedLanguage } from '../types';
import { CorporateInquiryModal } from './CorporateInquiryModal';

interface RoiAcceleratorProps {
  language: SupportedLanguage;
}

export const RoiAcceleratorDiagram: React.FC<RoiAcceleratorProps> = ({ language }) => {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [learnersCount, setLearnersCount] = useState<number>(120);
  const [avgTrainingCost, setAvgTrainingCost] = useState<number>(450);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const stages = [
    {
      stage: 1,
      title: 'RAPID PoC & GOAL SETTING',
      timeframe: '48h',
      headerBg: 'bg-[#1B4332]',
      pillBg: 'bg-[#B7E4C7]/40 text-[#1B4332] border-[#B7E4C7]',
      description: 'NEEDS ANALYSIS & INITIAL SOLUTION FRAMEWORK. Proof of Concept delivered in 48 Hours.',
      details: [
        'Rapid competency diagnostic across shop-floor and managerial cohorts',
        'Solution architecture alignment with business goals',
        'Measurable baseline KPI scoping and ROI metric establishment',
      ],
      icon: Clock,
      highlightText: 'PoC in 48 Hours',
    },
    {
      stage: 2,
      title: 'FAST-TRACK PROJECT START',
      timeframe: '48h',
      headerBg: 'bg-[#255d46]',
      pillBg: 'bg-[#B7E4C7]/40 text-[#1B4332] border-[#B7E4C7]',
      description: 'START ALL PROJECTS WITHIN 48 HOURS (Soft Skills, Simulations, Tech Solutions, Exercise).',
      details: [
        'Immediate deployment of experiential learning modules',
        'Integration of interactive technical & behavioral simulators',
        'Hands-on practical exercises replacing passive lecture slide decks',
      ],
      icon: Users,
      highlightText: 'Start within 48 Hours',
    },
    {
      stage: 3,
      title: 'AI-DRIVEN EVALUATION & OUTCOMES',
      timeframe: 'Continuous',
      headerBg: 'bg-[#1B4332]',
      pillBg: 'bg-[#B7E4C7]/40 text-[#1B4332] border-[#B7E4C7]',
      description: 'AI-BASED EVALUATION. Real-time Analysis & Personalized Outcome Tracking.',
      details: [
        'Adaptive learning paths tailored dynamically to learner pace',
        'Data-driven proficiency benchmarking and behavioral indicators',
        'Continuous automated feedback with predictive intervention triggers',
      ],
      icon: Bot,
      highlightText: 'Real-Time Insights',
    },
    {
      stage: 4,
      title: 'MEASURABLE PERFORMANCE GAINS',
      timeframe: 'Post-Training',
      headerBg: 'bg-[#255d46]',
      pillBg: 'bg-[#B7E4C7]/40 text-[#1B4332] border-[#B7E4C7]',
      description: 'KPI IMPROVEMENT. Skill Application, Efficiency Gains & Guaranteed Business Impact.',
      details: [
        'Measurable reduction in shop-floor errors & process cycle-time',
        'Guaranteed impact verification via structured Kirkpatrick Level 3/4 checks',
        'Direct correlation of behavioral gains to team productivity outputs',
      ],
      icon: TrendingUp,
      highlightText: 'Guaranteed Impact',
    },
    {
      stage: 5,
      title: 'FOLLOW-UP & OPTIMIZATION',
      timeframe: '30 Days After',
      headerBg: 'bg-[#143326]',
      pillBg: 'bg-[#B7E4C7]/40 text-[#1B4332] border-[#B7E4C7]',
      description: 'POST-PROGRAM FOLLOW-UP & REVIEW. Sustained Reinforcement & Continuous Improvement.',
      details: [
        'Day-30 and Day-60 retention auditing and refresher coaching',
        'Managerial feedback loops confirming behavioral persistence',
        'Sustained organizational transformation and continuous optimization',
      ],
      icon: Calendar,
      highlightText: '30 Days After Review',
    },
  ];

  const handleReadDiagram = () => {
    const summaryText = `Learnova Services' Simplified L and D RoI Accelerator Model guarantees three times return on investment and rapid deployment. 
    Stage 1: Rapid Proof of Concept and Goal Setting with needs analysis in 48 hours. 
    Stage 2: Fast-Track Project Start within 48 hours for soft skills, simulations, and tech solutions. 
    Stage 3: AI-Driven Evaluation and real-time personalized outcome tracking. 
    Stage 4: Measurable Performance Gains, KPI improvements, and guaranteed business impact. 
    Stage 5: Follow-up and optimization thirty days after for sustained organizational value.`;
    speechService.speak(summaryText, 'Learnova Services 3X RoI Accelerator Model', language);
  };

  // 3X ROI Calculations
  const totalInvestment = learnersCount * avgTrainingCost;
  const projectedValueReturn = totalInvestment * 3.2;
  const netSavings = projectedValueReturn - totalInvestment;

  return (
    <section id="roi-accelerator-section" className="py-12 bg-white rounded-3xl border border-[#B7E4C7]/50 shadow-sm p-6 sm:p-8 lg:p-10 my-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#B7E4C7]/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7E4C7]/30 text-[#1B4332] border border-[#B7E4C7] text-xs font-bold tracking-wide uppercase mb-2">
            <Flame className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>Learnova Services Proprietary Methodology</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1B4332] tracking-tight font-['Outfit'] uppercase">
            SIMPLIFIED L&D RoI ACCELERATOR MODEL: 3X ROI AND RAPID DEPLOYMENT
          </h2>
          <p className="text-[#1B4332]/70 text-sm mt-1">
            Accelerating corporate capability development with guaranteed velocity and quantifiable returns.
          </p>
        </div>

        <button
          onClick={handleReadDiagram}
          className="self-start md:self-center flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold shadow-xs transition cursor-pointer"
          title="Audio narration of the ROI model"
        >
          <Volume2 className="w-4 h-4 text-white" />
          <span>Listen to Model</span>
        </button>
      </div>

      {/* Main Diagram Layout */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-stretch">
        {stages.map((stg) => {
          const isSelected = activeStage === stg.stage;
          const IconComponent = stg.icon;
          return (
            <div
              key={stg.stage}
              id={`roi-stage-card-${stg.stage}`}
              onClick={() => setActiveStage(isSelected ? null : stg.stage)}
              className={`rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between p-4 ${
                isSelected
                  ? 'border-[#E07A5F] shadow-lg ring-2 ring-[#E07A5F]/20 bg-[#F8F9FA] scale-102'
                  : 'border-[#B7E4C7]/60 hover:border-[#1B4332] hover:shadow-md bg-white'
              }`}
            >
              <div>
                {/* Stage Header */}
                <div className="flex items-center justify-between gap-2 pb-2">
                  <span className="text-[11px] font-mono font-bold text-[#1B4332]/60 uppercase">
                    Stage {stg.stage}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E4C7]/40 text-[#1B4332]">
                    {stg.timeframe}
                  </span>
                </div>

                <div className={`p-2 rounded-xl text-white font-bold text-xs uppercase tracking-tight text-center my-2 ${stg.headerBg}`}>
                  {stg.title}
                </div>

                {/* Graphical Visualizer */}
                <div className="my-4 flex flex-col items-center justify-center p-4 rounded-xl bg-[#F8F9FA] border border-[#B7E4C7]/30 text-center">
                  <div className="relative w-16 h-16 rounded-full bg-white shadow-xs border border-[#B7E4C7] flex items-center justify-center text-[#1B4332] mb-2">
                    <IconComponent className="w-8 h-8 text-[#1B4332]" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E07A5F] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E07A5F]"></span>
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1B4332] font-mono">
                    {stg.highlightText}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-[#1B4332]/80 font-medium leading-relaxed">
                  {stg.description}
                </p>
              </div>

              {/* Sub-Details */}
              <div className="mt-4 pt-3 border-t border-[#B7E4C7]/30">
                <ul className="space-y-1.5">
                  {stg.details.map((det, i) => (
                    <li key={i} className="text-[11px] text-[#1B4332]/70 flex items-start gap-1.5">
                      <CheckCircle className="w-3 h-3 text-[#1B4332] shrink-0 mt-0.5" />
                      <span>{det}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        {/* 3X ROI Outcome Column */}
        <div className="rounded-2xl border-2 border-[#E07A5F] bg-gradient-to-br from-[#1B4332] via-[#255d46] to-[#143326] p-5 flex flex-col items-center justify-between text-center shadow-md text-white">
          <div className="w-full">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#E07A5F] text-white">
              Guaranteed Outcome
            </span>
            <div className="mt-4 mb-2">
              <span className="text-4xl sm:text-5xl font-black font-['Outfit'] text-[#B7E4C7] tracking-tight">
                3X ROI
              </span>
            </div>
            <p className="text-xs font-bold text-[#F8F9FA] uppercase tracking-wide">
              Sustained Organizational Value
            </p>
          </div>

          <div className="my-4 p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-[#B7E4C7]/30 w-full text-left space-y-2 text-xs text-[#F8F9FA]">
            <div className="flex items-center gap-2 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#B7E4C7] shrink-0" />
              <span>Kirkpatrick L4 Measured</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <DollarSign className="w-4 h-4 text-[#E07A5F] shrink-0" />
              <span>Rapid Deployment (48h)</span>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <Sparkles className="w-4 h-4 text-[#B7E4C7] shrink-0" />
              <span>AI-Augmented Velocity</span>
            </div>
          </div>

          <div className="w-full">
            <a
              href="#roi-calculator"
              className="block w-full py-2 px-3 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white font-bold text-xs shadow-xs transition text-center cursor-pointer"
            >
              Calculate Your 3X ROI
            </a>
          </div>
        </div>
      </div>

      {/* Footer Banner from Graphic */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs border border-[#B7E4C7]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#B7E4C7]">
              L&D PARTNERSHIP BENEFITS
            </div>
            <div className="text-xs text-[#F8F9FA]/80 font-medium">
              RAPID RESULTS • GUARANTEED IMPACT • AI-AUGMENTED INSIGHTS
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#F8F9FA]/90">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#B7E4C7]"></span> 48-Hour PoC
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#E07A5F]"></span> Adaptive AI
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#B7E4C7]"></span> 3X Value Realized
          </span>
        </div>
      </div>

      {/* Interactive 3X ROI Calculator for Organizations */}
      <div id="roi-calculator" className="mt-8 p-6 rounded-2xl bg-[#F8F9FA] border border-[#B7E4C7]/50">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-[#E07A5F]" />
          <h3 className="text-base font-bold text-[#1B4332]">
            Learnova Services 3X Corporate ROI Estimator
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-[#1B4332] mb-1">
              Participating Learners / Employees: <span className="text-[#E07A5F] font-mono text-sm">{learnersCount}</span>
            </label>
            <input
              type="range"
              min="20"
              max="1000"
              step="10"
              value={learnersCount}
              onChange={(e) => setLearnersCount(Number(e.target.value))}
              className="w-full accent-[#1B4332] cursor-pointer"
            />
            <span className="text-[11px] text-[#1B4332]/60">Scale across plants, stores, or IT engineering units</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1B4332] mb-1">
              Average Investment per Learner: <span className="text-[#E07A5F] font-mono text-sm">${avgTrainingCost}</span>
            </label>
            <input
              type="range"
              min="150"
              max="2000"
              step="50"
              value={avgTrainingCost}
              onChange={(e) => setAvgTrainingCost(Number(e.target.value))}
              className="w-full accent-[#1B4332] cursor-pointer"
            />
            <span className="text-[11px] text-[#1B4332]/60">Includes experiential simulation licenses & coaching</span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#B7E4C7]/60 flex flex-col justify-between shadow-2xs">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#1B4332]/70">Total Program Cost:</span>
              <span className="font-mono font-bold text-[#1B4332]">${totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-[#1B4332]/70">Projected 3X Value:</span>
              <span className="font-mono font-bold text-[#1B4332] text-sm">${Math.round(projectedValueReturn).toLocaleString()}</span>
            </div>
            <div className="mt-2 pt-2 border-t border-[#B7E4C7]/30 flex justify-between items-center">
              <span className="text-xs font-bold text-[#1B4332]">Net Organizational Gain:</span>
              <span className="font-mono font-extrabold text-[#E07A5F] text-base">+${Math.round(netSavings).toLocaleString()}</span>
            </div>

            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="mt-3 w-full py-2.5 px-3 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Book 48h PoC & Save Proposal</span>
            </button>
          </div>
        </div>
      </div>

      <CorporateInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        learnersCount={learnersCount}
        avgTrainingCost={avgTrainingCost}
        netSavings={netSavings}
        projectedValue={projectedValueReturn}
      />
    </section>
  );
};
