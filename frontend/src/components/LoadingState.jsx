import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, FileSearch, Sparkles, BookOpen } from 'lucide-react';

const STEPS = [
  "Validating file integrity and laboratory document structure...",
  "Extracting biomarker names, numerical readings, and clinical units...",
  "Cross-referencing laboratory normal reference ranges...",
  "Synthesizing plain-language patient summary and doctor questions..."
];

const HEALTH_TIPS = [
  "Did you know? Even mild dehydration can temporarily alter blood electrolyte and kidney readings.",
  "Reference ranges can vary slightly between different labs due to the specific testing equipment they use.",
  "Pathologists recommend discussing test trends over time rather than a single isolated reading.",
  "Fasting for a lipid or metabolic panel typically requires 8 to 12 hours of drinking only water."
];

export default function LoadingState({ fileName, onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    // Step progression timer
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 700);

    // Tip rotation timer
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % HEALTH_TIPS.length);
    }, 2200);

    // Auto complete after ~3.2 seconds
    const finishTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    return () => {
      clearInterval(stepInterval);
      clearInterval(tipInterval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div className="max-w-xl mx-auto my-12 bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 text-center space-y-8 animate-fade-in">
      {/* Central Animated Icon - Medivia style */}
      <div className="relative w-20 h-20 mx-auto">
        <div className="absolute inset-0 rounded-3xl bg-emerald-100 animate-ping opacity-50" />
        <div className="relative w-20 h-20 rounded-3xl bg-medivia-tealDark text-white flex items-center justify-center shadow-lg">
          <FileSearch className="w-10 h-10 animate-pulse text-emerald-400 stroke-[1.8]" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Translating Your Laboratory Report
        </h3>
        {fileName && (
          <p className="text-xs font-mono text-medivia-green bg-emerald-50 px-3.5 py-1 rounded-full inline-block border border-emerald-200">
            {fileName}
          </p>
        )}
      </div>

      {/* Progress Steps List */}
      <div className="text-left bg-slate-50/90 rounded-2xl p-5 border border-slate-200/70 space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <div key={idx} className="flex items-center space-x-3 text-xs">
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-medivia-green animate-spin flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
              )}
              <span
                className={`transition-colors ${
                  isCurrent
                    ? 'font-bold text-slate-900'
                    : isDone
                    ? 'text-slate-600'
                    : 'text-slate-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      {/* Educational Factoid Carousel */}
      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-left space-y-1.5 transition-all">
        <div className="flex items-center space-x-1.5 text-[11px] font-bold text-medivia-green uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-medivia-green" />
          <span>Health Literacy Fact</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed italic">
          "{HEALTH_TIPS[tipIndex]}"
        </p>
      </div>
    </div>
  );
}
