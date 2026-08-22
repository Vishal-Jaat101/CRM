import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 bg-[#1d1f27] text-white px-4 py-3 rounded-lg border border-primary/30 shadow-[0_0_25px_rgba(37,99,235,0.3)] backdrop-blur-xl">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span className="text-xs font-medium text-[#e1e2ed]">{toastMessage}</span>
        <button
          onClick={() => showToast('')}
          className="text-[#8d90a0] hover:text-white ml-2 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
