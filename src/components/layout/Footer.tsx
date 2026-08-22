import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Sparkles, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer className="w-full bg-[#0c0e16] border-t border-[#434655]/40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary-container rounded flex items-center justify-center text-white font-bold text-sm">
                N
              </div>
              <span className="font-headline-md font-bold text-lg text-white">Nexus CRM</span>
            </div>
            <p className="text-xs text-[#8d90a0] leading-relaxed mb-4">
              The high-velocity command center for enterprise revenue teams. Engineered for precision, speed, and automated growth.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#191b23] border border-white/5 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational (99.99%)
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-headline-md text-xs font-semibold uppercase tracking-wider text-[#b4c5ff] mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8d90a0]">
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition-colors">
                  Command Center
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('pipeline')} className="hover:text-white transition-colors">
                  Pipeline Kanban
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('analytics')} className="hover:text-white transition-colors">
                  Revenue Intelligence
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Automated Workflows
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-headline-md text-xs font-semibold uppercase tracking-wider text-[#b4c5ff] mb-4">
              Enterprise
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8d90a0]">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <Shield className="w-3.5 h-3.5 text-primary" /> SOC2 Type II Certified
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> AI Relationship Graph
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <Terminal className="w-3.5 h-3.5 text-primary" /> REST & GraphQL APIs
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Custom Data Residency
              </li>
            </ul>
          </div>

          {/* Security & Status */}
          <div>
            <h4 className="font-headline-md text-xs font-semibold uppercase tracking-wider text-[#b4c5ff] mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8d90a0]">
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Security Whitepaper</li>
              <li className="hover:text-white transition-colors cursor-pointer">GDPR & CCPA Compliance</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs font-label-mono text-[#8d90a0]">
            © {new Date().getFullYear()} Nexus Systems Inc. Designed with Stitch Precision System.
          </p>
          <div className="flex items-center gap-6 text-xs text-[#8d90a0]">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security</span>
            <span className="hover:text-white cursor-pointer transition-colors">Status</span>
            <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
