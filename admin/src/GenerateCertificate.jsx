import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { templates } from "../../admin/src/components/CertificateTemplates";
import { offerLetterTemplates } from "../../admin/src/components/OfferLetterTemplates";

// Background images
import certificateBg from "./assets/certificate-bg.png";
import certificateBgStamp from "./assets/certificate-bg-stamp.png";

const GenerateCertificate = () => {
  const ref = useRef(null);
  const [docType, setDocType] = useState("Internship Completion Certificate");
  const [templateName, setTemplateName] = useState("Web Developer");
  const [withStamp, setWithStamp] = useState(true);
  const [referenceNo, setReferenceNo] = useState("");

  // Generate unique reference number
  const generateReferenceNo = () => {
    const prefix = docType.includes("Offer") ? "OFF" : "CERT";
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `${prefix}-${timestamp}-${random}`;
  };

  const [data, setData] = useState({
    candidateName: "",
    companyName: "",
    internshipFrom: "",
    internshipTo: "",
    position: "",
    issuedDate: new Date().toISOString().split("T")[0],
    collegeName: "",
    stipend: "",
    referenceNo: "",
  });

  // Auto-generate reference number on docType change or mount
  useEffect(() => {
    const newRefNo = generateReferenceNo();
    setReferenceNo(newRefNo);
    setData((prev) => ({ ...prev, referenceNo: newRefNo }));
  }, [docType]);

  // Keep data in sync when referenceNo changes manually
  useEffect(() => {
    setData((prev) => ({ ...prev, referenceNo }));
  }, [referenceNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setData((prev) => ({ ...prev, issuedDate: e.target.value }));
  };

  const regenerateRefNo = () => {
    const newRefNo = generateReferenceNo();
    setReferenceNo(newRefNo);
  };

  const downloadPdf = async () => {
    if (!ref.current) return;

    const canvas = await html2canvas(ref.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [794, 1123],
    });

    pdf.addImage(imgData, "PNG", 0, 0, 794, 1123);

    const stampSuffix = withStamp ? "_with-stamp" : "";
    const fileName = `${data.candidateName || "document"}_${referenceNo}${stampSuffix}.pdf`;
    pdf.save(fileName);
  };

  // Select correct template set
  const templateSet = docType.includes("Offer")
    ? offerLetterTemplates
    : templates;

  const TemplateComponent = templateSet[templateName];

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Controls: Document Type, Template, Stamp Toggle */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Document Type
            </label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#552586] focus:border-transparent"
            >
              <option>Internship Offer Letter</option>
              <option>Internship Completion Certificate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Template
            </label>
            <select
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#552586]"
            >
              {Object.keys(templateSet).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>

          {/* Stamp Toggle - Visible for both, but mainly used for certificates */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-semibold text-gray-700">
              Official Stamp:
            </label>
            <button
              type="button"
              onClick={() => setWithStamp(!withStamp)}
              className={`relative inline-flex h-10 w-20 rounded-full transition-colors duration-300 ${withStamp ? "bg-[#552586]" : "bg-gray-400"
                }`}
            >
              <span
                className={`inline-block w-8 h-8 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${withStamp ? "translate-x-11" : "translate-x-1"
                  }`}
              />
            </button>
            <span className="font-medium text-gray-800">
              {withStamp ? "With Stamp" : "Without Stamp"}
            </span>
          </div>
        </div>
      </div>

      {/* Input Fields */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Enter Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.keys(data).map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 capitalize mb-1">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>

              {key === "issuedDate" ? (
                <input
                  type="date"
                  name={key}
                  value={data[key]}
                  onChange={handleDateChange}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#552586] focus:outline-none"
                />
              ) : key === "referenceNo" ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={data[key]}
                    readOnly
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                  />
                  <button
                    onClick={regenerateRefNo}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                    title="Regenerate"
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
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#552586] focus:outline-none"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center">
        <button
          onClick={downloadPdf}
          className="bg-[#552586] hover:bg-[#663399] text-white font-bold py-4 px-10 rounded-xl shadow-xl transition transform hover:scale-105 text-lg"
        >
          Download {docType} (Ref: {referenceNo})
          {withStamp && " — With Official Stamp"}
        </button>
      </div>

      {/* Live Preview */}
      <div className="bg-gray-100 rounded-2xl shadow-inner p-8">
        <h3 className="text-center text-xl font-bold text-gray-800 mb-6">
          Live Preview
        </h3>
        <div className="flex justify-center">
          <div ref={ref} className="shadow-2xl border-4 border-gray-300 rounded-lg overflow-hidden">
            {TemplateComponent ? (
              <TemplateComponent data={data} withStamp={withStamp} />
            ) : (
              <div className="w-[794px] h-[1123px] flex items-center justify-center bg-red-100">
                <p className="text-red-600 text-2xl font-bold text-center px-10">
                  Template "{templateName}" not found!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateCertificate;