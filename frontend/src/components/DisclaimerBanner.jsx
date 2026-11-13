import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200/90 py-2.5 px-4">
      <div className="max-w-6xl mx-auto flex items-start sm:items-center space-x-2.5 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5 sm:mt-0" />
        <p className="leading-relaxed">
          <strong className="font-semibold text-amber-950">Important Medical Disclaimer:</strong> ReportSaathi is an educational literacy aid, not a diagnostic or prescriptive tool. Laboratory reference ranges vary by testing methodology. Never start, modify, or cease any medical treatment based solely on this automated explanation — always discuss your official report with your licensed doctor.
        </p>
      </div>
    </div>
  );
}
