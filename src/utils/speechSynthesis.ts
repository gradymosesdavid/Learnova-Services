import { SupportedLanguage } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/translations';

export interface AudioState {
  isPlaying: boolean;
  isPaused: boolean;
  currentText: string;
  currentTitle: string;
  language: SupportedLanguage;
  rate: number;
}

type AudioListener = (state: AudioState) => void;

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<AudioListener> = new Set();
  private state: AudioState = {
    isPlaying: false,
    isPaused: false,
    currentText: '',
    currentTitle: '',
    language: 'en',
    rate: 1.0,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      // Pre-load voices if needed
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => {
          // Voices ready
        };
      }
    }
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l({ ...this.state }));
  }

  public getState(): AudioState {
    return { ...this.state };
  }

  public setRate(rate: number) {
    this.state.rate = rate;
    this.notify();
  }

  private findVoiceForLanguage(langCode: SupportedLanguage): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    const targetLang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
    const targetLocale = targetLang?.locale || 'en-US';

    // 1. Exact locale match (e.g. 'ta-IN', 'ko-KR')
    const exact = voices.find((v) => v.lang.toLowerCase() === targetLocale.toLowerCase());
    if (exact) return exact;

    // 2. Language prefix match (e.g. 'ta', 'ko', 'de', 'hi')
    const prefix = voices.find(
      (v) =>
        v.lang.toLowerCase().startsWith(langCode.toLowerCase()) ||
        v.lang.toLowerCase().startsWith(targetLocale.split('-')[0].toLowerCase())
    );
    if (prefix) return prefix;

    // 3. Match by name
    const byName = voices.find((v) =>
      v.name.toLowerCase().includes(targetLang?.name.toLowerCase() || '')
    );
    if (byName) return byName;

    // 4. Default voice or first voice
    return voices.find((v) => v.default) || voices[0] || null;
  }

  public speak(text: string, title: string = 'Audio Narration', langCode: SupportedLanguage = 'en') {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    // Stop any ongoing speech
    this.stop();

    if (!text || text.trim() === '') return;

    // Clean text of markdown/bullets for smoother speech
    const cleanedText = text
      .replace(/[●•*#_`]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    const voice = this.findVoiceForLanguage(langCode);
    if (voice) {
      utterance.voice = voice;
    }
    const targetLang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
    utterance.lang = targetLang?.locale || 'en-US';
    utterance.rate = this.state.rate;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.state.isPlaying = true;
      this.state.isPaused = false;
      this.state.currentText = text;
      this.state.currentTitle = title;
      this.state.language = langCode;
      this.notify();
    };

    utterance.onend = () => {
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.state.currentText = '';
      this.state.currentTitle = '';
      this.notify();
    };

    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      this.state.isPlaying = false;
      this.state.isPaused = false;
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public pause() {
    if (this.synth && this.state.isPlaying && !this.state.isPaused) {
      this.synth.pause();
      this.state.isPaused = true;
      this.notify();
    }
  }

  public resume() {
    if (this.synth && this.state.isPaused) {
      this.synth.resume();
      this.state.isPaused = false;
      this.notify();
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.currentUtterance = null;
    this.state.isPlaying = false;
    this.state.isPaused = false;
    this.state.currentText = '';
    this.state.currentTitle = '';
    this.notify();
  }
}

export const speechService = new SpeechService();
