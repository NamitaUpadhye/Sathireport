const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function checkBackendHealth() {
  const res = await fetch(`${API_URL}/api/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return await res.json();
}

export async function uploadReportFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_URL}/api/analyze/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Upload analysis failed (${res.status})`);
  }

  return await res.json();
}

export async function analyzeSampleReport(sampleType) {
  const res = await fetch(`${API_URL}/api/analyze/sample`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sample_type: sampleType }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Sample analysis failed (${res.status})`);
  }

  return await res.json();
}

export async function analyzeRawText(text) {
  const res = await fetch(`${API_URL}/api/analyze/text`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Text analysis failed (${res.status})`);
  }

  return await res.json();
}

export async function fetchReportHistory() {
  const res = await fetch(`${API_URL}/api/history/`);
  if (!res.ok) return { mode: 'guest', reports: [] };
  return await res.json();
}

export async function saveReportToHistory(reportData) {
  const res = await fetch(`${API_URL}/api/history/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: 'guest',
      title: reportData.title || 'Laboratory Report',
      overall_status: reportData.overall_status || 'normal',
      report_data: reportData,
    }),
  });
  if (!res.ok) throw new Error('Failed to save to history');
  return await res.json();
}
