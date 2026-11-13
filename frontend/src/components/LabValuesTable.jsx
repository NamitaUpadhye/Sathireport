import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, AlertTriangle, ArrowUpRight, ArrowDownRight, Info, Filter } from 'lucide-react';

export default function LabValuesTable({ categories }) {
  const [filterAbnormal, setFilterAbnormal] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});

  if (!categories || categories.length === 0) return null;

  const toggleExpand = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'high':
        return {
          label: 'HIGH',
          color: 'bg-rose-100 text-rose-800 border-rose-200',
          icon: ArrowUpRight
        };
      case 'low':
        return {
          label: 'LOW',
          color: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: ArrowDownRight
        };
      case 'borderline':
        return {
          label: 'BORDERLINE',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: AlertTriangle
        };
      case 'normal':
      default:
        return {
          label: 'NORMAL',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: CheckCircle
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Detailed Biomarker Breakdown</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click on any test to see what it measures and what your reading indicates.
          </p>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setFilterAbnormal(!filterAbnormal)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
            filterAbnormal
              ? 'bg-rose-50 text-rose-700 border-rose-200'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>{filterAbnormal ? 'Showing Out-of-Range Only' : 'Show Out-of-Range Only'}</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {categories.map((cat, catIdx) => {
          const visibleTests = filterAbnormal
            ? cat.tests.filter(t => t.status && t.status.toLowerCase() !== 'normal')
            : cat.tests;

          if (visibleTests.length === 0) return null;

          return (
            <div key={catIdx} className="space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 bg-slate-100/80 px-3 py-1.5 rounded-lg inline-block">
                {cat.category_name}
              </h3>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {visibleTests.map((test, testIdx) => {
                  const itemKey = `${catIdx}-${testIdx}`;
                  const isExpanded = expandedItems[itemKey] ?? true; // default open for clarity
                  const badge = getStatusBadge(test.status);
                  const Icon = badge.icon;

                  return (
                    <div
                      key={testIdx}
                      className="p-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                      onClick={() => toggleExpand(itemKey)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        {/* Name and Range */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-slate-900">{test.name}</span>
                            <span className={`inline-flex items-center text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${badge.color}`}>
                              <Icon className="w-3 h-3 mr-1" />
                              {badge.label}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Standard Normal Range: <span className="font-mono text-slate-700">{test.reference_range || 'Not specified'}</span>
                          </p>
                        </div>

                        {/* Observed Value & Toggle */}
                        <div className="flex items-center justify-between sm:justify-end space-x-4">
                          <div className="text-right">
                            <span className="text-base font-extrabold text-slate-900 font-mono">
                              {test.value}
                            </span>
                            {test.unit && (
                              <span className="text-xs text-slate-500 ml-1 font-medium">{test.unit}</span>
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

                      {/* Plain Language Explanation Accordion */}
                      {isExpanded && test.explanation && (
                        <div className="mt-3 pt-3 border-t border-slate-100/90 text-xs text-slate-600 bg-teal-50/30 -mx-4 -mb-4 p-4 rounded-b-xl flex items-start space-x-2.5">
                          <Info className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-teal-950 mb-0.5">What this means in plain words:</p>
                            <p className="leading-relaxed text-slate-700">{test.explanation}</p>
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
  );
}
