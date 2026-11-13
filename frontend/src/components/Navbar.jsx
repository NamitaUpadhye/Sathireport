import React from 'react';
import { ArrowRight, Sparkles, Activity, FileText } from 'lucide-react';

export default function Navbar({ currentView, onNavigate, onSelectSample }) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo - 4-Leaf Green Cross Emblem matching Medivia */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center space-x-3 cursor-pointer select-none group"
        >
          {/* Custom Medivia-style Green Cross / Clover Leaf Emblem */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-10 h-10 group-hover:scale-105 transition-transform" viewBox="0 0 40 40" fill="none">
              <circle cx="14" cy="14" r="7" fill="#15803d" />
              <circle cx="26" cy="14" r="7" fill="#22c55e" />
              <circle cx="14" cy="26" r="7" fill="#166534" />
              <circle cx="26" cy="26" r="7" fill="#15803d" />
              {/* Central White Cross */}
              <rect x="18" y="12" width="4" height="16" rx="1.5" fill="#ffffff" />
              <rect x="12" y="18" width="16" height="4" rx="1.5" fill="#ffffff" />
            </svg>
          </div>

          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight font-sans">
              Report<span className="text-medivia-green">Saathi</span>
            </span>
            <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest -mt-1">
              HEALTH LITERACY & LAB EXPLAINER
            </p>
          </div>
        </div>

        {/* Center Navigation Links with green active line matching Medivia */}
        <nav className="hidden md:flex items-center space-x-7 text-sm font-semibold text-slate-600">
          <button
            onClick={() => onNavigate('landing')}
            className={`relative py-1 transition-colors hover:text-medivia-green ${
              currentView === 'landing' ? 'text-slate-900 font-bold' : ''
            }`}
          >
            Home
            {currentView === 'landing' && (
              <span className="absolute bottom-[-18px] left-0 w-full h-[3px] bg-medivia-green rounded-full" />
            )}
          </button>

          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="relative py-1 transition-colors hover:text-medivia-green"
          >
            About Us
          </button>

          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                document.getElementById('therapeutic-areas')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="relative py-1 transition-colors hover:text-medivia-green"
          >
            Therapeutic Areas
          </button>

          {/* Preset Sample Reports dropdown */}
          <div className="relative group">
            <button className="relative py-1 transition-colors hover:text-medivia-green flex items-center space-x-1">
              <span>Sample Reports</span>
              <span className="text-[10px] bg-emerald-50 text-medivia-greenDark px-2 py-0.2 rounded-full font-bold ml-1 border border-emerald-100">
                Demo
              </span>
            </button>
            <div className="absolute left-0 mt-2 w-56 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 py-2 hidden group-hover:block transition-all z-50">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Preset Test Reports
              </div>
              <button
                onClick={() => onSelectSample('cbc')}
                className="w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-medivia-green"
              >
                Complete Blood Count (CBC)
              </button>
              <button
                onClick={() => onSelectSample('lipid')}
                className="w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-medivia-green"
              >
                Lipid Profile (Cholesterol)
              </button>
              <button
                onClick={() => onSelectSample('metabolic')}
                className="w-full text-left px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-medivia-green"
              >
                Basic Metabolic Panel
              </button>
            </div>
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`relative py-1 transition-colors hover:text-medivia-green ${
              currentView === 'dashboard' || currentView === 'results' ? 'text-slate-900 font-bold' : ''
            }`}
          >
            Dashboard
            {(currentView === 'dashboard' || currentView === 'results') && (
              <span className="absolute bottom-[-18px] left-0 w-full h-[3px] bg-medivia-green rounded-full" />
            )}
          </button>
        </nav>

        {/* Right CTA Button - Medivia Green Pill (matching "Get in Touch ->") */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-medivia-green hover:bg-medivia-greenDark shadow-sm flex items-center space-x-2 transition-all transform active:scale-95"
          >
            <span>Upload Report</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}
