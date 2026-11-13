import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LoadingState from './components/LoadingState';
import ResultsView from './components/ResultsView';
import Footer from './components/Footer';
import { SAMPLE_REPORTS } from './data/sampleReports';
import { AlertCircle, X } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard' | 'loading' | 'results'
  const [activeReport, setActiveReport] = useState(null);
  const [historyReports, setHistoryReports] = useState([
    SAMPLE_REPORTS.cbc // Pre-seed one report so dashboard has realistic preview
  ]);
  const [processingFileName, setProcessingFileName] = useState('');
  const [targetSampleKey, setTargetSampleKey] = useState('cbc');
  const [appError, setAppError] = useState(null);

  // Trigger loading flow for a sample or uploaded file
  const startLoadingProcess = (fileName, sampleKey = 'cbc') => {
    setProcessingFileName(fileName);
    setTargetSampleKey(sampleKey);
    setAppError(null);
    setCurrentView('loading');
  };

  const handleLoadingComplete = () => {
    const selectedData = SAMPLE_REPORTS[targetSampleKey] || SAMPLE_REPORTS.cbc;
    setActiveReport(selectedData);

    // Save to history list if not already present
    setHistoryReports(prev => {
      const exists = prev.some(r => r.id === selectedData.id);
      return exists ? prev : [selectedData, ...prev];
    });

    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSample = (sampleKey) => {
    const sample = SAMPLE_REPORTS[sampleKey] || SAMPLE_REPORTS.cbc;
    startLoadingProcess(`Diagnostic_${sampleKey.toUpperCase()}_Report.pdf`, sampleKey);
  };

  const handleOpenSavedReport = (report) => {
    setActiveReport(report);
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slateBg text-slate-800 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectSample={handleSelectSample}
      />

      {/* Global Error Banner */}
      {appError && (
        <div className="bg-rose-50 border-b border-rose-200 px-4 py-3">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-rose-900">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{appError}</span>
            </div>
            <button
              onClick={() => setAppError(null)}
              className="text-rose-500 hover:text-rose-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Body Routing */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {currentView === 'landing' && (
          <LandingPage
            onGoToDashboard={() => setCurrentView('dashboard')}
            onSelectSample={handleSelectSample}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            onStartProcessing={(fileName, sampleKey) => startLoadingProcess(fileName, sampleKey)}
            onSelectSample={handleSelectSample}
            historyReports={historyReports}
            onOpenReport={handleOpenSavedReport}
          />
        )}

        {currentView === 'loading' && (
          <LoadingState
            fileName={processingFileName}
            onComplete={handleLoadingComplete}
          />
        )}

        {currentView === 'results' && (
          <ResultsView
            report={activeReport}
            onBackToDashboard={() => setCurrentView('dashboard')}
            onUploadNew={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* Footer matching Medivia design */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectSample={handleSelectSample}
      />
    </div>
  );
}
