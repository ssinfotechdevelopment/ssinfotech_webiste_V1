import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const AndroidOfferLetter = ({ data = {} }) => {
    const { candidateName = "Candidate Name", collegeName = "College Name", internshipFrom = "DD/MM/YYYY", stipend = "Unpaid / As per company norms" } = data;

    return (
        <div className="relative w-[794px] h-[1123px] bg-white mx-auto overflow-hidden" style={{ backgroundImage: `url(${certificateBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-x-12 top-48 bottom-16 text-gray-800 leading-relaxed">

                <p>To,</p>
                <p className="font-bold text-[15px] mt-1">{candidateName}</p>
                <p className="mb-10">{collegeName}</p>

                <p className="font-bold text-[15px]">Subject: Offer for Internship in Android Development</p>

                <p className="mt-10 text-lg">Dear {candidateName.split(" ")[0]},</p>

                <p className="mt-6 text-justify">
                    We are pleased to offer you the position of <strong>Android Development Intern</strong> at <strong>SS Infotech Pvt. Ltd.</strong>. This internship is designed to provide hands-on experience in building modern Android applications using Kotlin/Java and industry-standard tools.
                </p>

                <p className="mt-6 text-justify">
                    <strong>Internship Details:</strong><br />
                    Role: Android Development Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom}<br />
                    Stipend: {stipend}
                </p>

                <p className="mt-6 text-justify">
                    You will work on UI/UX implementation, API integration, Firebase, debugging, performance optimization, Jetpack components, and modular architecture. Exposure to Android Studio, Git, and Play Store deployment is included.
                </p>

                <p className="mt-6 text-justify">
                    Professionalism, punctuality, teamwork, confidentiality, and daily task reporting are expected.
                </p>

                <p className="mt-6 text-justify">
                    Upon successful completion and evaluation, you will receive an official <strong>Internship Completion Certificate</strong>.
                </p>

                <p className="mt-6 text-justify">
                    Kindly confirm your acceptance by replying to this email or submitting a signed copy of this letter.
                </p>

                <p className="mt-10">We look forward to your valuable contribution!</p>
            </div>
        </div>
    );
};

export default AndroidOfferLetter;