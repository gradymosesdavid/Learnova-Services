export type SupportedLanguage =
  | 'en'
  | 'ko'
  | 'ja'
  | 'de'
  | 'ta'
  | 'hi'
  | 'ml'
  | 'kn'
  | 'te';

export interface LanguageInfo {
  code: SupportedLanguage;
  locale: string;
  name: string;
  nativeName: string;
  flag: string;
}

export type PageId =
  | 'home'
  | 'about'
  | 'manufacturing'
  | 'automobile'
  | 'general'
  | 'mandatory'
  | 'leadership-quiz';

export type IndustryType =
  | 'manufacturing'
  | 'automobile'
  | 'it-ites'
  | 'hospitality'
  | 'fmcg'
  | 'retail'
  | 'services';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface LearningStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  keyActions: string[];
  safetyTips: string[];
  toolsRequired: string[];
  verificationCheck: string;
  iconName: string;
  badge?: string;
  imageHint?: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
}

export interface QuizCategorySummary {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'Novice' | 'Developing' | 'Competent' | 'Proficient' | 'Master';
  description: string;
  recommendations: string[];
}

export interface LearnerProgress {
  confirmedSteps: Record<string, boolean>;
  quizAnswers: Record<string, number>;
  completedCertificates: string[];
}
