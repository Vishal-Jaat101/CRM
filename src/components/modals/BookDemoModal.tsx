import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookDemoModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, showToast } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    teamSize: '20-100',
    preferredDate: '',
    preferredTime: '10:00 AM PST',
    useCase: ''
  });

  if (!isDemoModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 }
    });

    setTimeout(() => {
      showToast(`Demo scheduled! Calendar invite sent to ${formData.workEmail || 'your email'}.`);
      setIsDemoModalOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsDemoModalOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      ></div>

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#11131b] border border-primary/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Close Button */}
        <button
          onClick={() => setIsDemoModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#8d90a0] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-headline-md text-white">
              Demo Confirmed!
            </h3>
            <p className="text-sm text-[#c3c6d7] max-w-sm mx-auto">
              Our enterprise solution engineering team is preparing your custom Nexus CRM workspace. A calendar invite has been sent.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" /> 1-on-1 Product Tour
              </div>
              <h3 className="text-2xl font-bold font-headline-md text-white">
                Book an Enterprise Demo
              </h3>
              <p className="text-xs text-[#c3c6d7] mt-1">
                See how Nexus CRM accelerates high-velocity sales pipelines.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8d90a0] font-mono mb-1">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Mercer"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8d90a0] font-mono mb-1">WORK EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@enterprise.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8d90a0] font-mono mb-1">COMPANY NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Acme Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8d90a0] font-mono mb-1">SALES TEAM SIZE</label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  >
                    <option value="5-20">5 - 20 Reps</option>
                    <option value="20-100">20 - 100 Reps</option>
                    <option value="100-500">100 - 500 Reps</option>
                    <option value="500+">500+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8d90a0] font-mono mb-1">PREFERRED DATE</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#8d90a0] font-mono mb-1">TIME SLOT</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  >
                    <option value="09:00 AM PST">09:00 AM PST</option>
                    <option value="10:00 AM PST">10:00 AM PST</option>
                    <option value="01:00 PM PST">01:00 PM PST</option>
                    <option value="03:00 PM PST">03:00 PM PST</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-primary-container text-white py-3 rounded-xl font-button font-semibold btn-primary flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                >
                  <span>Confirm Live Demo Scheduling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
