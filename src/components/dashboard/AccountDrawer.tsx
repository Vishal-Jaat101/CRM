import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { HealthStatus } from '../../types';
import {
  X,
  TrendingUp,
  Building,
  Calendar,
  DollarSign,
  FileText,
  Plus,
  Trash2,
  Send
} from 'lucide-react';

export const AccountDrawer: React.FC = () => {
  const {
    selectedAccount,
    setSelectedAccount,
    updateAccount,
    deleteAccount,
    deals,
    addActivity,
    setIsNewDealModalOpen,
    showToast
  } = useApp();

  const [newNote, setNewNote] = useState('');
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [summaryDraft, setSummaryDraft] = useState('');

  if (!selectedAccount) return null;

  const accountDeals = deals.filter((d) => d.account === selectedAccount.name);

  const handleStatusChange = (newStatus: HealthStatus) => {
    let newScore = selectedAccount.healthScore;
    if (newStatus === 'Optimal') newScore = Math.max(90, newScore);
    if (newStatus === 'Monitor') newScore = 75;
    if (newStatus === 'At Risk') newScore = 55;

    updateAccount(selectedAccount.id, {
      status: newStatus,
      healthScore: newScore
    });
  };

  const handleSaveSummary = () => {
    updateAccount(selectedAccount.id, { summary: summaryDraft });
    setIsEditingSummary(false);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addActivity({
      time: 'Just now',
      type: 'Note',
      title: 'Strategic Account Note',
      description: newNote.trim(),
      account: selectedAccount.name,
      author: 'Current User'
    });

    setNewNote('');
    showToast('Note added to relationship timeline');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedAccount(null)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#11131b] border-l border-white/10 shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedAccount.initialsColor} flex items-center justify-center text-white text-xl font-bold font-mono shadow-lg`}
                >
                  {selectedAccount.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold font-headline-md text-white">
                      {selectedAccount.name}
                    </h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/10 text-[#c3c6d7] border border-white/10">
                      {selectedAccount.tier}
                    </span>
                  </div>
                  <div className="text-xs text-[#8d90a0] flex items-center gap-2 mt-1">
                    <Building className="w-3.5 h-3.5" />
                    <span>{selectedAccount.industry}</span>
                    <span>•</span>
                    <span>Lead: <strong className="text-white">{selectedAccount.lead}</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedAccount(null)}
                className="p-2 rounded-lg bg-[#1d1f27] hover:bg-white/10 text-[#8d90a0] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Health & Status Toggles */}
            <div className="grid grid-cols-2 gap-4 py-6 border-b border-white/10">
              <div className="bg-[#1d1f27] p-4 rounded-xl border border-white/5">
                <div className="text-[11px] font-mono text-[#8d90a0] uppercase mb-1">Health Score</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold font-headline-md text-white">
                    {selectedAccount.healthScore}<span className="text-sm font-normal text-[#8d90a0]">/100</span>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor:
                        selectedAccount.status === 'Optimal'
                          ? 'rgba(16, 185, 129, 0.2)'
                          : selectedAccount.status === 'Monitor'
                          ? 'rgba(245, 158, 11, 0.2)'
                          : 'rgba(239, 68, 68, 0.2)',
                      color:
                        selectedAccount.status === 'Optimal'
                          ? '#34d399'
                          : selectedAccount.status === 'Monitor'
                          ? '#fbbf24'
                          : '#f87171'
                    }}
                  >
                    {selectedAccount.healthScore}
                  </div>
                </div>
              </div>

              <div className="bg-[#1d1f27] p-4 rounded-xl border border-white/5">
                <div className="text-[11px] font-mono text-[#8d90a0] uppercase mb-1">Relationship Status</div>
                <select
                  value={selectedAccount.status}
                  onChange={(e) => handleStatusChange(e.target.value as HealthStatus)}
                  className="w-full bg-[#11131b] border border-white/15 text-xs text-white rounded p-2 mt-1 focus:border-primary focus:outline-none"
                >
                  <option value="Optimal">● Optimal (Healthy)</option>
                  <option value="Monitor">▲ Monitor (Attention)</option>
                  <option value="At Risk">■ At Risk (Escalated)</option>
                </select>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 py-6 border-b border-white/10 text-xs">
              <div className="p-3 bg-[#191b23] rounded-lg border border-white/5">
                <div className="text-[10px] font-mono text-[#8d90a0] flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-primary" /> ARR VALUE
                </div>
                <div className="text-base font-bold font-mono text-white mt-1">{selectedAccount.arr}</div>
              </div>

              <div className="p-3 bg-[#191b23] rounded-lg border border-white/5">
                <div className="text-[10px] font-mono text-[#8d90a0] flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" /> RENEWAL
                </div>
                <div className="text-base font-bold font-mono text-white mt-1">{selectedAccount.contractRenewal}</div>
              </div>

              <div className="p-3 bg-[#191b23] rounded-lg border border-white/5">
                <div className="text-[10px] font-mono text-[#8d90a0] flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-purple-400" /> SEATS
                </div>
                <div className="text-base font-bold font-mono text-white mt-1">{selectedAccount.activeUsers}</div>
              </div>
            </div>

            {/* Executive Summary / Notes */}
            <div className="py-6 border-b border-white/10">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#b4c5ff] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Executive Relationship Context
                </h4>
                {!isEditingSummary && (
                  <button
                    onClick={() => {
                      setSummaryDraft(selectedAccount.summary);
                      setIsEditingSummary(true);
                    }}
                    className="text-[11px] font-mono text-primary hover:underline"
                  >
                    Edit Context
                  </button>
                )}
              </div>

              {isEditingSummary ? (
                <div className="space-y-2">
                  <textarea
                    value={summaryDraft}
                    onChange={(e) => setSummaryDraft(e.target.value)}
                    rows={3}
                    className="w-full bg-[#191b23] border border-primary text-xs text-white p-2.5 rounded focus:outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditingSummary(false)}
                      className="px-3 py-1 text-xs text-[#8d90a0] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveSummary}
                      className="px-3 py-1 bg-primary-container text-white text-xs font-semibold rounded"
                    >
                      Save Summary
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#c3c6d7] leading-relaxed bg-[#191b23] p-3 rounded-lg border border-white/5">
                  {selectedAccount.summary}
                </p>
              )}
            </div>

            {/* Pipeline Deals for this Account */}
            <div className="py-6 border-b border-white/10">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#b4c5ff]">
                  Pipeline Opportunities ({accountDeals.length})
                </h4>
                <button
                  onClick={() => setIsNewDealModalOpen(true)}
                  className="px-2 py-1 rounded bg-primary-container/20 text-primary hover:bg-primary-container/30 text-[11px] font-mono flex items-center gap-1 border border-primary/30"
                >
                  <Plus className="w-3 h-3" /> New Deal
                </button>
              </div>

              {accountDeals.length === 0 ? (
                <div className="text-xs text-[#8d90a0] p-4 text-center bg-[#191b23] rounded-lg border border-white/5">
                  No active deals in pipeline. Click &apos;New Deal&apos; to create one.
                </div>
              ) : (
                <div className="space-y-2">
                  {accountDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-3 bg-[#191b23] rounded-lg border border-white/5 flex justify-between items-center text-xs"
                    >
                      <div>
                        <div className="font-semibold text-white">{deal.title}</div>
                        <div className="text-[#8d90a0] font-mono text-[11px] mt-0.5">
                          Stage: <strong className="text-primary">{deal.stage}</strong> ({deal.probability}%)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-mono text-emerald-400">${deal.value.toLocaleString()}</div>
                        <div className="text-[10px] text-[#8d90a0]">{deal.expectedClose}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Activity Logger */}
            <div className="py-6">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#b4c5ff] mb-3">
                Log Account Activity
              </h4>
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a call note, email update, or milestone..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 bg-[#191b23] border border-white/15 text-xs text-white px-3 py-2 rounded focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary-container text-white px-4 py-2 rounded text-xs font-semibold flex items-center gap-1 hover:bg-primary-container/90 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Log
                </button>
              </form>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => {
                if (confirm(`Are you sure you want to delete ${selectedAccount.name}?`)) {
                  deleteAccount(selectedAccount.id);
                }
              }}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-mono"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Account
            </button>

            <button
              onClick={() => setSelectedAccount(null)}
              className="px-4 py-2 bg-[#1d1f27] hover:bg-white/10 text-white rounded text-xs font-semibold"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
