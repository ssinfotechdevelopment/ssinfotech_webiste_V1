import React from "react";
import certificateBg from "../../assets/certificate-bg.png";
import certificateBgStamp from "../../assets/certificate-bg-stamp.png";

/**
 * DataAnalystOfferLetter Component
 * Internship Offer Letter for Data Analysis
 * Supports stamped background via withStamp prop
 */
const DataAnalystOfferLetter = ({ data, withStamp = false }) => {
  const {
    candidateName,
    collegeName,
    internshipFrom,
    stipend,
    issuedDate,
    referenceNo,
    place, // Reserved for future use
  } = data || {};

  // Select background: with stamp or clean
  const bgImage = withStamp ? certificateBgStamp : certificateBg;

  return (
    <div
      className="relative w-[794px] h-[1123px] text-[14px] leading-[1.7] bg-white overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-x-10 top-40 bottom-10 px-4">
        {/* Header: Ref (left) and Date (right) aligned on the same line */}
        <div className="mb-8">
          <br />
          <div className="flex justify-between text-sm font-medium">
            <div>
              <strong>Ref:</strong> {referenceNo || "OFF-XXXXXX-XXX"}
            </div>
            <div>
              <strong>Date:</strong> {issuedDate || "YYYY-MM-DD"}
            </div>
          </div>

        </div>

        {/* Recipient Address */}
        <p className="mb-1">To,</p>
        <p className="font-semibold text-lg mb-1">
          {candidateName || "Candidate Name"}
        </p>
        <p className="mb-8">{collegeName || "College Name"}</p>

        {/* Subject */}
        <p className="font-semibold text-[13px] mb-5">
          Subject: Offer for Internship in Data Analysis
        </p>

        {/* Greeting */}
        <p className="mb-5">
          Dear {candidateName || "Candidate Name"},
        </p>

        {/* Opening Paragraph */}
        <p className="mb-5 text-justify">
          We are pleased to offer you the position of <b>Data Analyst Intern</b>{" "}
          at <b>SS Infotech Pvt. Ltd.</b>. This internship aims to strengthen your
          analytical capabilities and provide hands-on experience with real-world
          data interpretation, visualization, and reporting techniques.
        </p>

        {/* Internship Details */}
        <p className="mb-5 text-justify">
          <b>Internship Details:</b>
          <br />
          Role: Data Analyst Intern
          <br />
          Location: Nagpur
          <br />
          Joining Date: {internshipFrom || "DD/MM/YYYY"}
          <br />
          Stipend: {stipend || "Unpaid / As per company norms"}
        </p>

        {/* Responsibilities */}
        <p className="mb-5 text-justify">
          During the internship, you will work on data cleaning, exploratory data
          analysis, visualization, building reporting dashboards, and assisting in
          basic predictive analytics tasks. You will gain hands-on experience with
          tools such as Excel, SQL, Python (Pandas, NumPy), Power BI/Tableau, and
          effective data presentation techniques.
        </p>

        {/* Expectations & Completion Certificate */}
        <p className="mb-6 text-justify">
          You are expected to maintain professionalism, accuracy, punctuality,
          and confidentiality throughout the internship period. Regular reporting,
          task updates, dataset reviews, and active participation in team discussions
          will also be required.

          Upon successful completion of your internship and final evaluation, you
          will receive an official <b>Internship Completion Certificate</b> from
          the company.
          Kindly confirm your acceptance of this offer by replying to this email
          or submitting a signed copy of this letter.
        </p>
      </div>
    </div>
  );
};

export default DataAnalystOfferLetter;