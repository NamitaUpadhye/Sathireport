import React, { useState } from 'react';
import { HelpCircle, Copy, Check, Stethoscope } from 'lucide-react';

export default function DoctorQuestions({ questions }) {
  const [copied, setCopied] = useState(false);

  if (!questions || questions.length === 0) return null;

  const handleCopy = () => {
    const text = questions.map((q, idx) => `${idx + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-teal-900 to-slate-900 rounded-2xl shadow-md p-6 sm:p-8 text-white space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-teal-800/80">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-800/80 border border-teal-700/60 flex items-center justify-center text-teal-300">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Questions to Ask Your Doctor</h2>
            <p className="text-xs text-teal-200/80 mt-0.5">
              Empower yourself at your next visit with these specific questions based on your report.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-teal-800/80 hover:bg-teal-700 text-teal-100 border border-teal-700 flex items-center space-x-1.5 transition-all self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Questions</span>
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {questions.map((question, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3.5 rounded-xl bg-teal-950/40 border border-teal-800/50 hover:border-teal-700/70 transition-colors"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-800/80 text-teal-300 text-xs font-bold flex items-center justify-center">
              {idx + 1}
            </span>
            <p className="text-sm text-teal-50 font-medium leading-relaxed pt-0.5">
              {question}
            </p>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-teal-950/60 border border-teal-800/40 text-xs text-teal-200/90 flex items-start space-x-2.5">
        <HelpCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Tip for your visit:</strong> Doctors appreciate prepared patients! You can show this list on your phone or print it out to ensure all your questions get answered.
        </p>
      </div>
    </div>
  );
}
