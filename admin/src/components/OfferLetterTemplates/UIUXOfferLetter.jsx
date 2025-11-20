import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const UIUXOfferLetter = ({ data = {} }) => {
    const { candidateName = "Candidate Name", collegeName = "College Name", internshipFrom = "DD/MM/YYYY", stipend = "Unpaid / As per company norms" } = data;

    return (
        <div className="relative w-[794px] h-[1123px] bg-white mx-auto overflow-hidden" style={{ backgroundImage: `url(${certificateBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-x-12 top-48 bottom-16 text-gray-800 leading-relaxed">

                <p>To,</p>
                <p className="font-bold text-[15px] mt-1">{candidateName}</p>
                <p className="mb-10">{collegeName}</p>

                <p className="font-bold text-[15px]">Subject: Offer for Internship in UI/UX Design</p>

                <p className="mt-10 text-lg">Dear {candidateName.split(" ")[0]},</p>

                <p className="mt-6 text-justify">
                    We are excited to offer you the position of <strong>UI/UX Design Intern</strong> at <strong>SS Infotech Pvt. Ltd.</strong>. This internship will help you apply design thinking and create user-centered digital experiences.
                </p>

                <p className="mt-6 text-justify">
                    <strong>Internship Details:</strong><br />
                    Role: UI/UX Design Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom}<br />
                    Stipend: {stipend}
                </p>

                <p className="mt-6 text-justify">
                    You will work on wireframing, prototyping, user research, visual design, and usability testing using tools like Figma, Adobe XD, Miro, and Canva. You’ll collaborate with developers for design handoff.
                </p>

                <p className="mt-6 text-justify">
                    Creativity, empathy, attention to detail, and timely delivery of design assets are expected.
                </p>

                <p className="mt-6 text-justify">
                    Upon successful completion and portfolio submission, you will receive an official <strong>Internship Completion Certificate</strong>.
                </p>

                <p className="mt-6 text-justify">
                    Please confirm your acceptance by replying to this email.
                </p>

                <p className="mt-10">We can’t wait to see your creative impact!</p>
            </div>
        </div>
    );
};

export default UIUXOfferLetter;