import React from 'react';
import { MapPin, Phone, Mail, Globe, ShieldAlert } from 'lucide-react';

export default function Footer({ onNavigate, onSelectSample }) {
  return (
    <footer className="bg-medivia-forestDark text-slate-300 pt-16 pb-12 border-t border-teal-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info & Social Icons */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                <circle cx="14" cy="14" r="7" fill="#15803d" />
                <circle cx="26" cy="14" r="7" fill="#22c55e" />
                <circle cx="14" cy="26" r="7" fill="#166534" />
                <circle cx="26" cy="26" r="7" fill="#15803d" />
                <rect x="18" y="12" width="4" height="16" rx="1.5" fill="#ffffff" />
                <rect x="12" y="18" width="16" height="4" rx="1.5" fill="#ffffff" />
              </svg>
              <div>
                <span className="text-xl font-black text-white tracking-tight">
                  Report<span className="text-medivia-green">Saathi</span>
                </span>
                <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest -mt-1">
                  PHARMACEUTICALS & HEALTH LITERACY
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Improving lives through innovative and high-quality laboratory literacy solutions that make a meaningful difference.
            </p>

            <div className="flex items-center space-x-2.5 pt-2 text-xs text-slate-300">
              <span className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">in</span>
              <span className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">f</span>
              <span className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">𝕏</span>
              <span className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors font-bold text-xs">yt</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-medivia-greenLight transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-medivia-greenLight transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-medivia-greenLight transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onSelectSample('cbc')} className="hover:text-medivia-greenLight transition-colors">
                  Therapeutic Areas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-medivia-greenLight transition-colors">
                  Quality
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-medivia-greenLight transition-colors">
                  Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-medivia-greenLight cursor-pointer transition-colors">Investors</span></li>
              <li><span className="hover:text-medivia-greenLight cursor-pointer transition-colors">News & Media</span></li>
              <li><span className="hover:text-medivia-greenLight cursor-pointer transition-colors">Downloads</span></li>
              <li><span className="hover:text-medivia-greenLight cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-medivia-greenLight cursor-pointer transition-colors">Terms & Conditions</span></li>
            </ul>
          </div>

          {/* Column 4: Contact Us (Exact address & contact from Medivia) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact Us</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Medivia House, Science Park, Hyderabad, India - 500081</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>+91 40 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>info@mediviapharma.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Globe className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>www.mediviapharma.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} ReportSaathi / Medivia Pharmaceuticals. All rights reserved.</p>
          <div className="flex items-center space-x-2 text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Strictly educational demonstration. Not for medical diagnosis or prescription.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
