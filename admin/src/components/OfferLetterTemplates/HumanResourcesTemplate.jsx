import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const HumanResourcesTemplate = ({ data }) => {
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
          Subject: Offer for Internship in Human Resources
        </p>

        <p className="mt-8">
          Dear {candidateName || "Candidate"},
        </p>

        <p className="mt-6 text-justify">
          We are pleased to offer you the position of <b>Human Resources Intern</b> at
          <b> SS Infotech Pvt. Ltd.</b>. This internship will give you exposure to core HR
          functions including recruitment assistance, documentation, onboarding, and
          employee communication.
        </p>

        <p className="mt-6 text-justify">
          <b>Internship Details:</b><br />
          Role: Human Resources Intern<br />
          Location: Nagpur<br />
          Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />
          Stipend: {stipend || "Unpaid / As per company norms"}
        </p>

        <p className="mt-6 text-justify">
          During the internship, you will support tasks such as candidate screening,
          interview coordination, maintaining HR records, attendance tracking, and
          assisting in employee engagement activities and internal communication.
        </p>

        <p className="mt-6 text-justify">
          You are expected to maintain professionalism, punctuality, confidentiality, and
          follow HR guidelines while completing assigned tasks regularly.
        </p>

        <p className="mt-6 text-justify">
          After the successful completion of your internship, you will receive an official
          <b> Internship Completion Certificate</b> from the company.
        </p>

        <p className="mt-6 text-justify">
          Kindly confirm your acceptance of this offer at the earliest.
        </p>

      </div>
    </div>
  );
};

export default HumanResourcesTemplate;
