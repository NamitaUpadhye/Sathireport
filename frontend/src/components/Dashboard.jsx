import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  Inbox
} from 'lucide-react';
import UploadArea from './UploadArea';

export default function Dashboard({ 
  onStartProcessing, 
  onSelectSample, 
  historyReports, 
  onOpenReport 
}) {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-8">
      {/* Top Banner in Dashboard - Matching Medivia Deep Teal */}
      <div className="bg-medivia-tealDark rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive Demo Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Patient Laboratory Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
            Upload your laboratory sheet to translate cryptic biomarkers into plain language, view normal reference ranges, and generate thoughtful questions for your doctor.
          </p>
        </div>

        {/* Clear Primary Action Button */}
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="px-6 py-3.5 rounded-full font-bold text-sm text-slate-900 bg-white hover:bg-emerald-50 shadow-md flex items-center justify-center space-x-2 transition-all self-start sm:self-auto flex-shrink-0"
        >
          <Upload className="w-4 h-4 text-medivia-green" />
          <span>{showUpload ? 'Hide Upload Area' : 'Upload Report'}</span>
        </button>
      </div>

      {/* Upload Area (Toggled or visible on initial empty state) */}
      {(showUpload || historyReports.length === 0) && (
        <div className="space-y-3">
          <UploadArea 
            onStartProcessing={onStartProcessing}
            onSelectSample={onSelectSample}
          />
        </div>
      )}

      {/* Reports History / Saved Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Analyzed Reports</h2>
            <p className="text-xs text-slate-500">View and revisit previously evaluated reports</p>
          </div>
          {historyReports.length > 0 && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-medivia-green border border-emerald-200">
              {historyReports.length} {historyReports.length === 1 ? 'Report' : 'Reports'}
            </span>
          )}
        </div>

        {/* Empty State vs Loaded List */}
        {historyReports.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-10 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-800">No Reports Analyzed Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Upload your first laboratory PDF or photo above, or test drive one of the sample blood panels to view the full breakdown.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => onSelectSample('cbc')}
                className="text-xs font-bold text-medivia-green hover:text-medivia-greenDark bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 px-4 py-2 rounded-full transition-colors"
              >
                Load Sample CBC Report
              </button>
              <button
                onClick={() => onSelectSample('lipid')}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full transition-colors"
              >
                Load Lipid Panel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {historyReports.map((report) => (
              <div
                key={report.id}
                onClick={() => onOpenReport(report)}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-medivia-green hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-medivia-green bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {report.laboratory || 'Clinical Lab'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {report.sampleDate}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-medivia-green transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {report.statusHeadline} — {report.statusDescription}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">
                    Patient: {report.patientName}
                  </span>
                  <span className="font-bold text-medivia-green group-hover:text-medivia-greenDark flex items-center">
                    <span>View Explanation</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
