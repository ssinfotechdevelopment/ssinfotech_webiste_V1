// MachineLearningOfferLetter.jsx
import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const MachineLearningOfferLetter = ({ data }) => {
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
                    Subject: Offer for Internship in Machine Learning
                </p>

                <p className="mt-8">Dear {candidateName || "Candidate"},</p>

                <p className="mt-6 text-justify">
                    We are pleased to offer you the position of <b>Machine Learning Intern</b> at <b>SS Infotech Pvt. Ltd.</b>. This internship focuses on data-driven modeling, basic model building, and evaluation techniques.
                </p>

                <p className="mt-6 text-justify">
                    <b>Internship Details:</b><br />
                    Role: Machine Learning Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />
                    Stipend: {stipend || "Unpaid / As per company norms"}
                </p>

                <p className="mt-6 text-justify">
                    You will work on data preprocessing, exploratory analysis, basic model training, and evaluation. Exposure to libraries like Pandas, NumPy, and scikit-learn will be provided.
                </p>

                <p className="mt-6 text-justify">
                    Successful completion will result in an <b>Internship Completion Certificate</b>.
                </p>

                <p className="mt-6 text-justify">
                    Kindly confirm acceptance by replying to this email or submitting a signed copy of this letter.
                </p>
            </div>
        </div>
    );
};

export default MachineLearningOfferLetter;
