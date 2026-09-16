import React, { useEffect, useState } from 'react';
import { Volume2, Pause, Play, Square } from 'lucide-react';
import { speechService, AudioState } from '../utils/speechSynthesis';
import { SUPPORTED_LANGUAGES } from '../data/translations';

interface AudioPlayerBarProps {
  language: string;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = () => {
  const [audioState, setAudioState] = useState<AudioState>(speechService.getState());

  useEffect(() => {
    const unsubscribe = speechService.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  if (!audioState.isPlaying && !audioState.isPaused) {
    return null;
  }

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === audioState.language);

  const togglePlayPause = () => {
    if (audioState.isPaused) {
      speechService.resume();
    } else {
      speechService.pause();
    }
  };

  const handleStop = () => {
    speechService.stop();
  };

  const toggleSpeed = () => {
    const nextRate = audioState.rate === 1.0 ? 1.25 : audioState.rate === 1.25 ? 0.85 : 1.0;
    speechService.setRate(nextRate);
  };

  return (
    <div
      id="learnova-floating-audio-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-2xl bg-[#1B4332]/95 backdrop-blur-md text-[#F8F9FA] px-4 py-3 rounded-2xl shadow-2xl border border-[#B7E4C7]/40 flex items-center justify-between gap-3 animate-bounce-subtle"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#B7E4C7]/20 text-[#B7E4C7] border border-[#B7E4C7]/30 shrink-0">
          <Volume2 className="w-5 h-5 animate-pulse" />
          <span className="absolute -top-1 -right-1 text-xs">{currentLang?.flag}</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B7E4C7]">
              {audioState.isPaused ? 'Audio Paused' : 'Voice Narration'}
            </span>
            <span className="text-xs text-[#B7E4C7]/80 truncate">
              ({currentLang?.nativeName || 'English'})
            </span>
          </div>
          <p className="text-sm font-medium text-[#F8F9FA] truncate max-w-xs md:max-w-md">
            {audioState.currentTitle || 'Experiential Learning Guide'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          id="audio-speed-btn"
          onClick={toggleSpeed}
          title="Adjust Voice Speed"
          className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-[#143326] text-[#B7E4C7] hover:bg-[#255d46] transition border border-[#B7E4C7]/20 cursor-pointer"
        >
          {audioState.rate}x
        </button>

        <button
          id="audio-play-pause-btn"
          onClick={togglePlayPause}
          className="p-2.5 rounded-xl bg-[#E07A5F] text-white hover:bg-[#C9664D] transition shadow-md font-semibold flex items-center justify-center cursor-pointer"
          title={audioState.isPaused ? 'Resume' : 'Pause'}
        >
          {audioState.isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
        </button>

        <button
          id="audio-stop-btn"
          onClick={handleStop}
          className="p-2.5 rounded-xl bg-[#143326] hover:bg-[#E07A5F]/20 hover:text-[#E07A5F] text-[#B7E4C7] transition cursor-pointer"
          title="Stop Narration"
        >
          <Square className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
