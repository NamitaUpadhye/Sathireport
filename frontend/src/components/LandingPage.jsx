import React from 'react';
import { 
  Heart, 
  Activity, 
  Droplet, 
  Wind, 
  ShieldCheck, 
  Pill, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  FlaskConical, 
  Users, 
  ClipboardCheck, 
  Phone,
  Building2,
  Calendar,
  ShieldAlert,
  Microscope
} from 'lucide-react';
import MediviaHeroVisual from './MediviaHeroVisual';

export default function LandingPage({ onGoToDashboard, onSelectSample }) {
  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION (Exact Medivia layout) */}
      <section className="pt-4 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-medivia-green font-bold text-sm tracking-wide">
              Healthier Today, Brighter Tomorrow
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Explaining Lab Tests. <br />
              <span className="text-medivia-green">Enhancing Lives.</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
              ReportSaathi is committed to research, develop and deliver high-quality plain-language medical report explanations that make a meaningful difference in people's lives.
            </p>

            {/* Dark Navy / Deep Teal Pill Button (matching "Explore Our Products ->") */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onGoToDashboard}
                className="px-7 py-3.5 rounded-full font-bold text-sm text-white bg-medivia-tealDark hover:bg-medivia-tealDeep shadow-md flex items-center space-x-2.5 transition-all transform active:scale-95"
              >
                <span>Upload Your Report</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={() => onSelectSample('cbc')}
                className="px-6 py-3.5 rounded-full font-bold text-sm text-slate-700 hover:text-medivia-green hover:bg-emerald-50/50 border border-slate-200 transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-medivia-green" />
                <span>Explore Sample CBC Report</span>
              </button>
            </div>

            {/* 3 Circular Feature Badges (Matching Medivia 3 round icon rows) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-medivia-green flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Trusted Quality</p>
                  <p className="text-[11px] text-slate-500">Highest standards for your clarity</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-medivia-green flex-shrink-0">
                  <Microscope className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Innovative Research</p>
                  <p className="text-[11px] text-slate-500">Science-driven health literacy</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-medivia-green flex-shrink-0">
                  <Users className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Patient First</p>
                  <p className="text-[11px] text-slate-500">Better understanding for better care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Medivia Lab Glassware & Composition */}
          <div className="lg:col-span-5">
            <MediviaHeroVisual onSelectSample={onSelectSample} />
          </div>
        </div>
      </section>

      {/* 2. "OUR THERAPEUTIC AREAS" (Exact matching 6 cards grid) */}
      <section id="therapeutic-areas" className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Therapeutic Areas
          </h2>
          <div className="w-12 h-1 bg-medivia-green mx-auto rounded-full" />
        </div>

        {/* 6 White Outlined Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Card 1: Cardiovascular Care */}
          <div 
            onClick={() => onSelectSample('lipid')}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-medivia-green hover:shadow-md cursor-pointer transition-all text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-medivia-green flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 group-hover:text-medivia-green transition-colors leading-tight">
              Cardiovascular Care
            </h3>
          </div>

          {/* Card 2: Gastrointestinal Care */}
          <div 
            onClick={() => onSelectSample('metabolic')}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-medivia-green hover:shadow-md cursor-pointer transition-all text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-medivia-green flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 group-hover:text-medivia-green transition-colors leading-tight">
              Gastrointestinal Care
            </h3>
          </div>

          {/* Card 3: Respiratory Care */}
          <div 
            onClick={() => onSelectSample('cbc')}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-medivia-green hover:shadow-md cursor-pointer transition-all text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-medivia-green flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Wind className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 group-hover:text-medivia-green transition-colors leading-tight">
              Respiratory Care
            </h3>
          </div>

          {/* Card 4: Pain Management */}
          <div 
            onClick={() => onSelectSample('cbc')}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-medivia-green hover:shadow-md cursor-pointer transition-all text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-medivia-green flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Droplet className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 group-hover:text-medivia-green transition-colors leading-tight">
              Pain Management
            </h3>
          </div>

          {/* Card 5: Anti Infectives */}
          <div 
            onClick={() => onSelectSample('cbc')}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-medivia-green hover:shadow-md cursor-pointer transition-all text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-medivia-green flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 group-hover:text-medivia-green transition-colors leading-tight">
              Anti Infectives
            </h3>
          </div>

          {/* Card 6: Vitamins & Supplements */}
          <div 
            onClick={() => onSelectSample('metabolic')}
            className="p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-medivia-green hover:shadow-md cursor-pointer transition-all text-center space-y-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-50 text-medivia-green flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Pill className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="text-xs font-bold text-slate-800 group-hover:text-medivia-green transition-colors leading-tight">
              Vitamins & Supplements
            </h3>
          </div>
        </div>

        <div className="text-center pt-2">
          <button 
            onClick={onGoToDashboard}
            className="text-xs font-bold text-slate-700 hover:text-medivia-green inline-flex items-center space-x-1.5 transition-colors"
          >
            <span>View All Areas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. DEEP TEAL STATS BANNER (Exact 5 columns from Medivia image) */}
      <section className="bg-medivia-tealDark rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-teal-800/60">
          {/* Stat 1 */}
          <div className="pt-4 md:pt-0 space-y-1">
            <FlaskConical className="w-7 h-7 mx-auto text-emerald-400 mb-2 stroke-[1.8]" />
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">25+</h4>
            <p className="text-xs text-teal-200/90">Years of Excellence</p>
          </div>

          {/* Stat 2 */}
          <div className="pt-4 md:pt-0 space-y-1">
            <Globe className="w-7 h-7 mx-auto text-emerald-400 mb-2 stroke-[1.8]" />
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">60+</h4>
            <p className="text-xs text-teal-200/90">Countries Worldwide</p>
          </div>

          {/* Stat 3 */}
          <div className="pt-4 md:pt-0 space-y-1">
            <Pill className="w-7 h-7 mx-auto text-emerald-400 mb-2 stroke-[1.8]" />
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">500+</h4>
            <p className="text-xs text-teal-200/90">Quality Products</p>
          </div>

          {/* Stat 4 */}
          <div className="pt-4 md:pt-0 space-y-1">
            <Users className="w-7 h-7 mx-auto text-emerald-400 mb-2 stroke-[1.8]" />
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">2500+</h4>
            <p className="text-xs text-teal-200/90">Healthcare Professionals</p>
          </div>

          {/* Stat 5 */}
          <div className="pt-4 md:pt-0 space-y-1 col-span-2 md:col-span-1">
            <ClipboardCheck className="w-7 h-7 mx-auto text-emerald-400 mb-2 stroke-[1.8]" />
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white">100%</h4>
            <p className="text-xs text-teal-200/90">Quality Commitment</p>
          </div>
        </div>
      </section>

      {/* 4. "WHO WE ARE" (Driven by Science. Guided by Care. Split Layout) */}
      <section id="about-us" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2">
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-5">
          <p className="text-xs font-bold text-medivia-green uppercase tracking-widest">
            WHO WE ARE
          </p>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Driven by Science. <br />
            Guided by Care.
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed">
            ReportSaathi is a fast-growing health literacy platform focused on innovation, quality and affordability. We strive to improve health outcomes through advanced research, ethical practices and sustainable solutions.
          </p>

          <div className="pt-2">
            <button
              onClick={onGoToDashboard}
              className="px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-slate-900 hover:text-medivia-green bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs flex items-center space-x-2 transition-all"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4 text-medivia-green" />
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Medical Facility Card (Matching Medivia building) */}
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl border-t-4 border-l-4 border-medivia-green overflow-hidden shadow-xl bg-slate-900 relative">
            {/* Facility Visualization */}
            <div className="h-64 sm:h-72 w-full bg-gradient-to-tr from-slate-950 via-slate-800 to-teal-950 p-6 flex flex-col justify-between text-white relative">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">Medivia Science Center</p>
                  <p className="text-[11px] text-slate-400">Clinical Pathology & Diagnostic Research Hub</p>
                </div>
              </div>

              {/* Building Facade Graphic */}
              <div className="space-y-2 py-4">
                <div className="grid grid-cols-4 gap-2 opacity-60">
                  <div className="h-10 bg-slate-700/60 rounded" />
                  <div className="h-10 bg-slate-700/60 rounded" />
                  <div className="h-10 bg-slate-700/60 rounded" />
                  <div className="h-10 bg-slate-700/60 rounded" />
                </div>
                <div className="grid grid-cols-4 gap-2 opacity-60">
                  <div className="h-10 bg-slate-700/60 rounded" />
                  <div className="h-10 bg-emerald-600/60 rounded" />
                  <div className="h-10 bg-slate-700/60 rounded" />
                  <div className="h-10 bg-slate-700/60 rounded" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-emerald-300 pt-2 border-t border-slate-800">
                <span>Verified Diagnostic Standards</span>
                <span className="font-bold">Hyderabad • Global Hub</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "LATEST NEWS & UPDATES" (Exact 3 Cards from Medivia image) */}
      <section className="space-y-8 pt-2">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Latest News & Updates
          </h2>
          <div className="w-12 h-1 bg-medivia-green mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div 
            onClick={() => onSelectSample('cbc')}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="h-36 bg-gradient-to-r from-blue-900 to-teal-900 p-4 flex items-end text-white">
              <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                Laboratory Science
              </span>
            </div>
            <div className="p-5 space-y-2.5">
              <p className="text-[11px] font-semibold text-slate-400">May 15, 2026</p>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-medivia-green transition-colors leading-snug">
                Medivia Expands Diagnostic Manufacturing Capabilities
              </h3>
              <div className="pt-2 flex items-center text-xs font-bold text-medivia-green">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onSelectSample('metabolic')}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="h-36 bg-gradient-to-r from-teal-900 to-emerald-900 p-4 flex items-end text-white">
              <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                Endocrinology
              </span>
            </div>
            <div className="p-5 space-y-2.5">
              <p className="text-[11px] font-semibold text-slate-400">April 28, 2026</p>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-medivia-green transition-colors leading-snug">
                New Research Milestone in Diabetes & Glycemic Care
              </h3>
              <div className="pt-2 flex items-center text-xs font-bold text-medivia-green">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onSelectSample('lipid')}
            className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="h-36 bg-gradient-to-r from-emerald-900 to-slate-900 p-4 flex items-end text-white">
              <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                Sustainability
              </span>
            </div>
            <div className="p-5 space-y-2.5">
              <p className="text-[11px] font-semibold text-slate-400">April 10, 2026</p>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-medivia-green transition-colors leading-snug">
                Our Commitment to A Sustainable & Accessible Future
              </h3>
              <div className="pt-2 flex items-center text-xs font-bold text-medivia-green">
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL-TO-ACTION RIBBON (Matching "Partner with us for a healthier tomorrow.") */}
      <section className="bg-medivia-tealDark rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight">
              Partner with us for a healthier tomorrow.
            </h3>
            <p className="text-xs text-teal-200/80 mt-0.5">
              We welcome collaborations and partnerships to create a better future together.
            </p>
          </div>
        </div>

        <button
          onClick={onGoToDashboard}
          className="px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-emerald-50 shadow-md flex items-center justify-center space-x-2 transition-all flex-shrink-0 self-start sm:self-auto"
        >
          <span>Upload Report</span>
          <ArrowRight className="w-4 h-4 text-medivia-green" />
        </button>
      </section>
    </div>
  );
}
