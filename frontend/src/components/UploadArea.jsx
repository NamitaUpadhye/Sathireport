import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  X,
  FileCheck
} from 'lucide-react';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png'];

export default function UploadArea({ onStartProcessing, onSelectSample, onErrorTrigger, onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState(null);
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

  const validateFile = (file) => {
    setValidationError(null);
    if (!file) return false;

    // Check extension
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    const hasValidExt = ALLOWED_EXTENSIONS.includes(ext);
    const hasValidMime = ALLOWED_MIME_TYPES.includes(file.type);

    if (!hasValidExt && !hasValidMime) {
      const err = `Unsupported file type "${ext}". Please upload a PDF document or a JPG/PNG image scan.`;
      setValidationError(err);
      if (onErrorTrigger) onErrorTrigger(err);
      return false;
    }

    // Check size limit (10MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      const err = `File size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 10MB limit. Please compress or crop the file.`;
      setValidationError(err);
      if (onErrorTrigger) onErrorTrigger(err);
      return false;
    }

    if (file.size === 0) {
      const err = "The selected file is empty (0 bytes). Please select a valid laboratory document.";
      setValidationError(err);
      if (onErrorTrigger) onErrorTrigger(err);
      return false;
    }

    setSelectedFile(file);
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const handleProcessSubmit = () => {
    if (!selectedFile) return;

    // In demo mode: map filename keywords to sample reports
    const lowerName = selectedFile.name.toLowerCase();
    let demoKey = 'cbc';
    if (lowerName.includes('lipid') || lowerName.includes('cholesterol')) {
      demoKey = 'lipid';
    } else if (lowerName.includes('sugar') || lowerName.includes('glucose') || lowerName.includes('metabolic') || lowerName.includes('kidney')) {
      demoKey = 'metabolic';
    }

    onStartProcessing(selectedFile.name, demoKey);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Upload Laboratory Report</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a PDF document or a smartphone camera photo (JPG, PNG).
          </p>
        </div>
        <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-medivia-green bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full self-start sm:self-auto">
          <span>Max 10MB</span>
          <span>•</span>
          <span>PDF, JPG, PNG</span>
        </div>
      </div>

      {/* Validation Error Alert */}
      {validationError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start justify-between space-x-3">
          <div className="flex items-start space-x-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-rose-950">Validation Notice</p>
              <p className="mt-0.5 text-rose-800 leading-relaxed">{validationError}</p>
            </div>
          </div>
          <button 
            onClick={() => setValidationError(null)} 
            className="text-rose-500 hover:text-rose-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-medivia-green bg-emerald-50/70 scale-[1.01]'
            : selectedFile
            ? 'border-medivia-green bg-emerald-50/30'
            : 'border-slate-300 hover:border-medivia-green hover:bg-slate-50/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,image/png,image/jpeg,application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-medivia-green flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-2xs">
          {selectedFile ? (
            <FileCheck className="w-8 h-8 text-medivia-green" />
          ) : (
            <UploadCloud className="w-8 h-8 stroke-[1.8]" />
          )}
        </div>

        {selectedFile ? (
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-800 truncate max-w-xs">{selectedFile.name}</span>
              <span className="text-[11px] text-slate-500 font-mono">
                ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </div>
            <p className="text-xs text-medivia-green font-semibold">
              File verified and ready! Click "Process & Explain Report" below.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-base font-bold text-slate-800">
              Drag your lab report here, or <span className="text-medivia-green underline">browse files</span>
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Accepts diagnostic PDF printouts or clear mobile photos of printed lab sheets.
            </p>
          </div>
        )}
      </div>

      {/* Action Button for Uploaded File */}
      {selectedFile && (
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              setSelectedFile(null);
              setValidationError(null);
            }}
            className="px-4 py-3 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            Clear Selected File
          </button>

          <button
            onClick={handleProcessSubmit}
            className="flex-1 py-3.5 px-6 rounded-full font-bold text-sm text-white bg-medivia-tealDark hover:bg-medivia-tealDeep shadow-md flex items-center justify-center space-x-2 transition-all transform active:scale-98"
          >
            <span>Process & Explain Report</span>
            <ArrowRight className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      )}

      {/* Preset Demo Reports Section */}
      <div className="pt-6 border-t border-slate-100 space-y-3">
        <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          <Sparkles className="w-3.5 h-3.5 text-medivia-green" />
          <span>Or Test Drive Realistic Sample Lab Datasets:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onSelectSample('cbc')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-medivia-green hover:bg-emerald-50/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 group-hover:text-medivia-green">Complete Blood Count</span>
              <FileText className="w-4 h-4 text-slate-400 group-hover:text-medivia-green" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Hemoglobin, Platelets, WBC Differential</p>
          </button>

          <button
            onClick={() => onSelectSample('lipid')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-medivia-green hover:bg-emerald-50/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 group-hover:text-medivia-green">Lipid Profile</span>
              <FileText className="w-4 h-4 text-slate-400 group-hover:text-medivia-green" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Cholesterol, LDL, HDL, Triglycerides</p>
          </button>

          <button
            onClick={() => onSelectSample('metabolic')}
            className="p-3.5 rounded-2xl border border-slate-200 hover:border-medivia-green hover:bg-emerald-50/40 text-left transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 group-hover:text-medivia-green">Metabolic & Renal</span>
              <FileText className="w-4 h-4 text-slate-400 group-hover:text-medivia-green" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Fasting Glucose, HbA1c, Creatinine</p>
          </button>
        </div>
      </div>
    </div>
  );
}
