import React from "react";
import certificateBg from "../../assets/certificate-bg.png";

const CloudComputingOfferLetter = ({ data = {} }) => {
    const { candidateName = "Candidate Name", collegeName = "College Name", internshipFrom = "DD/MM/YYYY", stipend = "Unpaid / As per company norms" } = data;

    return (
        <div className="relative w-[794px] h-[1123px] bg-white mx-auto overflow-hidden" style={{ backgroundImage: `url(${certificateBg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-x-12 top-48 bottom-16 text-gray-800 leading-relaxed">

                <p>To,</p>
                <p className="font-bold text-[15px] mt-1">{candidateName}</p>
                <p className="mb-10">{collegeName}</p>

                <p className="font-bold text-[15px]">Subject: Offer for Internship in Cloud Computing</p>

                <p className="mt-10 text-lg">Dear {candidateName.split(" ")[0]},</p>

                <p className="mt-6 text-justify">
                    We are delighted to offer you the position of <strong>Cloud Computing Intern</strong> at <strong>SS Infotech Pvt. Ltd.</strong>. This internship will provide practical exposure to cloud platforms, infrastructure automation, and DevOps practices.
                </p>

                <p className="mt-6 text-justify">
                    <strong>Internship Details:</strong><br />
                    Role: Cloud Computing Intern<br />
                    Location: Nagpur<br />
                    Joining Date: {internshipFrom}<br />
                    Stipend: {stipend}
                </p>

                <p className="mt-6 text-justify">
                    You will work with AWS, Azure, or GCP services including virtual machines, containers, storage, networking, CI/CD pipelines, and Infrastructure as Code (Terraform/CloudFormation).
                </p>

                <p className="mt-6 text-justify">
                    Professional conduct, timely reporting, and adherence to security best practices are mandatory.
                </p>

                <p className="mt-6 text-justify">
                    Upon successful completion, you will be awarded an official <strong>Internship Completion Certificate</strong>.
                </p>

                <p className="mt-6 text-justify">
                    Please confirm your acceptance at the earliest.
                </p>
            </div>
        </div>
    );
};

export default CloudComputingOfferLetter;