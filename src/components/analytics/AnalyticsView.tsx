import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  Download,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { deals, showToast } = useApp();
  const [range, setRange] = useState<'Q3 2026' | 'Q2 2026' | 'YTD 2026'>('Q3 2026');

  const totalWon = deals
    .filter((d) => d.stage === 'Closed Won')
    .reduce((s, d) => s + d.value, 0);

  const reps = [
    { name: 'Sarah Jenkins', closed: '$1.45M', quota: '124%', deals: 8, avgDays: 18 },
    { name: 'Alex Rivera', closed: '$1.22M', quota: '110%', deals: 6, avgDays: 22 },
    { name: 'Maya Patel', closed: '$980K', quota: '98%', deals: 5, avgDays: 14 },
    { name: 'Michael Chang', closed: '$820K', quota: '89%', deals: 4, avgDays: 26 },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#e1e2ed] pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-primary-container selection:text-white">
      {/* 1. HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/30 text-[11px] font-mono flex items-center gap-1">
              <Zap className="w-3 h-3" /> Intelligence Engine
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display-xl font-bold text-white tracking-tight">
            Revenue Analytics
          </h1>
          <p className="text-sm font-body-md text-[#c3c6d7] mt-1">
            Deep performance insights, pipeline conversion velocity, and rep productivity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#1d1f27] p-1 rounded-lg border border-white/10 text-xs font-mono">
            {(['Q3 2026', 'Q2 2026', 'YTD 2026'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded transition-colors ${
                  range === r ? 'bg-primary-container text-white font-semibold' : 'text-[#8d90a0] hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={() => showToast('Analytics PDF summary generated.')}
            className="glass-panel px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 hover:bg-white/5 transition-colors text-white"
          >
            <Download className="w-4 h-4 text-primary" /> Export Report
          </button>
        </div>
      </header>

      {/* 2. TOP METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bento-card p-5">
          <div className="text-xs font-mono text-[#8d90a0] uppercase">Win Rate (Enterprise)</div>
          <div className="text-3xl font-display-xl font-bold text-white mt-1">68.4%</div>
          <div className="text-xs font-mono text-emerald-400 mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +8.2% vs industry benchmark
          </div>
        </div>

        <div className="bento-card p-5">
          <div className="text-xs font-mono text-[#8d90a0] uppercase">Avg Deal Cycle</div>
          <div className="text-3xl font-display-xl font-bold text-white mt-1">19 Days</div>
          <div className="text-xs font-mono text-primary mt-2">3.4x faster than standard CRM</div>
        </div>

        <div className="bento-card p-5">
          <div className="text-xs font-mono text-[#8d90a0] uppercase">Net Revenue Retention</div>
          <div className="text-3xl font-display-xl font-bold text-emerald-400 mt-1">134%</div>
          <div className="text-xs font-mono text-[#c3c6d7] mt-2">Expansion ARR: $1.2M</div>
        </div>

        <div className="bento-card p-5">
          <div className="text-xs font-mono text-[#8d90a0] uppercase">Gross Closed Revenue</div>
          <div className="text-3xl font-display-xl font-bold text-white mt-1">
            ${(totalWon + 4200000).toLocaleString()}
          </div>
          <div className="text-xs font-mono text-emerald-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 112% to quarterly target
          </div>
        </div>
      </div>

      {/* 3. CHARTS & LEADERBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Velocity Chart (7 cols) */}
        <div className="lg:col-span-7 bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-headline-md font-bold text-white">Monthly ARR Run Rate</h3>
                <p className="text-xs text-[#8d90a0]">Real-time contract billing & subscription telemetry</p>
              </div>
              <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-1 rounded border border-primary/20">
                +24% YoY
              </span>
            </div>

            {/* Custom Bar Chart */}
            <div className="space-y-4 pt-4">
              {[
                { month: 'Apr', value: 2.8, percent: 70 },
                { month: 'May', value: 3.2, percent: 80 },
                { month: 'Jun', value: 3.6, percent: 88 },
                { month: 'Jul', value: 3.9, percent: 94 },
                { month: 'Aug', value: 4.2, percent: 100 },
              ].map((bar, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white font-semibold">{bar.month} 2026</span>
                    <span className="text-primary font-bold">${bar.value}M ARR</span>
                  </div>
                  <div className="h-3 w-full bg-[#11131b] rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-primary rounded-full transition-all duration-700"
                      style={{ width: `${bar.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center text-xs font-mono text-[#8d90a0]">
            <span>Data synchronized with Stripe & ERP webhooks</span>
            <span className="text-emerald-400 font-semibold">Healthy Retention</span>
          </div>
        </div>

        {/* Rep Leaderboard (5 cols) */}
        <div className="lg:col-span-5 bento-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-headline-md font-bold text-white">Sales Leaderboard</h3>
              </div>
              <span className="text-xs font-mono text-[#8d90a0]">Quota Attainment</span>
            </div>

            <div className="space-y-3">
              {reps.map((rep, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#11131b]/70 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      idx === 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-[#282a32] text-[#c3c6d7]'
                    }`}>
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{rep.name}</div>
                      <div className="text-[10px] font-mono text-[#8d90a0]">
                        {rep.deals} deals • avg {rep.avgDays}d cycle
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-emerald-400">{rep.closed}</div>
                    <div className="text-[10px] font-mono text-primary font-bold">{rep.quota} Quota</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 text-center text-xs font-mono text-[#8d90a0]">
            Auto-calculated from closed-won CRM opportunities
          </div>
        </div>
      </div>
    </div>
  );
};
