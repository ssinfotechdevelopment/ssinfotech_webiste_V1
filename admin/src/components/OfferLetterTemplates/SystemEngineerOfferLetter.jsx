import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const SystemEngineerOfferLetter = ({ data }) => {
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
                    Subject: Offer for Internship in System Engineering
                </p>

                <p className="mt-8">Dear {candidateName || "Candidate Name"},</p>

                <p className="mt-6 text-justify">
                    We are pleased to offer you the position of <b>System Engineer Intern</b> at
                    <b> SS Infotech Pvt. Ltd.</b>. This internship aims to improve your understanding of
                    system administration, hardware troubleshooting, OS configuration, and IT infrastructure.
                </p>

                <p className="mt-6 text-justify">
                    <b>Internship Details:</b><br />
                    Role: System Engineer Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />
                    Stipend: {stipend || "Unpaid / As per company norms"}
                </p>

                <p className="mt-6 text-justify">
                    You will work on system installation, software configuration, user support, file management,
                    system monitoring, and resolving technical issues. You will also assist with cybersecurity
                    basics, network support, and preventive maintenance tasks.
                </p>

                <p className="mt-6 text-justify">
                    Maintaining discipline, professionalism, confidentiality, and reporting is mandatory.
                </p>

                <p className="mt-6 text-justify">
                    After successful completion, you will receive an official
                    <b> Internship Completion Certificate</b>.
                </p>

            </div>
        </div>
    );
};

export default SystemEngineerOfferLetter;
