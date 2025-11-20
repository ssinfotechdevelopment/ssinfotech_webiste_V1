import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const MarketingOfferLetter = ({ data }) => {
    const {
        candidateName,
        collegeName,
        internshipFrom,
        stipend,
    } = data;

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
                    Subject: Offer for Internship in Marketing
                </p>

                <p className="mt-8">Dear {candidateName || "Candidate Name"},</p>

                <p className="mt-6 text-justify">
                    We are pleased to offer you the position of <b>Marketing Intern</b> at
                    <b> SS Infotech Pvt. Ltd.</b>. This internship program is designed to
                    help you gain hands-on experience in marketing strategies, branding,
                    client communication, and campaign execution.
                </p>

                <p className="mt-6 text-justify">
                    <b>Internship / Training Details:</b><br />
                    Internship Role: Marketing Intern<br />
                    Location: Nagpur<br />
                    Start Date: {internshipFrom || "DD/MM/YYYY"}<br />
                    Stipend: {stipend || "Unpaid / As per company norms"}
                </p>

                <p className="mt-6 text-justify">
                    During your internship, you will work under the guidance of the HR
                    and Marketing team. Your responsibilities may include digital
                    marketing activities, social media management, lead generation,
                    research work, field marketing support, and participation in internal
                    promotional campaigns.
                </p>

                <p className="mt-6 text-justify">
                    You are expected to maintain a high level of professionalism,
                    discipline, punctuality, and confidentiality throughout the internship
                    period. Regular reporting and timely completion of tasks will be an
                    important part of your learning process.
                </p>

                <p className="mt-6 text-justify">
                    Upon successful completion of the internship and final evaluation,
                    you will be awarded an official <b>Internship Completion Certificate</b>.
                    Please note that this internship is purely for training purposes and
                    does not guarantee any employment.
                </p>

                <p className="mt-6 text-justify">
                    Kindly confirm your acceptance of this offer by replying to this email
                    or submitting a signed copy of this letter.
                </p>



            </div>
        </div>
    );
};

export default MarketingOfferLetter;
