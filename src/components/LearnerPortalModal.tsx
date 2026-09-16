import React, { useState } from 'react';
import {
  X,
  Award,
  FileText,
  Calendar,
  ShieldCheck,
  Printer,
  ExternalLink,
  CheckCircle2,
  Brain,
  LogOut,
  User,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useFirebase, StoredCertificate, StoredEvaluation } from '../firebase/context';

interface LearnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCertificate?: (cert: StoredCertificate) => void;
}

export const LearnerPortalModal: React.FC<LearnerPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, userProfile, certificates, evaluations, logout } = useFirebase();
  const [activeTab, setActiveTab] = useState<'certificates' | 'evaluations'>('certificates');
  const [selectedCertForPrint, setSelectedCertForPrint] = useState<StoredCertificate | null>(null);

  if (!isOpen) return null;

  const handlePrintCert = (cert: StoredCertificate) => {
    setSelectedCertForPrint(cert);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143326]/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#F8F9FA] rounded-3xl shadow-2xl border border-[#B7E4C7] overflow-hidden my-6 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white p-6 flex items-center justify-between border-b border-[#B7E4C7]/30 shrink-0">
          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Learner'}
                className="w-12 h-12 rounded-2xl border-2 border-[#B7E4C7] object-cover shadow-sm"
              />
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'L'}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black font-['Outfit'] tracking-tight">
                  {user?.displayName || 'Learner Portal'}
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-[#B7E4C7]/30 text-[#B7E4C7] border border-[#B7E4C7]/40">
                  {userProfile?.role || 'Learner'}
                </span>
              </div>
              <p className="text-xs text-[#B7E4C7]/80 font-medium">
                {user?.email} • Cloud Synchronized
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                await logout();
                onClose();
              }}
              className="px-3 py-1.5 rounded-xl border border-red-400/40 text-red-200 hover:text-white hover:bg-red-500/20 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#B7E4C7] hover:text-white hover:bg-[#143326] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 px-6 pt-4 border-b border-[#B7E4C7]/40 bg-white shrink-0">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 px-2 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'certificates'
                ? 'border-[#E07A5F] text-[#1B4332]'
                : 'border-transparent text-[#1B4332]/60 hover:text-[#1B4332]'
            }`}
          >
            <Award className="w-4 h-4 text-[#E07A5F]" />
            <span>Verified Certificates ({certificates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluations')}
            className={`pb-3 px-2 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'evaluations'
                ? 'border-[#E07A5F] text-[#1B4332]'
                : 'border-transparent text-[#1B4332]/60 hover:text-[#1B4332]'
            }`}
          >
            <Brain className="w-4 h-4 text-[#1B4332]" />
            <span>Leadership Diagnostics ({evaluations.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'certificates' && (
            <div>
              {certificates.length === 0 ? (
                <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-[#B7E4C7]">
                  <Award className="w-12 h-12 text-[#B7E4C7] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#1B4332] font-['Outfit']">
                    No Certificates Earned Yet
                  </h4>
                  <p className="text-xs text-[#1B4332]/70 max-w-md mx-auto mt-1">
                    Complete hands-on checkpoints in the Manufacturing Server Guide, Automobile Powertrain Assembly, or Compliance modules to generate and save your official verified certificates.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificates.map((cert) => (
                    <div
                      key={cert.certificateId}
                      className="bg-white p-5 rounded-2xl border border-[#B7E4C7] shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#1B4332]/60 mb-1">
                          <span>{cert.verificationCode}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E4C7]/40 text-[#1B4332]">
                            Verified
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1B4332] font-['Outfit'] line-clamp-2">
                          {cert.programTitle}
                        </h4>
                        <div className="text-xs text-[#1B4332]/75 mt-1">
                          Learner: <span className="font-semibold">{cert.learnerName}</span>
                        </div>
                        <div className="text-[11px] text-[#1B4332]/60 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#E07A5F]" />
                          <span>{new Date(cert.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#B7E4C7]/30 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#1B4332]">Learnova Services L&D</span>
                        <button
                          onClick={() => handlePrintCert(cert)}
                          className="px-3 py-1.5 rounded-xl bg-[#1B4332] hover:bg-[#143326] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#B7E4C7]" />
                          <span>Print</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'evaluations' && (
            <div>
              {evaluations.length === 0 ? (
                <div className="text-center py-12 px-4 bg-white rounded-2xl border border-dashed border-[#B7E4C7]">
                  <Brain className="w-12 h-12 text-[#B7E4C7] mx-auto mb-3" />
                  <h4 className="text-base font-bold text-[#1B4332] font-['Outfit']">
                    No Leadership Diagnostics Saved
                  </h4>
                  <p className="text-xs text-[#1B4332]/70 max-w-md mx-auto mt-1">
                    Take the 105-Question Leadership & Competency Assessment across 7 dimensions to benchmark your operational proficiency and save your calibrated scorecard.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {evaluations.map((ev) => (
                    <div
                      key={ev.evaluationId}
                      className="bg-white p-5 rounded-2xl border border-[#B7E4C7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#B7E4C7]/40 text-[#1B4332] border border-[#B7E4C7]">
                            {ev.calibratedLevel}
                          </span>
                          <span className="text-xs text-[#1B4332]/60">
                            {new Date(ev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#1B4332] font-['Outfit'] mt-1">
                          {ev.participantName} • 105-Question Audit
                        </h4>
                        <p className="text-xs text-[#1B4332]/70 mt-1">
                          Evaluated across Problem Solving, Six Sigma, Design Thinking, MBTI, Communication & Leadership.
                        </p>
                      </div>

                      <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-[#B7E4C7]/40 pt-3 sm:pt-0 sm:pl-5">
                        <div className="text-right">
                          <div className="text-2xl font-black font-['Outfit'] text-[#1B4332]">
                            {ev.totalScore}
                            <span className="text-xs font-normal text-[#1B4332]/60">/525</span>
                          </div>
                          <div className="text-xs font-bold text-[#E07A5F]">
                            {ev.percentage}% Alignment
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#F8F9FA] px-6 py-3 border-t border-[#B7E4C7]/40 flex items-center justify-between text-xs text-[#1B4332]/70 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Connected to Firebase Firestore (`{userProfile?.userId ? 'Active' : 'Syncing'}`)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-[#B7E4C7] hover:bg-[#B7E4C7]/30 text-[#1B4332] font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
