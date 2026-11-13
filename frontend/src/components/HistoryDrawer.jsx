import React from 'react';
import { X, Calendar, ChevronRight, Trash2, FileText, BookmarkCheck } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, reports, onSelectReport, onDeleteReport }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <BookmarkCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Saved Reports</h2>
                <p className="text-xs text-slate-500">Access your past laboratory breakdowns</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {reports.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-700">No saved reports yet</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  When you analyze a report, click the "Save Report" button to store it here for future reference.
                </p>
              </div>
            ) : (
              reports.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/20 transition-all flex items-center justify-between group"
                >
                  <div
                    className="flex-1 cursor-pointer pr-3"
                    onClick={() => {
                      onSelectReport(item.report_data);
                      onClose();
                    }}
                  >
                    <p className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {item.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span className="capitalize font-medium text-teal-700">{item.overall_status.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onDeleteReport(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete saved report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectReport(item.report_data);
                        onClose();
                      }}
                      className="p-1.5 rounded-lg text-slate-400 group-hover:text-teal-600 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
