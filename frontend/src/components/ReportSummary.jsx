import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Bookmark, Printer, Sparkles } from 'lucide-react';

export default function ReportSummary({ report, onSave, isSaved }) {
  if (!report) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'normal':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          icon: CheckCircle2,
          label: 'Within Typical Expected Ranges',
          subtext: 'Most or all analyzed biomarkers are within laboratory reference thresholds.'
        };
      case 'consult_doctor_promptly':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          icon: AlertCircle,
          label: 'Requires Prompt Physician Review',
          subtext: 'Certain lab results deviate substantially from reference values and warrant timely medical attention.'
        };
      case 'attention_needed':
      default:
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          icon: AlertTriangle,
          label: 'Mild Variations Noted',
          subtext: 'A few biomarkers sit outside typical reference limits and should be discussed at your next doctor visit.'
        };
    }
  };

  const statusInfo = getStatusBadge(report.overall_status);
  const StatusIcon = statusInfo.icon;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header and Action toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
            {report.extraction_source || 'Laboratory Analysis'}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
            {report.title || 'Laboratory Report Explanation'}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center space-x-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={onSave}
            disabled={isSaved}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-all ${
              isSaved
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved to History' : 'Save Report'}</span>
          </button>
        </div>
      </div>

      {/* Status Signal Banner */}
      <div className={`p-4 rounded-xl border flex items-start space-x-3.5 ${statusInfo.bg}`}>
        <StatusIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold tracking-tight">{statusInfo.label}</p>
          <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{statusInfo.subtext}</p>
        </div>
      </div>

      {/* Plain Language Summary */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5 mb-2.5">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>In Plain English: What Your Report Says</span>
        </h3>
        <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-200/70 text-slate-700 text-sm leading-relaxed whitespace-pre-line font-normal">
          {report.summary}
        </div>
      </div>

      {/* Key Findings Bullet Points */}
      {report.key_findings && report.key_findings.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Key Takeaways
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {report.key_findings.map((finding, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2.5 p-3 rounded-xl bg-teal-50/40 border border-teal-100 text-xs text-slate-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 flex-shrink-0" />
                <span className="font-medium leading-relaxed">{finding}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
