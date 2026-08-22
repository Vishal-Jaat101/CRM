import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Building, ArrowRight } from 'lucide-react';
import type { HealthStatus } from '../../types';

export const NewAccountModal: React.FC = () => {
  const { isNewAccountModalOpen, setIsNewAccountModalOpen, addAccount } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    industry: 'Enterprise Software',
    lead: 'Sarah Jenkins',
    arr: 650000,
    status: 'Optimal' as HealthStatus,
    tier: 'Enterprise' as const,
    activeUsers: 250,
    nextMilestone: 'Executive Briefing',
    summary: 'New enterprise prospect onboarding to Nexus CRM platform.'
  });

  if (!isNewAccountModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const initials = formData.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const colorVariants = [
      'from-blue-600 to-indigo-600',
      'from-purple-600 to-pink-600',
      'from-emerald-500 to-teal-700',
      'from-amber-500 to-orange-600',
      'from-cyan-500 to-blue-700'
    ];
    const initialsColor = colorVariants[Math.floor(Math.random() * colorVariants.length)];

    addAccount({
      name: formData.name.trim(),
      initials: initials || 'AC',
      initialsColor,
      lead: formData.lead,
      status: formData.status,
      healthScore: formData.status === 'Optimal' ? 95 : formData.status === 'Monitor' ? 75 : 60,
      nextMilestone: formData.nextMilestone,
      milestoneDue: 'In 7 days',
      arr: `$${(formData.arr / 1000).toFixed(0)}K`,
      arrValue: Number(formData.arr),
      industry: formData.industry,
      tier: formData.tier,
      activeUsers: Number(formData.activeUsers),
      lastContact: 'Just registered',
      contractRenewal: 'Q3 2027',
      summary: formData.summary
    });

    setIsNewAccountModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsNewAccountModalOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      ></div>

      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-[#11131b] border border-primary/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
        <button
          onClick={() => setIsNewAccountModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#8d90a0] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono mb-2">
            <Building className="w-3.5 h-3.5" /> Relationship Registration
          </div>
          <h3 className="text-2xl font-bold font-headline-md text-white">
            Register Strategic Account
          </h3>
          <p className="text-xs text-[#c3c6d7] mt-1">
            Add a new enterprise client to your Command Center monitoring stream.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">ACCOUNT NAME *</label>
              <input
                type="text"
                required
                placeholder="e.g. Apex Global"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">INDUSTRY</label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">ANNUAL ARR ($)</label>
              <input
                type="number"
                step="10000"
                value={formData.arr}
                onChange={(e) => setFormData({ ...formData, arr: Number(e.target.value) })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">RELATIONSHIP LEAD</label>
              <select
                value={formData.lead}
                onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
              >
                <option value="Sarah Jenkins">Sarah Jenkins</option>
                <option value="Michael Chang">Michael Chang</option>
                <option value="Alex Rivera">Alex Rivera</option>
                <option value="Elena Rostova">Elena Rostova</option>
                <option value="Maya Patel">Maya Patel</option>
              </select>
            </div>
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">HEALTH STATUS</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as HealthStatus })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
              >
                <option value="Optimal">Optimal</option>
                <option value="Monitor">Monitor</option>
                <option value="At Risk">At Risk</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[#8d90a0] font-mono mb-1">NEXT STRATEGIC MILESTONE</label>
            <input
              type="text"
              placeholder="e.g. Q4 Executive Review"
              value={formData.nextMilestone}
              onChange={(e) => setFormData({ ...formData, nextMilestone: e.target.value })}
              className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#8d90a0] font-mono mb-1">EXECUTIVE SUMMARY</label>
            <textarea
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-primary-container text-white py-3 rounded-xl font-button font-semibold btn-primary flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              <span>Add to Strategic Accounts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
