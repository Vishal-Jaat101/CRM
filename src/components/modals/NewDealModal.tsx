import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import type { PipelineStage } from '../../types';

export const NewDealModal: React.FC = () => {
  const { isNewDealModalOpen, setIsNewDealModalOpen, accounts, addDeal } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    account: accounts[0]?.name || 'Global Tech',
    value: 120000,
    stage: 'Discovery' as PipelineStage,
    lead: 'Sarah Jenkins',
    expectedClose: 'Nov 15, 2026',
    priority: 'High' as const
  });

  if (!isNewDealModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const probMap: Record<PipelineStage, number> = {
      Discovery: 35,
      Proposal: 60,
      Negotiation: 75,
      Contract: 90,
      'Closed Won': 100
    };

    addDeal({
      title: formData.title.trim(),
      account: formData.account,
      value: Number(formData.value),
      stage: formData.stage,
      probability: probMap[formData.stage] || 50,
      lead: formData.lead,
      daysInStage: 0,
      priority: formData.priority,
      expectedClose: formData.expectedClose
    });

    setIsNewDealModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={() => setIsNewDealModalOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      ></div>

      <div className="relative w-full max-w-lg bg-[#11131b] border border-primary/30 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
        <button
          onClick={() => setIsNewDealModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#8d90a0] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Pipeline Opportunity
          </div>
          <h3 className="text-2xl font-bold font-headline-md text-white">
            Create New Deal
          </h3>
          <p className="text-xs text-[#c3c6d7] mt-1">
            Add an opportunity to your Kanban board and revenue forecast.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block text-[#8d90a0] font-mono mb-1">DEAL / OPPORTUNITY TITLE *</label>
            <input
              type="text"
              required
              placeholder="e.g. Enterprise Security Add-on"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">ASSOCIATED ACCOUNT</label>
              <select
                value={formData.account}
                onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.name}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">DEAL VALUE ($)</label>
              <input
                type="number"
                step="5000"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">INITIAL STAGE</label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value as PipelineStage })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
              >
                <option value="Discovery">Discovery</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Contract">Contract</option>
                <option value="Closed Won">Closed Won</option>
              </select>
            </div>
            <div>
              <label className="block text-[#8d90a0] font-mono mb-1">DEAL LEAD</label>
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
              <label className="block text-[#8d90a0] font-mono mb-1">EXPECTED CLOSE</label>
              <input
                type="text"
                placeholder="e.g. Dec 2026"
                value={formData.expectedClose}
                onChange={(e) => setFormData({ ...formData, expectedClose: e.target.value })}
                className="w-full bg-[#191b23] border border-white/10 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-primary-container text-white py-3 rounded-xl font-button font-semibold btn-primary flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              <span>Add Deal to Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
