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
    companyName = "SS Infotech ",
    position = "AI/ML Intern",
    internshipFrom = "15th Jun 2025",
    internshipTo = "15th August 2025",
    issuedDate = "[Date]",
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
      {/* Date */}
      <div className="absolute right-8 text-sm pt-44">
        Date: <strong>{issuedDate}</strong>
      </div>

      {/* Title */}
      <div className="text-center font-bold text-[20px] underline pt-52">
        INTERNSHIP COMPLETION CERTIFICATE
      </div>

      {/* Content */}
      <div className="absolute left-8 right-8 text-[14px] pt-6 leading-relaxed">

        {/* Main Paragraph */}
        <p className="mb-4">
          This is to certify that <strong>{candidateName}</strong> has successfully completed an internship at{" "}
          <strong>{companyName}</strong> from{" "}
          <strong>{internshipFrom}</strong> to{" "}
          <strong>{internshipTo}</strong>. During the internship period,{" "}
          {candidateName} was assigned the role of{" "}
          <strong>{position}</strong> under the guidance and supervision of{" "}
          <strong>Mr. Viraj Patle</strong>, where they gained hands-on experience in Artificial Intelligence and Machine Learning.
        </p>

        {/* Internship Details */}
        <div className="mb-4">
          <p className="font-semibold underline">Internship Details:</p>
          <p>Intern Name: {candidateName}</p>
          <p>Position: {position}</p>
          <p>Department: Product & Development</p>
          <p>Internship Duration: {internshipFrom} to {internshipTo}</p>
          <p>Stipend: {stipend}</p>
        </div>

        {/* Responsibilities */}
        <div className="mb-4">
          <p className="font-semibold underline">Responsibilities Undertaken:</p>
          <p>
            During the internship, <strong>{candidateName}</strong> actively contributed to AI/ML projects. Key responsibilities included:
          </p>

          <ul className="list-disc ml-5 mt-2">
            <li>
              <strong>Data Analysis:</strong> Collecting, cleaning, and analyzing datasets for model development.
            </li>
            <li>
              <strong>Model Development:</strong> Building machine learning models using Python and libraries like Pandas, NumPy, and Scikit-learn.
            </li>
            <li>
              <strong>Model Training & Evaluation:</strong> Training models and evaluating performance using appropriate metrics.
            </li>
            <li>
              <strong>Data Visualization:</strong> Creating insights using tools like Matplotlib and Seaborn.
            </li>
            <li>
              <strong>Problem Solving:</strong> Applying machine learning techniques to solve real-world problems.
            </li>
          </ul>
        </div>

        {/* Performance */}
        <div className="mb-4">
          <p className="font-semibold underline">
            Internship Overview & Performance Evaluation:
          </p>
          <p>
            Throughout the internship, {candidateName} demonstrated strong analytical thinking, consistency, and a keen interest in AI and Machine Learning. Their ability to work with data and apply ML concepts effectively was commendable.
          </p>
        </div>

        {/* Conclusion */}
        <div className="mb-6">
          <p className="font-semibold underline">Conclusion & Appreciation:</p>
          <p>
            We appreciate {candidateName}'s dedication, technical skills, and professional attitude during the internship. We are confident that the knowledge and experience gained will support their future growth in the field of AI and Machine Learning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataAnalystTemplate;