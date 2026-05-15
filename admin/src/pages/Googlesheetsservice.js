// src/services/googleSheetsService.js
// =====================================================
// Paste your deployed Apps Script Web App URL below
// =====================================================

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzFgdxJfyjKIgSKtU7z_AkuA0YKtIrVkHRUZVQwOWs76mIJcycAtp3R9jG-DWqTp6PW0w/exec";

/**
 * Save a document record (and optionally the PDF) to Google Sheets.
 * @param {object} data        - The form data from GenerateCertificate
 * @param {string} docType     - "Internship Offer Letter" | "Internship Completion Certificate"
 * @param {string} templateName - The selected template name
 * @param {string|null} pdfBase64 - Base64-encoded PDF (optional; can be large)
 * @param {string|null} fileName  - PDF file name (required if pdfBase64 is provided)
 */
export async function saveToSheets({ data, docType, templateName, pdfBase64 = null, fileName = null }) {
  const payload = {
    docType,
    templateName,
    candidateName: data.candidateName,
    companyName: data.companyName,
    position: data.position,
    internshipFrom: data.internshipFrom,
    internshipTo: data.internshipTo,
    issuedDate: data.issuedDate,
    referenceNo: data.referenceNo,
    collegeName: data.collegeName,
    stipend: data.stipend,
    pdfBase64,
    fileName,
  };

  const response = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" }, // Apps Script needs text/plain for CORS
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to save: HTTP ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch all saved document records from Google Sheets.
 * Returns an array of record objects, newest first.
 */
export async function fetchFromSheets() {
  const response = await fetch(`${SCRIPT_URL}?t=${Date.now()}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: HTTP ${response.status}`);
  }

  return response.json();
}