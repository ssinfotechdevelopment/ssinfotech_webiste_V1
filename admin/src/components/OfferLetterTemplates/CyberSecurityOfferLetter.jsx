import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const CyberSecurityOfferLetter = ({ data }) => {
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
          Subject: Offer for Internship in Cyber Security
        </p>

        <p className="mt-8">
          Dear {candidateName || "Candidate Name"},
        </p>

        <p className="mt-6 text-justify">
          We are pleased to offer you the position of <b>Cyber Security Intern</b> at
          <b> SS Infotech Pvt. Ltd.</b>. This internship aims to provide practical
          exposure to security tools, vulnerability detection, and modern cyber
          defense techniques used in real-world environments.
        </p>

        <p className="mt-6 text-justify">
          <b>Internship Details:</b><br />
          Role: Cyber Security Intern<br />
          Location: Nagpur<br />
          Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />
          Stipend: {stipend || "Unpaid / As per company norms"}
        </p>

        <p className="mt-6 text-justify">
          During the internship, you will be involved in tasks such as threat
          monitoring, basic penetration testing, security assessment, log analysis,
          documentation of vulnerabilities, and supporting the team in improving
          security posture. You will also learn network scanning methods, common
          attack vectors, and mitigation practices.
        </p>

        <p className="mt-6 text-justify">
          You are expected to maintain professionalism, discipline, confidentiality,
          and follow proper reporting structure throughout the internship period.
          Weekly task updates, analysis reports, and participation in learning
          sessions will form a key part of your training.
        </p>

        <p className="mt-6 text-justify">
          Upon successful completion of your internship and final evaluation,
          you will receive an official <b>Internship Completion Certificate</b> from the company.
        </p>

        <p className="mt-6 text-justify">
          Kindly confirm your acceptance of this offer by replying to this email or submitting
          a signed copy of this letter.
        </p>

      </div>
    </div>
  );
};

export default CyberSecurityOfferLetter;
