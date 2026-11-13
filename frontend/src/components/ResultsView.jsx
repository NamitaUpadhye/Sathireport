import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Filter, 
  Copy, 
  Check, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  Info,
  Calendar,
  User,
  Building2,
  Stethoscope,
  Upload
} from 'lucide-react';

export default function ResultsView({ report, onBackToDashboard, onUploadNew }) {
  const [filterAbnormal, setFilterAbnormal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  if (!report) return null;

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopyQuestions = () => {
    if (!report.doctorQuestions) return;
    const text = report.doctorQuestions.map((q, idx) => `${idx + 1}. ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'high':
        return {
          label: 'HIGH',
          color: 'bg-rose-100 text-rose-800 border-rose-200'
        };
      case 'low':
        return {
          label: 'LOW',
          color: 'bg-amber-100 text-amber-800 border-amber-200'
        };
      case 'borderline':
        return {
          label: 'BORDERLINE',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'normal':
      default:
        return {
          label: 'NORMAL',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
        };
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-700 hover:text-medivia-green bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-full transition-all self-start shadow-2xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center space-x-2.5 self-start sm:self-auto">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-full shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onUploadNew}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-white bg-medivia-tealDark hover:bg-medivia-tealDeep px-5 py-2.5 rounded-full shadow-xs transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Upload Another</span>
          </button>
        </div>
      </div>

      {/* 1. MANDATORY CLEAR EDUCATIONAL DISCLAIMER (Prominent) */}
      <div className="bg-amber-50 border border-amber-200/90 rounded-2xl p-4 sm:p-5 text-amber-950 text-xs sm:text-sm flex items-start space-x-3.5 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-extrabold uppercase tracking-wide text-amber-900 text-xs">
            Mandatory Educational Disclaimer
          </p>
          <p className="leading-relaxed text-amber-900 text-xs sm:text-[13px]">
            ReportSaathi is an educational health literacy tool created to demystify complex clinical terminology and numerical ranges. 
            <strong> It is NOT a medical diagnosis, clinical opinion, or substitute for formal healthcare advice.</strong> Reference ranges naturally vary depending on the diagnostic instrument and individual patient context. Always review your laboratory report directly with your licensed physician.
          </p>
        </div>
      </div>

      {/* 2. REPORT HEADER & SUMMARY CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-medivia-green bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Laboratory Educational Breakdown
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {report.title}
            </h1>
          </div>

          {/* Demographic Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center space-x-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span><strong>Patient:</strong> {report.patientName}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span><strong>Date:</strong> {report.sampleDate}</span>
            </div>
            <div className="flex items-center space-x-1.5 col-span-2 sm:col-span-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span><strong>Facility:</strong> {report.laboratory}</span>
            </div>
          </div>
        </div>

        {/* Status Signal Card */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex items-start space-x-3.5 ${
          report.overallStatus === 'normal' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
            : 'bg-amber-50 border-amber-200 text-amber-900'
        }`}>
          {report.overallStatus === 'normal' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <p className="text-sm font-bold">{report.statusHeadline}</p>
            <p className="text-xs opacity-90 leading-relaxed">{report.statusDescription}</p>
          </div>
        </div>

        {/* Plain Language Summary */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-medivia-green" />
            <span>Plain-Language Patient Summary</span>
          </div>
          <div className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/80 text-slate-700 text-sm leading-relaxed whitespace-pre-line font-normal">
            {report.summary}
          </div>
        </div>

        {/* Key Takeaways */}
        {report.keyFindings && report.keyFindings.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Biomarker Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {report.keyFindings.map((finding, idx) => (
                <div 
                  key={idx}
                  className="flex items-start space-x-2.5 p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 text-xs text-slate-700"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-medivia-green mt-1.5 flex-shrink-0" />
                  <span className="font-medium leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. EXTRACTED VALUES & PLAIN-LANGUAGE EXPLANATION SECTION */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Extracted Biomarker Values</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Numerical readings, laboratory reference thresholds, and educational explanations.
            </p>
          </div>

          {/* Filter out-of-range */}
          <button
            onClick={() => setFilterAbnormal(!filterAbnormal)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              filterAbnormal
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{filterAbnormal ? 'Showing Out-of-Range Only' : 'Show Out-of-Range Only'}</span>
          </button>
        </div>

        {/* Biomarker Categories */}
        <div className="space-y-8">
          {report.categories.map((category, catIdx) => {
            const filteredTests = filterAbnormal
              ? category.tests.filter(t => t.status && t.status.toLowerCase() !== 'normal')
              : category.tests;

            if (filteredTests.length === 0) return null;

            return (
              <div key={catIdx} className="space-y-3.5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-xs text-slate-500 mt-0.5">{category.description}</p>
                  )}
                </div>

                {/* Values Card List */}
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  {filteredTests.map((test, testIdx) => {
                    const itemKey = `${catIdx}-${testIdx}`;
                    const isExpanded = expandedItems[itemKey] ?? true;
                    const badge = getStatusBadge(test.status);

                    return (
                      <div 
                        key={testIdx}
                        className="p-4 sm:p-5 hover:bg-slate-50/50 transition-colors"
                      >
                        <div 
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
                          onClick={() => toggleExpand(itemKey)}
                        >
                          {/* Test name, Reference Range */}
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-slate-900">{test.name}</span>
                              <span className={`inline-flex items-center text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                                {badge.label}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500">
                              Standard Reference Range: <span className="font-mono font-medium text-slate-700">{test.referenceRange}</span>
                            </p>
                          </div>

                          {/* Observed Numerical Value & Units */}
                          <div className="flex items-center justify-between sm:justify-end space-x-4">
                            <div className="text-right">
                              <span className="text-lg font-extrabold text-slate-900 font-mono">
                                {test.value}
                              </span>
                              {test.unit && (
                                <span className="text-xs font-semibold text-slate-500 ml-1.5">{test.unit}</span>
                              )}
                            </div>
                            <button
                              type="button"
                              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Plain Language Explanation Details */}
                        {isExpanded && (
                          <div className="mt-3.5 pt-3.5 border-t border-slate-100 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3 bg-emerald-50/30 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 sm:p-5 rounded-b-2xl">
                            <div className="space-y-1">
                              <p className="font-bold text-emerald-950 flex items-center space-x-1">
                                <Info className="w-3.5 h-3.5 text-medivia-green" />
                                <span>What this test measures:</span>
                              </p>
                              <p className="text-slate-700 leading-relaxed">{test.whatItIs}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="font-bold text-emerald-950 flex items-center space-x-1">
                                <Sparkles className="w-3.5 h-3.5 text-medivia-green" />
                                <span>What this reading indicates:</span>
                              </p>
                              <p className="text-slate-700 leading-relaxed">{test.whatItMeans}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. QUESTIONS FOR YOUR DOCTOR (Empowering Patient Consultation) */}
      {report.doctorQuestions && report.doctorQuestions.length > 0 && (
        <div className="bg-medivia-tealDark rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-teal-800/80">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-300">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight">Questions to Ask Your Doctor</h2>
                <p className="text-xs text-teal-200 mt-0.5">
                  Prepare for your next clinic appointment with tailored questions based on your report.
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyQuestions}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-white/10 hover:bg-white/20 text-teal-100 border border-white/20 flex items-center space-x-1.5 transition-all self-start sm:self-auto"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All Questions</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {report.doctorQuestions.map((q, idx) => (
              <div 
                key={idx}
                className="flex items-start space-x-3 p-4 rounded-2xl bg-black/20 border border-white/10 text-xs sm:text-sm text-teal-50"
              >
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-teal-950 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="font-medium leading-relaxed">{q}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs text-teal-200 flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-white">Patient tip:</strong> Writing down your questions in advance ensures you get answers to all your concerns without feeling rushed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
