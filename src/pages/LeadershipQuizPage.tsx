import React, { useState, useMemo } from 'react';
import { SupportedLanguage } from '../types';
import { LEADERSHIP_CATEGORIES, LEADERSHIP_QUESTIONS } from '../data/leadershipQuestions';
import { FAQAudioSection } from '../components/FAQAudioSection';
import { LearnerConfirmationModal } from '../components/LearnerConfirmationModal';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { speechService } from '../utils/speechSynthesis';
import { useFirebase } from '../firebase/context';
import confetti from 'canvas-confetti';
import {
  Award,
  Brain,
  Compass,
  Lightbulb,
  Activity,
  MessageSquare,
  UserCheck,
  CheckCircle2,
  Volume2,
  Globe,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Printer,
  Cloud,
  Check,
} from 'lucide-react';

interface LeadershipQuizPageProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
}

export const LeadershipQuizPage: React.FC<LeadershipQuizPageProps> = ({
  language,
  setLanguage,
}) => {
  const { user, saveEvaluation, signInWithGoogle } = useFirebase();
  const [activeCatIndex, setActiveCatIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavedToCloud, setIsSavedToCloud] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  const currentCategory = LEADERSHIP_CATEGORIES[activeCatIndex];

  // Questions in current category
  const categoryQuestions = useMemo(() => {
    return LEADERSHIP_QUESTIONS.filter((q) => q.category === currentCategory.id);
  }, [currentCategory.id]);

  const totalAnswered = Object.keys(answers).length;
  const totalQuestions = LEADERSHIP_QUESTIONS.length;
  const overallProgress = Math.round((totalAnswered / totalQuestions) * 100);

  const handleScoreChange = (qId: string, score: number) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: score,
    }));
  };

  const fillSampleAnswers = () => {
    const sample: Record<string, number> = {};
    LEADERSHIP_QUESTIONS.forEach((q) => {
      sample[q.id] = Math.floor(Math.random() * 2) + 4; // 4 or 5 mostly
    });
    setAnswers(sample);
  };

  const handleListenQuestion = (questionText: string, qId: string) => {
    speechService.speak(`Question ${qId}: ${questionText}`, `Question ${qId}`, language);
  };

  const handleListenCategory = () => {
    const text = `Category: ${currentCategory.title}. ${currentCategory.description}. There are 15 self-evaluation questions in this dimension.`;
    speechService.speak(text, currentCategory.title, language);
  };

  // Category Score Calculations
  const categoryResults = useMemo(() => {
    return LEADERSHIP_CATEGORIES.map((cat) => {
      const qList = LEADERSHIP_QUESTIONS.filter((q) => q.category === cat.id);
      let catSum = 0;
      let answeredCount = 0;
      qList.forEach((q) => {
        if (answers[q.id]) {
          catSum += answers[q.id];
          answeredCount++;
        }
      });
      const maxScore = qList.length * 5; // 75
      const actualScore = catSum;
      const percentage = Math.round((actualScore / maxScore) * 100);

      let level = 'Developing';
      if (percentage >= 85) level = 'Master Executive';
      else if (percentage >= 70) level = 'Proficient';
      else if (percentage >= 50) level = 'Competent';
      else if (percentage >= 30) level = 'Developing';
      else level = 'Novice';

      return {
        ...cat,
        actualScore,
        maxScore,
        percentage,
        level,
        answeredCount,
      };
    });
  }, [answers]);

  const totalActualScore = Object.values(answers).reduce<number>((a, b) => a + Number(b), 0);
  const maxPossibleScore = totalQuestions * 5; // 525
  const overallScorePercentage = Math.round((totalActualScore / maxPossibleScore) * 100);

  const handleFinishAssessment = async () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const calibratedLevel =
      overallScorePercentage >= 80
        ? 'Master Transformational'
        : overallScorePercentage >= 65
        ? 'Senior Operational Leader'
        : 'Emerging Capability';

    if (user) {
      try {
        const evalId = `EVAL-${Date.now()}`;
        await saveEvaluation({
          evaluationId: evalId,
          participantName: user.displayName || 'Learner Executive',
          participantEmail: user.email || undefined,
          totalScore: totalActualScore,
          percentage: overallScorePercentage,
          calibratedLevel,
          dimensionsBreakdown: JSON.stringify(
            categoryResults.map((c) => ({
              category: c.title,
              score: c.actualScore,
              pct: c.percentage,
              level: c.level,
            }))
          ),
        });
        setIsSavedToCloud(true);
      } catch (err) {
        console.error('Failed to save assessment to Firestore:', err);
      }
    }

    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#1B4332', '#B7E4C7', '#E07A5F', '#255d46'],
      });
    } catch (e) {
      console.warn('Confetti error', e);
    }
  };

  const handleSaveEvaluationToCloudNow = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    const calibratedLevel =
      overallScorePercentage >= 80
        ? 'Master Transformational'
        : overallScorePercentage >= 65
        ? 'Senior Operational Leader'
        : 'Emerging Capability';

    try {
      const evalId = `EVAL-${Date.now()}`;
      await saveEvaluation({
        evaluationId: evalId,
        participantName: user?.displayName || 'Learner Executive',
        participantEmail: user?.email || undefined,
        totalScore: totalActualScore,
        percentage: overallScorePercentage,
        calibratedLevel,
        dimensionsBreakdown: JSON.stringify(
          categoryResults.map((c) => ({
            category: c.title,
            score: c.actualScore,
            pct: c.percentage,
            level: c.level,
          }))
        ),
      });
      setIsSavedToCloud(true);
    } catch (err) {
      console.error('Failed to save assessment to Firestore:', err);
    }
  };

  const quizFaqs = [
    {
      id: 'quiz-faq-1',
      question: 'What methodology underpins the 105-question leadership assessment?',
      answer:
        'The assessment bridges cognitive problem solving, managerial decision theory, human-centered design thinking, Six Sigma DMAIC variance reduction, executive communication, Myers-Briggs psychological drivers, and transformational leadership coaching.',
    },
    {
      id: 'quiz-faq-2',
      question: 'How are scores calibrated across the 1-to-5 Likert scale?',
      answer:
        'A score of 1 reflects "Strongly Disagree / Significant Gap", 2 reflects "Disagree / Inconsistent", 3 is "Neutral / Situational", 4 is "Agree / Consistent Practice", and 5 represents "Strongly Agree / Master Benchmark".',
    },
    {
      id: 'quiz-faq-3',
      question: 'Can this evaluation report be used for annual corporate appraisals?',
      answer:
        'Yes. Many LearnEnlight enterprise clients utilize this comprehensive 7-dimension diagnostic as a standard baseline for executive leadership development and promotional succession planning.',
    },
  ];

  const iconMap: Record<string, React.ElementType> = {
    Brain,
    Compass,
    Lightbulb,
    Activity,
    MessageSquare,
    UserCheck,
    Award,
  };

  const CatIcon = iconMap[currentCategory.icon] || Brain;

  return (
    <div id="leadership-quiz-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#F8F9FA]">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white rounded-3xl p-6 sm:p-10 border border-[#B7E4C7]/30 shadow-xl mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B7E4C7]/20 text-[#B7E4C7] border border-[#B7E4C7]/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>105-Question Self-Evaluation Diagnostic</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-['Outfit'] tracking-tight text-[#F8F9FA]">
              LEARNENLIGHT LEADERSHIP & COMPETENCY ASSESSMENT
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#F8F9FA]/80 max-w-2xl leading-relaxed">
              Comprehensive self-evaluation covering Problem Solving, Decision Making, Design Thinking, Six Sigma, Communication, Myers-Briggs, and Leadership Style.
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
              onClick={() => {
                const intro = `LearnEnlight Leadership Self-Evaluation Assessment. 105 Questions across 7 dimensions: Problem Solving, Decision Making, Design Thinking, Six Sigma, Business Communication, Myers-Briggs, and Leadership Style. Rate each statement from 1 to 5.`;
                speechService.speak(intro, 'Leadership Assessment Overview', language);
              }}
              className="px-4 py-2 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold flex items-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.listenAudio}</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-8 pt-6 border-t border-[#B7E4C7]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7]">
              Assessment Completion:
            </span>
            <span className="text-xs font-mono font-bold text-[#E07A5F]">
              {totalAnswered} of {totalQuestions} Questions Evaluated ({overallProgress}%)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-40 sm:w-56 h-2.5 bg-[#143326] rounded-full overflow-hidden border border-[#B7E4C7]/30">
              <div
                className="h-full bg-gradient-to-r from-[#B7E4C7] to-[#E07A5F] transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>

            {totalAnswered < 105 && (
              <button
                onClick={fillSampleAnswers}
                className="text-[11px] font-semibold text-[#B7E4C7] hover:text-[#E07A5F] transition underline underline-offset-2 cursor-pointer"
                title="Populate test scores quickly"
              >
                Auto-fill Sample
              </button>
            )}

            {totalAnswered >= 15 && !showResults && (
              <button
                onClick={handleFinishAssessment}
                className="px-3 py-1.5 rounded-lg bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold flex items-center gap-1 transition shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>View Leadership Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {!showResults ? (
        <>
          {/* 7 Categories Stepper Bar */}
          <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {LEADERSHIP_CATEGORIES.map((cat, idx) => {
              const isSelected = idx === activeCatIndex;
              const catQs = LEADERSHIP_QUESTIONS.filter((q) => q.category === cat.id);
              const catAnswered = catQs.filter((q) => answers[q.id]).length;
              const isCatComplete = catAnswered === catQs.length;

              return (
                <button
                  key={cat.id}
                  id={`cat-nav-${idx}`}
                  onClick={() => setActiveCatIndex(idx)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between min-h-[75px] cursor-pointer ${
                    isSelected
                      ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-md ring-2 ring-[#B7E4C7]/40'
                      : isCatComplete
                      ? 'bg-[#B7E4C7]/40 text-[#1B4332] border-[#B7E4C7]'
                      : 'bg-white hover:bg-[#B7E4C7]/20 text-[#1B4332] border-[#B7E4C7]/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase">
                    <span>DIM 0{idx + 1}</span>
                    {isCatComplete ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
                    ) : (
                      <span className="text-[#1B4332]/60">{catAnswered}/15</span>
                    )}
                  </div>
                  <div className="text-xs font-bold truncate mt-1">
                    {cat.title.split('&')[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Category Header Card */}
          <div className="bg-white rounded-3xl border border-[#B7E4C7]/60 shadow-xs p-6 sm:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#B7E4C7]/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#B7E4C7]/40 text-[#1B4332] flex items-center justify-center font-bold border border-[#B7E4C7]">
                  <CatIcon className="w-6 h-6 text-[#E07A5F]" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
                    Dimension {activeCatIndex + 1} of 7 • 15 Questions
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black font-['Outfit'] text-[#1B4332]">
                    {currentCategory.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleListenCategory}
                  className="px-3.5 py-2 rounded-xl bg-[#F8F9FA] hover:bg-[#B7E4C7]/20 text-[#1B4332] text-xs font-bold flex items-center gap-1.5 transition border border-[#B7E4C7] cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-[#E07A5F]" />
                  <span>Listen Dimension ({currentLangObj?.nativeName})</span>
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#1B4332]/80 leading-relaxed max-w-3xl">
              {currentCategory.description}
            </p>
          </div>

          {/* Category Questions List (15 Questions) */}
          <div className="space-y-4 mb-10">
            {categoryQuestions.map((q) => {
              const currentScore = answers[q.id] || 0;
              return (
                <div
                  key={q.id}
                  id={`question-card-${q.id}`}
                  className={`p-5 rounded-2xl border transition-all ${
                    currentScore > 0
                      ? 'bg-white border-[#B7E4C7] shadow-xs'
                      : 'bg-white border-[#B7E4C7]/50 hover:border-[#B7E4C7]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span className="px-2 py-1 rounded-lg bg-[#B7E4C7]/40 text-[#1B4332] font-mono font-bold text-xs shrink-0 mt-0.5 border border-[#B7E4C7]">
                        {q.id}
                      </span>
                      <div>
                        <p className="text-sm sm:text-base font-semibold text-[#1B4332] leading-snug">
                          {q.question}
                        </p>
                        <span className="text-[11px] text-[#1B4332]/60">
                          {q.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleListenQuestion(q.question, q.id)}
                        className="p-2 rounded-xl text-[#1B4332]/60 hover:text-[#E07A5F] hover:bg-[#B7E4C7]/20 transition cursor-pointer"
                        title="Listen to question"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      {/* 1-5 Score Buttons */}
                      <div className="flex items-center gap-1 bg-[#F8F9FA] p-1 rounded-xl border border-[#B7E4C7]/60">
                        {[1, 2, 3, 4, 5].map((scoreVal) => (
                          <button
                            key={scoreVal}
                            onClick={() => handleScoreChange(q.id, scoreVal)}
                            className={`w-9 h-9 rounded-lg text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                              currentScore === scoreVal
                                ? 'bg-[#E07A5F] text-white font-black shadow-sm scale-105'
                                : 'text-[#1B4332] hover:bg-[#B7E4C7]/30'
                            }`}
                            title={`Rate ${scoreVal} out of 5`}
                          >
                            {scoreVal}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper Footer Controls */}
          <div className="flex items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-[#B7E4C7]/60 mb-12 shadow-xs">
            <button
              disabled={activeCatIndex === 0}
              onClick={() => {
                setActiveCatIndex((prev) => Math.max(0, prev - 1));
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl border border-[#B7E4C7] text-[#1B4332] font-bold text-xs flex items-center gap-2 hover:bg-[#B7E4C7]/20 transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Dimension</span>
            </button>

            <span className="text-xs font-semibold text-[#1B4332]/70">
              Dimension {activeCatIndex + 1} of 7
            </span>

            {activeCatIndex < LEADERSHIP_CATEGORIES.length - 1 ? (
              <button
                onClick={() => {
                  setActiveCatIndex((prev) => Math.min(LEADERSHIP_CATEGORIES.length - 1, prev + 1));
                  window.scrollTo({ top: 180, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <span>Next Dimension</span>
                <ArrowRight className="w-4 h-4 text-[#B7E4C7]" />
              </button>
            ) : (
              <button
                onClick={handleFinishAssessment}
                className="px-6 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white font-black text-xs flex items-center gap-2 transition shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Calculate Leadership Profile</span>
              </button>
            )}
          </div>
        </>
      ) : (
        /* Comprehensive Leadership Evaluation Profile Report */
        <div id="leadership-assessment-results" className="space-y-8 mb-12">
          {/* Result Header */}
          <div className="bg-white rounded-3xl border border-[#B7E4C7]/60 shadow-md p-8 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#B7E4C7]/30">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] border border-[#B7E4C7] text-xs font-extrabold uppercase tracking-wide">
                  Executive Assessment Completed
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#1B4332] mt-2">
                  Personalized Leadership & Competency Profile
                </h2>
                <p className="text-xs sm:text-sm text-[#1B4332]/75 mt-1">
                  Evaluated across 105 behavioral and operational indicators based on LearnEnlight's experiential capability model.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowResults(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#B7E4C7] text-[#1B4332] font-bold text-xs hover:bg-[#B7E4C7]/20 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#E07A5F]" />
                  <span>Review Answers</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#B7E4C7]" />
                  <span>Print Report</span>
                </button>
                {isSavedToCloud ? (
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs">
                    <Check className="w-4 h-4" />
                    <span>Saved to Cloud</span>
                  </span>
                ) : (
                  <button
                    onClick={handleSaveEvaluationToCloudNow}
                    className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                  >
                    <Cloud className="w-4 h-4 text-[#B7E4C7]" />
                    <span>{user ? 'Save to Cloud' : 'Sign in & Save'}</span>
                  </button>
                )}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white font-extrabold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Official Certificate</span>
                </button>
              </div>
            </div>

            {/* Overall Score Highlight */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B7E4C7]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] block mb-1">
                  Overall Leadership Score
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-['Outfit'] text-[#1B4332]">
                    {totalActualScore}
                  </span>
                  <span className="text-sm font-semibold text-[#1B4332]/60">/ 525</span>
                </div>
                <span className="text-xs text-[#1B4332] font-semibold mt-1 block">
                  {overallScorePercentage}% Total Competency Alignment
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#B7E4C7]/20 border border-[#B7E4C7]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                  Calibrated Leadership Level
                </span>
                <span className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#1B4332] block mt-1">
                  {overallScorePercentage >= 80
                    ? 'Master Transformational'
                    : overallScorePercentage >= 65
                    ? 'Senior Operational Leader'
                    : 'Emerging Capability'}
                </span>
                <span className="text-xs text-[#1B4332]/80 font-medium mt-1 block">
                  Based on Kirkpatrick & AoN benchmarks
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-[#B7E4C7]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] block mb-1">
                  Evaluated Categories
                </span>
                <span className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#1B4332] block mt-1">
                  7 of 7 Dimensions
                </span>
                <span className="text-xs text-[#1B4332]/80 font-medium mt-1 block">
                  100% verified question responses
                </span>
              </div>
            </div>
          </div>

          {/* 7 Dimensions Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryResults.map((catRes) => (
              <div
                key={catRes.id}
                className="bg-white rounded-3xl border border-[#B7E4C7]/60 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-[#1B4332]/60 uppercase">
                      {catRes.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E4C7]/40 text-[#1B4332] border border-[#B7E4C7]">
                      {catRes.level}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1B4332] font-['Outfit'] mb-1">
                    {catRes.title}
                  </h3>

                  <div className="my-4">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-medium text-[#1B4332]/70">Dimension Score</span>
                      <span className="font-mono font-bold text-[#1B4332]">
                        {catRes.actualScore} / {catRes.maxScore} ({catRes.percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#F8F9FA] rounded-full overflow-hidden border border-[#B7E4C7]/30">
                      <div
                        className="h-full bg-gradient-to-r from-[#B7E4C7] to-[#E07A5F]"
                        style={{ width: `${catRes.percentage}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-[#1B4332]/75 leading-relaxed">
                    {catRes.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#B7E4C7]/30 flex items-center justify-between text-xs font-semibold text-[#1B4332]/70">
                  <span>{catRes.answeredCount} evaluated</span>
                  <CheckCircle2 className="w-4 h-4 text-[#1B4332]" />
                </div>
              </div>
            ))}
          </div>

          {/* Strategic Action Plan */}
          <div className="p-8 rounded-3xl bg-[#1B4332] text-white shadow-xl border border-[#B7E4C7]/30">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7] block mb-1">
                LearnEnlight Experiential Roadmap
              </span>
              <h3 className="text-2xl font-black font-['Outfit'] text-[#F8F9FA]">
                Next-Step Developmental Interventions
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#F8F9FA]/80 leading-relaxed">
                To bridge capability gaps identified in this 105-question audit, enroll in LearnEnlight's experiential simulation modules in your sector (Manufacturing, Automobile, IT/ITES, Hospitality, or General Services).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Voice-Enabled Leadership Quiz FAQs */}
      <FAQAudioSection
        faqs={quizFaqs}
        language={language}
        title="Leadership Assessment & Methodology FAQs"
        subtitle="Listen to voice explanations regarding Likert metrics, validity, and executive reporting."
      />

      {/* Confirmation / Certificate Modal */}
      <LearnerConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programTitle="105-Question Leadership & Competency Assessment"
        totalSteps={totalQuestions}
        confirmedCount={totalAnswered}
        language={language}
      />
    </div>
  );
};
