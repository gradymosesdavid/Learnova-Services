import React, { useState, useEffect } from 'react';
import { X, Award, Printer, ShieldCheck, Sparkles, Cloud, Check, LogIn } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SupportedLanguage } from '../types';
import { useFirebase } from '../firebase/context';

interface LearnerConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  programTitle: string;
  totalSteps: number;
  confirmedCount: number;
  language: SupportedLanguage;
}

export const LearnerConfirmationModal: React.FC<LearnerConfirmationModalProps> = ({
  isOpen,
  onClose,
  programTitle,
  totalSteps,
  confirmedCount,
}) => {
  const { user, saveCertificate, signInWithGoogle } = useFirebase();
  const [learnerName, setLearnerName] = useState(user?.displayName || '');
  const [organization, setOrganization] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [certificateIssued, setCertificateIssued] = useState(false);
  const [certId, setCertId] = useState('');
  const [isSavedToCloud, setIsSavedToCloud] = useState(false);

  useEffect(() => {
    if (user?.displayName && !learnerName) {
      setLearnerName(user.displayName);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerName.trim() || !hasAgreed) return;

    const newId = `LS-${Math.floor(100000 + Math.random() * 900000)}-${new Date().getFullYear()}`;
    setCertId(newId);
    setCertificateIssued(true);

    // Save to Firestore if user authenticated
    if (user) {
      try {
        await saveCertificate({
          certificateId: newId,
          learnerName: learnerName.trim(),
          learnerEmail: user.email || undefined,
          programTitle,
          verificationCode: newId,
          status: 'verified',
          hoursCompleted: totalSteps,
          score: 100,
        });
        setIsSavedToCloud(true);
      } catch (err) {
        console.error('Failed to auto-save certificate to Firestore:', err);
      }
    }

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#1B4332', '#B7E4C7', '#E07A5F', '#255d46'],
      });
    } catch (err) {
      console.warn('Confetti unavailable', err);
    }
  };

  const handleSaveToCloudNow = async () => {
    if (!user) {
      await signInWithGoogle();
    }
    if (certId) {
      try {
        await saveCertificate({
          certificateId: certId,
          learnerName: learnerName.trim(),
          learnerEmail: user?.email || undefined,
          programTitle,
          verificationCode: certId,
          status: 'verified',
          hoursCompleted: totalSteps,
          score: 100,
        });
        setIsSavedToCloud(true);
      } catch (err) {
        console.error('Failed to save to cloud:', err);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143326]/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#F8F9FA] rounded-3xl shadow-2xl border border-[#B7E4C7] overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white p-6 flex items-center justify-between border-b border-[#B7E4C7]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center font-bold shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] tracking-tight">
                {certificateIssued ? 'Learnova Services Verified Certificate' : 'Learner Practical Sign-Off & Verification'}
              </h3>
              <p className="text-xs text-[#B7E4C7] font-medium">
                {programTitle} • {confirmedCount} of {totalSteps} Checkpoints Confirmed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#B7E4C7] hover:text-white hover:bg-[#143326] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {!certificateIssued ? (
            <form onSubmit={handleIssueCertificate} className="space-y-5">
              <div className="bg-[#B7E4C7]/30 rounded-2xl p-4 border border-[#B7E4C7] text-xs text-[#1B4332] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#E07A5F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-sm">Experiential Competency Validation</span>
                  By submitting your confirmation, you declare that you have actively inspected the step-by-step technical procedures, adhered to occupational safety protocols, and verified each mechanical or systemic checkpoint.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1.5">
                  Learner Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Alexandra Sterling, P.Eng"
                  value={learnerName}
                  onChange={(e) => setLearnerName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#B7E4C7] focus:outline-none focus:ring-2 focus:ring-[#1B4332] bg-white text-[#1B4332] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1.5">
                  Organization / Plant / Department
                </label>
                <input
                  type="text"
                  placeholder="e.g., Apex Global Manufacturing - Assembly Line 4"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-[#B7E4C7] focus:outline-none focus:ring-2 focus:ring-[#1B4332] bg-white text-[#1B4332] transition"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={hasAgreed}
                    onChange={(e) => setHasAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#B7E4C7] text-[#1B4332] focus:ring-[#1B4332] accent-[#1B4332] cursor-pointer"
                  />
                  <span className="text-xs text-[#1B4332]/80 leading-snug">
                    I formally confirm that I have reviewed the standard operating procedures, verified all torque/ESD safety criteria, and demonstrated experiential proficiency in accordance with Learnova Services guidelines.
                  </span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#B7E4C7]/40">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#1B4332]/70 hover:text-[#1B4332] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!learnerName.trim() || !hasAgreed}
                  className="px-6 py-2.5 text-xs font-bold rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Issue & Generate Certificate</span>
                </button>
              </div>
            </form>
          ) : (
            /* Printable Verifiable Certificate View */
            <div className="space-y-6">
              <div
                id="printable-certificate"
                className="p-8 rounded-2xl border-4 border-double border-[#1B4332] bg-white text-center relative overflow-hidden shadow-inner"
              >
                <div className="text-xs uppercase tracking-widest font-extrabold text-[#E07A5F]">
                  Learnova Services — Learn & Innovate Mindsets & Ideas
                </div>
                <h4 className="text-2xl sm:text-3xl font-black font-['Outfit'] text-[#1B4332] mt-2 mb-1 tracking-tight">
                  CERTIFICATE OF EXPERIENTIAL MASTERY
                </h4>
                <p className="text-xs text-[#1B4332]/70 uppercase tracking-wider font-semibold">
                  Practical Capability & Standard Operating Procedure Verification
                </p>

                <div className="my-6">
                  <span className="text-xs text-[#1B4332]/60">This officially certifies that</span>
                  <div className="text-xl sm:text-2xl font-black text-[#1B4332] font-['Outfit'] border-b-2 border-[#E07A5F] inline-block px-8 py-1 mt-1">
                    {learnerName}
                  </div>
                  {organization && (
                    <div className="text-xs font-medium text-[#1B4332]/80 mt-1">
                      {organization}
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#1B4332]/80 max-w-md mx-auto leading-relaxed">
                  has successfully completed all hands-on experiential training modules, procedural safety verifications, and operational simulations for{' '}
                  <span className="font-bold text-[#1B4332]">{programTitle}</span>.
                </p>

                <div className="mt-8 pt-6 border-t border-[#B7E4C7] grid grid-cols-2 gap-4 text-left text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#1B4332]/60 block">Certificate ID</span>
                    <span className="font-mono font-bold text-[#1B4332]">{certId}</span>
                    <span className="text-[10px] text-[#1B4332]/60 block mt-0.5">
                      Issue Date: {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#1B4332]/60 block">Certified By</span>
                    <span className="font-bold text-[#1B4332]">Learnova Services L&D Council</span>
                    <span className="text-[10px] text-[#E07A5F] font-semibold block">AoN & Cambridge Accredited</span>
                  </div>
                </div>
              </div>

              {/* Cloud Sync Status / Action */}
              <div className="bg-[#B7E4C7]/20 border border-[#B7E4C7] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-[#1B4332]" />
                  <span className="text-xs text-[#1B4332] font-semibold">
                    {isSavedToCloud
                      ? 'Stored securely in your Learnova Services Firebase Cloud Profile'
                      : user
                      ? 'Ready to sync to your Firebase cloud account'
                      : 'Sign in to save this credential to your persistent Learner Cloud account'}
                  </span>
                </div>
                {isSavedToCloud ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved in Cloud</span>
                  </span>
                ) : (
                  <button
                    onClick={handleSaveToCloudNow}
                    className="px-3 py-1.5 rounded-lg bg-[#1B4332] hover:bg-[#143326] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Cloud className="w-3.5 h-3.5 text-[#B7E4C7]" />
                    <span>{user ? 'Save to Cloud' : 'Sign in & Save'}</span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setCertificateIssued(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#1B4332]/70 hover:text-[#1B4332] cursor-pointer"
                >
                  Edit Details
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#B7E4C7]" />
                    <span>Print / Save as PDF</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
