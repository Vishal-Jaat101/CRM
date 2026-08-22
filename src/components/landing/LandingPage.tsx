import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  CheckCircle2,
  Users,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  Calculator,
  RefreshCw,
  Mail,
  Cpu,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LandingPage: React.FC = () => {
  const { setActiveView, setIsDemoModalOpen, showToast } = useApp();

  // 3D Tilt State for Hero Mockup
  const [rotateX, setRotateX] = useState(12);
  const [rotateY, setRotateY] = useState(-5);
  const [isHovered, setIsHovered] = useState(false);
  const heroCardRef = useRef<HTMLDivElement>(null);

  // Bento Analytics timeframe state
  const [timeframe, setTimeframe] = useState<'30D' | '90D' | '1Y'>('90D');

  // Bento Automation simulator state
  const [automationStep, setAutomationStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Bento Kanban interactive cards
  const [miniKanban, setMiniKanban] = useState([
    { id: 1, title: 'Enterprise Expansion', val: '$240k', col: 0, color: 'bg-blue-400' },
    { id: 2, title: 'Security Suite Deal', val: '$85k', col: 0, color: 'bg-emerald-400' },
    { id: 3, title: 'Cloud Infrastructure', val: '$380k', col: 1, color: 'bg-primary' },
    { id: 4, title: 'Global Rollout Tier 1', val: '$150k', col: 2, color: 'bg-purple-400' },
  ]);

  // ROI Calculator State
  const [teamSize, setTeamSize] = useState<number>(25);
  const [avgDealSize, setAvgDealSize] = useState<number>(45000);

  const estimatedRevGain = Math.round(teamSize * avgDealSize * 0.18);
  const estimatedHoursSaved = Math.round(teamSize * 14.5);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / (rect.height / 2)) * 10;
    const rotY = (x / (rect.width / 2)) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(12);
    setRotateY(-5);
  };

  const runAutomationSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setAutomationStep(1);

    setTimeout(() => {
      setAutomationStep(2);
    }, 1200);

    setTimeout(() => {
      setAutomationStep(3);
      setIsSimulating(false);
      showToast('Automation Triggered: Lead enriched & Deal created in Pipeline!');
    }, 2400);
  };

  const moveMiniKanbanCard = (id: number) => {
    setMiniKanban((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextCol = (c.col + 1) % 3;
          if (nextCol === 2) {
            confetti({
              particleCount: 30,
              spread: 60,
              origin: { y: 0.7 }
            });
          }
          return { ...c, col: nextCol };
        }
        return c;
      })
    );
  };

  const logos = [
    { name: 'Global Tech', symbol: 'GT', desc: 'Enterprise Cloud' },
    { name: 'Nexus Cloud', symbol: 'NC', desc: 'AI Infrastructure' },
    { name: 'Apex Dynamics', symbol: 'AD', desc: 'Automation Labs' },
    { name: 'Helios Energy', symbol: 'HE', desc: 'Renewable Power' },
    { name: 'CyberPulse', symbol: 'CP', desc: 'FinTech Security' },
    { name: 'Horizon Bio', symbol: 'HB', desc: 'Life Sciences' },
    { name: 'Vanguard Systems', symbol: 'VS', desc: 'Global Logistics' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#e1e2ed] pt-16 selection:bg-primary-container selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-container/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>

        {/* Hero Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1d1f27]/90 border border-primary/30 text-xs font-mono text-primary mb-8 shadow-[0_0_15px_rgba(37,99,235,0.2)] animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Nexus 2.0 • AI-Driven Enterprise CRM</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display-xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-5xl leading-[1.1]">
          Customer Relationships, <br />
          <span className="bg-gradient-to-r from-[#b4c5ff] via-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent drop-shadow-sm">
            Mastered.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="font-body-lg text-base sm:text-xl text-[#c3c6d7] mb-10 max-w-3xl mx-auto leading-relaxed">
          The all-in-one CRM built for high-growth enterprise teams. Streamline your pipeline, eliminate manual data entry, and accelerate revenue with effortless intelligence.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 w-full max-w-md">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="w-full sm:w-auto bg-primary-container text-white px-8 py-3.5 rounded-full font-button text-sm font-semibold btn-primary shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-button text-sm font-semibold border border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors text-white flex items-center justify-center gap-2"
          >
            <span>Open Command Center</span>
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        </div>

        {/* 3D Interactive Floating Dashboard Mockup */}
        <div
          ref={heroCardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="w-full max-w-5xl relative z-10 perspective-1000 cursor-pointer"
          onClick={() => setActiveView('dashboard')}
        >
          <div
            style={{
              transform: isHovered
                ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
                : `rotateX(10deg) rotateY(-4deg) rotateZ(1deg) scale(1)`
            }}
            className="transition-transform duration-300 ease-out relative shadow-2xl rounded-2xl overflow-hidden border border-white/15 bg-[#11131b]/90 backdrop-blur-xl p-4 sm:p-6"
          >
            {/* Top Mockup App Bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="font-mono text-[#8d90a0] ml-2 hidden sm:inline">
                  nexus-command-center.internal/telemetry
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Live Sync
                </span>
                <span className="text-[#8d90a0] font-mono text-[11px] hidden sm:inline">Click to launch dashboard</span>
              </div>
            </div>

            {/* Mockup Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-left">
              <div className="bg-[#1d1f27] p-3 rounded-lg border border-white/5">
                <div className="text-[11px] font-mono text-[#8d90a0] uppercase">Health Score</div>
                <div className="text-xl font-bold font-headline-md text-white mt-1 flex items-baseline gap-1">
                  92 <span className="text-xs font-normal text-emerald-400 font-mono">+4%</span>
                </div>
              </div>

              <div className="bg-[#1d1f27] p-3 rounded-lg border border-white/5">
                <div className="text-[11px] font-mono text-[#8d90a0] uppercase">Active Relationships</div>
                <div className="text-xl font-bold font-headline-md text-white mt-1">1,248</div>
              </div>

              <div className="bg-[#1d1f27] p-3 rounded-lg border border-white/5">
                <div className="text-[11px] font-mono text-[#8d90a0] uppercase">ARR Velocity</div>
                <div className="text-xl font-bold font-headline-md text-primary mt-1">$4.2M</div>
              </div>

              <div className="bg-[#1d1f27] p-3 rounded-lg border border-white/5">
                <div className="text-[11px] font-mono text-[#8d90a0] uppercase">Pipeline Health</div>
                <div className="text-xl font-bold font-headline-md text-emerald-400 mt-1">Optimal</div>
              </div>
            </div>

            {/* Mockup Interactive Preview Table */}
            <div className="bg-[#191b23] rounded-lg border border-white/5 overflow-hidden text-left text-xs">
              <div className="grid grid-cols-4 p-3 bg-[#11131b] text-[#8d90a0] font-mono border-b border-white/5">
                <span>Account</span>
                <span>Lead</span>
                <span>Health</span>
                <span className="text-right">Milestone</span>
              </div>
              <div className="divide-y divide-white/5 font-sans">
                <div className="grid grid-cols-4 p-3 items-center hover:bg-white/5 transition-colors">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-600/30 text-blue-400 font-mono text-[10px] flex items-center justify-center">GT</span>
                    Global Tech
                  </span>
                  <span className="text-[#c3c6d7]">Sarah Jenkins</span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1">● 96 Optimal</span>
                  <span className="text-right text-[#8d90a0]">Q3 Review in 2d</span>
                </div>
                <div className="grid grid-cols-4 p-3 items-center hover:bg-white/5 transition-colors">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-amber-600/30 text-amber-400 font-mono text-[10px] flex items-center justify-center">NX</span>
                    Nexus Partners
                  </span>
                  <span className="text-[#c3c6d7]">Alex Rivera</span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1">● 94 Optimal</span>
                  <span className="text-right text-[#8d90a0]">+$120k ARR Renewed</span>
                </div>
                <div className="grid grid-cols-4 p-3 items-center hover:bg-white/5 transition-colors">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-purple-600/30 text-purple-400 font-mono text-[10px] flex items-center justify-center">IN</span>
                    Innovate Inc.
                  </span>
                  <span className="text-[#c3c6d7]">Michael Chang</span>
                  <span className="text-amber-400 font-mono flex items-center gap-1">▲ 78 Monitor</span>
                  <span className="text-right text-[#8d90a0]">Support SLA</span>
                </div>
              </div>
            </div>

            {/* Subtle Overlay Hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-opacity">
              <span className="bg-primary-container text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                Click to Open Full Interactive Command Center →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF LOGO TICKER */}
      <section className="py-10 border-y border-[#434655]/30 bg-[#0c0e16]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <p className="font-label-mono text-xs uppercase tracking-widest text-[#8d90a0]">
            Trusted by Revenue Leaders at High-Growth Enterprises
          </p>
        </div>

        <div className="slider max-w-7xl mx-auto">
          <div className="slide-track gap-8 py-2">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-6 py-3 rounded-lg bg-[#191b23]/50 border border-white/5 hover:border-primary/40 hover:bg-[#1d1f27] transition-all cursor-pointer group flex-shrink-0"
              >
                <div className="w-9 h-9 rounded bg-[#282a32] border border-white/10 flex items-center justify-center font-bold font-mono text-xs text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
                  {logo.symbol}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-[#e1e2ed] group-hover:text-white transition-colors">
                    {logo.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#8d90a0]">{logo.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES ("Engineered for Velocity") */}
      <section id="features" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" /> High-Velocity System
          </div>
          <h2 className="font-display-xl text-3xl sm:text-5xl font-bold text-white mb-4">
            Engineered for Velocity
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-[#c3c6d7] max-w-2xl mx-auto">
            Everything you need to manage complex multi-million dollar sales cycles, neatly organized in a command center designed for speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento 1: Interactive Pipeline Management (8 cols) */}
          <div className="bento-card col-span-1 md:col-span-8 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 border border-primary/30 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-white mb-1">
                  Pipeline Management
                </h3>
                <span className="text-[11px] font-mono text-[#8d90a0] bg-white/5 px-2.5 py-1 rounded">
                  Interactive: Click cards to advance stage
                </span>
              </div>
              <p className="font-body-md text-sm text-[#c3c6d7] max-w-lg">
                Visualize your entire sales pipeline at a glance. Move deals through stages with zero friction and automated probability recalculation.
              </p>
            </div>

            {/* Interactive Mini-Kanban */}
            <div className="relative z-10 grid grid-cols-3 gap-3 bg-[#11131b]/80 p-3 rounded-xl border border-white/5">
              {['Discovery', 'Proposal', 'Closed Won'].map((colName, colIdx) => (
                <div key={colIdx} className="bg-[#191b23] rounded-lg p-2.5 border border-white/5 flex flex-col min-h-[160px]">
                  <div className="flex justify-between items-center mb-2.5 pb-1 border-b border-white/5">
                    <span className="text-[11px] font-mono font-semibold text-[#8d90a0] uppercase">{colName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-[#c3c6d7]">
                      {miniKanban.filter((k) => k.col === colIdx).length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    {miniKanban
                      .filter((item) => item.col === colIdx)
                      .map((item) => (
                        <div
                          key={item.id}
                          onClick={() => moveMiniKanbanCard(item.id)}
                          className="bg-[#282a32] hover:bg-[#32343d] p-2.5 rounded border border-white/10 hover:border-primary/50 transition-all cursor-pointer shadow-sm group/card"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-xs font-semibold text-white">{item.title}</span>
                            <span className="text-[11px] font-mono text-primary font-bold">{item.val}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[#8d90a0]">
                            <span className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${item.color}`}></span> Next Stage →
                            </span>
                            <span className="opacity-0 group-hover/card:opacity-100 text-primary font-mono transition-opacity">
                              Move
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Card Background Glow */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-all"></div>
          </div>

          {/* Bento 2: Advanced Analytics (4 cols) */}
          <div className="bento-card col-span-1 md:col-span-4 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-headline-md text-xl font-bold text-white mb-1">
                Advanced Analytics
              </h3>
              <p className="font-body-md text-xs text-[#c3c6d7] mb-4">
                Real-time ROI statistics, multi-currency revenue forecasting, and churn risk detection.
              </p>

              {/* Timeframe Filter */}
              <div className="flex gap-1 p-1 bg-[#11131b] rounded-lg border border-white/5 mb-4">
                {(['30D', '90D', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`flex-1 py-1 text-[11px] font-mono font-semibold rounded transition-colors ${
                      timeframe === tf
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-[#8d90a0] hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Revenue Counter & Bar Chart */}
            <div className="relative z-10 pt-2 border-t border-white/10">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <div className="text-[10px] font-mono text-[#8d90a0] uppercase">Total Revenue ({timeframe})</div>
                  <div className="text-2xl font-bold font-headline-md text-white">
                    {timeframe === '30D' ? '$1.8M' : timeframe === '90D' ? '$4.5M' : '$18.2M'}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  <TrendingUp className="w-3.5 h-3.5" /> +24%
                </div>
              </div>

              {/* Animated Faux Bar Chart */}
              <div className="flex items-end justify-between h-20 px-1 gap-2">
                {[35, 50, 65, 95, 78, 88].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#282a32] rounded-t flex items-end h-full p-0.5">
                    <div
                      style={{
                        height: timeframe === '30D' ? `${h * 0.7}%` : timeframe === '90D' ? `${h}%` : `${Math.min(100, h * 1.15)}%`
                      }}
                      className={`w-full rounded-t transition-all duration-500 ${
                        i === 3 ? 'bg-primary shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'bg-[#3f465c]'
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bento 3: Interactive Workflow Automation (5 cols) */}
          <div className="bento-card col-span-1 md:col-span-5 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-xl font-bold text-white mb-1">
                    Workflow Automation
                  </h3>
                  <p className="font-body-md text-xs text-[#c3c6d7] mb-6">
                    Automate follow-up emails, deal enrichment, and escalation alerts with zero code.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Node Flow Simulator */}
            <div className="relative z-10 bg-[#11131b]/80 p-4 rounded-xl border border-white/5 mb-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-[#8d90a0]">LIVE WORKFLOW SIMULATION</span>
                <button
                  onClick={runAutomationSimulation}
                  disabled={isSimulating}
                  className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 text-[11px] font-mono font-semibold flex items-center gap-1 border border-purple-500/30 transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                  {isSimulating ? 'Processing...' : 'Run Simulation'}
                </button>
              </div>

              <div className="flex items-center justify-between relative">
                {/* Node 1 */}
                <div className={`flex flex-col items-center gap-1 z-10 ${automationStep >= 1 ? 'scale-105' : ''} transition-transform`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    automationStep >= 1 ? 'bg-purple-600 border-purple-300 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]' : 'bg-[#282a32] border-white/10 text-[#8d90a0]'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#c3c6d7]">Inbound Lead</span>
                </div>

                {/* Connector 1 */}
                <div className="flex-1 h-0.5 bg-[#32343d] mx-2 relative overflow-hidden">
                  {automationStep >= 1 && (
                    <div className="absolute inset-0 bg-purple-500 animate-pulse"></div>
                  )}
                </div>

                {/* Node 2 */}
                <div className={`flex flex-col items-center gap-1 z-10 ${automationStep >= 2 ? 'scale-105' : ''} transition-transform`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    automationStep >= 2 ? 'bg-primary-container border-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]' : 'bg-[#282a32] border-white/10 text-[#8d90a0]'
                  }`}>
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#c3c6d7]">AI Enrichment</span>
                </div>

                {/* Connector 2 */}
                <div className="flex-1 h-0.5 bg-[#32343d] mx-2 relative overflow-hidden">
                  {automationStep >= 2 && (
                    <div className="absolute inset-0 bg-primary animate-pulse"></div>
                  )}
                </div>

                {/* Node 3 */}
                <div className={`flex flex-col items-center gap-1 z-10 ${automationStep >= 3 ? 'scale-105' : ''} transition-transform`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    automationStep >= 3 ? 'bg-emerald-600 border-emerald-300 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-[#282a32] border-white/10 text-[#8d90a0]'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[#c3c6d7]">Deal Created</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento 4: Global Collaboration (7 cols) */}
          <div className="bento-card col-span-1 md:col-span-7 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-white mb-1">
                Global Collaboration
              </h3>
              <p className="font-body-md text-sm text-[#c3c6d7] max-w-lg mb-6">
                Keep your entire enterprise team synced across regions. Shared customer inboxes, collaborative meeting transcripts, and real-time deal alerts.
              </p>
            </div>

            {/* Collaboration Live Activity Component */}
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#11131b]/80 p-4 rounded-xl border border-white/5">
              {/* Avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E293B] bg-blue-600 flex items-center justify-center text-xs font-mono font-bold text-white">
                    SJ
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E293B] bg-purple-600 flex items-center justify-center text-xs font-mono font-bold text-white">
                    MC
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E293B] bg-emerald-600 flex items-center justify-center text-xs font-mono font-bold text-white">
                    AR
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-[#1E293B] bg-amber-600 flex items-center justify-center text-xs font-mono font-bold text-white">
                    MP
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    24 Revenue Reps Active
                  </div>
                  <div className="text-[10px] font-mono text-[#8d90a0]">Syncing live from SF, London, Tokyo</div>
                </div>
              </div>

              {/* Live Collaborative Note Snippet */}
              <div className="bg-[#1d1f27] px-3 py-2 rounded-lg border border-white/5 text-[11px] font-mono text-[#c3c6d7]">
                <span className="text-primary font-semibold">Sarah Jenkins:</span> &quot;CTO signed off on Q4 cluster!&quot;
              </div>
            </div>

            {/* Background Map Graphic Abstraction */}
            <div
              className="absolute right-0 bottom-0 w-2/3 h-48 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                backgroundSize: '16px 16px'
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE ENTERPRISE ROI CALCULATOR */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bento-card p-8 sm:p-12 border border-primary/20 bg-gradient-to-br from-[#11131b] via-[#1d1f27] to-[#11131b] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Calculator Inputs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/20 text-primary border border-primary/30 text-xs font-mono">
                <Calculator className="w-3.5 h-3.5" /> Enterprise ROI Estimator
              </div>
              <h3 className="font-display-xl text-2xl sm:text-4xl font-bold text-white leading-tight">
                Calculate Your Team&apos;s Revenue Velocity
              </h3>
              <p className="text-sm text-[#c3c6d7] max-w-xl">
                See how much additional ARR Nexus CRM unlocks through automated deal intelligence and zero manual CRM friction.
              </p>

              {/* Slider 1: Team Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#8d90a0]">SALES TEAM REPS</span>
                  <span className="text-white font-bold">{teamSize} Reps</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full accent-primary bg-[#32343d] h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Average Deal Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#8d90a0]">AVG ENTERPRISE DEAL SIZE</span>
                  <span className="text-white font-bold">${avgDealSize.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="250000"
                  step="5000"
                  value={avgDealSize}
                  onChange={(e) => setAvgDealSize(Number(e.target.value))}
                  className="w-full accent-primary bg-[#32343d] h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Calculator Output Card */}
            <div className="lg:col-span-5 bg-[#0B0F19]/90 p-6 sm:p-8 rounded-2xl border border-white/15 shadow-2xl flex flex-col justify-between gap-6">
              <div>
                <div className="text-xs font-mono text-[#8d90a0] uppercase mb-1">Estimated Annual Impact</div>
                <div className="text-3xl sm:text-4xl font-bold font-headline-md text-emerald-400">
                  +${estimatedRevGain.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-[#c3c6d7] mt-1">In additional closed deals / year</div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="text-xs font-mono text-[#8d90a0] uppercase mb-1">Rep Productivity Saved</div>
                <div className="text-2xl font-bold font-headline-md text-primary">
                  {estimatedHoursSaved.toLocaleString()} hrs / mo
                </div>
                <div className="text-xs font-mono text-[#c3c6d7] mt-1">Reinvested in high-touch prospect closing</div>
              </div>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full bg-primary-container text-white py-3 rounded-full font-button text-xs font-semibold btn-primary flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                <span>Request Custom ROI Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECURITY & ENTERPRISE COMPLIANCE */}
      <section className="py-12 px-4 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#11131b] border border-white/5">
            <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-2" />
            <div className="text-xs font-bold text-white">SOC 2 Type II</div>
            <div className="text-[10px] font-mono text-[#8d90a0]">Annually Audited</div>
          </div>
          <div className="p-4 rounded-xl bg-[#11131b] border border-white/5">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">99.99% SLA</div>
            <div className="text-[10px] font-mono text-[#8d90a0]">Enterprise Uptime</div>
          </div>
          <div className="p-4 rounded-xl bg-[#11131b] border border-white/5">
            <Cpu className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">Zero Data Training</div>
            <div className="text-[10px] font-mono text-[#8d90a0]">Private LLM Partition</div>
          </div>
          <div className="p-4 rounded-xl bg-[#11131b] border border-white/5">
            <Zap className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white">&lt; 50ms Latency</div>
            <div className="text-[10px] font-mono text-[#8d90a0]">Global Edge Network</div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CONVERSION CTA */}
      <section className="py-28 relative overflow-hidden border-t border-white/10 bg-[#0B0F19]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary-container/25 rounded-full blur-[140px] pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display-xl text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Ready to scale your enterprise sales?
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-[#c3c6d7] mb-10 max-w-xl mx-auto">
            Join top-performing teams using Nexus CRM to close deals faster. Deploy in minutes with native integrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto bg-primary-container text-white px-10 py-4 rounded-full font-button text-base font-semibold btn-primary shadow-[0_0_35px_rgba(37,99,235,0.5)] hover:scale-105 transition-transform"
            >
              Get Started for Free
            </button>
            <button
              onClick={() => setActiveView('dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-button text-sm font-semibold border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              Explore Live Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
