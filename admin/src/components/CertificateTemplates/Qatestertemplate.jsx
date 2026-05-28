import React from "react";
import certificateBg from "../../assets/certificate-bg.png";
import certificateBgStamp from "../../assets/certificate-bg-stamp.png";

const QATesterTemplate = ({
  data = {},
  withStamp = true,
}) => {
  const {
    candidateName = "[Candidate Name]",
    companyName = "[Company Name]",
    internshipFrom = "[Start Date]",
    internshipTo = "[End Date]",
    department = "[Department]",
    position = "[Position]",
    issuedDate = "[Date]",
    collegeName = "[College Name]",
    stipend = "[Stipend]",
  } = data;

  return (
    <div
      className="relative w-[794px] h-[1123px] p-8"
      style={{
        backgroundImage: `url(${withStamp ? certificateBgStamp : certificateBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Date top-right */}
      <div className="absolute right-8 text-sm pt-[143px]">
        Date: <strong>{issuedDate}</strong>
      </div>

      <div className="text-center font-bold text-[20px] underline pt-[170px]">
        INTERNSHIP COMPLETION CERTIFICATE
      </div>

      <div className="absolute left-8 right-8 text-[14px] pt-4">
        {/* To block */}
        <div className="mb-4">
          <p className="font-semibold">To,</p>
          <p className="font-semibold">{candidateName},</p>
          <p>{collegeName}.</p>
        </div>

        {/* Subject */}
        <p className="font-semibold mb-3">
          Subject: Certificate of Internship
        </p>

        {/* Greeting */}
        <p className="mb-4">Dear {candidateName},</p>

        {/* Main Content */}
        <p className="mb-3">
          This is to formally certify that <strong>{candidateName}</strong> has
          successfully completed an internship at{" "}
          <strong>{companyName}</strong> from{" "}
          <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>.
          During the tenure of the internship, {candidateName} was assigned to
          the <strong>{position}</strong> role within the{" "}
          Product & Development department.
        </p>

        <p className="mb-3 font-semibold">Internship Details:</p>
        <div className="pl-4 mb-3">
          <p>
            <strong>Intern Name:</strong> {candidateName}
          </p>
          <p>
            <strong>Position:</strong> {position}
          </p>
          <p>
            <strong>Department:</strong> <span>Product & Development</span>
          </p>
          <p>
            <strong>Internship Duration:</strong> {internshipFrom} to{" "}
            {internshipTo}
          </p>
          <p>
            <strong>Stipend:</strong> {stipend}
          </p>
        </div>

        <p className="mb-3 font-semibold">Responsibilities Undertaken:</p>
        <p className="mb-2">
          During the internship, {candidateName} contributed to quality assurance
          and software testing processes. Key responsibilities included:
        </p>
        <div className="pl-4 mb-3 space-y-[3px]">
          <p>
            <strong>Test Planning:</strong> Created detailed test plans and
            test cases based on functional requirements.
          </p>
          <p>
            <strong>Manual Testing:</strong> Performed functional, regression,
            smoke, and exploratory testing across modules.
          </p>
          <p>
            <strong>Automation Testing:</strong> Developed automated test scripts
            using Selenium and TestNG frameworks.
          </p>
          <p>
            <strong>API Testing:</strong> Validated REST APIs using Postman
            and documented response behaviour.
          </p>
          <p>
            <strong>Bug Reporting:</strong> Logged, tracked, and verified defects
            using JIRA with detailed reproduction steps.
          </p>
          <p>
            <strong>Collaboration:</strong> Worked closely with developers in
            an agile workflow to ensure timely defect resolution.
          </p>
        </div>

        <p className="mb-3 font-semibold">
          Internship Overview & Performance Evaluation:
        </p>
        <p className="mb-3">
          Throughout the internship, {candidateName} demonstrated a keen eye
          for detail, strong analytical skills, and a thorough understanding of
          the software testing lifecycle. Their commitment to delivering
          bug-free, high-quality software and their proactive approach to
          identifying edge cases made them a valuable contributor to the QA
          team. We wish {candidateName} the very best in their future endeavors.
        </p>
      </div>
    </div>
  );
};

export default QATesterTemplate;