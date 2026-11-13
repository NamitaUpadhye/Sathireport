import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Type, Loader2 } from 'lucide-react';

export default function FileUpload({ onAnalyzeFile, onAnalyzeSample, onAnalyzeText, isProcessing }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textMode, setTextMode] = useState(false);
  const [manualText, setManualText] = useState('');
  const [inputError, setInputError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndSetFile = (file) => {
    setInputError(null);
    if (!file) return;

    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const validExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.webp'];
    const hasValidExt = validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!validTypes.includes(file.type) && !hasValidExt) {
      setInputError('Please select a valid PDF or Image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setInputError('File size exceeds 20MB limit.');
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = () => {
    if (selectedFile) {
      onAnalyzeFile(selectedFile);
    }
  };

  const handleTextSubmit = () => {
    if (!manualText.trim()) {
      setInputError('Please paste your lab test text before analyzing.');
      return;
    }
    onAnalyzeText(manualText);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 transition-all">
      {/* Mode Header Switcher */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Upload Your Lab Report</h2>
          <p className="text-xs text-slate-500 mt-0.5">We support digital PDFs and clear scanned photos of laboratory reports.</p>
        </div>
        <button
          onClick={() => {
            setTextMode(!textMode);
            setInputError(null);
          }}
          className="text-xs font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/70 border border-teal-200 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors"
        >
          <Type className="w-3.5 h-3.5" />
          <span>{textMode ? 'Switch to File Upload' : 'Paste Raw Text Instead'}</span>
        </button>
      </div>

      {inputError && (
        <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center space-x-2 text-rose-800 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{inputError}</span>
        </div>
      )}

      {/* Manual Text Mode */}
      {textMode ? (
        <div className="space-y-4">
          <textarea
            rows={7}
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder="Paste your lab test results text here (e.g. Hemoglobin: 11.2 g/dL, Normal: 13.5-17.5, Total Cholesterol: 238 mg/dL)..."
            className="w-full text-sm p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono bg-slate-50/50"
          />
          <button
            onClick={handleTextSubmit}
            disabled={isProcessing || !manualText.trim()}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-sm transition-all"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Translating Medical Terms with AI...</span>
              </>
            ) : (
              <>
                <span>Explain Pasted Report</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      ) : (
        /* File Drag and Drop Mode */
        <div>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-teal-500 bg-teal-50/60 scale-[1.01]'
                : selectedFile
                ? 'border-teal-300 bg-teal-50/30'
                : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50/70'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="w-14 h-14 rounded-2xl bg-teal-100/70 text-teal-700 flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-8 h-8 stroke-[1.8]" />
            </div>

            {selectedFile ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800 flex items-center justify-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>{selectedFile.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                </p>
                <p className="text-xs text-teal-700 font-semibold pt-2">Click or drag a new file to replace</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                <p className="text-sm font-bold text-slate-800">
                  Drop your lab report here, or <span className="text-teal-600 underline">browse files</span>
                </p>
                <p className="text-xs text-slate-500">
                  Supports PDF reports or high-resolution photos (PNG, JPG, WEBP up to 20MB)
                </p>
              </div>
            )}
          </div>

          {/* Action Button */}
          {selectedFile && (
            <div className="mt-4">
              <button
                onClick={handleUploadSubmit}
                disabled={isProcessing}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md shadow-teal-700/20 transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Extracting & Simplifying Laboratory Values...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Plain-Language Explanation</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick Test Demo Reports */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Don't have a report handy? Try a verified sample:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => onAnalyzeSample('cbc')}
            disabled={isProcessing}
            className="p-3 text-left rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700">Complete Blood Count</span>
              <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Hemoglobin, Platelets, WBC, ESR</p>
          </button>

          <button
            onClick={() => onAnalyzeSample('lipid')}
            disabled={isProcessing}
            className="p-3 text-left rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700">Lipid Profile Panel</span>
              <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Cholesterol, HDL, LDL, Triglycerides</p>
          </button>

          <button
            onClick={() => onAnalyzeSample('metabolic')}
            disabled={isProcessing}
            className="p-3 text-left rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/40 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 group-hover:text-teal-700">Metabolic & Renal</span>
              <FileText className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Fasting Sugar, HbA1c, Creatinine</p>
          </button>
        </div>
      </div>
    </div>
  );
}
