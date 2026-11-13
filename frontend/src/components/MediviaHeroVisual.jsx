import React from 'react';
import { Sparkles, Activity, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MediviaHeroVisual({ onSelectSample }) {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Background Soft Radiance */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-green-100/60 via-teal-50/40 to-emerald-100/40 rounded-full blur-2xl opacity-70 -z-10" />

      {/* Main Glass Visual Container */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-7 space-y-5 overflow-hidden">
        
        {/* Lab Composition SVG Scene (Recreating the Medivia flask, medicine bottle, amber vial, capsules & leaves) */}
        <div className="relative h-56 sm:h-64 w-full bg-gradient-to-b from-slate-50 to-emerald-50/30 rounded-2xl p-4 flex items-center justify-center overflow-hidden border border-slate-100">
          <svg className="w-full h-full" viewBox="0 0 500 280" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="emeraldLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="amberLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Background Molecular Grid Hexagons */}
            <g opacity="0.15" stroke="#059669" strokeWidth="1.5">
              <polygon points="400,40 425,55 425,85 400,100 375,85 375,55" />
              <polygon points="450,70 475,85 475,115 450,130 425,115 425,85" />
              <polygon points="400,100 425,115 425,145 400,160 375,145 375,115" />
            </g>

            {/* Laboratory Flask (Conical Erlenmeyer with Emerald Liquid) */}
            <g transform="translate(140, 20)">
              {/* Flask Neck */}
              <rect x="75" y="10" width="30" height="70" rx="3" fill="url(#glassReflection)" stroke="#94a3b8" strokeWidth="2.5" />
              <rect x="70" y="8" width="40" height="8" rx="2" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
              {/* Flask Body */}
              <path d="M75,75 L20,190 Q15,200 30,200 L150,200 Q165,200 160,190 L105,75 Z" fill="#ffffff" fillOpacity="0.4" stroke="#94a3b8" strokeWidth="2.5" />
              {/* Emerald Liquid */}
              <path d="M50,135 Q90,145 130,135 L153,192 Q157,198 145,198 L35,198 Q23,198 27,192 Z" fill="url(#emeraldLiquid)" />
              {/* Measurement Ticks */}
              <line x1="75" y1="120" x2="88" y2="120" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="70" y1="140" x2="88" y2="140" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="65" y1="160" x2="88" y2="160" stroke="#cbd5e1" strokeWidth="2" />
              {/* Glass Reflection Highlight */}
              <path d="M38,185 L85,85" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
            </g>

            {/* White Medicine Bottle (Medivia brand bottle) */}
            <g transform="translate(260, 85)">
              <rect x="15" y="0" width="40" height="15" rx="3" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
              <rect x="0" y="15" width="70" height="95" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2.5" />
              {/* Bottle Label */}
              <rect x="6" y="32" width="58" height="62" rx="4" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              {/* Mini Green Cross Logo on Label */}
              <rect x="22" y="45" width="26" height="8" rx="2" fill="#15803d" />
              <rect x="31" y="36" width="8" height="26" rx="2" fill="#15803d" />
              <text x="35" y="76" fontSize="7" fontWeight="bold" fill="#0f172a" textAnchor="middle">ReportSaathi</text>
              <text x="35" y="85" fontSize="5" fill="#64748b" textAnchor="middle">CLINICAL LAB</text>
            </g>

            {/* Amber Vial with Dropper Cap */}
            <g transform="translate(345, 80)">
              <rect x="16" y="0" width="18" height="22" rx="3" fill="#1e293b" />
              <rect x="0" y="22" width="50" height="85" rx="8" fill="url(#amberLiquid)" stroke="#b45309" strokeWidth="2" />
              <rect x="6" y="38" width="38" height="52" rx="3" fill="#fef3c7" fillOpacity="0.85" stroke="#f59e0b" strokeWidth="1" />
              <line x1="12" y1="52" x2="38" y2="52" stroke="#92400e" strokeWidth="1.5" />
              <line x1="12" y1="62" x2="30" y2="62" stroke="#92400e" strokeWidth="1.5" />
            </g>

            {/* Glass Petri Dish with Botanical Green Leaves */}
            <g transform="translate(330, 150)">
              <ellipse cx="60" cy="30" rx="55" ry="22" fill="#ffffff" fillOpacity="0.5" stroke="#94a3b8" strokeWidth="2" />
              {/* Green Leaves Inside Dish */}
              <path d="M45,28 Q60,10 75,25 Q55,35 45,28 Z" fill="#16a34a" />
              <path d="M65,26 Q85,15 90,32 Q75,38 65,26 Z" fill="#22c55e" />
              <line x1="50" y1="28" x2="72" y2="24" stroke="#15803d" strokeWidth="1" />
              <line x1="68" y1="26" x2="88" y2="30" stroke="#15803d" strokeWidth="1" />
            </g>

            {/* Scattered Green & White Pharmaceutical Capsules */}
            {/* Capsule 1 */}
            <g transform="translate(200, 215) rotate(-25)">
              <rect x="0" y="0" width="16" height="12" rx="6" fill="#15803d" />
              <rect x="14" y="0" width="16" height="12" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            </g>
            {/* Capsule 2 */}
            <g transform="translate(245, 225) rotate(15)">
              <rect x="0" y="0" width="16" height="12" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="14" y="0" width="16" height="12" rx="6" fill="#15803d" />
            </g>
            {/* Capsule 3 */}
            <g transform="translate(290, 220) rotate(-10)">
              <rect x="0" y="0" width="15" height="11" rx="5.5" fill="#22c55e" />
              <rect x="13" y="0" width="15" height="11" rx="5.5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            </g>
          </svg>
        </div>

        {/* Floating Interactive Pathology Test Preview Card */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">Verified Pathology Demonstration</span>
            </div>
            <span className="text-[10px] font-bold text-medivia-green bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
              Demo Active
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-900">Hemoglobin (Hb)</p>
              <p className="text-[11px] text-slate-500">Ref: 12.0 - 15.5 g/dL</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-extrabold text-slate-900 text-sm">11.0 g/dL</span>
              <span className="block text-[10px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.2 rounded-full">
                Mild Low
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectSample('cbc')}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-medivia-tealDark hover:bg-medivia-tealDeep transition-colors flex items-center justify-center space-x-2 shadow-xs"
          >
            <span>View Full CBC Report Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
