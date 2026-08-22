import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutDashboard, Kanban, LineChart, Home, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, setIsDemoModalOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'landing' as const, label: 'Overview', icon: Home },
    { id: 'dashboard' as const, label: 'Command Center', icon: LayoutDashboard, badge: 'Live' },
    { id: 'pipeline' as const, label: 'Pipeline Kanban', icon: Kanban },
    { id: 'analytics' as const, label: 'Analytics', icon: LineChart },
  ];

  return (
    <nav
      id="global-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#11131b]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-[#11131b]/70 backdrop-blur-lg border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveView('landing')}
            className="text-lg font-display-xl font-bold tracking-tight text-[#e1e2ed] flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform">
              N
            </div>
            <span className="flex items-center gap-1.5">
              Nexus <span className="text-primary font-normal">CRM</span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-[#1d1f27]/80 p-1 rounded-full border border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium font-label-mono transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-container text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                      : 'text-[#c3c6d7] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                  {item.badge && (
                    <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {activeView === 'landing' ? (
            <button
              onClick={() => setActiveView('dashboard')}
              className="text-xs font-label-mono text-[#c3c6d7] hover:text-primary transition-colors duration-200 px-3 py-1.5 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Live App Demo
            </button>
          ) : (
            <button
              onClick={() => setActiveView('landing')}
              className="text-xs font-label-mono text-[#c3c6d7] hover:text-primary transition-colors duration-200 px-3 py-1.5"
            >
              ← Back to Overview
            </button>
          )}

          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="bg-primary-container text-white px-4 py-2 rounded-full font-button text-xs font-semibold btn-primary flex items-center gap-1.5 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:scale-95 transition-transform"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="bg-primary-container text-white px-3 py-1.5 rounded-full text-xs font-semibold"
          >
            Demo
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#1d1f27] text-[#e1e2ed] border border-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#11131b]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-container text-white'
                    : 'text-[#c3c6d7] hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs rounded bg-emerald-500/20 text-emerald-400 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
