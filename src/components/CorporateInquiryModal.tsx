import React, { useState } from 'react';
import { X, CheckCircle, Send, Sparkles, Building2, User, Mail, Phone, Briefcase } from 'lucide-react';
import { useFirebase } from '../firebase/context';

interface CorporateInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  learnersCount: number;
  avgTrainingCost: number;
  netSavings: number;
  projectedValue: number;
}

export const CorporateInquiryModal: React.FC<CorporateInquiryModalProps> = ({
  isOpen,
  onClose,
  learnersCount,
  avgTrainingCost,
  netSavings,
  projectedValue,
}) => {
  const { user, saveInquiry } = useFirebase();
  const [clientName, setClientName] = useState(user?.displayName || '');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Manufacturing');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !companyName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    const newId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      await saveInquiry({
        inquiryId: newId,
        clientName: clientName.trim(),
        companyName: companyName.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        industry,
        targetLearners: learnersCount,
        projectedRoiMultiplier: 3.0,
        message: message.trim() || `Projected Net Savings: $${Math.round(netSavings).toLocaleString()} for ${learnersCount} participants.`,
        status: 'pending',
      });
      setTicketId(newId);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to submit corporate inquiry:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143326]/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#F8F9FA] rounded-3xl shadow-2xl border border-[#B7E4C7] overflow-hidden my-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B4332] via-[#255d46] to-[#1B4332] text-white p-6 flex items-center justify-between border-b border-[#B7E4C7]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center font-bold shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-['Outfit'] tracking-tight">
                {isSubmitted ? 'Proposal Request Confirmed' : 'Request 48-Hour PoC & Custom Proposal'}
              </h3>
              <p className="text-xs text-[#B7E4C7] font-medium">
                Learnova Services L&D RoI Accelerator
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

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ROI Summary Banner */}
              <div className="bg-[#B7E4C7]/30 rounded-2xl p-4 border border-[#B7E4C7] flex items-center justify-between text-xs text-[#1B4332]">
                <div>
                  <span className="font-bold block text-sm">Calculated 3X ROI Scoping</span>
                  <span>{learnersCount} Learners • ${avgTrainingCost} per learner</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#1B4332]/70 block">Projected Value</span>
                  <span className="text-base font-extrabold text-[#E07A5F]">
                    +${Math.round(netSavings).toLocaleString()} Net
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Sarah Jenkins, VP HR"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#B7E4C7] bg-white text-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                    Organization / Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Global Motors Corp"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#B7E4C7] bg-white text-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#B7E4C7] bg-white text-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#B7E4C7] bg-white text-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                  Target Industry Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#B7E4C7] bg-white text-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                >
                  <option value="Manufacturing">Manufacturing & Discrete Assembly</option>
                  <option value="Automobile">Automobile & Powertrain Engineering</option>
                  <option value="IT & ITES">IT & IT-Enabled Services</option>
                  <option value="Hospitality">Hospitality & Guest Experience</option>
                  <option value="FMCG & Retail">FMCG, Retail & Distribution</option>
                  <option value="General Service">Banking, Financial & General Services</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                  Specific Training Objectives or Challenges
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g., Shop floor quality defect reduction or managerial coaching transition..."
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#B7E4C7] bg-white text-[#1B4332] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
                />
              </div>

              <div className="pt-3 border-t border-[#B7E4C7]/40 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#1B4332]/70 hover:text-[#1B4332] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !clientName.trim() || !companyName.trim() || !email.trim()}
                  className="px-6 py-2.5 rounded-xl bg-[#E07A5F] hover:bg-[#C9664D] text-white text-xs font-bold flex items-center gap-2 shadow-md transition disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Logging to Firebase...' : 'Submit 48h PoC Request'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#B7E4C7]/40 text-[#1B4332] flex items-center justify-center mx-auto border border-[#B7E4C7]">
                <CheckCircle className="w-8 h-8 text-[#1B4332]" />
              </div>
              <h4 className="text-xl font-black font-['Outfit'] text-[#1B4332]">
                Inquiry Logged to Cloud Database
              </h4>
              <p className="text-xs text-[#1B4332]/80 max-w-md mx-auto">
                Thank you, <span className="font-bold">{clientName}</span>. Your customized 3X ROI Accelerator consultation inquiry has been registered with Ticket ID <span className="font-mono font-bold text-[#E07A5F]">{ticketId}</span>.
              </p>
              <div className="bg-white p-4 rounded-2xl border border-[#B7E4C7] max-w-sm mx-auto text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#1B4332]/60">Target Cohort:</span>
                  <span className="font-bold text-[#1B4332]">{learnersCount} Learners</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B4332]/60">Target Sector:</span>
                  <span className="font-bold text-[#1B4332]">{industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#1B4332]/60">Status:</span>
                  <span className="font-bold text-emerald-700">48-Hour PoC Initiated</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-[#1B4332] text-white text-xs font-bold shadow-xs hover:bg-[#143326] transition cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
