import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const DataAnalystOfferLetter = ({ data }) => {
  const { candidateName, collegeName, internshipFrom, stipend } = data;

  return (
    <div
      className="relative w-[794px] h-[1123px] text-[14px] leading-[1.7] bg-white mx-auto"
      style={{
        backgroundImage: `url(${certificateBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute left-10 right-10 pt-44 pb-10">

        <p>To,</p>
        <p className="font-semibold">{candidateName || "Candidate Name"}</p>
        <p>{collegeName || "College Name"}</p>

        <p className="mt-8 font-semibold text-[15px]">
          Subject: Offer for Internship in Data Analysis
        </p>

        <p className="mt-8">Dear {candidateName || "Candidate Name"},</p>

        <p className="mt-6 text-justify">
          We are pleased to offer you the position of <b>Data Analyst Intern</b> at
          <b> SS Infotech Pvt. Ltd.</b>. This internship aims to strengthen your analytical
          capabilities and help you understand real-world data interpretation techniques.
        </p>

        <p className="mt-6 text-justify">
          <b>Internship Details:</b><br />
          Role: Data Analyst Intern<br />
          Location: Nagpur<br />
          Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />
          Stipend: {stipend || "Unpaid / As per company norms"}
        </p>

        <p className="mt-6 text-justify">
          During the internship, you will work on data cleaning, data visualization,
          data interpretation, reporting dashboards, and assisting in basic predictive
          analytics tasks. You will gain hands-on experience in tools like Excel, SQL,
          Python, Power BI, and data presentation techniques.
        </p>

        <p className="mt-6 text-justify">
          You must maintain accuracy, professionalism, punctuality, and proper report
          documentation throughout the internship period. Weekly analysis submissions,
          dataset reviews, and project participation will be expected from you.
        </p>

        <p className="mt-6 text-justify">
          Upon successful completion of your internship and final evaluation, you will
          receive an official <b>Internship Completion Certificate</b> from the company.
        </p>

        <p className="mt-6 text-justify">
          Kindly confirm your acceptance of this offer by replying to this email or
          submitting a signed copy of this letter.
        </p>

      </div>
    </div>
  );
};

export default DataAnalystOfferLetter;
