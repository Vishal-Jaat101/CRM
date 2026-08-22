import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { HealthStatus, ActivityType } from '../../types';
import {
  Download,
  Plus,
  TrendingUp,
  Search,
  ArrowRight,
  Sparkles,
  CheckSquare,
  Square,
  Clock
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const {
    accounts,
    setSelectedAccount,
    activities,
    addActivity,
    tasks,
    addTask,
    toggleTask,
    setIsNewAccountModalOpen,
    setIsNewDealModalOpen,
    showToast
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<HealthStatus | 'ALL'>('ALL');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [activityForm, setActivityForm] = useState({
    title: '',
    description: '',
    account: accounts[0]?.name || '',
    type: 'Meeting' as ActivityType
  });

  // Calculate live telemetry metrics
  const totalArr = accounts.reduce((acc, a) => acc + a.arrValue, 0);
  const avgHealth = Math.round(
    accounts.reduce((acc, a) => acc + a.healthScore, 0) / (accounts.length || 1)
  );
  const atRiskCount = accounts.filter((a) => a.status === 'At Risk').length;
  const optimalCount = accounts.filter((a) => a.status === 'Optimal').length;

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || acc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportData = () => {
    const dataStr = JSON.stringify(accounts, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus_crm_accounts_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('Accounts telemetry data exported successfully.');
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityForm.title.trim()) return;

    addActivity({
      time: 'Just now',
      type: activityForm.type,
      title: activityForm.title.trim(),
      description: activityForm.description.trim() || 'Logged via Command Center',
      account: activityForm.account,
      author: 'Current User'
    });

    setActivityForm({
      title: '',
      description: '',
      account: accounts[0]?.name || '',
      type: 'Meeting'
    });
    setIsAddingActivity(false);
  };

  const handleQuickAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle.trim(),
      account: accounts[0]?.name || 'General',
      dueDate: 'In 2 days',
      priority: 'High',
      completed: false,
      tag: 'Priority'
    });

    setNewTaskTitle('');
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#e1e2ed] pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-primary-container selection:text-white">
      {/* 1. PAGE COMMAND HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pt-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary-container/20 text-primary border border-primary/30 text-[11px] font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemetry Stream
            </span>
            <span className="text-xs font-mono text-[#8d90a0]">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display-xl font-bold text-white tracking-tight">
            Command Center
          </h1>
          <p className="text-sm font-body-md text-[#c3c6d7] mt-1">
            Customer Relationships, Mastered.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportData}
            className="glass-panel text-[#e1e2ed] hover:text-white px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-[#282a32] transition-colors text-xs font-mono font-medium"
          >
            <Download className="w-4 h-4 text-primary" /> Export Data
          </button>

          <button
            onClick={() => setIsNewAccountModalOpen(true)}
            className="bg-primary-container text-white px-4 py-2 rounded-lg flex items-center gap-1.5 hover:bg-primary-container/90 transition-all hover:-translate-y-0.5 electric-glow text-xs font-semibold"
          >
            <Plus className="w-4 h-4" /> New Account
          </button>

          <button
            onClick={() => setIsNewDealModalOpen(true)}
            className="bg-[#1d1f27] border border-white/10 hover:border-primary/40 text-white px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors text-xs font-mono font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" /> New Deal
          </button>
        </div>
      </header>

      {/* 2. MASTERY METRICS (4 BENTO KPI CARDS) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Metric 1: Health Score */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'Optimal' ? 'ALL' : 'Optimal')}
          className="bento-card p-5 flex flex-col justify-between h-[160px] group cursor-pointer hover:border-primary-container/50"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-mono text-[#8d90a0] uppercase tracking-wider">
              Health Score
            </h3>
            <span className="material-symbols-outlined text-primary-container text-xl">vital_signs</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-display-xl font-bold text-white glow-text">
                {avgHealth}<span className="text-sm font-normal text-[#8d90a0]">/100</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> {optimalCount} Optimal Accounts
              </div>
            </div>

            {/* Radial CSS progress indicator */}
            <div
              className="relative w-12 h-12 rounded-full flex items-center justify-center bg-[#32343d]"
              style={{ background: `conic-gradient(#2563eb ${avgHealth}%, #32343d 0)` }}
            >
              <div className="w-9 h-9 bg-[#1d1f27] rounded-full flex items-center justify-center text-xs font-bold text-primary">
                +{optimalCount}
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2: Active Relationships */}
        <div className="bento-card p-5 flex flex-col justify-between h-[160px] group hover:border-primary-container/50">
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-mono text-[#8d90a0] uppercase tracking-wider">
              Active Relationships
            </h3>
            <span className="material-symbols-outlined text-primary-container text-xl">groups</span>
          </div>

          <div>
            <div className="text-3xl font-display-xl font-bold text-white">
              {(1240 + accounts.length).toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs font-mono">
              <span className="text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
              <span className="text-[#8d90a0]">vs last quarter</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Revenue Growth (Sparkline) */}
        <div className="bento-card p-5 flex flex-col justify-between h-[160px] group hover:border-primary-container/50 relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <h3 className="text-xs font-mono text-[#8d90a0] uppercase tracking-wider">
              Revenue Growth
            </h3>
            <span className="material-symbols-outlined text-primary-container text-xl">monetization_on</span>
          </div>

          <div className="relative z-10">
            <div className="text-3xl font-display-xl font-bold text-white">
              ${(totalArr / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs font-mono text-primary mt-1">ARR Telemetry Impact</div>
          </div>

          {/* Sparkline SVG */}
          <svg className="absolute bottom-0 left-0 w-full h-1/2 opacity-30 sparkline text-primary pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 30">
            <path d="M0 30 L10 25 L20 28 L30 15 L40 20 L50 10 L60 12 L70 5 L80 8 L90 2 L100 0" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
            <path d="M0 30 L10 25 L20 28 L30 15 L40 20 L50 10 L60 12 L70 5 L80 8 L90 2 L100 0 L100 30 L0 30 Z" fill="currentColor" fillOpacity="0.15"></path>
          </svg>
        </div>

        {/* Metric 4: Churn Risk */}
        <div
          onClick={() => setStatusFilter(statusFilter === 'At Risk' ? 'ALL' : 'At Risk')}
          className="bento-card p-5 flex flex-col justify-between h-[160px] group cursor-pointer hover:border-rose-500/50"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xs font-mono text-[#8d90a0] uppercase tracking-wider">
              Churn Risk
            </h3>
            <span className="material-symbols-outlined text-amber-500 text-xl">warning</span>
          </div>

          <div>
            <div className="text-3xl font-display-xl font-bold text-white flex items-center justify-between">
              <span>{atRiskCount > 0 ? 'Managed' : 'Low'}</span>
              <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                {atRiskCount} At Risk
              </span>
            </div>
            <div className="mt-3 h-1.5 w-full bg-[#32343d] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(15, 100 - atRiskCount * 25)}%` }}
              ></div>
            </div>
            <div className="text-[11px] font-mono text-[#8d90a0] mt-2 flex justify-between">
              <span>Health Threshold</span>
              <span className="text-primary hover:underline">Filter List →</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Strategic Accounts & Relationship Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {/* Strategic Accounts Table Card */}
          <section className="bento-card flex flex-col min-h-[420px] overflow-hidden">
            {/* Table Header Controls */}
            <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-headline-md font-bold text-white flex items-center gap-2">
                  Strategic Accounts
                  <span className="text-xs font-mono font-normal text-[#8d90a0] bg-white/5 px-2 py-0.5 rounded">
                    {filteredAccounts.length} Total
                  </span>
                </h2>
              </div>

              {/* Filters & Search */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8d90a0]" />
                  <input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#11131b] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#8d90a0] focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1 bg-[#11131b] p-1 rounded-lg border border-white/10 text-xs font-mono">
                  {(['ALL', 'Optimal', 'Monitor', 'At Risk'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2 py-1 rounded transition-colors text-[11px] ${
                        statusFilter === st
                          ? 'bg-primary-container text-white font-semibold'
                          : 'text-[#8d90a0] hover:text-white'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Data */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-xs font-mono text-[#8d90a0] border-b border-white/5 bg-[#11131b]/60">
                    <th className="p-4 font-medium">Client Name</th>
                    <th className="p-4 font-medium">Relationship Lead</th>
                    <th className="p-4 font-medium">Health Status</th>
                    <th className="p-4 font-medium">ARR Value</th>
                    <th className="p-4 font-medium">Next Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {filteredAccounts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#8d90a0] font-mono">
                        No strategic accounts found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredAccounts.map((acc) => (
                      <tr
                        key={acc.id}
                        onClick={() => setSelectedAccount(acc)}
                        className="hover:bg-[#282a32]/50 transition-colors cursor-pointer group"
                      >
                        {/* Client Name */}
                        <td className="p-4 font-semibold text-white flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded bg-gradient-to-br ${acc.initialsColor} flex items-center justify-center text-white text-xs font-mono font-bold border border-white/10 shadow-sm`}
                          >
                            {acc.initials}
                          </div>
                          <div>
                            <div className="group-hover:text-primary transition-colors flex items-center gap-1.5">
                              {acc.name}
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
                            </div>
                            <div className="text-[11px] font-mono text-[#8d90a0] font-normal">{acc.industry}</div>
                          </div>
                        </td>

                        {/* Lead */}
                        <td className="p-4 text-[#c3c6d7] font-medium">
                          {acc.lead}
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border ${
                              acc.status === 'Optimal'
                                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20'
                                : acc.status === 'Monitor'
                                ? 'bg-amber-950/40 text-amber-400 border-amber-500/20'
                                : 'bg-rose-950/40 text-rose-400 border-rose-500/20'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                acc.status === 'Optimal'
                                  ? 'bg-emerald-400'
                                  : acc.status === 'Monitor'
                                  ? 'bg-amber-400'
                                  : 'bg-rose-400 animate-pulse'
                              }`}
                            ></span>
                            {acc.status} ({acc.healthScore})
                          </span>
                        </td>

                        {/* ARR */}
                        <td className="p-4 font-mono font-bold text-white">
                          {acc.arr}
                        </td>

                        {/* Next Milestone */}
                        <td className="p-4 text-[#c3c6d7] font-mono text-[11px]">
                          {acc.nextMilestone}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="p-4 border-t border-white/5 bg-[#11131b]/40 flex justify-between items-center text-xs font-mono text-[#8d90a0]">
              <span>Click any row to open full 360° Account Drawer</span>
              <span className="text-primary hover:underline cursor-pointer" onClick={() => setIsNewAccountModalOpen(true)}>
                + Register Strategic Account
              </span>
            </div>
          </section>

          {/* Relationship Timeline */}
          <section className="bento-card p-6 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-headline-md font-bold text-white">
                  Relationship Timeline
                </h2>
                <p className="text-xs text-[#8d90a0]">
                  Real-time log of strategic milestone executions, executive syncs, and escalations.
                </p>
              </div>

              <button
                onClick={() => setIsAddingActivity(!isAddingActivity)}
                className="px-3 py-1.5 rounded-lg bg-[#11131b] border border-white/10 hover:border-primary/50 text-xs font-mono text-primary flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                {isAddingActivity ? 'Cancel' : 'Log Activity'}
              </button>
            </div>

            {/* Inline Log Activity Form */}
            {isAddingActivity && (
              <form onSubmit={handleCreateActivity} className="mb-6 p-4 rounded-xl bg-[#11131b] border border-primary/30 space-y-3 animate-in fade-in duration-200">
                <div className="text-xs font-mono text-primary font-semibold">LOG NEW RELATIONSHIP EVENT</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Event Title (e.g. Exec Dinner, Contract Addendum)"
                    value={activityForm.title}
                    onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                    className="sm:col-span-2 bg-[#191b23] border border-white/10 text-xs text-white px-3 py-2 rounded focus:border-primary focus:outline-none"
                    required
                  />
                  <select
                    value={activityForm.type}
                    onChange={(e) => setActivityForm({ ...activityForm, type: e.target.value as ActivityType })}
                    className="bg-[#191b23] border border-white/10 text-xs text-white px-3 py-2 rounded focus:border-primary focus:outline-none"
                  >
                    <option value="Meeting">Meeting</option>
                    <option value="Milestone">Milestone</option>
                    <option value="Contract">Contract</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <select
                    value={activityForm.account}
                    onChange={(e) => setActivityForm({ ...activityForm, account: e.target.value })}
                    className="bg-[#191b23] border border-white/10 text-xs text-white px-3 py-2 rounded focus:border-primary focus:outline-none"
                  >
                    {accounts.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Description / Key Takeaway"
                    value={activityForm.description}
                    onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                    className="sm:col-span-2 bg-[#191b23] border border-white/10 text-xs text-white px-3 py-2 rounded focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-primary-container text-white text-xs font-semibold rounded hover:bg-primary-container/90"
                  >
                    Save Event to Timeline
                  </button>
                </div>
              </form>
            )}

            {/* Timeline Stream */}
            <div className="relative pl-6 border-l border-white/10 space-y-6">
              {activities.map((item, idx) => (
                <div key={item.id || idx} className="relative group">
                  {/* Dot */}
                  <div className="absolute -left-[31px] bg-[#1d1f27] p-1 rounded-full border border-primary/40 group-hover:border-primary transition-colors">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'Milestone' ? 'bg-purple-400' : item.type === 'Support' ? 'bg-amber-400' : 'bg-primary'
                    } shadow-[0_0_8px_rgba(37,99,235,0.8)]`}></div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-primary font-semibold">{item.time}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                        item.type === 'Milestone'
                          ? 'bg-purple-950/40 text-purple-400 border-purple-500/30'
                          : item.type === 'Support'
                          ? 'bg-amber-950/40 text-amber-400 border-amber-500/30'
                          : 'bg-blue-950/40 text-blue-400 border-blue-500/30'
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs font-mono text-[#8d90a0]">● {item.account}</span>
                      {item.impact && (
                        <span className="ml-auto text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          {item.impact}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-[#c3c6d7] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Action Required Task Center */}
        <div className="lg:col-span-4 space-y-6">
          <section className="bento-card p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500 text-xl">assignment_late</span>
                <h2 className="text-lg font-headline-md font-bold text-white">Action Required</h2>
              </div>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
                {tasks.filter((t) => !t.completed).length} Pending
              </span>
            </div>

            {/* Quick Add Task */}
            <form onSubmit={handleQuickAddTask} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Add actionable task..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-[#11131b] border border-white/10 text-xs text-white pl-3 pr-8 py-2 rounded-lg focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Task Items */}
            <div className="space-y-3 flex-grow">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`glass-panel p-3.5 rounded-xl flex items-start gap-3 group transition-all cursor-pointer border ${
                    task.completed
                      ? 'opacity-50 border-white/5 bg-[#11131b]/40'
                      : 'hover:border-primary/40 bg-[#191b23]'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTask(task.id);
                    }}
                    className="mt-0.5 text-primary flex-shrink-0"
                  >
                    {task.completed ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-[#8d90a0] group-hover:text-primary transition-colors" />
                    )}
                  </button>

                  <div className="flex-1">
                    <h4
                      className={`text-xs font-semibold transition-colors ${
                        task.completed
                          ? 'line-through text-[#8d90a0]'
                          : 'text-white group-hover:text-primary'
                      }`}
                    >
                      {task.title}
                    </h4>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#8d90a0] mt-1">
                      <span>{task.account}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {task.dueDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <div className="text-center text-xs font-mono text-[#8d90a0]">
                Tasks automatically prioritize high-ARR accounts
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
