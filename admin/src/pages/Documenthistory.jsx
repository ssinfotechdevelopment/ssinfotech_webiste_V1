// src/pages/DocumentHistory.jsx
import React, { useState, useEffect, useCallback } from "react";
import { fetchFromSheets } from "./Googlesheetsservice";

const COLUMNS = [
  { key: "Timestamp",     label: "Date",         render: (v) => v ? new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—" },
  { key: "Doc Type",      label: "Type",          render: (v) => <DocTypeBadge type={v} /> },
  { key: "Reference No",  label: "Ref No",        render: (v) => <code className="text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{v || "—"}</code> },
  { key: "Candidate Name",label: "Candidate",     render: (v) => v || "—" },
  { key: "Company Name",  label: "Company",       render: (v) => v || "—" },
  { key: "Position",      label: "Position",      render: (v) => v || "—" },
  { key: "From",          label: "From",          render: (v) => v || "—" },
  { key: "To",            label: "To",            render: (v) => v || "—" },
  { key: "Template",      label: "Template",      render: (v) => v || "—" },
  { key: "PDF URL",       label: "PDF",           render: (v) => v ? <a href={v} target="_blank" rel="noreferrer" className="text-[#552586] underline text-sm">View ↗</a> : <span className="text-gray-400 text-sm">—</span> },
];

function DocTypeBadge({ type }) {
  const isOffer = type?.includes("Offer");
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${isOffer ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>
      {isOffer ? "Offer Letter" : "Certificate"}
    </span>
  );
}

function StatCard({ label, value, color = "purple" }) {
  const colors = {
    purple: "bg-purple-50 text-purple-700 border-purple-100",
    blue:   "bg-blue-50 text-blue-700 border-blue-100",
    green:  "bg-green-50 text-green-700 border-green-100",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {COLUMNS.map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
        </td>
      ))}
    </tr>
  );
}

export default function DocumentHistory() {
  const [records, setRecords]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const [filterType, setFilterType] = useState("All");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFromSheets();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // --- Stats ---
  const totalDocs   = records.length;
  const totalCerts  = records.filter((r) => r["Doc Type"]?.includes("Certificate")).length;
  const totalOffers = records.filter((r) => r["Doc Type"]?.includes("Offer")).length;

  // --- Filtered records ---
  const filtered = records.filter((r) => {
    const matchType =
      filterType === "All" ||
      (filterType === "Certificate" && r["Doc Type"]?.includes("Certificate")) ||
      (filterType === "Offer"       && r["Doc Type"]?.includes("Offer"));

    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r["Candidate Name"]?.toLowerCase().includes(q) ||
      r["Company Name"]?.toLowerCase().includes(q) ||
      r["Reference No"]?.toLowerCase().includes(q) ||
      r["Position"]?.toLowerCase().includes(q);

    return matchType && matchSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Document History</h1>
          <p className="text-sm text-gray-500 mt-1">All generated certificates and offer letters</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 bg-[#552586] hover:bg-[#663399] disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition"
        >
          {loading ? "⟳ Refreshing…" : "⟳ Refresh"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Documents" value={totalDocs}   color="purple" />
        <StatCard label="Certificates"    value={totalCerts}  color="blue"   />
        <StatCard label="Offer Letters"   value={totalOffers} color="green"  />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name, company, ref no, position…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#552586] focus:outline-none"
        />
        <div className="flex gap-2">
          {["All", "Certificate", "Offer"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterType === type
                  ? "bg-[#552586] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <span className="text-sm text-gray-400">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <strong>Error:</strong> {error}. Make sure your Apps Script URL is correct and the Web App is deployed.
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#552586] text-white">
                {COLUMNS.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-2">📄</div>
                    <div className="font-medium">No documents found</div>
                    <div className="text-xs mt-1">
                      {search || filterType !== "All"
                        ? "Try adjusting your filters"
                        : "Generate your first document to see it here"}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((record, i) => (
                  <tr
                    key={i}
                    className={`hover:bg-purple-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    {COLUMNS.map((col) => (
                      <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                        {col.render(record[col.key])}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer note */}
      {!loading && !error && (
        <p className="text-xs text-gray-400 text-center">
          Data synced from Google Sheets · Newest records first
        </p>
      )}
    </div>
  );
}