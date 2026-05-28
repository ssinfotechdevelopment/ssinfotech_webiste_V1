import React from "react";
import certificateBg from "../../assets/certificate-bg.png";
import certificateBgStamp from "../../assets/certificate-bg-stamp.png";

const BackendDeveloperTemplate = ({
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
  During the internship, {candidateName} contributed to backend systems
  development. Key responsibilities included:
</p>
<div className="pl-4 mb-3 space-y-[3px]">
  <p>
    <strong>API Development:</strong> Built RESTful & GraphQL APIs
    using Node.js and Express.js.
  </p>
  <p>
    <strong>Database Management:</strong> Designed and optimized MySQL,
    PostgreSQL, and MongoDB databases.
  </p>
  <p>
    <strong>Authentication & Security:</strong> Integrated JWT and
    OAuth 2.0 with role-based access control.
  </p>
  <p>
    <strong>Cloud Infrastructure:</strong> Deployed apps on AWS/GCP/Azure
    using Docker and CI/CD pipelines.
  </p>
  <p>
    <strong>Performance Optimization:</strong> Reduced API latency and
    implemented Redis caching strategies.
  </p>
  <p>
    <strong>Version Control:</strong> Collaborated using Git & GitHub
    within an agile team workflow.
  </p>

        </div>

        <p className="mb-3 font-semibold">
          Internship Overview & Performance Evaluation:
        </p>
        <p className="mb-3">
          Throughout the internship, {candidateName} demonstrated strong
          analytical thinking, a thorough understanding of backend architecture
          principles, and a consistent ability to deliver reliable, well-structured
          code. Their dedication to writing clean, maintainable solutions and their
          proactive approach to problem-solving made them a valued contributor to
          the engineering team. We wish {candidateName} the very best in their
          future endeavors.
        </p>
      </div>
    </div>
  );
};

export default BackendDeveloperTemplate;