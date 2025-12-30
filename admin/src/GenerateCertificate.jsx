import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { templates } from "../../admin/src/components/CertificateTemplates";
import { offerLetterTemplates } from "../../admin/src/components/OfferLetterTemplates";

const GenerateCertificate = () => {
  const ref = useRef(null);
  const [docType, setDocType] = useState("Internship Certificate");
  const [templateName, setTemplateName] = useState("Web Developer");
  const [referenceNo, setReferenceNo] = useState("");

  // Generate a unique reference number
  const generateReferenceNo = () => {
    const prefix = docType.includes("Offer") ? "OFF" : "CERT";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const [data, setData] = useState({
    candidateName: "",
    companyName: "",
    internshipFrom: "",
    internshipTo: "",
    position: "",
    issuedDate: new Date().toISOString().split('T')[0], // Today's date as default
    collegeName: "",
    stipend: "",
    referenceNo: "", // ✅ Added reference number field
  });

  // Update reference number when docType changes or on initial load
  useEffect(() => {
    const newRefNo = generateReferenceNo();
    setReferenceNo(newRefNo);
    setData(prev => ({ ...prev, referenceNo: newRefNo }));
  }, [docType]);

  // Update reference number in data whenever it changes
  useEffect(() => {
    setData(prev => ({ ...prev, referenceNo }));
  }, [referenceNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle date change for issuedDate
  const handleDateChange = (e) => {
    setData((prev) => ({ ...prev, issuedDate: e.target.value }));
  };

  // Regenerate reference number
  const regenerateRefNo = () => {
    const newRefNo = generateReferenceNo();
    setReferenceNo(newRefNo);
  };

  const downloadPdf = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: [794, 1123] });
    pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);
    pdf.save(`${data.candidateName || "document"}_${referenceNo}.pdf`);
  };

  const templateSet =
    docType === "Internship Offer Letter" ? offerLetterTemplates : templates;

  const TemplateComponent = templateSet[templateName];

  return (
    <div className="p-6 space-y-6">
      {/* Select Document Type */}
      <div className="flex gap-4 max-w-4xl mx-auto">
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Internship Offer Letter</option>
          <option>Internship Completion Certificate</option>
        </select>

        <select
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="border p-2 rounded"
        >
          {Object.keys(templateSet).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {Object.keys(data).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="capitalize text-sm font-semibold mb-1">
              {key.replace(/([A-Z])/g, " $1")}
            </label>

            {/* Special handling for issuedDate (date input) */}
            {key === "issuedDate" ? (
              <input
                type="date"
                name={key}
                value={data[key]}
                onChange={handleDateChange}
                className="border rounded p-2"
              />
            ) : key === "referenceNo" ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  name={key}
                  value={data[key]}
                  onChange={handleChange}
                  className="border rounded p-2 flex-1"
                  readOnly
                />
                <button
                  type="button"
                  onClick={regenerateRefNo}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded text-sm"
                  title="Generate new reference number"
                >
                  ⟳
                </button>
              </div>
            ) : (
              <input
                type="text"
                name={key}
                value={data[key]}
                onChange={handleChange}
                className="border rounded p-2"
                placeholder={`Enter ${key}`}
              />
            )}
          </div>
        ))}

        {/* Reference Number Display (if not in data object) */}
        <div className="flex flex-col">
          <label className="capitalize text-sm font-semibold mb-1">
            Reference Number
          </label>
          <div className="flex items-center gap-2">
            <span className="border rounded p-2 bg-gray-50 flex-1">
              {referenceNo}
            </span>
            <button
              type="button"
              onClick={regenerateRefNo}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded"
            >
              Regenerate
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Auto-generated based on document type
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          onClick={downloadPdf}
          className="bg-[#552586] hover:bg-[#552586] text-white py-2 px-4 rounded"
        >
          Download {docType} (Ref: {referenceNo})
        </button>
      </div>

      {/* Preview */}
      <div className="flex justify-center items-center bg-gray-100 py-10">
        <div ref={ref}>
          {TemplateComponent ? (
            <TemplateComponent data={data} type={docType} />
          ) : (
            <p className="text-red-500 text-center">Selected template not found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;