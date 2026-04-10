import React from "react";
import certificateBg from "../../assets/certificate-bg.png";
import certificateBgStamp from "../../assets/certificate-bg-stamp.png";

const DataAnalystTemplate = ({
  data = {},
  withStamp = true,
}) => {
  const {
    candidateName = "Sanket Makade",
    collegeName = "[College Name]",
    companyName = "SS Infotech Pvt. Ltd.",
    position = "Data Analytics Intern",
    internshipFrom = "15th Jun 2025",
    internshipTo = "15th August 2025",
    issuedDate = "[Date]",
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
      <div className="absolute right-8 text-sm pt-44">
        Date: <strong>{issuedDate}</strong>
      </div>

      <div className="text-center font-bold text-[20px] underline pt-52">INTERNSHIP COMPLETION CERTIFICATE</div>

      <div className="absolute left-8 right-8 text-[14px] pt-4">
        <div className="mb-4">
          <p className="font-semibold">To,</p>
          <p className="font-semibold">{candidateName}</p>
          <p>{collegeName}</p>
        </div>
        
        <p className="font-semibold mb-3">
          Subject:{" "}
          {type === "Internship Offer Letter"
            ? `Offer for Internship in ${position}`
            : "Certificate of Internship"}
        </p>

        <p className="mb-4">Dear {candidateName},</p>

        {type === "Internship Offer Letter" ? (
          <>
            <p className="mb-3">
              We are pleased to offer you the position of <strong>{position}</strong> at{" "}
              <strong>{companyName}</strong>. Your internship will focus on data analysis,
              business intelligence, and related tasks. Internship Details:
            </p>

            <p className="mb-3">
              Internship Duration: <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>.
              Please confirm your acceptance by replying to this email or returning a signed copy of this letter.
            </p>

            <p className="mb-6">
              We look forward to your contributions and growth during the internship.
            </p>
          </>
        ) : (
          <>
            <p className="mb-3">
              This is to formally certify that <strong>{candidateName}</strong> has successfully completed an internship at{" "}
              <strong>{companyName}</strong> from <strong>{internshipFrom}</strong> to <strong>{internshipTo}</strong>.
            </p>

            <div className="mt-4 mb-3">
              <p className="font-semibold underline">Internship Details:</p>
              <p>Intern Name: {candidateName}</p>
              <p>Position: {position}</p>
              <p>Department: Product & Development</p>
              <p>Internship Duration: {internshipFrom} to {internshipTo}</p>
            </div>

        {/* Responsibilities */}
        <div className="mb-4">
          <p className="font-semibold underline">Responsibilities Undertaken:</p>
          <p>
            During the internship, <strong>{candidateName}</strong> actively contributed to data analysis and business intelligence tasks. Key responsibilities included:
          </p>

          <ul className="list-disc ml-5 mt-2">
            <li>
              <strong>Data Collection & Cleaning:</strong> Gathering, processing, and cleaning large datasets for analysis.
            </li>
            <li>
              <strong>Data Visualization:</strong> Creating insightful visualizations using Tableau, Power BI, and Matplotlib.
            </li>
            <li>
              <strong>Statistical Analysis:</strong> Applying statistical techniques to interpret and extract valuable insights from data.
            </li>
            <li>
              <strong>SQL & Database Management:</strong> Querying and managing data using SQL and relational databases.
            </li>
            <li>
              <strong>Machine Learning & Predictive Analytics:</strong> Assisting in building models for forecasting and trend analysis.
            </li>
          </ul>
        </div>

        {/* Performance */}
        <div className="mb-4">
          <p className="font-semibold underline">
            Internship Overview & Performance Evaluation:
          </p>
          <p>
            Throughout the internship, {candidateName} exhibited exceptional analytical thinking, attention to detail, and enthusiasm in learning new data-driven technologies. Their contributions to data projects and teamwork were highly commendable.
          </p>
        </div>

        {/* Conclusion */}
        <div className="mb-6">
          <p className="font-semibold underline">Conclusion & Appreciation:</p>
          <p>
            We appreciate {candidateName}'s dedication, technical skills, and professionalism displayed during the internship. Their performance has been highly satisfactory, and we believe the knowledge and experience gained during this period will greatly contribute to their future career in data analytics.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataAnalystTemplate;