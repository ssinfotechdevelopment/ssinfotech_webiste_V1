import React from "react";
import certificateBg from "../../assets/certificate-bg.png";
import certificateBgStamp from "../../assets/certificate-bg-stamp.png";

/**
 * CloudComputingOfferLetter Component
 * Internship Offer Letter for Cloud Computing
 * Supports stamped background via withStamp prop
 */
const CloudComputingOfferLetter = ({ data, withStamp = false }) => {
    const {
        candidateName,
        collegeName,
        internshipFrom,
        stipend,
        issuedDate,
        referenceNo,
        place, // Reserved for future use
    } = data || {};

    // Select background: with stamp or clean
    const bgImage = withStamp ? certificateBgStamp : certificateBg;

    return (
        <div
            className="relative w-[794px] h-[1123px] text-[14px] leading-[1.7] bg-white overflow-hidden"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-x-10 top-40 bottom-10 px-4">
                {/* Header: Ref (left) and Date (right) aligned on the same line */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-medium pt-[15px]">
                        <div>
                            <strong>Ref:</strong> {referenceNo || "OFF-XXXXXX-XXX"}
                        </div>
                        <div>
                            <strong>Date:</strong> {issuedDate || "YYYY-MM-DD"}
                        </div>
                    </div>

                    {/* Decorative line below Ref & Date */}
                    {/* <div className="border-t-2 border-gray-400 mt-4"></div> */}
                </div>

                {/* Recipient Address */}
                <p className="mb-1">To,</p>
                <p className="font-semibold text-lg mb-1">
                    {candidateName || "Candidate Name"}
                </p>
                <p className="mb-8">{collegeName || "College Name"}</p>

                {/* Subject */}
                <p className="font-semibold text-[13px] mb-5">
                    Subject: Offer for Internship in Cloud Computing
                </p>

                {/* Greeting */}
                <p className="mb-5">
                    Dear {candidateName || "Candidate Name"},
                </p>

                {/* Opening Paragraph */}
                <p className="mb-5 text-justify">
                    We are pleased to offer you the position of <b>Cloud Computing Intern</b>{" "}
                    at <b>SS Infotech </b>. This internship aims to enhance your
                    practical understanding of cloud platforms, infrastructure management,
                    and deployment workflows.
                </p>

                {/* Internship Details */}
                <p className="mb-5 text-justify">
                    <b>Internship Details:</b>
                    <br />
                    Role: Cloud Computing Intern
                    <br />
                    Location: Nagpur
                    <br />
                    Joining Date: {internshipFrom || "DD/MM/YYYY"}
                    <br />
                    Stipend: {stipend || "Unpaid / As per company norms"}
                </p>

                {/* Responsibilities */}
                <p className="mb-5 text-justify">
                    During the internship, you will work on AWS, Azure, or GCP services, manage
                    virtual machines, storage solutions, networking, CI/CD pipelines,
                    containerization (Docker/Kubernetes), and cloud security best practices.
                    You will follow industry standards, documentation guidelines, and
                    infrastructure-as-code principles.
                </p>

                {/* Expectations & Completion Certificate */}
                <p className="mb-6 text-justify">
                    You are expected to maintain professionalism, teamwork, punctuality,
                    and confidentiality throughout the internship period. Regular reporting,
                    task updates, and participation in team meetings will also be required.
                    <br />
                    <br />
                    Upon successful completion of your internship and final evaluation, you
                    will receive an official <b>Internship Completion Certificate</b> from
                    the company.
                    <br />
                    <br />
                    Kindly confirm your acceptance of this offer by replying to this email
                    or submitting a signed copy of this letter.
                </p>
            </div>
        </div>
    );
};

export default CloudComputingOfferLetter;