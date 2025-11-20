// 8. UIUXOfferLetter.jsx
import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const UIUXOfferLetter = ({ data }) => {
    const { candidateName, collegeName, internshipFrom, stipend } = data;

    return (
        <div className="relative w-[794px] h-[1123px] text-[14px] leading-[1.7] bg-white mx-auto"
            style={{ backgroundImage: `url(${certificateBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute left-10 right-10 pt-44 pb-10">
                <p>To,</p>
                <p className="font-semibold">{candidateName || "Candidate Name"}</p>
                <p>{collegeName || "College Name"}</p>

                <p className="mt-8 font-semibold text-[15px]">
                    Subject: Offer for Internship in UI/UX Design
                </p>

                <p className="mt-8">Dear {candidateName || "Candidate Name"},</p>

                <p className="mt-6 text-justify">
                    We are pleased to offer you the position of <b>UI/UX Design Intern</b> at
                    <b> SS Infotech Pvt. Ltd.</b>. This internship aims to enhance your practical
                    understanding of user-centered design, prototyping and visual communication.
                </p>

                <p className="mt-6 text-justify">
                    <b>Internship Details:</b><br />
                    Role: UI/UX Design Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />
                    Stipend: {stipend || "Unpaid / As per company norms"}
                </p>

                <p className="mt-6 text-justify">
                    During the internship, you will create wireframes, high-fidelity mockups using Figma or Adobe XD,
                    conduct user research, build design systems, create prototypes and collaborate with developers
                    for pixel-perfect implementation. You will follow design guidelines and best practices.
                </p>

                <p className="mt-6 text-justify">
                    You are expected to maintain professionalism, teamwork, punctuality,
                    and confidentiality throughout the internship period. Regular reporting,
                    task updates, and participation in team meetings will also be required.
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

export default UIUXOfferLetter;