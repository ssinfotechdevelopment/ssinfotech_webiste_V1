import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const AndroidDeveloperOfferLetter = ({ data }) => {
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
                    Subject: Offer for Internship in Android Development
                </p>

                <p className="mt-8">
                    Dear {candidateName || "Candidate"},
                </p>

                <p className="mt-6 text-justify">
                    We are pleased to offer you the position of <b>Android Development Intern</b> at
                    <b> SS Infotech </b>. This internship will help you gain hands-on experience
                    in building Android applications and understanding mobile development workflows.
                </p>

                <p className="mt-6 text-justify">
                    <b>Internship Details:</b><br />
                    Role: Android Development Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />
                    Stipend: {stipend || "Unpaid / As per company norms"}
                </p>

                <p className="mt-6 text-justify">
                    You will work on mobile UI design, activity lifecycle, API integration, debugging,
                    app optimization, and basic deployment processes. You will also collaborate with
                    the team to build real-time Android features and projects.
                </p>

                <p className="mt-6 text-justify">
                    Professional behavior, punctuality, teamwork, and regular task reporting are expected
                    throughout the internship.
                </p>

                <p className="mt-6 text-justify">
                    Upon successful completion, you will receive an official <b>Internship Completion Certificate</b>.
                </p>

                <p className="mt-6 text-justify">
                    Kindly confirm your acceptance of this offer at the earliest.
                </p>

            </div>
        </div>
    );
};

export default AndroidDeveloperOfferLetter;
