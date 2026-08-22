import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { PipelineStage, Deal } from '../../types';
import {
  Kanban,
  Plus,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  User,
  Sparkles,
  TrendingUp,
  Filter,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const STAGES: PipelineStage[] = [
  'Discovery',
  'Proposal',
  'Negotiation',
  'Contract',
  'Closed Won'
];

export const PipelineView: React.FC = () => {
  const { deals, updateDealStage, deleteDeal, setIsNewDealModalOpen } = useApp();
  const [selectedLead, setSelectedLead] = useState<string>('ALL');

  // Filter leads
  const uniqueLeads = Array.from(new Set(deals.map((d) => d.lead)));

  const filteredDeals = deals.filter(
    (d) => selectedLead === 'ALL' || d.lead === selectedLead
  );

  const totalPipeline = filteredDeals.reduce((sum, d) => sum + d.value, 0);
  const weightedPipeline = filteredDeals.reduce(
    (sum, d) => sum + Math.round((d.value * d.probability) / 100),
    0
  );

  const handleAdvance = (deal: Deal) => {
    const currentIndex = STAGES.indexOf(deal.stage);
    if (currentIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentIndex + 1];
      updateDealStage(deal.id, nextStage);

      if (nextStage === 'Closed Won') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRegress = (deal: Deal) => {
    const currentIndex = STAGES.indexOf(deal.stage);
    if (currentIndex > 0) {
      updateDealStage(deal.id, STAGES[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#e1e2ed] pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-primary-container selection:text-white">
      {/* 1. PIPELINE HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/30 text-[11px] font-mono flex items-center gap-1">
              <Kanban className="w-3 h-3" /> Deal Velocity Engine
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display-xl font-bold text-white tracking-tight">
            Pipeline Kanban
          </h1>
          <p className="text-sm font-body-md text-[#c3c6d7] mt-1">
            Track, advance, and close enterprise deals across structured sales stages.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Owner Filter */}
          <div className="flex items-center gap-2 bg-[#1d1f27] px-3 py-1.5 rounded-lg border border-white/10 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#8d90a0]" />
            <span className="text-[#8d90a0] font-mono">Owner:</span>
            <select
              value={selectedLead}
              onChange={(e) => setSelectedLead(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-[#11131b]">All Team Members</option>
              {uniqueLeads.map((lead) => (
                <option key={lead} value={lead} className="bg-[#11131b]">
                  {lead}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsNewDealModalOpen(true)}
            className="bg-primary-container text-white px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-primary-container/90 transition-all electric-glow text-xs font-semibold"
          >
            <Plus className="w-4 h-4" /> Add Deal
          </button>
        </div>
      </header>

      {/* 2. SUMMARY TELEMETRY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bento-card p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#8d90a0] uppercase">Total Pipeline Value</div>
            <div className="text-2xl font-bold font-headline-md text-white mt-1">
              ${(totalPipeline / 1000).toLocaleString()}K
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-primary-container/20 border border-primary/30 flex items-center justify-center text-primary">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bento-card p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#8d90a0] uppercase">Weighted Forecast</div>
            <div className="text-2xl font-bold font-headline-md text-emerald-400 mt-1">
              ${(weightedPipeline / 1000).toLocaleString()}K
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bento-card p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#8d90a0] uppercase">Active Opportunities</div>
            <div className="text-2xl font-bold font-headline-md text-white mt-1">
              {filteredDeals.length} Deals
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. KANBAN COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {STAGES.map((stage) => {
          const stageDeals = filteredDeals.filter((d) => d.stage === stage);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={stage}
              className="bg-[#11131b] border border-white/10 rounded-xl p-3.5 flex flex-col min-h-[550px] shadow-sm"
            >
              {/* Column Header */}
              <div className="flex justify-between items-center pb-3 mb-3 border-b border-white/10">
                <div>
                  <h3 className="text-xs font-bold font-headline-md text-white tracking-wide">
                    {stage}
                  </h3>
                  <div className="text-[11px] font-mono text-[#8d90a0]">
                    ${(stageTotal / 1000).toLocaleString()}k • {stageDeals.length} deals
                  </div>
                </div>

                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    stage === 'Closed Won'
                      ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                      : stage === 'Contract'
                      ? 'bg-primary shadow-[0_0_8px_rgba(37,99,235,0.8)]'
                      : stage === 'Negotiation'
                      ? 'bg-purple-400'
                      : stage === 'Proposal'
                      ? 'bg-amber-400'
                      : 'bg-[#8d90a0]'
                  }`}
                ></span>
              </div>

              {/* Deals List */}
              <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
                {stageDeals.length === 0 ? (
                  <div className="h-32 border border-dashed border-white/5 rounded-lg flex items-center justify-center text-xs font-mono text-[#8d90a0]">
                    No deals in {stage}
                  </div>
                ) : (
                  stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-[#1d1f27] hover:bg-[#282a32] p-3.5 rounded-lg border border-white/10 hover:border-primary/40 transition-all shadow-sm group relative"
                    >
                      {/* Priority Tag */}
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="text-xs font-semibold text-white group-hover:text-primary transition-colors">
                          {deal.title}
                        </span>
                        <button
                          onClick={() => deleteDeal(deal.id)}
                          className="opacity-0 group-hover:opacity-100 text-[#8d90a0] hover:text-rose-400 transition-opacity p-0.5"
                          title="Delete deal"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-[#8d90a0] mb-2.5">
                        {deal.account}
                      </div>

                      {/* Value & Probability */}
                      <div className="flex justify-between items-center text-xs font-mono mb-3 bg-[#11131b]/60 p-2 rounded border border-white/5">
                        <span className="font-bold text-emerald-400">
                          ${deal.value.toLocaleString()}
                        </span>
                        <span className="text-primary font-medium">
                          {deal.probability}% Prob
                        </span>
                      </div>

                      {/* Lead & Timing */}
                      <div className="flex justify-between items-center text-[10px] font-mono text-[#8d90a0] mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" /> {deal.lead}
                        </span>
                        <span>{deal.daysInStage}d in stage</span>
                      </div>

                      {/* Stage Progression Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                        {stage !== 'Discovery' ? (
                          <button
                            onClick={() => handleRegress(deal)}
                            className="p-1 rounded bg-[#11131b] hover:bg-white/10 text-[#8d90a0] hover:text-white transition-colors"
                            title="Move back a stage"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        ) : (
                          <div></div>
                        )}

                        {stage !== 'Closed Won' ? (
                          <button
                            onClick={() => handleAdvance(deal)}
                            className="px-2 py-1 rounded bg-primary-container text-white hover:bg-primary-container/90 flex items-center gap-1 font-semibold transition-colors shadow-sm ml-auto"
                          >
                            <span>Advance</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold flex items-center gap-1 ml-auto text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Won!
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
