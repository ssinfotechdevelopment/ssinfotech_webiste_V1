import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const AndroidDevelopmentOfferLetter = ({ data }) => {
    const {
        candidateName,
        collegeName,
        internshipFrom,
        stipend,
        issuedDate,
        referenceNo,
        place // e.g., "Nagpur, Maharashtra"
    } = data;

    return (
        <div
            className="relative w-[794px] h-[1123px] text-[14px] leading-[1.7] bg-white"
            style={{
                backgroundImage: `url(${certificateBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-x-10 top-40 bottom-10">
                {/* Company Header */}
                <div className="text-center mb-4">
                    <div className="border-t border-gray-300 my-4"></div>

                    {/* Ref and Date aligned properly on the same level */}
                    <div className="flex justify-between text-sm -mt-2">
                        <div className="text-left">
                            <p><strong>Ref:</strong> {referenceNo || "OFF-XXXXXX-XXX"}</p>
                        </div>
                        <div className="text-right">
                            <p><strong>Date:</strong> {issuedDate || "YYYY-MM-DD"}</p>
                        </div>
                    </div>
                </div>

                <p>To,</p>
                <p className="font-semibold">{candidateName || "Candidate Name"}</p>
                <p className="mb-3">{collegeName || "College Name"}</p>

                <p className="font-semibold text-[13px] mb-3">
                    Subject: Offer for Internship in Android Development
                </p>

                <p className="mb-4">
                    Dear {candidateName || "Candidate Name"},
                </p>

                <p className="mb-3 text-justify">
                    We are pleased to offer you the position of <b>Android Development Intern</b> at
                    <b> SS Infotech Pvt. Ltd.</b>. This internship aims to enhance your practical
                    understanding of mobile app development and the Android ecosystem.
                </p>

                <p className="mb-3 text-justify">
                    <b>Internship Details:</b><br />
                    Role: Android Development Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom || "DD/MM/YYYY"}<br />
                    Stipend: {stipend || "Unpaid / As per company norms"}
                </p>

                <p className="mb-3 text-justify">
                    During the internship, you will build native Android apps using Kotlin or Java,
                    integrate REST APIs, work with Firebase, implement UI/UX designs, and assist in
                    publishing apps on the Google Play Store. You will follow coding standards,
                    documentation guidelines, and version control practices.
                </p>

                <p className="mb-3 text-justify">
                    You are expected to maintain professionalism, teamwork, punctuality,
                    and confidentiality throughout the internship period. Regular reporting,
                    task updates, and participation in team meetings will also be required.
                    <br /><br />
                    Upon successful completion of your internship and final evaluation,
                    you will receive an official <b>Internship Completion Certificate</b> from the company.
                </p>

                <p className="text-justify">
                    Kindly confirm your acceptance of this offer by replying to this email or submitting
                    a signed copy of this letter.
                </p>
            </div>
        </div>
    );
};

export default AndroidDevelopmentOfferLetter;