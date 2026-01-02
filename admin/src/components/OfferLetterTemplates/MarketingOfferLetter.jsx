import React from "react";
import certificateBg from "../../assets/certificate-bg.png";
import certificateBgStamp from "../../assets/certificate-bg-stamp.png";

/**
 * MarketingOfferLetter Component
 * Internship Offer Letter for Marketing
 * Supports stamped background via withStamp prop
 */
const MarketingOfferLetter = ({ data, withStamp = false }) => {
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
                    <div className="flex justify-between text-sm font-medium">
                        <div>
                            <strong>Ref:</strong> {referenceNo || "OFF-XXXXXX-XXX"}
                        </div>
                        <div>
                            <strong>Date:</strong> {issuedDate || "YYYY-MM-DD"}
                        </div>
                    </div>

                    {/* Decorative line below Ref & Date */}
                    <div className="border-t-2 border-gray-400 mt-4"></div>
                </div>

                {/* Recipient Address */}
                <p className="mb-1">To,</p>
                <p className="font-semibold text-lg mb-1">
                    {candidateName || "Candidate Name"}
                </p>
                <p className="mb-8">{collegeName || "College Name"}</p>

                {/* Subject */}
                <p className="font-semibold text-[13px] mb-5">
                    Subject: Offer for Internship in Marketing
                </p>

                {/* Greeting */}
                <p className="mb-5">
                    Dear {candidateName || "Candidate Name"},
                </p>

                {/* Opening Paragraph */}
                <p className="mb-5 text-justify">
                    We are pleased to offer you the position of <b>Marketing Intern</b>{" "}
                    at <b>SS Infotech Pvt. Ltd.</b>. This internship program is designed to
                    provide you hands-on experience in marketing strategies, branding,
                    client communication, campaign execution, and digital promotion.
                </p>

                {/* Internship Details */}
                <p className="mb-5 text-justify">
                    <b>Internship Details:</b>
                    <br />
                    Role: Marketing Intern
                    <br />
                    Location: Nagpur
                    <br />
                    Joining Date: {internshipFrom || "DD/MM/YYYY"}
                    <br />
                    Stipend: {stipend || "Unpaid / As per company norms"}
                </p>

                {/* Responsibilities */}
                <p className="mb-5 text-justify">
                    During the internship, you will work under the guidance of the HR and
                    Marketing team. Your responsibilities may include digital marketing
                    activities, social media management, content creation, lead generation,
                    market research, field marketing support, campaign analytics, and
                    participation in internal and external promotional events. You will
                    follow company branding guidelines, maintain documentation standards,
                    and contribute creatively to marketing initiatives.
                </p>

                {/* Expectations & Completion Certificate */}
                <p className="mb-6 text-justify">
                    You are expected to maintain professionalism, teamwork, punctuality,
                    and confidentiality throughout the internship period. Regular reporting,
                    task updates, and active participation in team meetings will also be required.

                    Upon successful completion of your internship and final evaluation, you
                    will receive an official <b>Internship Completion Certificate</b> from
                    the company.

                    Kindly confirm your acceptance of this offer by replying to this email
                    or submitting a signed copy of this letter.
                </p>
            </div>
        </div>
    );
};

export default MarketingOfferLetter;